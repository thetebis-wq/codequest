import { useState, useEffect } from "react";
import { TrackId } from "@/types/exercise";

export interface InterviewAttempt {
  problemId: string;
  passed: boolean;
  timeSpentSeconds: number;
  date: string;
}

export interface UserProgress {
  completedExerciseIds: string[];
  totalXp: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  notes: Record<string, string>;
  interviewAttempts?: InterviewAttempt[];
  activeTrack: TrackId;
}

const STORAGE_KEY = "codequest_user_progress";
const EVENT_NAME = "codequest_progress_changed";

export const defaultProgress: UserProgress = {
  completedExerciseIds: [],
  totalXp: 0,
  streakDays: 1,
  lastActiveDate: "2026-01-01",
  notes: {},
  interviewAttempts: [],
  activeTrack: "python",
};

/**
 * Obtiene el progreso actual desde localStorage
 */
export function getUserProgress(): UserProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as UserProgress;
    const validTrack: TrackId =
      parsed.activeTrack === "cpp" || parsed.activeTrack === "python"
        ? parsed.activeTrack
        : "python";
    return {
      ...defaultProgress,
      ...parsed,
      activeTrack: validTrack,
      notes: parsed.notes || {},
      interviewAttempts: parsed.interviewAttempts || [],
    };
  } catch (e) {
    console.error("Error al leer progreso de localStorage:", e);
    return defaultProgress;
  }
}

/**
 * Guarda el progreso y notifica a los componentes reactivos
 */
function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: progress }));
  } catch (e) {
    console.error("Error al guardar progreso en localStorage:", e);
  }
}

/**
 * Marca un ejercicio como completado y añade XP si no había sido completado previamente
 */
export function completeExercise(exerciseId: string, xpReward: number): { isNew: boolean; currentXp: number } {
  const current = getUserProgress();

  if (current.completedExerciseIds.includes(exerciseId)) {
    return { isNew: false, currentXp: current.totalXp };
  }

  const updated: UserProgress = {
    ...current,
    completedExerciseIds: [...current.completedExerciseIds, exerciseId],
    totalXp: current.totalXp + xpReward,
    lastActiveDate: new Date().toISOString().split("T")[0],
  };

  saveProgress(updated);
  return { isNew: true, currentXp: updated.totalXp };
}

/**
 * Guarda o actualiza una nota metacognitiva para un ejercicio
 */
export function saveExerciseNote(exerciseId: string, note: string) {
  const current = getUserProgress();
  const updated: UserProgress = {
    ...current,
    notes: {
      ...current.notes,
      [exerciseId]: note,
    },
  };
  saveProgress(updated);
}

/**
 * Registra un intento en la arena de entrevistas
 */
export function recordInterviewAttempt(problemId: string, passed: boolean, timeSpentSeconds: number) {
  const current = getUserProgress();
  const attempt: InterviewAttempt = {
    problemId,
    passed,
    timeSpentSeconds,
    date: new Date().toISOString(),
  };

  const updated: UserProgress = {
    ...current,
    interviewAttempts: [attempt, ...(current.interviewAttempts || [])],
  };
  saveProgress(updated);
}

/**
 * Obtiene el track activo actual ("python" | "cpp")
 */
export function getActiveTrack(): TrackId {
  return getUserProgress().activeTrack;
}

/**
 * Establece el track activo y notifica a los componentes reactivos
 */
export function setActiveTrack(track: TrackId): void {
  const current = getUserProgress();
  if (current.activeTrack === track) return;
  const updated: UserProgress = {
    ...current,
    activeTrack: track,
  };
  saveProgress(updated);
}

/**
 * Exporta el progreso completo a una cadena JSON legible
 */
export function exportBackupJson(): string {
  const current = getUserProgress();
  return JSON.stringify(current, null, 2);
}

/**
 * Importa y restaura una copia de seguridad desde una cadena JSON
 */
export function importBackupJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString) as UserProgress;
    if (typeof parsed !== "object" || !Array.isArray(parsed.completedExerciseIds)) {
      throw new Error("Formato de copia de seguridad no válido");
    }

    const validTrack: TrackId =
      parsed.activeTrack === "cpp" || parsed.activeTrack === "python"
        ? parsed.activeTrack
        : "python";

    const validated: UserProgress = {
      completedExerciseIds: parsed.completedExerciseIds,
      totalXp: typeof parsed.totalXp === "number" ? parsed.totalXp : 0,
      streakDays: typeof parsed.streakDays === "number" ? parsed.streakDays : 1,
      lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split("T")[0],
      notes: parsed.notes || {},
      interviewAttempts: Array.isArray(parsed.interviewAttempts) ? parsed.interviewAttempts : [],
      activeTrack: validTrack,
    };

    saveProgress(validated);
    return true;
  } catch (e) {
    console.error("Fallo al importar respaldo:", e);
    return false;
  }
}

/**
 * Reinicia el progreso a los valores predeterminados
 */
export function resetProgress(): void {
  saveProgress(defaultProgress);
}

/**
 * Verifica si un ejercicio ya fue superado
 */
export function isExerciseCompleted(exerciseId: string): boolean {
  const current = getUserProgress();
  return current.completedExerciseIds.includes(exerciseId);
}

/**
 * Suscribe un callback a cambios de progreso en tiempo real
 */
export function subscribeToProgress(callback: (progress: UserProgress) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (event: Event) => {
    const custom = event as CustomEvent<UserProgress>;
    callback(custom.detail || getUserProgress());
  };

  window.addEventListener(EVENT_NAME, handler);
  // Llamada inicial
  callback(getUserProgress());

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
  };
}

/**
 * Hook reactivo para consumir el progreso del usuario de forma 100% segura contra SSR Hydration Mismatch
 */
export function useUserProgress(): {
  progress: UserProgress;
  isMounted: boolean;
  activeTrack: TrackId;
  setActiveTrack: (track: TrackId) => void;
} {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = subscribeToProgress((updated) => {
      setProgress(updated);
    });
    return () => unsubscribe();
  }, []);

  return {
    progress,
    isMounted,
    activeTrack: isMounted ? progress.activeTrack : "python",
    setActiveTrack,
  };
}
