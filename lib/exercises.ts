import {
  TrackId,
  TrackModule,
  TrackLesson,
  TrackExercise,
  PedagogicalExercise,
} from "@/types/exercise";

import {
  pythonModules,
  pythonLessons,
  pythonExercises,
} from "@/content/curriculum/pythonTrack";

import {
  cppModules,
  cppLessons,
  cppExercises,
} from "@/content/curriculum/cppTrack";

export type UnifiedExercise = TrackExercise & PedagogicalExercise;

/**
 * Normaliza y enriquece un TrackExercise para garantizar 100% de compatibilidad
 * con componentes legados de UI que consumen starterCodes y solutionReferences
 * divididos por lenguaje (python / cpp).
 */
function enrichTrackExercise(ex: TrackExercise): UnifiedExercise {
  const isPython = ex.track === "python";
  const pythonStarter = isPython ? ex.starterCode : "# Este ejercicio pertenece al Track C++ 20.";
  const cppStarter = !isPython ? ex.starterCode : "// Este ejercicio pertenece al Track Python 3.12.";
  const pythonSolution = isPython ? ex.solutionReference : "";
  const cppSolution = !isPython ? ex.solutionReference : "";

  const derivedLevel =
    (ex as any).level ?? (isPython ? 10 + ex.moduleId - 1 : 20 + ex.moduleId - 1);

  return {
    ...ex,
    level: derivedLevel,
    starterCodes: {
      python: (ex as any).starterCodes?.python ?? pythonStarter,
      cpp: (ex as any).starterCodes?.cpp ?? cppStarter,
    },
    solutionReferences: {
      python: (ex as any).solutionReferences?.python ?? pythonSolution,
      cpp: (ex as any).solutionReferences?.cpp ?? cppSolution,
    },
    languageBridge: (ex as any).languageBridge ?? {
      pythonExplanation: isPython
        ? ex.theory?.explanation || ""
        : "Implementado con tipado dinámico y ejecución interpretada en Python.",
      cppExplanation: !isPython
        ? ex.theory?.explanation || ""
        : "Implementado con tipado estático y compilación nativa en C++.",
    },
    spec: {
      ...ex.spec,
      constraints: {
        inputRange: ex.spec.constraints?.inputRange ?? "Sin restricciones adicionales",
        timeLimitMs: ex.spec.constraints?.timeLimitMs ?? 5000,
        auxiliarySpace: ex.spec.constraints?.auxiliarySpace ?? "O(1)",
      },
    },
    theory: {
      ...ex.theory,
      mathematicalFoundation:
        (ex.theory as any).mathematicalFoundation ?? ex.theory.explanation ?? "",
      mentalModel: ex.theory.mentalModel ?? "",
      asymptoticComplexity: (ex.theory as any).asymptoticComplexity ?? {
        time: "O(1)",
        space: "O(1)",
        proofExplanation: "Operación en tiempo y espacio constante.",
      },
    },
  };
}

const enrichedPythonExercises: UnifiedExercise[] = pythonExercises.map(enrichTrackExercise);
const enrichedCppExercises: UnifiedExercise[] = cppExercises.map(enrichTrackExercise);

// Registro unificado: catálogo de los tracks modernos
const allUnifiedExercises: UnifiedExercise[] = [
  ...enrichedPythonExercises,
  ...enrichedCppExercises,
];

// ─────────────────────────────────────────────────────────────────────────────
// Track API Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene la lista de identificadores de tracks disponibles.
 */
export function getTracks(): TrackId[] {
  return ["python", "cpp"];
}

/**
 * Obtiene los módulos curriculares pertenecientes a un track específico.
 */
export function getModulesByTrack(track: TrackId): TrackModule[] {
  if (track === "python") return pythonModules;
  if (track === "cpp") return cppModules;
  return [];
}

/**
 * Obtiene las lecciones de un módulo dado dentro de un track.
 */
export function getLessonsByModule(track: TrackId, moduleId: number): TrackLesson[] {
  const lessons = track === "python" ? pythonLessons : cppLessons;
  return lessons.filter((l) => l.moduleId === moduleId);
}

/**
 * Obtiene todos los ejercicios pertenecientes a un track específico.
 */
export function getExercisesByTrack(track: TrackId): UnifiedExercise[] {
  return track === "python" ? enrichedPythonExercises : enrichedCppExercises;
}

/**
 * Obtiene todos los ejercicios asociados a una lección específica.
 */
export function getExercisesByLesson(lessonId: string): UnifiedExercise[] {
  return allUnifiedExercises.filter((e) => e.lessonId === lessonId);
}

/**
 * Busca un ejercicio por su ID único, soportando tanto nuevos tracks como legado y aliases.
 */
export function getExerciseById(id: string): UnifiedExercise | null {
  let found = allUnifiedExercises.find((ex) => ex.id === id);
  if (!found) {
    const match = id.match(/^(py|cpp)-m(\d+)-ex(\d+)/);
    if (match) {
      const aliasId = `${match[1]}-m${match[2]}-ex${match[3]}`;
      found = allUnifiedExercises.find((ex) => ex.id === aliasId);
    }
  }
  return found || null;
}

/**
 * Obtiene todos los ejercicios registrados en la plataforma (tracks y legado).
 */
export function getAllExercises(): UnifiedExercise[] {
  return allUnifiedExercises;
}

// ─────────────────────────────────────────────────────────────────────────────
// Backwards Compatibility Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filtra los ejercicios que pertenecen a un nivel pedagógico específico (compatibilidad hacia atrás).
 */
export function getExercisesByLevel(level: number): UnifiedExercise[] {
  return allUnifiedExercises.filter((ex) => ex.level === level);
}

/**
 * Obtiene ejercicios del Track Python (compatibilidad hacia atrás).
 */
export function getPythonTrackExercises(): UnifiedExercise[] {
  return enrichedPythonExercises;
}

/**
 * Obtiene ejercicios del Track C++ (compatibilidad hacia atrás).
 */
export function getCppTrackExercises(): UnifiedExercise[] {
  return enrichedCppExercises;
}

// Re-export curriculum definitions for convenience
export {
  pythonModules,
  pythonLessons,
  pythonExercises,
  cppModules,
  cppLessons,
  cppExercises,
};
