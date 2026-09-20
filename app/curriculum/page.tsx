"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserProgress } from "@/lib/storage/progressStore";
import {
  getModulesByTrack,
  getLessonsByModule,
  getExerciseById,
  getExercisesByTrack,
} from "@/lib/exercises";
import { TrackId } from "@/types/exercise";

export default function CurriculumPage() {
  const { progress, isMounted, activeTrack, setActiveTrack } = useUserProgress();
  const [viewMode, setViewMode] = useState<"modules" | "graph">("modules");

  const modules = getModulesByTrack(activeTrack);
  const trackExercises = getExercisesByTrack(activeTrack);
  const totalTrackExercises = trackExercises.length;
  const completedTrackCount = isMounted
    ? trackExercises.filter((ex) => progress.completedExerciseIds.includes(ex.id)).length
    : 0;
  const trackPercentage =
    totalTrackExercises > 0
      ? Math.round((completedTrackCount / totalTrackExercises) * 100)
      : 0;

  // Determine module status
  const getModuleStatus = (moduleExercises: string[]) => {
    if (!isMounted || moduleExercises.length === 0) return "pending";
    const completedCount = moduleExercises.filter((id) =>
      progress.completedExerciseIds.includes(id)
    ).length;

    if (completedCount === moduleExercises.length) return "completed";
    if (completedCount > 0) return "in_progress";
    return "pending";
  };

  return (
    <div className="p-space-lg max-w-7xl mx-auto w-full flex flex-col gap-space-lg select-none">
      {/* Top Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <span>Currículo Pedagógico</span>
            <span>•</span>
            <span className="text-primary font-medium">9 Módulos desde Cero</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            {activeTrack === "python" ? "Track Python 3.12" : "Track C++ 20"}
          </h1>
          <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
            {activeTrack === "python"
              ? "Aprende a programar desde cero absoluto: sintaxis pura, estructuras de control, funciones, listas, diccionarios, POO y librerías estándar en CPython 3.12."
              : "Domina el modelo mental del hardware: funciones, memoria, tipado estricto, condicionales, bucles, std::vector, clases, punteros y STL en C++ 20."}
          </p>
        </div>

        {/* View Mode & Track Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-surface-container-high border border-border-subtle">
            <button
              onClick={() => setViewMode("modules")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "modules"
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              <span>Syllabus Completo</span>
            </button>
            <button
              onClick={() => setViewMode("graph")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "graph"
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">hub</span>
              <span>Ruta Modular</span>
            </button>
          </div>

          {/* Interactive Track Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-surface-container-high border border-border-subtle">
            <button
              onClick={() => setActiveTrack("python")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                activeTrack === "python"
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTrack === "python" ? "bg-primary animate-pulse" : "bg-primary/50"
                }`}
              ></span>
              <span>Python 3.12</span>
            </button>
            <button
              onClick={() => setActiveTrack("cpp")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                activeTrack === "cpp"
                  ? "bg-secondary-container text-on-secondary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTrack === "cpp" ? "bg-secondary animate-pulse" : "bg-secondary/50"
                }`}
              ></span>
              <span>C++ 20</span>
            </button>
          </div>
        </div>
      </div>

      {/* Track Progress Summary Bar */}
      <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm font-mono ${
              activeTrack === "python"
                ? "bg-primary-container/30 text-primary border border-primary/30"
                : "bg-secondary-container/30 text-secondary border border-secondary/30"
            }`}
          >
            {activeTrack === "python" ? "PY" : "C++"}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted font-mono uppercase">
              Progreso del Track {activeTrack === "python" ? "Python 3.12" : "C++ 20"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-text-primary">
                {completedTrackCount} de {totalTrackExercises} retos completados
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">
                {trackPercentage}%
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 flex flex-col gap-1">
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                activeTrack === "python" ? "bg-primary" : "bg-secondary"
              }`}
              style={{ width: `${trackPercentage}%` }}
            ></div>
          </div>
          <span className="text-[11px] text-text-muted text-right font-mono">
            {completedTrackCount === totalTrackExercises && totalTrackExercises > 0
              ? "¡Track completado al 100%!"
              : `${totalTrackExercises - completedTrackCount} retos pendientes`}
          </span>
        </div>
      </div>

      {/* VIEW 1: Syllabus Completo de los 9 Módulos */}
      {viewMode === "modules" && (
        <div className="flex flex-col gap-space-lg">
          {modules.map((mod) => {
            const lessons = getLessonsByModule(activeTrack, mod.id);
            const allExerciseIds = lessons.flatMap((l) => l.exerciseIds);
            const status = getModuleStatus(allExerciseIds);
            const isCompleted = status === "completed";
            const isInProgress = status === "in_progress";

            const modCompletedCount = isMounted
              ? allExerciseIds.filter((id) => progress.completedExerciseIds.includes(id)).length
              : 0;
            const modPercentage =
              allExerciseIds.length > 0
                ? Math.round((modCompletedCount / allExerciseIds.length) * 100)
                : 0;

            return (
              <div
                key={mod.id}
                className={`p-space-lg rounded-xl border transition-all flex flex-col gap-space-md ${
                  isCompleted
                    ? "bg-surface-card border-status-success/40 shadow-sm"
                    : isInProgress
                    ? "bg-surface-card border-primary/50 shadow-md ring-1 ring-primary/20"
                    : "bg-surface-card border-border-subtle"
                }`}
              >
                {/* Module Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="flex items-start gap-space-md max-w-3xl">
                    <div
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 font-mono font-bold border ${
                        isCompleted
                          ? "bg-status-success/20 border-status-success text-status-success"
                          : isInProgress
                          ? "bg-primary-container/20 border-primary text-primary"
                          : "bg-surface-container-high border-border-subtle text-text-muted"
                      }`}
                    >
                      <span className="text-[9px] uppercase">MÓD</span>
                      <span className="text-base">{mod.id}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-text-primary tracking-tight">
                          {mod.title}
                        </h2>
                        <span className="text-xs text-text-muted hidden sm:inline">•</span>
                        <span className="text-xs text-text-secondary hidden sm:inline">
                          {mod.subtitle}
                        </span>
                      </div>

                      <p className="text-xs text-text-secondary leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {mod.concepts.map((concept) => (
                          <span
                            key={concept}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high border border-border-subtle text-text-secondary"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Module Status & Progress */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success/20 border border-status-success/40 text-status-success text-xs font-semibold font-mono">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Dominado ✓</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/20 border border-primary/40 text-primary text-xs font-semibold font-mono">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span>En Curso ({modCompletedCount}/{allExerciseIds.length})</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-border-subtle text-text-muted text-xs font-mono">
                        <span className="material-symbols-outlined text-[14px]">radio_button_unchecked</span>
                        <span>Por Iniciar ({allExerciseIds.length} retos)</span>
                      </span>
                    )}

                    <div className="w-32 hidden sm:flex flex-col gap-1">
                      <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? "bg-status-success" : "bg-primary"
                          }`}
                          style={{ width: `${modPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-text-muted text-right font-mono">
                        {modCompletedCount} de {allExerciseIds.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lessons breakdown inside Module */}
                <div className="pt-space-md border-t border-border-subtle/50 flex flex-col gap-space-md">
                  {lessons.map((lesson) => {
                    return (
                      <div
                        key={lesson.id}
                        className="p-space-md rounded-xl bg-surface-container-lowest/60 border border-border-subtle/60 flex flex-col gap-space-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            <h3 className="text-sm font-bold text-text-primary">
                              {lesson.title}
                            </h3>
                            <span className="text-xs text-text-muted hidden sm:inline">—</span>
                            <span className="text-xs text-text-secondary hidden sm:inline">
                              {lesson.subtitle}
                            </span>
                          </div>
                          <span className="text-[11px] text-text-muted font-mono">
                            {lesson.exerciseIds.length} ejercicios prácticos
                          </span>
                        </div>

                        {lesson.description && (
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {lesson.description}
                          </p>
                        )}

                        {/* Exercise Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                          {lesson.exerciseIds.map((exId) => {
                            const ex = getExerciseById(exId);
                            if (!ex) return null;
                            const exDone =
                              isMounted && progress.completedExerciseIds.includes(ex.id);

                            return (
                              <Link
                                key={ex.id}
                                href={`/lab/scratchpad?exercise=${ex.id}`}
                                className={`p-3 rounded-lg border transition-all flex flex-col justify-between gap-2.5 group ${
                                  exDone
                                    ? "bg-status-success/5 border-status-success/25 hover:border-status-success/50"
                                    : "bg-surface-card border-border-subtle hover:border-primary/50 hover:shadow-sm"
                                }`}
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span
                                      className={`text-xs font-semibold group-hover:text-primary transition-colors line-clamp-1 ${
                                        exDone ? "text-status-success" : "text-text-primary"
                                      }`}
                                    >
                                      {ex.title}
                                    </span>
                                    {exDone && (
                                      <span className="material-symbols-outlined text-status-success text-[16px] shrink-0">
                                        check_circle
                                      </span>
                                    )}
                                  </div>

                                  <span className="text-[11px] text-text-muted line-clamp-2">
                                    {ex.subtitle}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-border-subtle/40 text-[11px] font-mono">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                        ex.difficulty === "Fundamento"
                                          ? "bg-status-success/15 text-status-success border border-status-success/30"
                                          : ex.difficulty === "Intermedio"
                                          ? "bg-status-warning/15 text-status-warning border border-status-warning/30"
                                          : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                      }`}
                                    >
                                      {ex.difficulty}
                                    </span>
                                    <span className="text-text-muted">+{ex.xpReward} XP</span>
                                  </div>

                                  <span className="text-primary font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                    <span>{exDone ? "Repasar" : "Resolver"}</span>
                                    <span className="material-symbols-outlined text-[14px]">
                                      arrow_forward
                                    </span>
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Ruta Modular y Flujo Secuencial (Graph) */}
      {viewMode === "graph" && (
        <div className="p-space-lg rounded-xl bg-surface-card border border-border-subtle flex flex-col items-center gap-space-lg py-10 relative overflow-hidden">
          <div className="text-center max-w-md flex flex-col gap-1">
            <h3 className="text-base font-bold text-text-primary">
              Ruta Secuencial de Aprendizaje ({activeTrack === "python" ? "Python 3.12" : "C++ 20"})
            </h3>
            <p className="text-xs text-text-secondary">
              Progresión pedagógica en 9 módulos estructurados para construir modelos mentales sólidos desde cero.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
            {modules.map((mod, index) => {
              const lessons = getLessonsByModule(activeTrack, mod.id);
              const allExerciseIds = lessons.flatMap((l) => l.exerciseIds);
              const status = getModuleStatus(allExerciseIds);
              const isCompleted = status === "completed";
              const isInProgress = status === "in_progress";
              const firstExId = allExerciseIds[0] || "";

              return (
                <div key={mod.id} className="w-full flex flex-col items-center">
                  <div
                    className={`w-full p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                      isCompleted
                        ? "bg-status-success/10 border-status-success/40 text-text-primary shadow-sm"
                        : isInProgress
                        ? "bg-surface-card border-primary ring-2 ring-primary/20 shadow-md"
                        : "bg-surface-container-lowest border-border-subtle text-text-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                          isCompleted
                            ? "bg-status-success text-black font-extrabold"
                            : isInProgress
                            ? "bg-primary-container text-on-primary-container"
                            : "bg-surface-container-high text-text-muted"
                        }`}
                      >
                        {mod.id}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-text-primary truncate">
                          {mod.title}
                        </span>
                        <span className="text-[11px] text-text-secondary truncate">
                          {mod.subtitle}
                        </span>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {mod.concepts.slice(0, 3).map((c) => (
                            <span
                              key={c}
                              className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface-container-high text-text-secondary"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/lab/scratchpad?exercise=${firstExId}`}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-all ${
                          isCompleted
                            ? "bg-surface-container-high hover:bg-surface-container-highest text-text-primary"
                            : "bg-primary-container hover:bg-primary-container/90 text-on-primary-container"
                        }`}
                      >
                        <span>{isCompleted ? "Repasar" : "Entrar"}</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>

                  {/* Flow connector */}
                  {index < modules.length - 1 && (
                    <div className="flex flex-col items-center my-1">
                      <div
                        className={`w-0.5 h-5 ${
                          isCompleted ? "bg-status-success" : "bg-border-subtle"
                        }`}
                      ></div>
                      <span
                        className={`material-symbols-outlined text-[16px] -mt-1 ${
                          isCompleted ? "text-status-success" : "text-text-muted"
                        }`}
                      >
                        keyboard_arrow_down
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
