/**
 * CHALLENGER EMPIRICAL VERIFICATION SUITE - MILESTONE 1
 *
 * Independent, adversarial test harness for:
 * - lib/runner/diagnostics.ts
 * - lib/runner/cppRunner.ts
 * - lib/runner/pyodideRunner.ts
 *
 * Designed to empirically verify the 3 core review criteria:
 * 1. Starter code (only comments) NEVER passes tests.
 * 2. Failing code produces accurate expected vs actual output discrepancies.
 * 3. Tricky Python and C++ syntax errors trigger proper Spanish diagnostics.
 * And to stress-test adversarial corner cases and edge conditions.
 */

import { analyzeDiagnostics, DiagnosticItem } from "../lib/runner/diagnostics";
import {
  runCppExerciseTests,
  executeCppCode,
  transpileCppToJs,
  CppVector,
} from "../lib/runner/cppRunner";
import { runPythonExerciseTests } from "../lib/runner/pyodideRunner";
import { ExerciseTestCase, EvaluationType } from "../types/exercise";
import { execSync } from "child_process";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

interface TestReport {
  suite: string;
  name: string;
  passed: boolean;
  expected?: any;
  actual?: any;
  notes?: string;
  isAdversarialProbe?: boolean;
}

const reports: TestReport[] = [];

