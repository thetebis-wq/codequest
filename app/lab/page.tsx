import Link from "next/link";
import { getAllExercises } from "@/lib/exercises";

export default function LabIndexPage() {
  const exercises = getAllExercises();

  return (
    <div className="p-space-lg max-w-7xl mx-auto w-full flex flex-col gap-space-lg select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <span>Laboratorio IDE</span>
            <span>•</span>
            <span className="text-primary font-medium">Catálogo de Prácticas Pedagógicas</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Laboratorio de Ejercicios y Sandboxes
          </h1>
          <p className="text-xs text-text-secondary max-w-xl">
            Cada ejercicio está diseñado bajo primeros principios: teoría matemática profunda, modelo mental de la memoria y andamiaje contrastivo entre Python y C++.
          </p>
        </div>

        <Link
          href="/lab/scratchpad"
          className="px-4 py-2.5 rounded-lg bg-surface-card-elevated hover:bg-surface-card-hover border border-border-subtle text-text-primary text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          <span>Editor Libre (Scratchpad)</span>
        </Link>
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {exercises.map((ex) => (
          <div
            key={ex.id}
            className="p-space-lg rounded-xl bg-surface-card border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between gap-space-md shadow-sm group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary-container/20 text-primary font-bold uppercase border border-primary/30">
                  Nivel {ex.level} • {ex.difficulty}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                  +{ex.xpReward} XP
                </span>
              </div>

              <h2 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                {ex.title}
              </h2>

              <p className="text-xs text-text-secondary leading-relaxed">
                {ex.spec.summary}
              </p>

              {/* Objetivos de Aprendizaje rápidos */}
              <div className="flex flex-col gap-1 pt-1 border-t border-border-subtle/50">
                <span className="text-[10px] font-mono text-text-muted uppercase">
                  Objetivo Central:
                </span>
                <span className="text-xs text-text-primary font-medium">
                  {ex.spec.learningObjectives[0]}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between">
              <span className="text-xs text-text-muted font-mono">
                {ex.testCases.length} Casos de Prueba
              </span>
              <Link
                href={`/lab/scratchpad?exercise=${ex.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <span>Abrir en Lab</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
