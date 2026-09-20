import { cppModules, cppLessons, cppExercises } from "../content/curriculum/cppTrack";
import { runCppExerciseTests } from "../lib/runner/cppRunner";

async function runAllCppTrackValidations() {
  console.log("=========================================================");
  console.log("=== INICIANDO VALIDACIÓN DEL TRACK C++ 20 CURRICULUM ===");
  console.log("=========================================================\n");

  // -------------------------------------------------------------------------
  // 1. Verificación de Conteos y Proporciones
  // -------------------------------------------------------------------------
  console.log("--- 1. Conteos y Proporciones ---");
  console.log(`Módulos: ${cppModules.length} (Requerido: 9)`);
  console.log(`Lecciones: ${cppLessons.length} (Requerido: >= 10-12)`);
  console.log(`Ejercicios: ${cppExercises.length} (Requerido: >= 20-25)`);

  if (cppModules.length !== 9) {
    throw new Error(`Deben ser exactamente 9 módulos, se encontraron: ${cppModules.length}`);
  }
  if (cppLessons.length < 10) {
    throw new Error(`Deben ser al menos 10 lecciones, se encontraron: ${cppLessons.length}`);
  }
  if (cppExercises.length < 20) {
    throw new Error(`Deben ser al menos 20 ejercicios, se encontraron: ${cppExercises.length}`);
  }
  console.log("✓ Conteos cumplen holgadamente todos los requisitos normativos.");

  // -------------------------------------------------------------------------
  // 2. Coherencia Relacional de Módulos, Lecciones y Ejercicios
  // -------------------------------------------------------------------------
  console.log("\n--- 2. Coherencia Relacional ---");
  const moduleIds = new Set(cppModules.map((m) => m.id));
  const lessonIds = new Set(cppLessons.map((l) => l.id));
  const exerciseIds = new Set(cppExercises.map((e) => e.id));

  // Verificar módulos
  for (const m of cppModules) {
    if (m.track !== "cpp") {
      throw new Error(`Módulo ${m.id} no tiene track 'cpp'`);
    }
    if (m.lessonIds.length === 0) {
      throw new Error(`Módulo ${m.id} no tiene lecciones asociadas`);
    }
    for (const lid of m.lessonIds) {
      if (!lessonIds.has(lid)) {
        throw new Error(`Módulo ${m.id} referencia lección inexistente: ${lid}`);
      }
    }
  }

  // Verificar lecciones
  for (const l of cppLessons) {
    if (l.track !== "cpp") {
      throw new Error(`Lección ${l.id} no tiene track 'cpp'`);
    }
    if (!moduleIds.has(l.moduleId)) {
      throw new Error(`Lección ${l.id} referencia módulo inexistente: ${l.moduleId}`);
    }
    if (l.exerciseIds.length === 0) {
      throw new Error(`Lección ${l.id} no tiene ejercicios asociados`);
    }
    for (const eid of l.exerciseIds) {
      if (!exerciseIds.has(eid)) {
        throw new Error(`Lección ${l.id} referencia ejercicio inexistente: ${eid}`);
      }
    }
  }

  // Verificar ejercicios
  for (const e of cppExercises) {
    if (e.track !== "cpp") {
      throw new Error(`Ejercicio ${e.id} no tiene track 'cpp'`);
    }
    if (!moduleIds.has(e.moduleId)) {
      throw new Error(`Ejercicio ${e.id} referencia módulo inexistente: ${e.moduleId}`);
    }
    if (!lessonIds.has(e.lessonId)) {
      throw new Error(`Ejercicio ${e.id} referencia lección inexistente: ${e.lessonId}`);
    }
  }
  console.log("✓ Toda la jerarquía de módulos, lecciones y ejercicios es consistente y referencialmente íntegra.");

  // -------------------------------------------------------------------------
  // 3. Integridad Pedagógica: Cero Soluciones Pre-escritas en starterCode
  // -------------------------------------------------------------------------
  console.log("\n--- 3. Integridad Pedagógica (Cero Soluciones en starterCode) ---");
  for (const ex of cppExercises) {
    // Comprobar que no exista código ejecutable en starterCode
    const nonCommentCode = ex.starterCode
      .split(/\r?\n/)
      .map((l) => l.replace(/\/\/.*$/, "").trim())
      .filter((l) => l.length > 0)
      .join("\n");

    if (nonCommentCode.length > 0) {
      throw new Error(
        `VIOLACIÓN DE INTEGRIDAD: El ejercicio ${ex.id} contiene código ejecutable en starterCode:\n${nonCommentCode}`
      );
    }

    if (!ex.starterCode.includes("// PASO")) {
      throw new Error(`Ejercicio ${ex.id} no incluye guía '// PASO' en starterCode`);
    }

    if (!ex.starterCode.includes("// Tu código va aquí:")) {
      throw new Error(`Ejercicio ${ex.id} no incluye marcador '// Tu código va aquí:'`);
    }

    if (!ex.solutionReference || ex.solutionReference.trim().length === 0) {
      throw new Error(`Ejercicio ${ex.id} carece de solutionReference`);
    }

    if (ex.testCases.length === 0) {
      throw new Error(`Ejercicio ${ex.id} no tiene testCases`);
    }

    if (ex.socraticHints.length !== 3) {
      throw new Error(
        `Ejercicio ${ex.id} debe tener exactamente 3 pistas socráticas (niveles 1, 2 y 3)`
      );
    }

    const hintLevels = ex.socraticHints.map((h) => h.level);
    if (hintLevels[0] !== 1 || hintLevels[1] !== 2 || hintLevels[2] !== 3) {
      throw new Error(`Ejercicio ${ex.id} tiene pistas con niveles desordenados`);
    }
  }
  console.log(`✓ Los ${cppExercises.length} ejercicios tienen andamiaje guiado sin soluciones pre-escritas.`);

  // -------------------------------------------------------------------------
  // 4. Verificación Empírica: El starterCode NUNCA debe pasar las pruebas
  // -------------------------------------------------------------------------
  console.log("\n--- 4. Verificación Empírica: Fallo Garantizado de starterCode ---");
  let scaffoldFailedCount = 0;

  for (const ex of cppExercises) {
    const res = await runCppExerciseTests(
      ex.starterCode,
      ex.entryFunctionName,
      ex.testCases,
      ex.evaluationType,
      ex.targetVariable
    );

    const allFailed = res.testResults.every((tr) => tr.passed === false);
    if (!allFailed) {
      throw new Error(
        `FALLO DE INTEGRIDAD: El starterCode del ejercicio ${ex.id} (${ex.title}) aprobó casos de prueba erróneamente.`
      );
    }
    scaffoldFailedCount++;
  }
  console.log(
    `✓ Todos los ${scaffoldFailedCount} starterCode fallaron correctamente las pruebas (cero auto-aprobaciones).`
  );

  // -------------------------------------------------------------------------
  // 5. Verificación Empírica: Las Soluciones Canónicas DEBEN PASAR las pruebas
  // -------------------------------------------------------------------------
  console.log("\n--- 5. Verificación Empírica: Aprobación de Soluciones Canónicas ---");
  let totalCasesChecked = 0;
  let passedExercisesCount = 0;

  for (const ex of cppExercises) {
    const res = await runCppExerciseTests(
      ex.solutionReference,
      ex.entryFunctionName,
      ex.testCases,
      ex.evaluationType,
      ex.targetVariable
    );

    if (res.compilationError) {
      throw new Error(
        `Error de compilación en solución de ${ex.id} (${ex.title}):\n${res.compilationError}`
      );
    }

    for (const tc of res.testResults) {
      totalCasesChecked++;
      if (!tc.passed) {
        throw new Error(
          `Fallo en ejercicio ${ex.id} (${ex.title}) en caso ${tc.id}:\n` +
            `Esperado:\n${tc.expectedOutput}\n` +
            `Obtenido:\n${tc.actualOutput}\n` +
            `Código:\n${ex.solutionReference}`
        );
      }
    }

    passedExercisesCount++;
    console.log(`  ✓ [M${ex.moduleId}] ${ex.id}: ${ex.title} -> Aprobó todos los casos de prueba`);
  }

  console.log(
    `\n✓ Las ${passedExercisesCount} soluciones canónicas (${totalCasesChecked} casos de prueba evaluados) superaron 100% de las pruebas con el motor C++ 20.`
  );

  console.log("\n=========================================================");
  console.log("=== ¡TRACK C++ 20 COMPLETAMENTE VALIDADO Y VERIFICADO! ===");
  console.log("=========================================================\n");
}

runAllCppTrackValidations().catch((err) => {
  console.error("\n❌ ERROR DURANTE LA VALIDACIÓN DEL TRACK C++ 20:", err);
  process.exit(1);
});
