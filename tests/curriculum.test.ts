/**
 * UNIFIED CURRICULUM REGISTRY & RUNNER VERIFICATION SUITE
 *
 * Comprehensive test suite validating:
 * 1. Track Module, Lesson, and Exercise counts (Python: 9 modules, >=10 lessons, >=25 exercises; C++: 9 modules, >=10 lessons, >=25 exercises; Total lessons >= 20).
 * 2. Relational and referential integrity between modules, lessons, and exercises.
 * 3. Pedagogical integrity: zero pre-written solutions in starterCode (only # PASO / // PASO comments).
 * 4. Rich pedagogical schema: every exercise has spec, theory, 3-level socraticHints, testCases, and solutionReference.
 * 5. Registry API & backwards compatibility in lib/exercises.ts (getTracks, getModulesByTrack, getLessonsByModule, getExercisesByTrack, getExercisesByLesson, getExerciseById, getAllExercises, getExercisesByLevel, getPythonTrackExercises, getCppTrackExercises).
 * 6. UI compatibility: all returned exercises provide starterCodes { python, cpp } and solutionReferences { python, cpp }.
 * 7. Empirical runner verification:
 *    - Starter code fails all tests (0 auto-approvals).
 *    - Canonical solutions pass 100% of test cases.
 */

import {
  getTracks,
  getModulesByTrack,
  getLessonsByModule,
  getExercisesByTrack,
  getExercisesByLesson,
  getExerciseById,
  getAllExercises,
  getExercisesByLevel,
  getPythonTrackExercises,
  getCppTrackExercises,
  pythonModules,
  pythonLessons,
  pythonExercises,
  cppModules,
  cppLessons,
  cppExercises,
} from "../lib/exercises";

import { runPythonExerciseTests } from "../lib/runner/pyodideRunner";
import { runCppExerciseTests } from "../lib/runner/cppRunner";
import { execSync } from "child_process";

