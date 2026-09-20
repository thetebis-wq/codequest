import { pythonModules, pythonLessons, pythonExercises } from "../content/curriculum/pythonTrack";
import { execSync } from "child_process";

console.log("=== INICIANDO VALIDACIÓN DEL TRACK PYTHON 3.12 ===");

// 1. Verificación de conteos
console.log(`\n--- 1. Conteos y Proporciones ---`);
console.log(`Módulos: ${pythonModules.length} (Esperado: 9)`);
console.log(`Lecciones: ${pythonLessons.length} (Esperado: >= 10-12)`);
console.log(`Ejercicios: ${pythonExercises.length} (Esperado: >= 20-25)`);

if (pythonModules.length !== 9) throw new Error("Deben ser exactamente 9 módulos");
if (pythonLessons.length < 10) throw new Error("Deben ser al menos 10 lecciones");
if (pythonExercises.length < 20) throw new Error("Deben ser al menos 20 ejercicios");
console.log("✓ Conteos cumplen holgadamente los requisitos");

// 2. Coherencia relacional entre módulos, lecciones y ejercicios
console.log(`\n--- 2. Coherencia Relacional ---`);
const moduleIds = new Set(pythonModules.map((m) => m.id));
const lessonIds = new Set(pythonLessons.map((l) => l.id));
const exerciseIds = new Set(pythonExercises.map((e) => e.id));

for (const m of pythonModules) {
  if (m.track !== "python") throw new Error(`Módulo ${m.id} no tiene track 'python'`);
  for (const lid of m.lessonIds) {
    if (!lessonIds.has(lid)) throw new Error(`Módulo ${m.id} referencia lección inexistente: ${lid}`);
  }
}

for (const l of pythonLessons) {
  if (l.track !== "python") throw new Error(`Lección ${l.id} no tiene track 'python'`);
  if (!moduleIds.has(l.moduleId)) throw new Error(`Lección ${l.id} referencia módulo inexistente: ${l.moduleId}`);
  for (const eid of l.exerciseIds) {
    if (!exerciseIds.has(eid)) throw new Error(`Lección ${l.id} referencia ejercicio inexistente: ${eid}`);
  }
}
console.log("✓ Toda la jerarquía de módulos, lecciones y ejercicios es consistente y referencialmente íntegra");

// 3. Regla de integridad: Cero soluciones en starterCode, pistas socráticas y casos de prueba
console.log(`\n--- 3. Integridad Pedagógica (Cero Soluciones en starterCode) ---`);
for (const ex of pythonExercises) {
  // Comprobar que no haya código ejecutable en starterCode
  const nonCommentCode = ex.starterCode
    .split(/\r?\n/)
    .map((l) => l.replace(/#.*$/, "").trim())
    .filter((l) => l.length > 0)
    .join("\n");

  if (nonCommentCode.length > 0) {
    throw new Error(`Ejercicio ${ex.id} tiene código ejecutable en starterCode: ${nonCommentCode}`);
  }

  if (!ex.starterCode.includes("# PASO")) {
    throw new Error(`Ejercicio ${ex.id} no incluye guía '# PASO' en starterCode`);
  }

  if (!ex.solutionReference || ex.solutionReference.trim().length === 0) {
    throw new Error(`Ejercicio ${ex.id} carece de solutionReference`);
  }

  if (ex.testCases.length === 0) {
    throw new Error(`Ejercicio ${ex.id} no tiene testCases`);
  }

  if (ex.socraticHints.length !== 3) {
    throw new Error(`Ejercicio ${ex.id} debe tener exactamente 3 pistas socráticas`);
  }
}
console.log(`✓ Los ${pythonExercises.length} ejercicios tienen andamiaje guiado sin soluciones pre-escritas`);

// 4. Ejecución de las soluciones de referencia en Python real
console.log(`\n--- 4. Verificación de Soluciones de Referencia en Python Real ---`);
let passedTests = 0;

for (const ex of pythonExercises) {
  if (ex.evaluationType === "stdout") {
    // Ejecutar solución y capturar stdout
    const encodedCode = Buffer.from(ex.solutionReference, "utf-8").toString("base64");
    const pyCmd = `python -c "import base64; exec(base64.b64decode('${encodedCode}').decode('utf-8'))"`;
    const actualOutput = execSync(pyCmd, {
      encoding: "utf-8",
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    })
      .trim()
      .replace(/\r\n/g, "\n");
    const expectedOutput = ex.testCases[0].expectedOutput.trim().replace(/\r\n/g, "\n");

    if (actualOutput !== expectedOutput) {
      throw new Error(
        `Error en ${ex.id} (${ex.title}):\nSalida esperada:\n${expectedOutput}\nSalida obtenida:\n${actualOutput}`
      );
    }
    passedTests++;
  } else if (ex.evaluationType === "function_return") {
    for (const tc of ex.testCases) {
      const runnerCode = `
import base64
exec(base64.b64decode('${Buffer.from(ex.solutionReference, "utf-8").toString("base64")}').decode('utf-8'))
ret = ${ex.entryFunctionName}(${tc.input})
print(repr(ret) if isinstance(ret, str) else str(ret))
`.trim();
      const encodedRunner = Buffer.from(runnerCode, "utf-8").toString("base64");
      const pyCmd = `python -c "import base64; exec(base64.b64decode('${encodedRunner}').decode('utf-8'))"`;
      const actualOutput = execSync(pyCmd, { encoding: "utf-8" }).trim().replace(/\r\n/g, "\n");
      const expectedOutput = tc.expectedOutput.trim().replace(/\r\n/g, "\n");

      // Comparación flexible numérica o de texto
      let match = actualOutput === expectedOutput;
      if (!match) {
        try {
          match = Math.abs(parseFloat(actualOutput) - parseFloat(expectedOutput)) < 1e-5;
        } catch {}
      }

      if (!match) {
        throw new Error(
          `Error en función ${ex.id} (${ex.title}) para entrada ${tc.input}:\nEsperado: ${expectedOutput}\nObtenido: ${actualOutput}`
        );
      }
      passedTests++;
    }
  }
}

console.log(`✓ Todas las soluciones canónicas (${passedTests} casos de prueba) fueron ejecutadas en Python y pasaron exitosamente.`);
console.log("\n=================================================");
console.log("=== ¡TRACK PYTHON 3.12 100% VALIDADO Y VERIFICADO! ===");
console.log("=================================================\n");
