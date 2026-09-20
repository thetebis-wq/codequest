import { ExerciseTestCase, EvaluationType } from "@/types/exercise";
import { analyzeDiagnostics, DiagnosticItem } from "./diagnostics";

// Declaración de tipos globales para Pyodide en window
declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<any>;
    pyodideInstance?: any;
    pyodideLoadingPromise?: Promise<any>;
  }
}

/**
 * Carga e inicializa el runtime de Pyodide (Python en WebAssembly)
 * de forma singleton para reutilizar la instancia en el navegador.
 */
export async function getPyodideInstance(onStatusUpdate?: (status: string) => void): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("Pyodide solo puede ejecutarse en el entorno del navegador.");
  }

  // Si ya está listo, retornarlo de inmediato
  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  // Si ya se está cargando, esperar la promesa existente
  if (window.pyodideLoadingPromise) {
    return window.pyodideLoadingPromise;
  }

  window.pyodideLoadingPromise = new Promise(async (resolve, reject) => {
    try {
      onStatusUpdate?.("Cargando motor Pyodide (Python 3.12 WebAssembly)...");

      // Si el script de Pyodide no está en el DOM, inyectarlo
      if (!window.loadPyodide) {
        await new Promise((res, rej) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.async = true;
          script.onload = () => res(true);
          script.onerror = () => rej(new Error("No se pudo cargar el script de Pyodide desde el CDN."));
          document.head.appendChild(script);
        });
      }

      onStatusUpdate?.("Inicializando máquina virtual WebAssembly...");
      const pyodide = await window.loadPyodide!({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });

      // Alias convenientes para que estudiantes principiantes no se confundan con false/true de JS o C++
      try {
        await pyodide.runPythonAsync(`
import builtins
builtins.false = False
builtins.true = True
builtins.null = None
`);
      } catch (e) {
        // Ignorar si ya están configurados
      }

      window.pyodideInstance = pyodide;
      onStatusUpdate?.("Python 3.12 listo para ejecución.");
      resolve(pyodide);
    } catch (err) {
      window.pyodideLoadingPromise = undefined;
      reject(err);
    }
  });

  return window.pyodideLoadingPromise;
}

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  error?: string;
  executionTimeMs: number;
  diagnostics?: DiagnosticItem[];
}

/**
 * Ejecuta código Python en la máquina virtual de WebAssembly capturando stdout, stderr y errores.
 * Aplica diagnóstico estático amigable si se detecta un error de sintaxis o ejecución.
 */
export async function executePythonCode(
  code: string,
  onStatus?: (status: string) => void
): Promise<PythonExecutionResult> {
  const startTime = performance.now();
  const stdoutBuffer: string[] = [];
  const stderrBuffer: string[] = [];

  // Diagnósticos estáticos preventivos
  const diagnostics = analyzeDiagnostics(code, "python");

  try {
    const pyodide = await getPyodideInstance(onStatus);

    pyodide.setStdout({
      batched: (text: string) => {
        stdoutBuffer.push(text);
      },
    });

    pyodide.setStderr({
      batched: (text: string) => {
        stderrBuffer.push(text);
      },
    });

    onStatus?.("Ejecutando código...");
    await pyodide.runPythonAsync(code);

    const endTime = performance.now();
    return {
      stdout: stdoutBuffer.join("\n").trim(),
      stderr: stderrBuffer.join("\n").trim(),
      executionTimeMs: Math.round(endTime - startTime),
      diagnostics: diagnostics.filter((d) => d.severity === "error" || d.severity === "warning"),
    };
  } catch (err: any) {
    const endTime = performance.now();
    let errorMsg = err?.message || String(err);

    // Enriquecer mensaje de error con diagnósticos en español si están disponibles
    const errorDiagnostics = diagnostics.filter((d) => d.severity === "error");
    if (errorDiagnostics.length > 0) {
      const tips = errorDiagnostics
        .map((d) => `💡 [Línea ${d.line}]: ${d.message}${d.suggestion ? ` -> ${d.suggestion}` : ""}`)
        .join("\n");
      errorMsg = `${errorMsg}\n\n--- Diagnóstico Pedagógico ---\n${tips}`;
    }

    return {
      stdout: stdoutBuffer.join("\n").trim(),
      stderr: stderrBuffer.join("\n").trim(),
      error: errorMsg,
      executionTimeMs: Math.round(endTime - startTime),
      diagnostics,
    };
  }
}

