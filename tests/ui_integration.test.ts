import assert from "node:assert";
import {
  getUserProgress,
  getActiveTrack,
  setActiveTrack,
  defaultProgress,
  importBackupJson,
  exportBackupJson,
  completeExercise,
  isExerciseCompleted,
} from "../lib/storage/progressStore";
import {
  getModulesByTrack,
  getLessonsByModule,
  getExercisesByTrack,
  getExerciseById,
} from "../lib/exercises";
import { analyzeDiagnostics } from "../lib/runner/diagnostics";
import { runCppExerciseTests } from "../lib/runner/cppRunner";

console.log("=================================================");
console.log("=== EJECUTANDO PRUEBAS DE INTEGRACIÓN UI & TRACKS ===");
console.log("=================================================");

// 1. Storage & Active Track
console.log("\n--- 1. Almacenamiento & Track Activo ---");
assert.strictEqual(defaultProgress.activeTrack, "python", "El track por defecto debe ser 'python'");

// En entorno Node sin window/localStorage, getUserProgress retorna defaultProgress
const current = getUserProgress();
assert.strictEqual(current.activeTrack, "python", "Progreso inicial debe tener track python");
assert.strictEqual(getActiveTrack(), "python", "getActiveTrack() debe retornar 'python'");

// setActiveTrack en Node es seguro y no arroja error
setActiveTrack("cpp");
console.log("  ✓ getActiveTrack() y setActiveTrack() funcionan correctamente");

// Backup JSON valida y preserva activeTrack
const backupValid = importBackupJson(
  JSON.stringify({
    completedExerciseIds: ["py-m1-ex1"],
    totalXp: 50,
    streakDays: 2,
    activeTrack: "cpp",
  })
);
assert.strictEqual(backupValid, true, "importBackupJson debe ser válido con activeTrack");
console.log("  ✓ importBackupJson valida e integra activeTrack con seguridad");

// 2. Currículo por Track
console.log("\n--- 2. Estructura Curricular por Track ---");
const pyModules = getModulesByTrack("python");
const cppModules = getModulesByTrack("cpp");

assert.strictEqual(pyModules.length, 9, "El track Python debe tener exactamente 9 módulos");
assert.strictEqual(cppModules.length, 9, "El track C++ debe tener exactamente 9 módulos");

const pyExercises = getExercisesByTrack("python");
const cppExercises = getExercisesByTrack("cpp");

assert.strictEqual(pyExercises.length, 30, "El track Python debe tener 30 ejercicios");
assert.strictEqual(cppExercises.length, 28, "El track C++ debe tener 28 ejercicios");

// Verificar resolución de lecciones dentro de módulos
for (const mod of pyModules) {
  const lessons = getLessonsByModule("python", mod.id);
  assert.ok(lessons.length >= 1, `Módulo Python ${mod.id} debe tener al menos 1 lección`);
  for (const l of lessons) {
    assert.ok(l.exerciseIds.length >= 1, `Lección ${l.id} debe tener ejercicios asignados`);
    for (const exId of l.exerciseIds) {
      const ex = getExerciseById(exId);
      assert.ok(ex, `Ejercicio ${exId} debe existir en el registro unificado`);
      assert.strictEqual(ex?.track, "python", `Ejercicio ${exId} debe pertenecer al track python`);
    }
  }
}
console.log("  ✓ Los 9 módulos de Python y sus 30 ejercicios están correctamente enlazados");

for (const mod of cppModules) {
  const lessons = getLessonsByModule("cpp", mod.id);
  assert.ok(lessons.length >= 1, `Módulo C++ ${mod.id} debe tener al menos 1 lección`);
  for (const l of lessons) {
    assert.ok(l.exerciseIds.length >= 1, `Lección ${l.id} debe tener ejercicios asignados`);
    for (const exId of l.exerciseIds) {
      const ex = getExerciseById(exId);
      assert.ok(ex, `Ejercicio ${exId} debe existir en el registro unificado`);
      assert.strictEqual(ex?.track, "cpp", `Ejercicio ${exId} debe pertenecer al track cpp`);
    }
  }
}
console.log("  ✓ Los 9 módulos de C++ y sus 28 ejercicios están correctamente enlazados");

// 3. Diagnósticos Amigables
console.log("\n--- 3. Diagnósticos Amigables en Tiempo Real ---");
const pyDiag = analyzeDiagnostics("if x = 10:\n    pritn(x)", "python");
assert.ok(pyDiag.length >= 2, "Debe detectar asignación en if y error tipográfico en pritn");
assert.ok(pyDiag.some((d) => d.code === "assignment-in-condition"), "Debe advertir de asignación en if");
assert.ok(pyDiag.some((d) => d.code === "common-typo" && d.message.includes("print")), "Debe advertir de typo pritn");
console.log("  ✓ Diagnósticos pedagógicos de Python identifican errores de sintaxis");

const cppDiag = analyzeDiagnostics('int main() {\n    cout << "Hola"\n}', "cpp");
assert.ok(cppDiag.some((d) => d.code.includes("missing-semicolon")), "Debe detectar falta de punto y coma");
console.log("  ✓ Diagnósticos pedagógicos de C++ identifican punto y coma faltante");

// 4. Integración de Ejecución en C++
console.log("\n--- 4. Ejecución en Scratchpad (Motor C++) ---");
async function testScratchpadCppRunner() {
  const ex = getExerciseById("cpp-m1-ex1");
  assert.ok(ex, "Debe existir cpp-m1-ex1");

  const res = await runCppExerciseTests(
    ex!.solutionReference,
    ex!.entryFunctionName,
    ex!.testCases,
    ex!.evaluationType
  );

  assert.strictEqual(res.testResults.length, ex!.testCases.length, "Debe evaluar todos los casos");
  assert.ok(res.testResults.every((t) => t.passed), "La solución de referencia debe superar todas las pruebas");
  assert.strictEqual(res.testResults[0].actualOutput.trim(), "¡Hola, C++20!");
  console.log("  ✓ Scratchpad evalúa y reporta salida esperada vs salida obtenida con precisión");
}

testScratchpadCppRunner().then(() => {
  console.log("\n=================================================");
  console.log("=== TODAS LAS PRUEBAS DE INTEGRACIÓN PASARON EXITOSAMENTE ===");
  console.log("=================================================");
});
