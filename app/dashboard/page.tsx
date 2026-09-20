"use client";

import Link from "next/link";
import { useUserProgress } from "@/lib/storage/progressStore";
import { getExercisesByTrack } from "@/lib/exercises";

export default function DashboardPage() {
  const { progress, isMounted, activeTrack, setActiveTrack } = useUserProgress();
  const pyExercises = getExercisesByTrack("python");
  const cppExercises = getExercisesByTrack("cpp");

  const completedPyCount = isMounted
    ? pyExercises.filter((ex) => progress.completedExerciseIds.includes(ex.id)).length
    : 0;
  const completedCppCount = isMounted
    ? cppExercises.filter((ex) => progress.completedExerciseIds.includes(ex.id)).length
    : 0;

  const totalPy = pyExercises.length;
  const totalCpp = cppExercises.length;
  const pyPercentage = totalPy > 0 ? Math.round((completedPyCount / totalPy) * 100) : 0;
  const cppPercentage = totalCpp > 0 ? Math.round((completedCppCount / totalCpp) * 100) : 0;

  const totalTrackExercises = totalPy + totalCpp;
  const totalCompleted = completedPyCount + completedCppCount;
  const overallPercentage =
    totalTrackExercises > 0
      ? Math.round((totalCompleted / totalTrackExercises) * 100)
      : 0;

  const nextPyExercise =
    (isMounted && pyExercises.find((ex) => !progress.completedExerciseIds.includes(ex.id))) ||
    pyExercises[0];
  const nextCppExercise =
    (isMounted && cppExercises.find((ex) => !progress.completedExerciseIds.includes(ex.id))) ||
    cppExercises[0];

  const nextActiveExercise = activeTrack === "python" ? nextPyExercise : nextCppExercise;

  return (
    <div className="p-space-lg max-w-7xl mx-auto w-full flex flex-col gap-space-lg select-none">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-xl bg-surface-card border border-border-subtle p-space-lg lg:p-space-xl shadow-md">
        {/* Glow ambient effects */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-secondary tracking-widest uppercase font-semibold">
                Laboratorio de Programación Práctica
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-[11px] text-status-warning flex items-center gap-1 font-medium font-mono">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                Racha de {progress.streakDays} Día{progress.streakDays > 1 ? "s" : ""}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
              Bienvenido a CodeQuest Lab
            </h1>

            <p className="text-sm text-text-secondary leading-relaxed">
              Tu escuela de programación práctica desde cero. Domina Python 3.12 y C++ 20 mediante retos guiados con ejecución real WebAssembly y retroalimentación inmediata, sin soluciones pre-escritas ni atajos ficticios.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <Link
              href={`/lab/scratchpad?exercise=${nextActiveExercise.id}`}
              className="px-5 py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Continuar Aprendizaje: {nextActiveExercise.title}</span>
            </Link>
            <Link
              href="/curriculum"
              className="px-5 py-2.5 rounded-lg bg-surface-card-elevated hover:bg-surface-card-hover border border-border-subtle text-text-primary text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
              <span>Explorar Currículo Completo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row: Progreso Real y Maestría */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-[11px] text-text-muted font-mono uppercase">Dominio Global</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-primary font-mono">{overallPercentage}%</span>
            <span className="text-xs text-text-secondary font-mono">
              {totalCompleted} de {totalTrackExercises} retos
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-[11px] text-text-muted font-mono uppercase">Experiencia Acumulada</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-status-warning font-mono">{progress.totalXp} XP</span>
            <span className="text-xs text-text-secondary font-mono">
              {progress.completedExerciseIds.length} pruebas superadas
            </span>
          </div>
          <span className="text-[11px] text-text-muted">Obtenido por pruebas unitarias superadas genuinamente</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-[11px] text-text-muted font-mono uppercase">Racha de Estudio</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-tertiary font-mono">
              {progress.streakDays} Día{progress.streakDays > 1 ? "s" : ""}
            </span>
            <span className="text-xs text-status-success font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
              Al día
            </span>
          </div>
          <span className="text-[11px] text-text-muted">La constancia genera modelos mentales sólidos</span>
        </div>
      </div>

      {/* Dual Language Tracks Overview (Python 3.12 vs C++ 20) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {/* Python Track Card */}
        <div
          className={`p-space-lg rounded-xl bg-surface-card border transition-all flex flex-col justify-between gap-space-md shadow-sm group ${
            activeTrack === "python"
              ? "border-primary/60 ring-1 ring-primary/20 shadow-md"
              : "border-border-subtle hover:border-primary/40"
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <h2 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                  Track Python 3.12
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {activeTrack === "python" && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    ACTIVO
                  </span>
                )}
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                  9 Módulos • 30 Retos
                </span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Aprende a programar desde cero en Python: script y consola, variables y tipos dinámicos, operadores, condicionales, bucles for/while, funciones, colecciones (listas y diccionarios), POO con clases y librerías estándar.
            </p>

            <div className="mt-2 flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-text-muted">
                  Progreso: {completedPyCount} de {totalPy} retos
                </span>
                <span className="text-primary font-semibold">{pyPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${pyPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-text-muted min-w-0">
              <span className="font-semibold text-text-secondary shrink-0">Próximo:</span>
              <span className="text-text-primary font-medium truncate">{nextPyExercise.title}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeTrack !== "python" && (
                <button
                  type="button"
                  onClick={() => setActiveTrack("python")}
                  className="text-xs px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container-highest text-text-secondary transition-colors"
                >
                  Activar Track
                </button>
              )}
              <Link
                href={`/lab/scratchpad?exercise=${nextPyExercise.id}`}
                onClick={() => setActiveTrack("python")}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary-container/90 flex items-center gap-1 transition-all"
              >
                <span>Resolver</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* C++ Track Card */}
        <div
          className={`p-space-lg rounded-xl bg-surface-card border transition-all flex flex-col justify-between gap-space-md shadow-sm group ${
            activeTrack === "cpp"
              ? "border-secondary/60 ring-1 ring-secondary/20 shadow-md"
              : "border-border-subtle hover:border-secondary/40"
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                <h2 className="text-lg font-bold text-text-primary group-hover:text-secondary transition-colors">
                  Track C++ 20
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {activeTrack === "cpp" && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                    ACTIVO
                  </span>
                )}
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                  9 Módulos • 28 Retos
                </span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Domina la programación de sistemas desde cero en C++ 20: función main y cout, tipado estricto, aritmética, control de flujo, bucles, firmas de funciones, arreglos nativos y std::vector, clases con modificadores de acceso y STL.
            </p>

            <div className="mt-2 flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-text-muted">
                  Progreso: {completedCppCount} de {totalCpp} retos
                </span>
                <span className="text-secondary font-semibold">{cppPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${cppPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-text-muted min-w-0">
              <span className="font-semibold text-text-secondary shrink-0">Próximo:</span>
              <span className="text-text-primary font-medium truncate">{nextCppExercise.title}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeTrack !== "cpp" && (
                <button
                  type="button"
                  onClick={() => setActiveTrack("cpp")}
                  className="text-xs px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container-highest text-text-secondary transition-colors"
                >
                  Activar Track
                </button>
              )}
              <Link
                href={`/lab/scratchpad?exercise=${nextCppExercise.id}`}
                onClick={() => setActiveTrack("cpp")}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 flex items-center gap-1 transition-all"
              >
                <span>Resolver</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