export interface TestCaseResult {
  id: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
}

export interface PythonTestEvaluationResponse {
  stdout: string;
  stderr: string;
  testResults: TestCaseResult[];
  executionTimeMs: number;
  syntaxError?: string;
  diagnostics?: DiagnosticItem[];
}

/**
 * Ejecuta pruebas unitarias reales contra el código del estudiante en Pyodide WebAssembly.
 * Soporta evaluación por:
 *  - "stdout": Captura salida de print() y compara con expectedOutput (¡sin falsos aprobados!).
 *  - "function_return": Ejecuta entryFunctionName con los parámetros de entrada y compara retorno.
 *  - "variable_check": Inspecciona el entorno de variables del estudiante y valida su valor.
 */
export async function runPythonExerciseTests(
  userCode: string,
  entryFunctionName?: string,
  testCases: ExerciseTestCase[] = [],
  onStatus?: (status: string) => void,
  evaluationType?: EvaluationType,
  targetVariable?: string
): Promise<PythonTestEvaluationResponse> {
  const startTime = performance.now();
  const stdoutBuffer: string[] = [];
  const stderrBuffer: string[] = [];

  // Obtener diagnósticos pedagógicos de sintaxis
  const diagnostics = analyzeDiagnostics(userCode, "python");
  const errorDiagnostics = diagnostics.filter((d) => d.severity === "error");

  // Determinar modo de evaluación efectivo
  const effectiveEvalType: EvaluationType =
    evaluationType ||
    (entryFunctionName ? "function_return" : targetVariable ? "variable_check" : "stdout");

  // Si el código está vacío o sólo contiene comentarios, fallar de inmediato de forma genuina
  const nonCommentCode = userCode
    .split(/\r?\n/)
    .map((l) => l.replace(/#.*$/, "").trim())
    .filter((l) => l.length > 0)
    .join("\n");

  if (nonCommentCode.length === 0) {
    const endTime = performance.now();
    return {
      stdout: "",
      stderr: "",
      syntaxError: "El código no contiene instrucciones ejecutables. Escribe la solución siguiendo las instrucciones.",
      diagnostics,
      testResults: testCases.map((tc) => ({
        id: tc.id,
        passed: false,
        input: tc.input || "",
        expectedOutput: tc.expectedOutput,
        actualOutput: "(sin código ejecutable)",
        error: "Debes escribir el código de la solución para superar esta prueba.",
      })),
      executionTimeMs: Math.round(endTime - startTime),
    };
  }

  try {
    const pyodide = await getPyodideInstance(onStatus);

    pyodide.setStdout({
      batched: (text: string) => {
        stdoutBuffer.push(text);
      },
    });

    pyodide.setStderr({
      batched: (text: string) => {
        stderrBuffer.push(text);
      },
    });

    onStatus?.("Evaluando pruebas unitarias en WebAssembly...");

    // Inyectar variables globales al entorno de Pyodide
    pyodide.globals.set("__raw_user_code__", userCode);
    pyodide.globals.set("__raw_entry_func__", entryFunctionName || "");
    pyodide.globals.set("__raw_eval_type__", effectiveEvalType);
    pyodide.globals.set("__raw_target_var__", targetVariable || "");
    pyodide.globals.set(
      "__raw_test_cases_json__",
      JSON.stringify(
        testCases.map((tc) => ({
          id: tc.id,
          input: tc.input || "",
          expectedOutput: tc.expectedOutput || "",
          evaluationType: tc.evaluationType || effectiveEvalType,
          targetVariable: tc.targetVariable || targetVariable || "",
        }))
      )
    );

    // Harness de evaluación en Python con aislamiento de excepciones y tipos de prueba
    const harnessCode = `
import json, sys, io

__harness_results__ = []
__raw_test_cases__ = json.loads(__raw_test_cases_json__)

__user_ns__ = {
    "false": False,
    "true": True,
    "null": None,
    "__builtins__": __import__('builtins').__dict__,
}

def __values_match__(actual, expected_str):
    act_repr = repr(actual).strip()
    act_str = str(actual).strip()
    exp_str = str(expected_str).strip()

    if act_repr == exp_str or act_str == exp_str:
        return True

    # Comparación numérica con tolerancia para float
    try:
        if isinstance(actual, (int, float)):
            exp_num = float(exp_str)
            return abs(float(actual) - exp_num) < 1e-6
    except:
        pass

    # Comparación case-insensitive de booleanos
    if isinstance(actual, bool):
        return act_str.lower() == exp_str.lower()

    return False

try:
    if __raw_eval_type__ == "stdout":
        # Evaluar salida estándar para cada caso de prueba
        for __tc__ in __raw_test_cases__:
            __tc_id__ = __tc__["id"]
            __tc_input__ = __tc__["input"]
            __tc_expected__ = str(__tc__["expectedOutput"]).strip()

            __old_stdout__ = sys.stdout
            __old_stdin__ = sys.stdin
            __captured__ = io.StringIO()
            sys.stdout = __captured__
            sys.stdin = io.StringIO(str(__tc_input__))

            __test_ns__ = dict(__user_ns__)
            try:
                exec(__raw_user_code__, __test_ns__)
                __out_val__ = __captured__.getvalue().rstrip()
                __out_repr__ = __out_val__

                __passed__ = (__out_val__ == __tc_expected__)
                if not __passed__:
                    # Intentar comparar flotantes o líneas ignorando espacios redundantes
                    try:
                        __passed__ = abs(float(__out_val__) - float(__tc_expected__)) < 1e-6
                    except:
                        __passed__ = ("\\n".join([line.rstrip() for line in __out_val__.splitlines()]) ==
                                      "\\n".join([line.rstrip() for line in __tc_expected__.splitlines()]))

                __harness_results__.append({
                    "id": __tc_id__,
                    "passed": bool(__passed__),
                    "input": __tc_input__,
                    "expectedOutput": __tc_expected__,
                    "actualOutput": __out_repr__ if __out_repr__ != "" else "(sin salida de consola)",
                })
            except Exception as __case_err__:
                __harness_results__.append({
                    "id": __tc_id__,
                    "passed": False,
                    "input": __tc_input__,
                    "expectedOutput": __tc_expected__,
                    "actualOutput": f"Error: {type(__case_err__).__name__}: {__case_err__}",
                    "error": str(__case_err__)
                })
            finally:
                sys.stdout = __old_stdout__
                sys.stdin = __old_stdin__

    elif __raw_eval_type__ == "variable_check":
        # Ejecutar código e inspeccionar el entorno de variables
        exec(__raw_user_code__, __user_ns__)
        
        for __tc__ in __raw_test_cases__:
            __tc_id__ = __tc__["id"]
            __var_name__ = __tc__.get("targetVariable") or __raw_target_var__ or __tc__["input"].strip()
            __tc_expected__ = str(__tc__["expectedOutput"]).strip()

            if __var_name__ not in __user_ns__:
                __harness_results__.append({
                    "id": __tc_id__,
                    "passed": False,
                    "input": f"variable '{__var_name__}'",
                    "expectedOutput": __tc_expected__,
                    "actualOutput": f"Variable '{__var_name__}' no encontrada en el programa.",
                    "error": f"La variable '{__var_name__}' no fue declarada o no existe en el entorno global."
                })
            else:
                __val__ = __user_ns__[__var_name__]
                __passed__ = __values_match__(__val__, __tc_expected__)
                __harness_results__.append({
                    "id": __tc_id__,
                    "passed": bool(__passed__),
                    "input": f"variable '{__var_name__}'",
                    "expectedOutput": __tc_expected__,
                    "actualOutput": repr(__val__),
                })

    else:
        # Modo por defecto: function_return
        exec(__raw_user_code__, __user_ns__)

        if __raw_entry_func__ not in __user_ns__:
            raise NameError(f"La función '{__raw_entry_func__}' no está declarada en tu solución.")

        __target_func__ = __user_ns__[__raw_entry_func__]

        for __tc__ in __raw_test_cases__:
            __tc_id__ = __tc__["id"]
            __tc_input__ = __tc__["input"]
            __tc_expected__ = str(__tc__["expectedOutput"]).strip()

            try:
                __call_expr__ = f"__target_func__({__tc_input__})"
                __actual_val__ = eval(__call_expr__, {"__target_func__": __target_func__, **__user_ns__})
                __passed__ = __values_match__(__actual_val__, __tc_expected__)

                __harness_results__.append({
                    "id": __tc_id__,
                    "passed": bool(__passed__),
                    "input": __tc_input__,
                    "expectedOutput": __tc_expected__,
                    "actualOutput": repr(__actual_val__),
                })
            except Exception as __call_err__:
                __harness_results__.append({
                    "id": __tc_id__,
                    "passed": False,
                    "input": __tc_input__,
                    "expectedOutput": __tc_expected__,
                    "actualOutput": f"Error: {type(__call_err__).__name__}: {__call_err__}",
                    "error": str(__call_err__)
                })

except Exception as __exec_err__:
    sys.stderr.write(f"[Error de ejecución]: {type(__exec_err__).__name__}: {__exec_err__}\\n")
    for __tc__ in __raw_test_cases__:
        __harness_results__.append({
            "id": __tc__["id"],
            "passed": False,
            "input": __tc__.get("input", ""),
            "expectedOutput": str(__tc__["expectedOutput"]),
            "actualOutput": f"No evaluada por error: {type(__exec_err__).__name__}: {__exec_err__}",
            "error": str(__exec_err__)
        })

__final_test_output_json__ = json.dumps(__harness_results__)
`;

    await pyodide.runPythonAsync(harnessCode);
    const rawJson = pyodide.globals.get("__final_test_output_json__");
    const testResults: TestCaseResult[] = rawJson ? JSON.parse(rawJson) : [];
    const endTime = performance.now();

    return {
      stdout: stdoutBuffer.join("\n").trim(),
      stderr: stderrBuffer.join("\n").trim(),
      testResults,
      diagnostics,
      executionTimeMs: Math.round(endTime - startTime),
    };
  } catch (err: any) {
    const endTime = performance.now();
    let syntaxError = err?.message || String(err);

    if (errorDiagnostics.length > 0) {
      const tips = errorDiagnostics
        .map((d) => `💡 [Línea ${d.line}]: ${d.message}${d.suggestion ? ` -> ${d.suggestion}` : ""}`)
        .join("\n");
      syntaxError = `${syntaxError}\n\n--- Diagnóstico Pedagógico ---\n${tips}`;
    }

    return {
      stdout: stdoutBuffer.join("\n").trim(),
      stderr: stderrBuffer.join("\n").trim(),
      syntaxError,
      diagnostics,
      testResults: testCases.map((tc) => ({
        id: tc.id,
        passed: false,
        input: tc.input || "",
        expectedOutput: tc.expectedOutput,
        actualOutput: `Error de sintaxis o compilación en Python: ${err?.message || err}`,
        error: String(err),
      })),
      executionTimeMs: Math.round(endTime - startTime),
    };
  }
}