let totalAssertions = 0;
let passedAssertions = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✓ ${testName}`);
  } else {
    console.error(`  ✗ FALLO: ${testName} ${detail ? `| Detalle: ${detail}` : ""}`);
    throw new Error(`Aserción fallida: ${testName} ${detail ? `(${detail})` : ""}`);
  }
}

async function runCurriculumSuite() {
  console.log("===============================================================================");
  console.log("=== CODEQUEST LAB: SUITE DE VERIFICACIÓN UNIFICADA DE CURRÍCULO & REGISTRO ===");
  console.log("===============================================================================\n");

  // ---------------------------------------------------------------------------
  // 1. Conteo y Proporciones Normativas
  // ---------------------------------------------------------------------------
  console.log("--- 1. Conteos y Proporciones Normativas ---");

  // Python Track
  assert(
    pythonModules.length === 9,
    `Track Python: exactamente 9 módulos (encontrados: ${pythonModules.length})`
  );
  assert(
    pythonLessons.length >= 10,
    `Track Python: >= 10 lecciones (encontradas: ${pythonLessons.length})`
  );
  assert(
    pythonExercises.length >= 25,
    `Track Python: >= 25 ejercicios prácticos (encontrados: ${pythonExercises.length})`
  );

  // C++ Track
  assert(
    cppModules.length === 9,
    `Track C++: exactamente 9 módulos (encontrados: ${cppModules.length})`
  );
  assert(
    cppLessons.length >= 10,
    `Track C++: >= 10 lecciones (encontradas: ${cppLessons.length})`
  );
  assert(
    cppExercises.length >= 25,
    `Track C++: >= 25 ejercicios prácticos (encontrados: ${cppExercises.length})`
  );

  // Total combinado
  const totalLessons = pythonLessons.length + cppLessons.length;
  const totalExercises = pythonExercises.length + cppExercises.length;
  assert(
    totalLessons >= 20,
    `Total lecciones combinadas >= 20 (encontradas: ${totalLessons})`
  );
  assert(
    totalExercises >= 50,
    `Total ejercicios combinados >= 50 (encontrados: ${totalExercises})`
  );

  // ---------------------------------------------------------------------------
  // 2. Coherencia Relacional y Esquema Pedagógico
  // ---------------------------------------------------------------------------
  console.log("\n--- 2. Coherencia Relacional e Integridad de Esquema ---");

  const pyModuleIds = new Set(pythonModules.map((m) => m.id));
  const pyLessonIds = new Set(pythonLessons.map((l) => l.id));
  const pyExerciseIds = new Set(pythonExercises.map((e) => e.id));

  for (const m of pythonModules) {
    assert(m.track === "python", `Python Módulo ${m.id}: track 'python'`);
    assert(m.lessonIds.length > 0, `Python Módulo ${m.id}: contiene lecciones asociadas`);
    for (const lid of m.lessonIds) {
      assert(pyLessonIds.has(lid), `Python Módulo ${m.id}: lección existente '${lid}'`);
    }
  }

  for (const l of pythonLessons) {
    assert(l.track === "python", `Python Lección ${l.id}: track 'python'`);
    assert(pyModuleIds.has(l.moduleId), `Python Lección ${l.id}: módulo padre válido ${l.moduleId}`);
    assert(l.exerciseIds.length > 0, `Python Lección ${l.id}: contiene ejercicios asociados`);
    for (const eid of l.exerciseIds) {
      assert(pyExerciseIds.has(eid), `Python Lección ${l.id}: ejercicio existente '${eid}'`);
    }
  }

  const cppModuleIds = new Set(cppModules.map((m) => m.id));
  const cppLessonIds = new Set(cppLessons.map((l) => l.id));
  const cppExerciseIds = new Set(cppExercises.map((e) => e.id));

  for (const m of cppModules) {
    assert(m.track === "cpp", `C++ Módulo ${m.id}: track 'cpp'`);
    assert(m.lessonIds.length > 0, `C++ Módulo ${m.id}: contiene lecciones asociadas`);
    for (const lid of m.lessonIds) {
      assert(cppLessonIds.has(lid), `C++ Módulo ${m.id}: lección existente '${lid}'`);
    }
  }

  for (const l of cppLessons) {
    assert(l.track === "cpp", `C++ Lección ${l.id}: track 'cpp'`);
    assert(cppModuleIds.has(l.moduleId), `C++ Lección ${l.id}: módulo padre válido ${l.moduleId}`);
    assert(l.exerciseIds.length > 0, `C++ Lección ${l.id}: contiene ejercicios asociados`);
    for (const eid of l.exerciseIds) {
      assert(cppExerciseIds.has(eid), `C++ Lección ${l.id}: ejercicio existente '${eid}'`);
    }
  }

  // Validar campos pedagógicos obligatorios en cada ejercicio
  const allTrackExercises = [...pythonExercises, ...cppExercises];
  for (const ex of allTrackExercises) {
    assert(!!ex.id && ex.id.trim().length > 0, `Ejercicio ${ex.id}: ID no vacío`);
    assert(!!ex.title && ex.title.trim().length > 0, `Ejercicio ${ex.id}: Título no vacío`);
    assert(!!ex.subtitle && ex.subtitle.trim().length > 0, `Ejercicio ${ex.id}: Subtítulo no vacío`);
    assert(ex.xpReward > 0, `Ejercicio ${ex.id}: Recompensa XP > 0 (${ex.xpReward} XP)`);

    // Especificación
    assert(!!ex.spec.summary && ex.spec.summary.length > 10, `Ejercicio ${ex.id}: Spec summary descriptivo`);
    assert(ex.spec.learningObjectives.length >= 1, `Ejercicio ${ex.id}: Al menos un objetivo de aprendizaje`);

    // Teoría
    assert(!!ex.theory.title, `Ejercicio ${ex.id}: Teoría con título`);
    assert(!!ex.theory.mentalModel && ex.theory.mentalModel.length > 15, `Ejercicio ${ex.id}: Modelo mental explicativo`);
    assert(!!ex.theory.explanation && ex.theory.explanation.length > 20, `Ejercicio ${ex.id}: Fundamento teórico detallado`);

    // Pistas Socráticas (exactamente 3 niveles 1, 2, 3)
    assert(ex.socraticHints.length === 3, `Ejercicio ${ex.id}: Exactamente 3 pistas socráticas`);
    assert(
      ex.socraticHints[0].level === 1 && ex.socraticHints[1].level === 2 && ex.socraticHints[2].level === 3,
      `Ejercicio ${ex.id}: Pistas con niveles escalonados 1 -> 2 -> 3`
    );
    for (const hint of ex.socraticHints) {
      assert(!!hint.title && !!hint.prompt, `Ejercicio ${ex.id}: Pista nivel ${hint.level} con título y pregunta`);
    }

    // Casos de prueba
    assert(ex.testCases.length >= 1, `Ejercicio ${ex.id}: Al menos 1 caso de prueba unitaria`);
    for (const tc of ex.testCases) {
      assert(!!tc.id, `Ejercicio ${ex.id} Caso ${tc.id}: ID de prueba presente`);
      assert(tc.expectedOutput !== undefined, `Ejercicio ${ex.id} Caso ${tc.id}: expectedOutput definido`);
    }

    // Solución Canónica
    assert(!!ex.solutionReference && ex.solutionReference.trim().length > 0, `Ejercicio ${ex.id}: Solución canónica presente`);
  }
  console.log(`✓ Esquemas validados en los ${allTrackExercises.length} ejercicios de ambos tracks.`);

  // ---------------------------------------------------------------------------
  // 3. Integridad Pedagógica: Cero Soluciones Pre-escritas en starterCode
  // ---------------------------------------------------------------------------
  console.log("\n--- 3. Integridad Pedagógica (Cero Soluciones en starterCode) ---");

  // Python starterCode validation
  for (const ex of pythonExercises) {
    const nonCommentCode = ex.starterCode
      .split(/\r?\n/)
      .map((line) => line.replace(/#.*$/, "").trim())
      .filter((line) => line.length > 0)
      .join("\n");

    assert(
      nonCommentCode.length === 0,
      `Python ${ex.id}: Starter code sin código ejecutable pre-escrito`,
      nonCommentCode
    );

    assert(
      ex.starterCode.includes("# PASO"),
      `Python ${ex.id}: Starter code contiene guía '# PASO'`
    );

    assert(
      ex.starterCode.includes("# Tu código va aquí:"),
      `Python ${ex.id}: Starter code contiene marcador '# Tu código va aquí:'`
    );
  }

  // C++ starterCode validation
  for (const ex of cppExercises) {
    const nonCommentCode = ex.starterCode
      .split(/\r?\n/)
      .map((line) => line.replace(/\/\/.*$/, "").trim())
      .filter((line) => line.length > 0)
      .join("\n");

    assert(
      nonCommentCode.length === 0,
      `C++ ${ex.id}: Starter code sin código ejecutable pre-escrito`,
      nonCommentCode
    );

    assert(
      ex.starterCode.includes("// PASO"),
      `C++ ${ex.id}: Starter code contiene guía '// PASO'`
    );

    assert(
      ex.starterCode.includes("// Tu código va aquí:"),
      `C++ ${ex.id}: Starter code contiene marcador '// Tu código va aquí:'`
    );
  }
  console.log(`✓ Los ${allTrackExercises.length} starterCodes contienen únicamente andamiaje de pasos guiados.`);

  // ---------------------------------------------------------------------------
  // 4. API de Registro Curricular en lib/exercises.ts
  // ---------------------------------------------------------------------------
  console.log("\n--- 4. API de Registro Curricular (lib/exercises.ts) ---");

  // getTracks
  const tracks = getTracks();
  assert(
    tracks.length === 2 && tracks.includes("python") && tracks.includes("cpp"),
    "getTracks(): retorna ['python', 'cpp']"
  );

  // getModulesByTrack
  const pyModsFromApi = getModulesByTrack("python");
  assert(pyModsFromApi.length === 9, "getModulesByTrack('python'): retorna 9 módulos");
  const cppModsFromApi = getModulesByTrack("cpp");
  assert(cppModsFromApi.length === 9, "getModulesByTrack('cpp'): retorna 9 módulos");

  // getLessonsByModule
  const pyMod1Lessons = getLessonsByModule("python", 1);
  assert(pyMod1Lessons.length >= 1, "getLessonsByModule('python', 1): retorna lecciones de módulo 1");
  assert(pyMod1Lessons.every((l) => l.moduleId === 1), "getLessonsByModule('python', 1): coherencia de moduleId");

  const cppMod1Lessons = getLessonsByModule("cpp", 1);
  assert(cppMod1Lessons.length >= 1, "getLessonsByModule('cpp', 1): retorna lecciones de módulo 1");
  assert(cppMod1Lessons.every((l) => l.moduleId === 1), "getLessonsByModule('cpp', 1): coherencia de moduleId");

  // getExercisesByTrack
  const pyExFromApi = getExercisesByTrack("python");
  assert(pyExFromApi.length === pythonExercises.length, `getExercisesByTrack('python'): retorna ${pythonExercises.length} ejercicios`);
  const cppExFromApi = getExercisesByTrack("cpp");
  assert(cppExFromApi.length === cppExercises.length, `getExercisesByTrack('cpp'): retorna ${cppExercises.length} ejercicios`);

  // getExercisesByLesson
  const pyLesson1Ex = getExercisesByLesson("py-m1-l1");
  assert(pyLesson1Ex.length >= 2, `getExercisesByLesson('py-m1-l1'): retorna ejercicios de la lección`);
  assert(pyLesson1Ex.every((e) => e.lessonId === "py-m1-l1"), "getExercisesByLesson: todos tienen el lessonId correcto");

  const cppLesson1Ex = getExercisesByLesson("cpp-m1-l1");
  assert(cppLesson1Ex.length >= 2, `getExercisesByLesson('cpp-m1-l1'): retorna ejercicios de la lección`);
  assert(cppLesson1Ex.every((e) => e.lessonId === "cpp-m1-l1"), "getExercisesByLesson: todos tienen el lessonId correcto");

  // getExerciseById
  const pyEx1 = getExerciseById("py-m1-ex1");
  assert(pyEx1 !== null && pyEx1.id === "py-m1-ex1", "getExerciseById('py-m1-ex1'): resuelve ejercicio Python");

  const cppEx1 = getExerciseById("cpp-m1-ex1");
  assert(cppEx1 !== null && cppEx1.id === "cpp-m1-ex1", "getExerciseById('cpp-m1-ex1'): resuelve ejercicio C++");

  const cppExFinal = getExerciseById("cpp-m9-ex2");
  assert(
    cppExFinal !== null && cppExFinal.id === "cpp-m9-ex2",
    "getExerciseById('cpp-m9-ex2'): resuelve ejercicio C++ avanzado"
  );

  const aliasEx = getExerciseById("py-m1-ex1-hola-mundo");
  assert(
    aliasEx !== null && aliasEx.id === "py-m1-ex1",
    "getExerciseById('py-m1-ex1-hola-mundo'): resuelve mediante alias a 'py-m1-ex1'"
  );

  const nonExistent = getExerciseById("no-existe-12345");
  assert(nonExistent === null, "getExerciseById('no-existe-12345'): retorna null para ID inexistente");

  // getAllExercises
  const allExercises = getAllExercises();
  const expectedTotal = pythonExercises.length + cppExercises.length;
  assert(
    allExercises.length === expectedTotal,
    `getAllExercises(): retorna catálogo completo con exactamente ${expectedTotal} ejercicios (total: ${allExercises.length})`
  );

  // Compatibilidad hacia atrás: starterCodes y solutionReferences
  for (const ex of allExercises) {
    assert(
      typeof ex.starterCodes?.python === "string",
      `getAllExercises() ${ex.id}: starterCodes.python es string`
    );
    assert(
      typeof ex.starterCodes?.cpp === "string",
      `getAllExercises() ${ex.id}: starterCodes.cpp es string`
    );
    assert(
      typeof ex.solutionReferences?.python === "string",
      `getAllExercises() ${ex.id}: solutionReferences.python es string`
    );
    assert(
      typeof ex.solutionReferences?.cpp === "string",
      `getAllExercises() ${ex.id}: solutionReferences.cpp es string`
    );
    assert(
      typeof ex.level === "number",
      `getAllExercises() ${ex.id}: level es número`
    );
    assert(
      typeof ex.starterCode === "string" && ex.starterCode.length > 0,
      `getAllExercises() ${ex.id}: starterCode principal es string no vacío`
    );
  }
  console.log("✓ Compatibilidad de starterCodes y solutionReferences verificada en todos los ejercicios.");

  // Funciones de conveniencia de compatibilidad
  const lvl0Exercises = getExercisesByLevel(0);
  assert(lvl0Exercises.length === 0, "getExercisesByLevel(0): retorna 0 tras la depuración de ejercicios legados");

  const pyLvl10Exercises = getExercisesByLevel(10);
  assert(pyLvl10Exercises.length >= 3, "getExercisesByLevel(10): mapea al Módulo 1 de Python");

  const cppLvl20Exercises = getExercisesByLevel(20);
  assert(cppLvl20Exercises.length >= 3, "getExercisesByLevel(20): mapea al Módulo 1 de C++");

  const pyTrackExercises = getPythonTrackExercises();
  assert(
    pyTrackExercises.length === pythonExercises.length,
    `getPythonTrackExercises(): retorna los ${pythonExercises.length} ejercicios de Python`
  );

  const cppTrackExercises = getCppTrackExercises();
  assert(
    cppTrackExercises.length === cppExercises.length,
    `getCppTrackExercises(): retorna los ${cppExercises.length} ejercicios de C++`
  );

  // ---------------------------------------------------------------------------
  // 5. Verificación Empírica de Runners: Fallo Garantizado de starterCode
  // ---------------------------------------------------------------------------
  console.log("\n--- 5. Evaluación de Runners: Starter Code NUNCA debe pasar pruebas ---");

  // Python starter codes con runPythonExerciseTests
  for (const ex of pythonExercises) {
    const res = await runPythonExerciseTests(
      ex.starterCode,
      ex.entryFunctionName,
      ex.testCases,
      undefined,
      ex.evaluationType,
      ex.targetVariable
    );

    const anyPassed = res.testResults.some((tr) => tr.passed === true);
    assert(
      !anyPassed,
      `Python ${ex.id}: starterCode no aprueba pruebas falsamente`,
      `Pases indebidos detectados`
    );
    assert(
      res.testResults[0]?.actualOutput === "(sin código ejecutable)",
      `Python ${ex.id}: reporta '(sin código ejecutable)' correctamente`
    );
  }
  console.log(`✓ Los ${pythonExercises.length} starterCodes de Python fallan limpiamente sin auto-aprobaciones.`);

  // C++ starter codes con runCppExerciseTests
  for (const ex of cppExercises) {
    const res = await runCppExerciseTests(
      ex.starterCode,
      ex.entryFunctionName,
      ex.testCases,
      ex.evaluationType,
      ex.targetVariable
    );

    const anyPassed = res.testResults.some((tr) => tr.passed === true);
    assert(
      !anyPassed,
      `C++ ${ex.id}: starterCode no aprueba pruebas falsamente`,
      `Pases indebidos detectados`
    );
  }
  console.log(`✓ Los ${cppExercises.length} starterCodes de C++ fallan limpiamente sin auto-aprobaciones.`);

  // ---------------------------------------------------------------------------
  // 6. Verificación Empírica de Runners: Aprobación 100% de Soluciones Canónicas
  // ---------------------------------------------------------------------------
  console.log("\n--- 6. Evaluación de Runners: Soluciones Canónicas Aprueban 100% ---");

  // C++ Canonical Solutions en C++ Runner
  let cppTestCasesEvaluated = 0;
  for (const ex of cppExercises) {
    const res = await runCppExerciseTests(
      ex.solutionReference,
      ex.entryFunctionName,
      ex.testCases,
      ex.evaluationType,
      ex.targetVariable
    );

    assert(
      !res.compilationError,
      `C++ ${ex.id} (${ex.title}): Compilación limpia sin errores`,
      res.compilationError
    );

    for (const tc of res.testResults) {
      cppTestCasesEvaluated++;
      assert(
        tc.passed === true,
        `C++ ${ex.id} caso '${tc.id}': prueba superada`,
        `Esperado: ${tc.expectedOutput} | Obtenido: ${tc.actualOutput}`
      );
    }
  }
  console.log(`✓ Las ${cppExercises.length} soluciones canónicas de C++ (${cppTestCasesEvaluated} casos) aprobaron 100%.`);

  // Python Canonical Solutions en Python Real
  let pyTestCasesEvaluated = 0;
  for (const ex of pythonExercises) {
    if (ex.evaluationType === "stdout") {
      const encodedCode = Buffer.from(ex.solutionReference, "utf-8").toString("base64");
      const pyCmd = `python -c "import base64; exec(base64.b64decode('${encodedCode}').decode('utf-8'))"`;
      const actualOutput = execSync(pyCmd, {
        encoding: "utf-8",
        env: { ...process.env, PYTHONIOENCODING: "utf-8" },
      })
        .trim()
        .replace(/\r\n/g, "\n");

      const expectedOutput = ex.testCases[0].expectedOutput.trim().replace(/\r\n/g, "\n");

      let match = actualOutput === expectedOutput;
      if (!match) {
        try {
          match = Math.abs(parseFloat(actualOutput) - parseFloat(expectedOutput)) < 1e-5;
        } catch {}
      }

      pyTestCasesEvaluated++;
      assert(
        match,
        `Python stdout ${ex.id} (${ex.title}): salida coincide`,
        `Esperado:\n${expectedOutput}\nObtenido:\n${actualOutput}`
      );
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
        const actualOutput = execSync(pyCmd, {
          encoding: "utf-8",
          env: { ...process.env, PYTHONIOENCODING: "utf-8" },
        })
          .trim()
          .replace(/\r\n/g, "\n");

        const expectedOutput = tc.expectedOutput.trim().replace(/\r\n/g, "\n");

        let match = actualOutput === expectedOutput;
        if (!match) {
          try {
            match = Math.abs(parseFloat(actualOutput) - parseFloat(expectedOutput)) < 1e-5;
          } catch {}
        }

        pyTestCasesEvaluated++;
        assert(
          match,
          `Python func ${ex.id} (${ex.title}) entrada ${tc.input}: retorno coincide`,
          `Esperado: ${expectedOutput} | Obtenido: ${actualOutput}`
        );
      }
    }
  }
  console.log(`✓ Las ${pythonExercises.length} soluciones canónicas de Python (${pyTestCasesEvaluated} casos) aprobaron 100%.`);

  // ---------------------------------------------------------------------------
  // Resumen Final
  // ---------------------------------------------------------------------------
  console.log("\n===============================================================================");
  console.log(`=== RESULTADO FINAL: ${passedAssertions}/${totalAssertions} ASERCIONES APROBADAS (100% EXITOSO) ===`);
  console.log("===============================================================================\n");
}

runCurriculumSuite().catch((err) => {
  console.error("\n❌ ERROR EN LA SUITE DE VERIFICACIÓN DE CURRÍCULO:", err);
  process.exit(1);
});