function recordResult(
  suite: string,
  name: string,
  passed: boolean,
  expected?: any,
  actual?: any,
  notes?: string,
  isAdversarialProbe: boolean = false
) {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${name}`);
    if (expected !== undefined) console.error(`         Expected: ${JSON.stringify(expected)}`);
    if (actual !== undefined) console.error(`         Actual:   ${JSON.stringify(actual)}`);
    if (notes) console.error(`         Notes:    ${notes}`);
  }
  reports.push({ suite, name, passed, expected, actual, notes, isAdversarialProbe });
}

// =========================================================================
// BRIDGE TO TEST REAL PYTHON HARNESS (Simulates Pyodide environment in Node)
// =========================================================================
function setupPyodideMockWithRealPython() {
  const globals = new Map<string, any>();

  const mockPyodide = {
    globals: {
      get: (key: string) => globals.get(key),
      set: (key: string, val: any) => globals.set(key, val),
    },
    setStdout: (cfg: { batched: (t: string) => void }) => {
      mockPyodide._stdoutBatched = cfg.batched;
    },
    setStderr: (cfg: { batched: (t: string) => void }) => {
      mockPyodide._stderrBatched = cfg.batched;
    },
    _stdoutBatched: (_t: string) => {},
    _stderrBatched: (_t: string) => {},
    runPythonAsync: async (code: string) => {
      const rawUserCode = globals.get("__raw_user_code__") || "";
      const rawEntryFunc = globals.get("__raw_entry_func__") || "";
      const rawEvalType = globals.get("__raw_eval_type__") || "stdout";
      const rawTargetVar = globals.get("__raw_target_var__") || "";
      const rawTestCasesJson = globals.get("__raw_test_cases_json__") || "[]";

      const pythonScript = `
import json, sys

__raw_user_code__ = ${JSON.stringify(rawUserCode)}
__raw_entry_func__ = ${JSON.stringify(rawEntryFunc)}
__raw_eval_type__ = ${JSON.stringify(rawEvalType)}
__raw_target_var__ = ${JSON.stringify(rawTargetVar)}
__raw_test_cases_json__ = ${JSON.stringify(rawTestCasesJson)}

${code}

if '__final_test_output_json__' in locals():
    print("__JSON_RESULT_START__" + __final_test_output_json__ + "__JSON_RESULT_END__")
`;

      try {
        const out = execSync("python", {
          input: pythonScript,
          encoding: "utf-8",
          timeout: 5000,
        });

        const match = out.match(/__JSON_RESULT_START__(.*)__JSON_RESULT_END__/s);
        if (match) {
          globals.set("__final_test_output_json__", match[1]);
        }
        return out;
      } catch (err: any) {
        throw new Error(err.stderr || err.stdout || err.message);
      }
    },
  };

  (global as any).window = {
    pyodideInstance: mockPyodide,
  };
}

async function runAllEmpiricalChecks() {
  console.log("\n=======================================================");
  console.log("=== EMPIRICAL CHALLENGER VERIFICATION SUITE - M1 ===");
  console.log("=======================================================\n");

  setupPyodideMockWithRealPython();

  // ===================================================================
  // SUITE 1: Starter Code (Only Comments) NEVER Passes Tests
  // ===================================================================
  console.log("--- Suite 1: Starter Code (Only Comments) NEVER Passes Tests ---");

  const standardTestCases: ExerciseTestCase[] = [
    {
      id: "tc-1",
      description: "Debe imprimir Hola, Mundo!",
      input: "",
      expectedOutput: "Hola, Mundo!",
      evaluationType: "stdout",
    },
    {
      id: "tc-2",
      description: "Caso secundario",
      input: "",
      expectedOutput: "Hola, Mundo!",
      evaluationType: "stdout",
    },
  ];

  // 1.1 Python starter codes
  const pyStarterCases = [
    { name: "Python empty code", code: "" },
    { name: "Python whitespace only", code: "   \n\t  \n  " },
    { name: "Python single line comment", code: "# PASO 1: Escribe tu solucion" },
    {
      name: "Python multi-step comment scaffold",
      code: "# PASO 1: Declara variable 'edad'\n# PASO 2: Asigna valor 20\n# PASO 3: Imprime edad",
    },
    {
      name: "Python comments with accents and symbols",
      code: "# 🚀 PASO 1: Inicialización del cálculo numérico\n# ¿Podrás resolverlo?",
    },
  ];

  for (const item of pyStarterCases) {
    const res = await runPythonExerciseTests(item.code, undefined, standardTestCases);
    const anyPassed = res.testResults.some((tc) => tc.passed === true);
    const allFailed = res.testResults.every((tc) => tc.passed === false);
    const actualOut = res.testResults[0]?.actualOutput;

    recordResult(
      "Suite 1",
      `1.1 [Pyodide] ${item.name} NEVER passes tests`,
      allFailed && !anyPassed && actualOut === "(sin código ejecutable)",
      { allPassed: false, actualOutput: "(sin código ejecutable)" },
      { allPassed: anyPassed, actualOutput: actualOut }
    );
  }

  // 1.2 Python starter code under variable_check and function_return modes
  {
    const pyVarCases: ExerciseTestCase[] = [
      {
        id: "var-1",
        description: "Variable edad",
        input: "",
        expectedOutput: "20",
        evaluationType: "variable_check",
        targetVariable: "edad",
      },
    ];
    const resVar = await runPythonExerciseTests(
      "# PASO 1: Declara edad = 20",
      undefined,
      pyVarCases,
      undefined,
      "variable_check",
      "edad"
    );
    recordResult(
      "Suite 1",
      "1.2 [Pyodide] Comment-only starter code fails variable_check mode",
      resVar.testResults[0].passed === false &&
        resVar.testResults[0].actualOutput === "(sin código ejecutable)",
      false,
      resVar.testResults[0].passed
    );

    const pyFnCases: ExerciseTestCase[] = [
      {
        id: "fn-1",
        description: "Duplicar 5",
        input: "5",
        expectedOutput: "10",
        evaluationType: "function_return",
      },
    ];
    const resFn = await runPythonExerciseTests(
      "# PASO 1: Define funcion duplicar",
      "duplicar",
      pyFnCases,
      undefined,
      "function_return"
    );
    recordResult(
      "Suite 1",
      "1.3 [Pyodide] Comment-only starter code fails function_return mode",
      resFn.testResults[0].passed === false &&
        resFn.testResults[0].actualOutput === "(sin código ejecutable)",
      false,
      resFn.testResults[0].passed
    );
  }

  // 1.3 C++ starter codes
  const cppStarterCases = [
    { name: "C++ empty code", code: "" },
    { name: "C++ whitespace only", code: "   \n\t   \n" },
    { name: "C++ single line comment", code: "// PASO 1: Escribe tu solucion" },
    {
      name: "C++ multi-step comments",
      code: "// PASO 1: Declara edad\n// PASO 2: Imprime edad\n// PASO 3: Termina con return 0;",
    },
    {
      name: "C++ block comment /* ... */",
      code: "/* PASO 1: Escribe tu solucion aqui */",
    },
    {
      name: "C++ multi-line block comment",
      code: "/*\n * PASO 1: Declarar variables\n * PASO 2: Imprimir resultado\n */",
    },
    {
      name: "C++ only #includes without main/code",
      code: "#include <iostream>\nusing namespace std;\n// PASO 1: Escribe main",
    },
  ];

  for (const item of cppStarterCases) {
    const res = await runCppExerciseTests(item.code, undefined, standardTestCases);
    const anyPassed = res.testResults.some((tc) => tc.passed === true);
    const allFailed = res.testResults.every((tc) => tc.passed === false);

    recordResult(
      "Suite 1",
      `1.4 [CppRunner] ${item.name} NEVER passes tests`,
      allFailed && !anyPassed,
      { allPassed: false },
      { allPassed: anyPassed },
      `Results: ${JSON.stringify(res.testResults.map((r) => ({ id: r.id, passed: r.passed, out: r.actualOutput })))}`
    );
  }

  // 1.4 C++ starter code under function_return and variable_check
  {
    const cppFnCases: ExerciseTestCase[] = [
      {
        id: "fn-cpp-1",
        description: "Sumar 3 y 4",
        input: "3, 4",
        expectedOutput: "7",
        evaluationType: "function_return",
      },
    ];
    const resFn = await runCppExerciseTests(
      "// PASO 1: Implementa int sumar(int a, int b)",
      "sumar",
      cppFnCases,
      "function_return"
    );
    recordResult(
      "Suite 1",
      "1.5 [CppRunner] Comment-only starter code fails function_return",
      resFn.testResults[0].passed === false,
      false,
      resFn.testResults[0].passed
    );
  }

  // ===================================================================
  // SUITE 2: Failing Code & Output Discrepancies Empirical Verification
  // ===================================================================
  console.log("\n--- Suite 2: Failing Code & Output Discrepancies ---");

  // 2.1 C++ Stdout discrepancy
  {
    const wrongCpp = `#include <iostream>
using namespace std;
int main() {
    cout << "Resultado: 50" << endl;
    return 0;
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "discrepancy-1",
        description: "Debe dar 100",
        input: "",
        expectedOutput: "Resultado: 100",
        evaluationType: "stdout",
      },
    ];
    const res = await runCppExerciseTests(wrongCpp, undefined, testCases);
    recordResult(
      "Suite 2",
      "2.1 [CppRunner] Accurate stdout discrepancy reporting (50 vs 100)",
      res.testResults[0].passed === false &&
        res.testResults[0].expectedOutput === "Resultado: 100" &&
        res.testResults[0].actualOutput === "Resultado: 50",
      { passed: false, expected: "Resultado: 100", actual: "Resultado: 50" },
      {
        passed: res.testResults[0].passed,
        expected: res.testResults[0].expectedOutput,
        actual: res.testResults[0].actualOutput,
      }
    );
  }

  // 2.2 C++ Silent stdout
  {
    const silentCpp = `#include <iostream>
using namespace std;
int main() {
    int x = 42;
    return 0;
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "silent-1",
        description: "Debe imprimir algo",
        input: "",
        expectedOutput: "Hola",
        evaluationType: "stdout",
      },
    ];
    const res = await runCppExerciseTests(silentCpp, undefined, testCases);
    recordResult(
      "Suite 2",
      "2.2 [CppRunner] Reports '(sin salida por consola)' when output is empty",
      res.testResults[0].passed === false &&
        res.testResults[0].actualOutput === "(sin salida por consola)",
      "(sin salida por consola)",
      res.testResults[0].actualOutput
    );
  }

  // 2.3 C++ Function return discrepancy
  {
    const wrongFnCpp = `int cuadrado(int n) {
    return n + n; // Error: debía ser n * n
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "fn-disc-1",
        description: "Cuadrado de 5 es 25",
        input: "5",
        expectedOutput: "25",
        evaluationType: "function_return",
      },
    ];
    const res = await runCppExerciseTests(wrongFnCpp, "cuadrado", testCases);
    recordResult(
      "Suite 2",
      "2.3 [CppRunner] Accurate function return discrepancy (10 vs 25)",
      res.testResults[0].passed === false &&
        res.testResults[0].expectedOutput === "25" &&
        res.testResults[0].actualOutput === "10",
      { passed: false, expected: "25", actual: "10" },
      {
        passed: res.testResults[0].passed,
        expected: res.testResults[0].expectedOutput,
        actual: res.testResults[0].actualOutput,
      }
    );
  }

  // 2.4 C++ Missing function definition (multi-line format)
  {
    const missingFnCpp = `int otraFuncion() {\n    return 1;\n}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "fn-miss-1",
        description: "Llamar a calcularTotal",
        input: "10",
        expectedOutput: "100",
        evaluationType: "function_return",
      },
    ];
    const res = await runCppExerciseTests(missingFnCpp, "calcularTotal", testCases);
    recordResult(
      "Suite 2",
      "2.4 [CppRunner] Clean error when requested entry function is missing",
      res.testResults[0].passed === false &&
        res.testResults[0].actualOutput.includes("calcularTotal"),
      true,
      res.testResults[0].actualOutput.includes("calcularTotal")
    );
  }

  // 2.5 C++ Variable check discrepancy (global variable)
  {
    const wrongVarCpp = `int puntaje = 80;
int main() {
    return 0;
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "var-disc-1",
        description: "Variable puntaje debe ser 100",
        input: "",
        expectedOutput: "100",
        evaluationType: "variable_check",
        targetVariable: "puntaje",
      },
    ];
    const res = await runCppExerciseTests(
      wrongVarCpp,
      undefined,
      testCases,
      "variable_check",
      "puntaje"
    );
    recordResult(
      "Suite 2",
      "2.5 [CppRunner] Accurate global variable check discrepancy (80 vs 100)",
      res.testResults[0].passed === false &&
        res.testResults[0].actualOutput === "80" &&
        res.testResults[0].expectedOutput === "100",
      { passed: false, actual: "80" },
      { passed: res.testResults[0].passed, actual: res.testResults[0].actualOutput }
    );
  }

  // 2.6 C++ Infinite loop detection
  {
    const infLoopCpp = `#include <iostream>
using namespace std;
int main() {
    while (true) {
        int x = 1;
    }
    return 0;
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "loop-1",
        description: "Bucle infinito",
        input: "",
        expectedOutput: "Fin",
        evaluationType: "stdout",
      },
    ];
    const t0 = Date.now();
    const res = await runCppExerciseTests(infLoopCpp, undefined, testCases);
    const elapsed = Date.now() - t0;
    recordResult(
      "Suite 2",
      "2.6 [CppRunner] Infinite loop aborted by step counter safeguard (< 2000ms)",
      res.testResults[0].passed === false && elapsed < 2000,
      { passed: false, abortedQuickly: true },
      { passed: res.testResults[0].passed, elapsedMs: elapsed }
    );
  }

  // 2.7 Python runner stdout discrepancy (tested via real Python bridge)
  {
    const wrongPy = `print("Resultado: 50")`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "py-disc-1",
        description: "Debe dar 100",
        input: "",
        expectedOutput: "Resultado: 100",
        evaluationType: "stdout",
      },
    ];
    const res = await runPythonExerciseTests(wrongPy, undefined, testCases);
    recordResult(
      "Suite 2",
      "2.7 [Pyodide] Accurate Python stdout discrepancy (50 vs 100)",
      res.testResults[0].passed === false &&
        res.testResults[0].expectedOutput === "Resultado: 100" &&
        res.testResults[0].actualOutput === "Resultado: 50",
      { passed: false, expected: "Resultado: 100", actual: "Resultado: 50" },
      {
        passed: res.testResults[0].passed,
        expected: res.testResults[0].expectedOutput,
        actual: res.testResults[0].actualOutput,
      }
    );
  }

  // 2.8 Python runner function return discrepancy
  {
    const wrongFnPy = `def duplicar(x):\n    return x + 1`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "py-fn-1",
        description: "Duplicar 10 es 20",
        input: "10",
        expectedOutput: "20",
        evaluationType: "function_return",
      },
    ];
    const res = await runPythonExerciseTests(wrongFnPy, "duplicar", testCases);
    recordResult(
      "Suite 2",
      "2.8 [Pyodide] Accurate Python function return discrepancy (11 vs 20)",
      res.testResults[0].passed === false &&
        res.testResults[0].expectedOutput === "20" &&
        res.testResults[0].actualOutput === "11",
      { passed: false, expected: "20", actual: "11" },
      {
        passed: res.testResults[0].passed,
        expected: res.testResults[0].expectedOutput,
        actual: res.testResults[0].actualOutput,
      }
    );
  }

  // 2.9 Python runner variable check discrepancy
  {
    const wrongVarPy = `saldo = 500`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "py-var-1",
        description: "Saldo debe ser 1000",
        input: "saldo",
        expectedOutput: "1000",
        evaluationType: "variable_check",
      },
    ];
    const res = await runPythonExerciseTests(
      wrongVarPy,
      undefined,
      testCases,
      undefined,
      "variable_check",
      "saldo"
    );
    recordResult(
      "Suite 2",
      "2.9 [Pyodide] Accurate Python variable check discrepancy (500 vs 1000)",
      res.testResults[0].passed === false &&
        res.testResults[0].expectedOutput === "1000" &&
        res.testResults[0].actualOutput === "500",
      { passed: false, expected: "1000", actual: "500" },
      {
        passed: res.testResults[0].passed,
        expected: res.testResults[0].expectedOutput,
        actual: res.testResults[0].actualOutput,
      }
    );
  }

  // 2.10 Python runtime exception reporting
  {
    const errPy = `x = 10 / 0`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "py-err-1",
        description: "Error division por cero",
        input: "",
        expectedOutput: "10",
        evaluationType: "stdout",
      },
    ];
    const res = await runPythonExerciseTests(errPy, undefined, testCases);
    recordResult(
      "Suite 2",
      "2.10 [Pyodide] Reports ZeroDivisionError on Python runtime exception",
      res.testResults[0].passed === false &&
        res.testResults[0].actualOutput.includes("ZeroDivisionError"),
      true,
      res.testResults[0].actualOutput.includes("ZeroDivisionError")
    );
  }

  // ===================================================================
  // SUITE 3: Tricky Spanish Diagnostics Empirical Verification
  // ===================================================================
  console.log("\n--- Suite 3: Tricky Spanish Diagnostics ---");

  // 3.1 Python Missing Colons across all block constructs
  const colonConstructs = [
    { name: "if missing colon", code: "if x > 10\n    print(x)" },
    { name: "elif missing colon", code: "if x > 10:\n    pass\nelif x == 5\n    pass" },
    { name: "else missing colon", code: "if x > 10:\n    pass\nelse\n    pass" },
    { name: "for missing colon", code: "for i in range(10)\n    print(i)" },
    { name: "while missing colon", code: "while True\n    print(1)" },
    { name: "def missing colon", code: "def calcular(a, b)\n    return a + b" },
    { name: "class missing colon", code: "class Estudiante\n    pass" },
  ];

  for (const item of colonConstructs) {
    const diag = analyzeDiagnostics(item.code, "python");
    const found = diag.some((d) => d.code === "missing-colon");
    recordResult(
      "Suite 3",
      `3.1 [Python Diag] Detects ':' omission in '${item.name}'`,
      found,
      true,
      found,
      `Diagnostics: ${JSON.stringify(diag.map((d) => ({ code: d.code, msg: d.message })))}`
    );
  }

  // 3.2 Python Assignment in conditions
  const assignConditions = [
    { name: "if x = 5", code: "if x = 5:\n    print(x)" },
    { name: "elif y = 10", code: "if x == 1:\n    pass\nelif y = 10:\n    pass" },
    { name: "while stop = False", code: "while stop = False:\n    pass" },
  ];

  for (const item of assignConditions) {
    const diag = analyzeDiagnostics(item.code, "python");
    const found = diag.some((d) => d.code === "assignment-in-condition");
    recordResult(
      "Suite 3",
      `3.2 [Python Diag] Detects '=' assignment in condition '${item.name}'`,
      found,
      true,
      found
    );
  }

  // 3.3 Python Common Typos
  const pyTypos = [
    { name: "pritn -> print", code: "pritn('hola')", expected: "print" },
    { name: "prnt -> print", code: "prnt('hola')", expected: "print" },
    { name: "whlie -> while", code: "whlie x > 0:\n    pass", expected: "while" },
    { name: "wihle -> while", code: "wihle x > 0:\n    pass", expected: "while" },
    { name: "false -> False", code: "x = false", expected: "False" },
    { name: "flase -> False", code: "x = flase", expected: "False" },
    { name: "true -> True", code: "x = true", expected: "True" },
    { name: "ture -> True", code: "x = ture", expected: "True" },
    { name: "null -> None", code: "x = null", expected: "None" },
    { name: "retrun -> return", code: "def f():\n    retrun 1", expected: "return" },
    { name: "retun -> return", code: "def f():\n    retun 1", expected: "return" },
    { name: "improt -> import", code: "improt math", expected: "import" },
    { name: "lenght -> len", code: "x = lenght(lista)", expected: "len" },
    { name: "legnth -> len", code: "x = legnth(lista)", expected: "len" },
    { name: "elsif -> elif", code: "if x:\n    pass\nelsif y:\n    pass", expected: "elif" },
    { name: "elseif -> elif", code: "if x:\n    pass\nelseif y:\n    pass", expected: "elif" },
  ];

  for (const item of pyTypos) {
    const diag = analyzeDiagnostics(item.code, "python");
    const found = diag.some(
      (d) => d.suggestion?.includes(item.expected) || d.message?.includes(item.expected)
    );
    recordResult(
      "Suite 3",
      `3.3 [Python Diag] Corrects typo '${item.name}' with Spanish suggestion`,
      found,
      true,
      found,
      `Diag: ${JSON.stringify(diag.map((d) => d.suggestion))}`
    );
  }

  // 3.4 Python C-style syntax intrusion
  {
    const cSemi = "x = 10;";
    const diagSemi = analyzeDiagnostics(cSemi, "python");
    recordResult(
      "Suite 3",
      "3.4 [Python Diag] Detects C-style semicolon ';' in Python",
      diagSemi.some((d) => d.code === "unnecessary-semicolon"),
      true,
      diagSemi.some((d) => d.code === "unnecessary-semicolon")
    );

    const cLogical = "if x > 5 && y < 10:\n    pass";
    const diagLog = analyzeDiagnostics(cLogical, "python");
    recordResult(
      "Suite 3",
      "3.5 [Python Diag] Detects C-style '&&' and suggests 'and'",
      diagLog.some((d) => d.code === "c-logical-operators"),
      true,
      diagLog.some((d) => d.code === "c-logical-operators")
    );

    const cType = "int edad = 20";
    const diagType = analyzeDiagnostics(cType, "python");
    recordResult(
      "Suite 3",
      "3.6 [Python Diag] Detects C-style type declaration 'int edad ='",
      diagType.some((d) => d.code === "type-annotation-c-style"),
      true,
      diagType.some((d) => d.code === "type-annotation-c-style")
    );
  }

  // 3.5 Python Indentation errors
  {
    const mixedCode = "def f():\n\t    print('mixed')";
    const diagMixed = analyzeDiagnostics(mixedCode, "python");
    recordResult(
      "Suite 3",
      "3.7 [Python Diag] Detects mixed tabs and spaces",
      diagMixed.some((d) => d.code === "mixed-tabs-spaces"),
      true,
      diagMixed.some((d) => d.code === "mixed-tabs-spaces")
    );

    const unindentedCode = "if True:\nprint('no indent')";
    const diagIndent = analyzeDiagnostics(unindentedCode, "python");
    recordResult(
      "Suite 3",
      "3.8 [Python Diag] Detects missing indentation block after colon",
      diagIndent.some((d) => d.code === "expected-indentation-block"),
      true,
      diagIndent.some((d) => d.code === "expected-indentation-block")
    );
  }

  // 3.6 Python Delimiter balancing
  {
    const unclosed = "total = (1 + 2 * [3, 4";
    const diagUnclosed = analyzeDiagnostics(unclosed, "python");
    recordResult(
      "Suite 3",
      "3.9 [Python Diag] Detects unclosed parentheses and brackets",
      diagUnclosed.some((d) => d.code === "unclosed-delimiter"),
      true,
      diagUnclosed.some((d) => d.code === "unclosed-delimiter")
    );

    const mismatched = "total = (1 + 2]";
    const diagMismatched = analyzeDiagnostics(mismatched, "python");
    recordResult(
      "Suite 3",
      "3.10 [Python Diag] Detects mismatched delimiters (opened '(', closed ']')",
      diagMismatched.some((d) => d.code === "mismatched-delimiter"),
      true,
      diagMismatched.some((d) => d.code === "mismatched-delimiter")
    );
  }

  // 3.7 C++ Missing Semicolon
  const cppSemiCases = [
    { name: "return 0", code: "int main() {\n    return 0\n}" },
    { name: "cout << x", code: "int main() {\n    cout << 10\n    return 0;\n}" },
    { name: "int x = 5", code: "int main() {\n    int x = 5\n    return 0;\n}" },
    { name: "v.push_back(1)", code: "int main() {\n    v.push_back(1)\n    return 0;\n}" },
    { name: "x++", code: "int main() {\n    x++\n    return 0;\n}" },
  ];

  for (const item of cppSemiCases) {
    const diag = analyzeDiagnostics(item.code, "cpp");
    const found = diag.some((d) => d.code === "missing-semicolon");
    recordResult(
      "Suite 3",
      `3.11 [C++ Diag] Detects missing semicolon in '${item.name}'`,
      found,
      true,
      found
    );
  }

  // 3.8 C++ Missing includes and std::
  {
    const noIo = "int main() { cout << 1; return 0; }";
    const diagNoIo = analyzeDiagnostics(noIo, "cpp");
    recordResult(
      "Suite 3",
      "3.12 [C++ Diag] Detects missing #include <iostream>",
      diagNoIo.some((d) => d.code === "missing-include-iostream"),
      true,
      diagNoIo.some((d) => d.code === "missing-include-iostream")
    );

    const noStd = "#include <iostream>\nint main() { cout << 1; return 0; }";
    const diagNoStd = analyzeDiagnostics(noStd, "cpp");
    recordResult(
      "Suite 3",
      "3.13 [C++ Diag] Detects missing std:: prefix",
      diagNoStd.some((d) => d.code === "missing-std-prefix"),
      true,
      diagNoStd.some((d) => d.code === "missing-std-prefix")
    );

    const noVec = "int main() { vector<int> v; return 0; }";
    const diagNoVec = analyzeDiagnostics(noVec, "cpp");
    recordResult(
      "Suite 3",
      "3.14 [C++ Diag] Detects missing #include <vector>",
      diagNoVec.some((d) => d.code === "missing-include-vector"),
      true,
      diagNoVec.some((d) => d.code === "missing-include-vector")
    );
  }

  // 3.9 C++ Single quote strings & Python syntax intrusion
  {
    const singleQuotes = `int main() { string s = 'Hola Mundo'; return 0; }`;
    const diagQuotes = analyzeDiagnostics(singleQuotes, "cpp");
    recordResult(
      "Suite 3",
      "3.15 [C++ Diag] Detects single quotes for multi-char string literals",
      diagQuotes.some((d) => d.code === "single-quote-string-cpp"),
      true,
      diagQuotes.some((d) => d.code === "single-quote-string-cpp")
    );

    const pyInCpp = `def saludar():\n    print("Hola")`;
    const diagPy = analyzeDiagnostics(pyInCpp, "cpp");
    recordResult(
      "Suite 3",
      "3.16 [C++ Diag] Detects Python 'def' and 'print()' in C++",
      diagPy.some((d) => d.code === "python-def-in-cpp") &&
        diagPy.some((d) => d.code === "python-print-in-cpp"),
      true,
      true
    );

    const assignIf = "int main() { if (x = 5) { return 1; } return 0; }";
    const diagAssign = analyzeDiagnostics(assignIf, "cpp");
    recordResult(
      "Suite 3",
      "3.17 [C++ Diag] Detects '=' assignment in C++ if condition",
      diagAssign.some((d) => d.code === "assignment-in-cpp-condition"),
      true,
      diagAssign.some((d) => d.code === "assignment-in-cpp-condition")
    );
  }

  // ===================================================================
  // SUITE 4: Adversarial Stress Probes (Uncovering Latent Bugs)
  // ===================================================================
  console.log("\n--- Suite 4: Adversarial Stress Probes (Latent Bug Discovery) ---");

  // PROBE 4.1: cin >> a >> b with numeric addition
  {
    const cinCpp = `#include <iostream>
using namespace std;
int main() {
    int a = 0;
    int b = 0;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "cin-num-1",
        description: "5 + 10 = 15",
        input: "5 10",
        expectedOutput: "15",
        evaluationType: "stdout",
      },
    ];
    const res = await runCppExerciseTests(cinCpp, undefined, testCases);
    const passed = res.testResults[0].passed;
    const actual = res.testResults[0].actualOutput;

    recordResult(
      "Suite 4 (Adversarial)",
      "4.1 [CppRunner] cin >> a >> b numeric addition (string concat vs addition)",
      passed === true && actual === "15",
      "15",
      actual,
      actual === "510"
        ? "CRITICAL BUG CONFIRMED: cin >> a >> b assigns string tokens, evaluating '5' + '10' as '510' instead of 15!"
        : undefined,
      true
    );
  }

  // PROBE 4.2: Allman style formatting: Opening brace on new line
  {
    const allmanCpp = `#include <iostream>
using namespace std;
int main()
{
    cout << "Hola" << endl;
    return 0;
}`;
    const diag = analyzeDiagnostics(allmanCpp, "cpp");
    const falseMissingSemi = diag.some(
      (d) => d.code === "missing-semicolon" && d.line === 3
    );
    const execRes = await executeCppCode(allmanCpp);

    recordResult(
      "Suite 4 (Adversarial)",
      "4.2 [CppRunner & Diag] Allman style '{' on next line does not falsely flag missing-semicolon",
      !falseMissingSemi && execRes.stdout === "Hola",
      { falseMissingSemi: false, stdout: "Hola" },
      { falseMissingSemi, stdout: execRes.stdout, compilationError: execRes.compilationError },
      falseMissingSemi
        ? "BUG CONFIRMED: 'int main()' followed by newline and '{' was falsely flagged as missing semicolon, blocking GCC execution!"
        : undefined,
      true
    );
  }

  // PROBE 4.3: C++ 'this->' member pointer in class constructor
  {
    const thisPtrCpp = `#include <iostream>
using namespace std;
class Rectangulo {
public:
    int base;
    int altura;
    Rectangulo(int base, int altura) {
        this->base = base;
        this->altura = altura;
    }
    int area() {
        return this->base * this->altura;
    }
};
int main() {
    Rectangulo r(4, 5);
    cout << r.area() << endl;
    return 0;
}`;
    const execRes = await executeCppCode(thisPtrCpp);
    recordResult(
      "Suite 4 (Adversarial)",
      "4.3 [CppRunner] Support for 'this->member' in C++ classes",
      execRes.stdout === "20",
      "20",
      execRes.stdout || execRes.compilationError,
      execRes.compilationError
        ? `BUG CONFIRMED: 'this->' is not transpiled to 'this.', causing JavaScript syntax error: ${execRes.compilationError}`
        : undefined,
      true
    );
  }

  // PROBE 4.4: C++ Direct integer division in cout: 15 / 4
  {
    const coutDivCpp = `#include <iostream>
using namespace std;
int main() {
    cout << 15 / 4 << endl;
    return 0;
}`;
    const execCoutRes = await executeCppCode(coutDivCpp);
    recordResult(
      "Suite 4 (Adversarial)",
      "4.4 [CppRunner] Direct integer division in cout << 15 / 4",
      execCoutRes.stdout === "3",
      "3",
      execCoutRes.stdout,
      execCoutRes.stdout === "3.75"
        ? "BUG CONFIRMED: replaceDivision is never called in transpileCppToJs; expressions evaluate as float 3.75 instead of integer division 3."
        : undefined,
      true
    );
  }

  // PROBE 4.5: Division by zero in C++
  {
    const divZeroCpp = `#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int b = 0;
    int c = a / b;
    cout << c << endl;
    return 0;
}`;
    const execRes = await executeCppCode(divZeroCpp);
    recordResult(
      "Suite 4 (Adversarial)",
      "4.5 [CppRunner] Division by zero triggers exception instead of returning Infinity",
      execRes.stdout !== "Infinity" && !!execRes.compilationError,
      "Exception",
      execRes.stdout === "Infinity" ? "Infinity" : execRes.compilationError,
      execRes.stdout === "Infinity"
        ? "BUG CONFIRMED: cppDiv was never called because replaceDivision is unused; 10 / 0 produces JavaScript Infinity!"
        : undefined,
      true
    );
  }

  // PROBE 4.6: Typo detection inside Python string literal
  {
    const stringLiteralPy = `mensaje = "El valor false no es un error de pritn"
print(mensaje)`;
    const diag = analyzeDiagnostics(stringLiteralPy, "python");
    const falseTypo = diag.some(
      (d) => d.code === "common-typo" || d.code === "assignment-in-condition"
    );
    recordResult(
      "Suite 4 (Adversarial)",
      "4.6 [Python Diag] String literals containing typo keywords do not produce false positives",
      !falseTypo,
      false,
      falseTypo,
      falseTypo
        ? `BUG CONFIRMED: checkPythonTypos operates on rawLine without stripping string literals! Fired: ${JSON.stringify(diag.map((d) => d.message))}`
        : undefined,
      true
    );
  }

  // PROBE 4.7: Single-line function definition in C++
  {
    const singleLineFuncCpp = `#include <iostream>
using namespace std;
int cuadrado(int x) { return x * x; }
int main() {
    cout << cuadrado(5) << endl;
    return 0;
}`;
    const execRes = await executeCppCode(singleLineFuncCpp);
    recordResult(
      "Suite 4 (Adversarial)",
      "4.7 [CppRunner] Single-line function definition transpiles successfully",
      execRes.stdout === "25",
      "25",
      execRes.stdout || execRes.compilationError,
      execRes.compilationError
        ? `BUG CONFIRMED: funcDefMatch regex requires '{' at end of line ($), failing to match single-line functions: ${execRes.compilationError}`
        : undefined,
      true
    );
  }

  // PROBE 4.8: C++ variable_check on variable declared inside main()
  {
    const localVarCpp = `#include <iostream>
int main() {
    int puntaje = 80;
    return 0;
}`;
    const testCases: ExerciseTestCase[] = [
      {
        id: "var-1",
        description: "puntaje 80",
        input: "",
        expectedOutput: "80",
        evaluationType: "variable_check",
        targetVariable: "puntaje",
      },
    ];
    const res = await runCppExerciseTests(
      localVarCpp,
      undefined,
      testCases,
      "variable_check",
      "puntaje"
    );
    const passed = res.testResults[0]?.passed;
    recordResult(
      "Suite 4 (Adversarial)",
      "4.8 [CppRunner] variable_check mode can inspect variables declared inside main()",
      passed === true,
      true,
      passed,
      !passed
        ? `BUG CONFIRMED: C++ runner checks variables in global sandbox scope; variables inside main() are scoped out: ${res.testResults[0]?.actualOutput}`
        : undefined,
      true
    );
  }

  // ===================================================================
  // SUMMARY AND VERDICT GENERATION
  // ===================================================================
  const coreReports = reports.filter((r) => !r.isAdversarialProbe);
  const probeReports = reports.filter((r) => r.isAdversarialProbe);
  const corePass = coreReports.filter((r) => r.passed).length;
  const coreTotal = coreReports.length;
  const probeBugsFound = probeReports.filter((r) => !r.passed).length;

  console.log("\n=======================================================");
  console.log(`=== CORE SPECIFICATION CRITERIA: ${corePass}/${coreTotal} PASSED ===`);
  console.log(`=== ADVERSARIAL STRESS PROBES: ${probeBugsFound} LATENT BUGS DISCOVERED ===`);
  console.log("=======================================================\n");

  return {
    totalTests,
    passedTests,
    failedTests,
    corePass,
    coreTotal,
    probeBugsFound,
    reports,
  };
}

runAllEmpiricalChecks()
  .then((results) => {
    console.log(`[CHALLENGER EXECUTION COMPLETE] Core: ${results.corePass}/${results.coreTotal}, Bugs: ${results.probeBugsFound}`);
  })
  .catch((err) => {
    console.error("FATAL in challenger runner:", err);
    process.exit(1);
  });
