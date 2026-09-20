import { analyzeDiagnostics, DiagnosticItem } from "../lib/runner/diagnostics";
import {
  runCppExerciseTests,
  executeCppCode,
  transpileCppToJs,
  CppVector,
} from "../lib/runner/cppRunner";
import { ExerciseTestCase } from "../types/exercise";
import { spawnSync } from "child_process";

// CLI subtest runner for hanging tests
const subtestArg = process.argv.find((arg) => arg.startsWith("--subtest="));
if (subtestArg) {
  const testName = subtestArg.split("=")[1];
  runSubtest(testName).catch((err) => {
    console.error("Subtest fatal error:", err);
    process.exit(1);
  });
} else {
  runEmpiricalStressSuite().catch((err) => {
    console.error("FATAL ERROR in stress suite:", err);
    process.exit(1);
  });
}

async function runSubtest(name: string) {
  if (name === "dowhile") {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      do {
        // infinite loop
      } while (true);
      return 0;
    }`;
    const res = await executeCppCode(code);
    console.log("DOWHILE_RESULT:" + JSON.stringify(res));
    process.exit(0);
  }

  if (name === "unbraced_while") {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      int x = 0;
      while (true) x++;
      return 0;
    }`;
    const res = await executeCppCode(code);
    console.log("UNBRACED_WHILE_RESULT:" + JSON.stringify(res));
    process.exit(0);
  }

  if (name === "unbraced_for") {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      int x = 0;
      for (;;) x++;
      return 0;
    }`;
    const res = await executeCppCode(code);
    console.log("UNBRACED_FOR_RESULT:" + JSON.stringify(res));
    process.exit(0);
  }
}

interface TestReport {
  name: string;
  category: string;
  passed: boolean;
  expected: string;
  actual: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
  notes?: string;
}

const reports: TestReport[] = [];

function record(report: TestReport) {
  reports.push(report);
  const mark = report.passed ? "✓ PASS" : "✗ FAIL";
  console.log(`[${mark}] [${report.severity}] ${report.category} -> ${report.name}`);
  if (!report.passed) {
    console.log(`    Expected: ${report.expected}`);
    console.log(`    Actual:   ${report.actual}`);
    if (report.notes) console.log(`    Notes:    ${report.notes}`);
  }
}

function runIsolatedSubtest(subtestName: string, timeoutMs: number = 3000) {
  const result = spawnSync("npx", ["tsx", "tests/stress_challenger2.test.ts", `--subtest=${subtestName}`], {
    timeout: timeoutMs,
    shell: true,
    encoding: "utf-8",
  });
  const timedOut = result.error && (result.error as any).code === "ETIMEDOUT";
  return {
    timedOut,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    status: result.status,
  };
}

async function runEmpiricalStressSuite() {
  console.log("==================================================================");
  console.log("=== EMPIRICAL CHALLENGER 2: STRESS & BOUNDARY TEST HARNESS ===");
  console.log("==================================================================\n");

  // =================================================================
  // SECTION 1: INFINITE LOOP SAFEGUARDS & CONTROL FLOW
  // =================================================================
  console.log(">>> SECTION 1: Infinite Loop Safeguards <<<");

  // 1.1 Standard while(true) with braces
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      while(true) {}
      return 0;
    }`;
    const res = await executeCppCode(code);
    const terminatedSafely = res.compilationError?.includes("bucle infinito") || res.stderr.includes("bucle infinito");
    record({
      name: "while (true) with braces terminates safely",
      category: "Loops",
      passed: Boolean(terminatedSafely),
      expected: "Terminates with loop limit error",
      actual: terminatedSafely ? "Terminated safely with error" : `Returned without loop error: ${res.stderr || res.stdout}`,
      severity: "CRITICAL",
    });
  }

  // 1.2 Standard for (;;) with braces
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      for (;;) {}
      return 0;
    }`;
    const res = await executeCppCode(code);
    const terminatedSafely = res.compilationError?.includes("bucle infinito") || res.stderr.includes("bucle infinito");
    record({
      name: "for (;;) with braces terminates safely",
      category: "Loops",
      passed: Boolean(terminatedSafely),
      expected: "Terminates with loop limit error",
      actual: terminatedSafely ? "Terminated safely with error" : `Returned without loop error: ${res.stderr || res.stdout}`,
      severity: "CRITICAL",
    });
  }

  // 1.3 while with nested parentheses: while ((x > 0))
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      int x = 1;
      while ((x > 0)) {
        x++;
      }
      return 0;
    }`;
    const res = await executeCppCode(code);
    const terminatedSafely = res.compilationError?.includes("bucle infinito") || res.stderr.includes("bucle infinito");
    record({
      name: "while with nested parentheses while ((x > 0)) terminates safely",
      category: "Loops",
      passed: Boolean(terminatedSafely),
      expected: "Terminates with loop limit error",
      actual: terminatedSafely ? "Terminated safely with error" : `Did NOT trigger loop error: ${res.stderr || res.stdout}`,
      severity: "HIGH",
    });
  }

  // 1.4 do-while infinite loop (isolated child process test)
  {
    const iso = runIsolatedSubtest("dowhile", 2500);
    const hung = iso.timedOut || (!iso.stdout.includes("DOWHILE_RESULT") && iso.status === null);
    record({
      name: "do-while(true) terminates safely without hanging",
      category: "Loops",
      passed: !hung,
      expected: "Terminates within 2500ms with loop safeguard error",
      actual: hung ? "HUNG / TIMED OUT (killed by supervisor after 2500ms)" : "Terminated safely",
      severity: "CRITICAL",
      notes: hung ? "VULNERABILITY CONFIRMED: do-while loops are completely unprotected because instrumentedCode only matches 'while' and 'for' with open braces." : undefined,
    });
  }

  // 1.5 Unbraced while loop: while (true) x++;
  {
    const iso = runIsolatedSubtest("unbraced_while", 2500);
    const hung = iso.timedOut || (!iso.stdout.includes("UNBRACED_WHILE_RESULT") && iso.status === null);
    record({
      name: "Unbraced while(true) x++; terminates safely without hanging",
      category: "Loops",
      passed: !hung,
      expected: "Terminates within 2500ms with loop safeguard error",
      actual: hung ? "HUNG / TIMED OUT (killed by supervisor after 2500ms)" : "Terminated safely",
      severity: "CRITICAL",
      notes: hung ? "VULNERABILITY CONFIRMED: unbraced loops bypass regex guard /\\b(while|for)\\s*\\((.*?)\\)\\s*\\{/ which requires an opening brace '{'." : undefined,
    });
  }

  // 1.6 Unbraced for loop: for (;;) x++;
  {
    const iso = runIsolatedSubtest("unbraced_for", 2500);
    const hung = iso.timedOut || (!iso.stdout.includes("UNBRACED_FOR_RESULT") && iso.status === null);
    record({
      name: "Unbraced for(;;) x++; terminates safely without hanging",
      category: "Loops",
      passed: !hung,
      expected: "Terminates within 2500ms with loop safeguard error",
      actual: hung ? "HUNG / TIMED OUT (killed by supervisor after 2500ms)" : "Terminated safely",
      severity: "CRITICAL",
      notes: hung ? "VULNERABILITY CONFIRMED: unbraced for(;;) bypasses regex guard requiring opening brace." : undefined,
    });
  }

  // 1.7 Legitimate nested loop within normal iteration bounds
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      int count = 0;
      for (int i = 0; i < 200; i++) {
        for (int j = 0; j < 200; j++) {
          count++;
        }
      }
      cout << count << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    record({
      name: "Legitimate nested loop (200x200 = 40,000 steps) succeeds",
      category: "Loops",
      passed: res.stdout === "40000",
      expected: "40000",
      actual: res.stdout || res.compilationError || res.stderr,
      severity: "MEDIUM",
    });
  }

  // =================================================================
  // SECTION 2: VECTOR BOUNDS & COLLECTIONS
  // =================================================================
  console.log("\n>>> SECTION 2: Vector Bounds & Empty Collections <<<");

  // 2.1 Vector out-of-range with .at()
  {
    const code = `
    #include <iostream>
    #include <vector>
    using namespace std;
    int main() {
      vector<int> v;
      v.push_back(10);
      cout << v.at(5) << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    const caught = res.compilationError?.includes("out_of_range") || res.stderr?.includes("out_of_range");
    record({
      name: "vector.at(out_of_bounds) throws std::out_of_range",
      category: "Vector",
      passed: Boolean(caught),
      expected: "Exception containing std::out_of_range",
      actual: caught ? "Caught std::out_of_range as expected" : `Output: "${res.stdout}", Stderr: "${res.stderr}"`,
      severity: "MEDIUM",
    });
  }

  // 2.2 Vector out-of-range with [] operator
  {
    const code = `
    #include <iostream>
    #include <vector>
    using namespace std;
    int main() {
      vector<int> v;
      v.push_back(10);
      cout << "Val: " << v[99] << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    record({
      name: "vector[out_of_bounds] access behavior",
      category: "Vector",
      passed: res.stdout === "Val: ",
      expected: "Val: (undefined formatted as empty in cout)",
      actual: res.stdout,
      severity: "INFO",
      notes: "v[99] returns undefined and CppCout converts undefined to empty string.",
    });
  }

  // 2.3 Empty vector operations (pop_back on empty)
  {
    const code = `
    #include <iostream>
    #include <vector>
    using namespace std;
    int main() {
      vector<int> v;
      v.pop_back();
      cout << "Size: " << v.size() << ", Empty: " << v.empty() << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    record({
      name: "Empty vector pop_back() does not crash",
      category: "Vector",
      passed: res.stdout === "Size: 0, Empty: 1",
      expected: "Size: 0, Empty: 1",
      actual: res.stdout || res.compilationError || res.stderr,
      severity: "LOW",
    });
  }

  // 2.4 Vector sized constructor: vector<int> v(5);
  {
    const code = `
    #include <iostream>
    #include <vector>
    using namespace std;
    int main() {
      vector<int> v(5);
      cout << "Size: " << v.size() << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    const passed = res.stdout === "Size: 5";
    record({
      name: "Vector sized declaration: vector<int> v(5);",
      category: "Vector",
      passed,
      expected: "Size: 5",
      actual: res.stdout || res.compilationError || res.stderr,
      severity: "HIGH",
      notes: passed ? "Supported" : "BUG: vector<int> v(5) is treated as function prototype or discarded because transpileCppToJs regexes only match vector<T> v = {...} and vector<T> v;",
    });
  }

  // 2.5 Empty collections sorting & reversing
  {
    const code = `
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    int main() {
      vector<int> v;
      sort(v.begin(), v.end());
      reverse(v.begin(), v.end());
      cout << "Size: " << v.size() << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    record({
      name: "Empty vector sort and reverse",
      category: "Vector",
      passed: res.stdout === "Size: 0",
      expected: "Size: 0",
      actual: res.stdout || res.compilationError || res.stderr,
      severity: "LOW",
    });
  }

  // =================================================================
  // SECTION 3: DIVISION BY ZERO & ARITHMETIC BOUNDARIES
  // =================================================================
  console.log("\n>>> SECTION 3: Division by Zero & Arithmetic <<<");

  // 3.1 Integer division by zero
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      int a = 10;
      int b = 0;
      int c = a / b;
      cout << c << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    const caught = res.compilationError?.includes("división por cero") || res.stderr?.includes("división por cero") || res.compilationError?.includes("Floating point");
    record({
      name: "Integer division by zero triggers runtime error / exception",
      category: "Arithmetic",
      passed: Boolean(caught),
      expected: "Floating point exception / división por cero error",
      actual: caught ? "Caught division by zero" : `Output: "${res.stdout}", Stderr: "${res.stderr}"`,
      severity: "HIGH",
      notes: caught ? "Handled" : "BUG: Division by zero outputs 'Infinity' instead of throwing error because transpileCppToJs never replaces '/' with cppDiv().",
    });
  }

  // 3.2 Modulo by zero
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      int a = 10;
      int b = 0;
      int c = a % b;
      cout << c << endl;
      return 0;
    }`;
    const res = await executeCppCode(code);
    record({
      name: "Modulo by zero triggers error or produces NaN",
      category: "Arithmetic",
      passed: res.stderr.includes("cero") || res.stdout === "NaN",
      expected: "Error or NaN",
      actual: `Stdout: "${res.stdout}", Stderr: "${res.stderr}"`,
      severity: "MEDIUM",
      notes: "Outputs NaN without throwing runtime error in JS",
    });
  }

  // =================================================================
  // SECTION 4: FLOAT FORMATTING & COMPARISON ORACLES
  // =================================================================
  console.log("\n>>> SECTION 4: Float Formatting & Comparison Oracles <<<");

  // 4.1 Empty stdout vs Expected "0" false pass bug
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      // Empty main - no cout written
      return 0;
    }`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "tc-zero",
        description: "Debe imprimir 0",
        input: "",
        expectedOutput: "0",
        evaluationType: "stdout",
      },
    ];
    const res = await runCppExerciseTests(code, undefined, testCases);
    const falsePass = res.testResults[0].passed;
    record({
      name: "Empty output should FAIL test expecting '0' (compareOutputs false-pass bug)",
      category: "Runner Evaluation",
      passed: !falsePass,
      expected: "Test case FAILS because user output nothing",
      actual: falsePass ? "Test case PASSED! (FALSE PASS BUG: Number('') === 0)" : "Test case failed correctly",
      severity: "CRITICAL",
      notes: falsePass ? "CRITICAL BUG in compareOutputs: Number('') evaluates to 0 in JavaScript! When a test expects '0', an empty output erroneously passes!" : undefined,
    });
  }

  // 4.2 Floating point precision comparison (1e-6 tolerance)
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      double d = 0.1 + 0.2;
      cout << d << endl;
      return 0;
    }`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "tc-float",
        description: "0.1 + 0.2 equals 0.3 within precision",
        input: "",
        expectedOutput: "0.3",
        evaluationType: "stdout",
      },
    ];
    const res = await runCppExerciseTests(code, undefined, testCases);
    record({
      name: "Floating point 0.1 + 0.2 compares equal to 0.3 within tolerance",
      category: "Runner Evaluation",
      passed: res.testResults[0].passed,
      expected: "true (passed)",
      actual: String(res.testResults[0].passed),
      severity: "MEDIUM",
      notes: `Actual output was: ${res.testResults[0].actualOutput}`,
    });
  }

  // 4.3 Float formatting with trailing zeros vs exact match
  {
    const code = `
    #include <iostream>
    using namespace std;
    int main() {
      double d = 5.0;
      cout << d << endl;
      return 0;
    }`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "tc-float-zero",
        description: "Debe coincidir con 5.0 o 5",
        input: "",
        expectedOutput: "5.0",
        evaluationType: "stdout",
      },
    ];
    const res = await runCppExerciseTests(code, undefined, testCases);
    record({
      name: "Float 5.0 matches expectedOutput 5.0 numerically",
      category: "Runner Evaluation",
      passed: res.testResults[0].passed,
      expected: "true",
      actual: String(res.testResults[0].passed),
      severity: "LOW",
    });
  }

  // =================================================================
  // SECTION 5: DIAGNOSTICS EDGE CASES (KEYWORDS IN STRINGS & COMMENTS)
  // =================================================================
  console.log("\n>>> SECTION 5: Diagnostics Edge Cases <<<");

  // 5.1 Python: Keyword in string literal: print("false") or print("true")
  {
    const code = `print("false")\nprint("true")`;
    const diags = analyzeDiagnostics(code, "python");
    const falseErrors = diags.filter((d) => d.severity === "error" && d.code === "common-typo");
    record({
      name: "Python: string literal containing 'false' or 'true' must NOT trigger typo error",
      category: "Diagnostics",
      passed: falseErrors.length === 0,
      expected: "0 typo errors",
      actual: `${falseErrors.length} typo errors reported`,
      severity: "HIGH",
      notes: falseErrors.length > 0 ? `Flagged: ${falseErrors.map(e => e.message).join("; ")}` : undefined,
    });
  }

  // 5.2 Python: Keyword in comment: # El bucle whlie o valor false
  {
    const code = `# Ten cuidado de no escribir whlie ni usar false\nx = 10\nprint(x)`;
    const diags = analyzeDiagnostics(code, "python");
    const commentErrors = diags.filter((d) => d.severity === "error");
    record({
      name: "Python: Comment containing typo keywords must NOT trigger error",
      category: "Diagnostics",
      passed: commentErrors.length === 0,
      expected: "0 errors",
      actual: `${commentErrors.length} errors reported`,
      severity: "HIGH",
      notes: commentErrors.length > 0 ? `Flagged: ${commentErrors.map(e => e.message).join("; ")}` : undefined,
    });
  }

  // 5.3 C++: Char literal escape sequence: char c = '\n'; or char c = '\t';
  {
    const code = `#include <iostream>
using namespace std;
int main() {
    char salto = '\\n';
    cout << salto;
    return 0;
}`;
    const diags = analyzeDiagnostics(code, "cpp");
    const quoteErrors = diags.filter((d) => d.code === "single-quote-string-cpp");
    record({
      name: "C++: char literal '\\n' must NOT be flagged as single-quote-string-cpp",
      category: "Diagnostics",
      passed: quoteErrors.length === 0,
      expected: "0 errors (valid C++ char literal)",
      actual: `${quoteErrors.length} errors reported`,
      severity: "CRITICAL",
      notes: quoteErrors.length > 0 ? `Flagged: ${quoteErrors.map(e => e.message).join("; ")}. This BLOCKS COMPILATION of any valid C++ code using '\\n'!` : undefined,
    });
  }

  // 5.4 C++: Contraction apostrophe in inline comment: // It's fine
  {
    const code = `#include <iostream>
using namespace std;
int main() {
    int x = 10; // It's fine and that's okay
    cout << x << endl;
    return 0;
}`;
    const diags = analyzeDiagnostics(code, "cpp");
    const apostropheErrors = diags.filter((d) => d.code === "single-quote-string-cpp");
    record({
      name: "C++: Apostrophe in inline comment // It's fine must NOT trigger single-quote-string-cpp",
      category: "Diagnostics",
      passed: apostropheErrors.length === 0,
      expected: "0 errors",
      actual: `${apostropheErrors.length} errors reported`,
      severity: "HIGH",
      notes: apostropheErrors.length > 0 ? `Flagged: ${apostropheErrors.map(e => e.message).join("; ")}` : undefined,
    });
  }

  // 5.5 C++: Keywords inside multiline block comments
  {
    const code = `#include <iostream>
using namespace std;
/*
def funcion_python():
int y = 20
*/
int main() {
    return 0;
}`;
    const diags = analyzeDiagnostics(code, "cpp");
    const blockCommentErrors = diags.filter((d) => d.code === "python-def-in-cpp" || d.code === "missing-semicolon");
    record({
      name: "C++: Multiline block comment containing def or code without semicolon must NOT trigger error",
      category: "Diagnostics",
      passed: blockCommentErrors.length === 0,
      expected: "0 errors",
      actual: `${blockCommentErrors.length} errors reported`,
      severity: "HIGH",
      notes: blockCommentErrors.length > 0 ? `Flagged: ${blockCommentErrors.map(e => e.message).join("; ")}` : undefined,
    });
  }

  // 5.6 C++: String literal containing Python keywords: cout << "def sumar(a, b):"
  {
    const code = `#include <iostream>
using namespace std;
int main() {
    cout << "def sumar(a, b): print(a + b)" << endl;
    return 0;
}`;
    const diags = analyzeDiagnostics(code, "cpp");
    const pyInCppErrors = diags.filter((d) => d.code === "python-def-in-cpp" || d.code === "python-print-in-cpp");
    record({
      name: "C++: String literal with Python keywords cout << \"def ...\" must NOT trigger error",
      category: "Diagnostics",
      passed: pyInCppErrors.length === 0,
      expected: "0 errors",
      actual: `${pyInCppErrors.length} errors reported`,
      severity: "MEDIUM",
    });
  }

  // 5.7 Spanish accents and UTF-8 characters
  {
    const code = `#include <iostream>
#include <string>
using namespace std;
int main() {
    // PASO 1: Imprimir información del año y puntuación máxima
    string mensaje = "Año bisiesto: éxito, resolución y configuración";
    cout << mensaje << endl;
    return 0;
}`;
    const diags = analyzeDiagnostics(code, "cpp");
    const errs = diags.filter((d) => d.severity === "error");
    const execRes = await executeCppCode(code);
    record({
      name: "C++: Spanish accents and UTF-8 strings in comments and cout execute cleanly",
      category: "UTF-8 & Accents",
      passed: errs.length === 0 && execRes.stdout.includes("Año bisiesto: éxito"),
      expected: "Zero diagnostic errors and correct UTF-8 stdout",
      actual: `Errors: ${errs.length}, Stdout: "${execRes.stdout}"`,
      severity: "MEDIUM",
    });
  }

  // =================================================================
  // SUMMARY REPORT
  // =================================================================
  console.log("\n==================================================================");
  console.log("=== EMPIRICAL STRESS TEST SUMMARY ===");
  console.log("==================================================================");

  const total = reports.length;
  const passed = reports.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log(`Total Scenarios Tested: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  const criticalBugs = reports.filter((r) => !r.passed && r.severity === "CRITICAL");
  const highBugs = reports.filter((r) => !r.passed && r.severity === "HIGH");
  const mediumBugs = reports.filter((r) => !r.passed && r.severity === "MEDIUM");

  console.log(`\nSeverity Breakdown of Failures:`);
  console.log(`  CRITICAL: ${criticalBugs.length}`);
  console.log(`  HIGH:     ${highBugs.length}`);
  console.log(`  MEDIUM:   ${mediumBugs.length}`);
}
