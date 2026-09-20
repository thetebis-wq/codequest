"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  useUserProgress,
  saveExerciseNote,
} from "@/lib/storage/progressStore";
import { getAllExercises } from "@/lib/exercises";

interface Pitfall {
  id: string;
  title: string;
  category: string;
  description: string;
  howToAvoid: string;
  severity: "Alto" | "Medio" | "Crítico";
}

const COMMON_PITFALLS: Pitfall[] = [
  {
    id: "destructive-overwrite",
    title: "Sobreescritura Destructiva en Memoria",
    category: "Gestión de Variables",
    description: "Hacer 'a = b' y luego 'b = a'. El valor original de 'a' es reemplazado de inmediato y se pierde para siempre.",
    howToAvoid: "Usa una variable temporal ('temp = a'), la sintaxis atómica de Python ('a, b = b, a') o 'std::swap' en C++.",
    severity: "Crítico",
  },
  {
    id: "float-equality",
    title: "Comparación Directa de Flotantes (IEEE 754)",
    category: "Aritmética de Hardware",
    description: "Comparar '0.1 + 0.2 == 0.3'. En binario, los decimales no siempre tienen representación finita, produciendo 0.30000000000000004.",
    howToAvoid: "Usa una cota de tolerancia épsilon: 'abs(resultado - esperado) < 1e-9' o 'std::abs(a - b) < std::numeric_limits<double>::epsilon()'.",
    severity: "Alto",
  },
  {
    id: "pass-by-value-mutation",
    title: "Paso por Valor Esperando Mutación en C++",
    category: "Stack Frames",
    description: "Pasar 'void modificar(int a)' y esperar que la variable en main() cambie. La función recibe una copia efímera en su propio Stack Frame.",
    howToAvoid: "Declara el parámetro explícitamente como referencia ('int& a') o pasa un puntero ('int* a').",
    severity: "Crítico",
  },
  {
    id: "pyobject-heap-assumption",
    title: "Asumir Memoria Contigua en Tipos Dinámicos",
    category: "Arquitectura CPython",
    description: "Creer que una lista de Python almacena los enteros contiguos en memoria física como un array de C++.",
    howToAvoid: "Recuerda que una lista de Python es un array de punteros a 'PyObject' dispersos en el Heap. Para contigüidad pura usa array / NumPy en Python o 'std::vector' en C++.",
    severity: "Medio",
  },
];

export default function AnalyticsPage() {
  const { progress, isMounted } = useUserProgress();
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("py-cpp-lvl1-variable-swap");
  const [currentNoteText, setCurrentNoteText] = useState<string>("");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const exercises = getAllExercises();

  useEffect(() => {
    if (isMounted && progress.notes[selectedExerciseId]) {
      setCurrentNoteText(progress.notes[selectedExerciseId]);
    }
  }, [selectedExerciseId, isMounted, progress.notes]);

  const handleSaveNote = () => {
    saveExerciseNote(selectedExerciseId, currentNoteText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSelectExercise = (id: string) => {
    setSelectedExerciseId(id);
    setCurrentNoteText(progress.notes[id] || "");
  };

  const totalExercises = exercises.length;
  const completedCount = isMounted ? progress.completedExerciseIds.length : 0;
  const notesCount = isMounted
    ? Object.keys(progress.notes || {}).filter((k) => progress.notes[k]?.trim()).length
    : 0;

  return (
    <div className="p-space-lg max-w-7xl mx-auto w-full flex flex-col gap-space-lg select-none">
      {/* Header */}
      <div className="flex flex-col gap-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
        <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
          <span>Metacognición & Analítica</span>
          <span>•</span>
          <span className="text-primary font-medium">Reflexión del Aprendizaje</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Historial y Analítica de Código
        </h1>
        <p className="text-xs text-text-secondary max-w-2xl leading-relaxed">
          El aprendizaje duradero ocurre cuando reflexionamos sobre el código escrito y los modelos mentales aprendidos. Registra tus notas, consulta patrones de error y analiza tu avance conceptual.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-xs text-text-muted font-mono uppercase">Retos Dominados</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-primary font-mono">{completedCount}</span>
            <span className="text-xs text-text-muted font-mono">de {totalExercises}</span>
          </div>
          <span className="text-[11px] text-text-secondary">Pruebas unitarias verificadas</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-xs text-text-muted font-mono uppercase">Experiencia Total</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-status-warning font-mono">{progress.totalXp} XP</span>
          </div>
          <span className="text-[11px] text-text-secondary">Puntos de maestría acumulados</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-xs text-text-muted font-mono uppercase">Racha de Estudio</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-secondary font-mono">{progress.streakDays} Día{progress.streakDays > 1 ? "s" : ""}</span>
          </div>
          <span className="text-[11px] text-status-success font-medium">Hábito activo y constante</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-card border border-border-subtle flex flex-col gap-1 shadow-sm">
          <span className="text-xs text-text-muted font-mono uppercase">Notas Metacognitivas</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-primary font-mono">{notesCount}</span>
          </div>
          <span className="text-[11px] text-text-secondary">Reflexiones registradas</span>
        </div>
      </div>

      {/* Two Column Layout: Cuaderno Metacognitivo & Radar de Errores Comunes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Cuaderno Metacognitivo de Notas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">edit_note</span>
                <span>Cuaderno Metacognitivo Personal</span>
              </h2>
              <span className="text-xs text-text-secondary">
                Anota lo que aprendiste de la máquina para afianzar el modelo mental.
              </span>
            </div>

            {savedSuccess && (
              <span className="text-[11px] font-mono text-status-success bg-status-success/15 border border-status-success/30 px-2.5 py-1 rounded-md animate-pulse">
                Nota guardada ✓
              </span>
            )}
          </div>

          {/* Selector de ejercicio para la nota */}
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="text-xs font-mono text-text-muted uppercase">
              Ejercicio a reflexionar:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExercise(ex.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                    selectedExerciseId === ex.id
                      ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                      : "bg-surface-container-high hover:bg-surface-container text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span>{ex.title}</span>
                  {isMounted && progress.notes[ex.id]?.trim() && (
                    <span className="ml-1.5 text-[10px] opacity-75">📝</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Editor de nota */}
          <div className="flex flex-col gap-2 pt-2">
            <textarea
              rows={6}
              value={currentNoteText}
              onChange={(e) => setCurrentNoteText(e.target.value)}
              placeholder="Ejemplo: En el intercambio de variables, aprendí que en Python la tupla se empaqueta en la pila de evaluación temporal antes de reasignar los punteros, mientras que en C++ se requiere paso por referencia (int&) para no mutar una copia en el stack..."
              className="bg-surface-container-lowest border border-border-subtle rounded-xl p-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-text-muted font-mono">
                Se guarda en localStorage localmente.
              </span>

              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Guardar Reflexión</span>
              </button>
            </div>
          </div>

          {/* Historial de Notas Guardadas */}
          <div className="flex flex-col gap-2 pt-4 border-t border-border-subtle/50">
            <span className="text-xs font-bold text-text-primary uppercase tracking-wide font-mono">
              Tus Notas Registradas:
            </span>

            {!isMounted || Object.keys(progress.notes || {}).length === 0 ? (
              <span className="text-xs text-text-muted italic">
                Aún no has registrado ninguna nota. Selecciona un ejercicio arriba y guarda tu primer aprendizaje.
              </span>
            ) : (
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {Object.entries(progress.notes).map(([exId, note]) => {
                  if (!note?.trim()) return null;
                  const exerciseObj = exercises.find((e) => e.id === exId);
                  return (
                    <div
                      key={exId}
                      className="p-3 rounded-lg bg-surface-container-low border border-border-subtle flex flex-col gap-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">
                          {exerciseObj?.title || exId}
                        </span>
                        <Link
                          href={`/lab/scratchpad?exercise=${exId}`}
                          className="text-[11px] text-text-muted hover:text-text-primary flex items-center gap-0.5"
                        >
                          <span>Revisar reto</span>
                          <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                        </Link>
                      </div>
                      <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {note}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Radar de Errores y Antipatrones Clásicos (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-status-warning">warning</span>
              <span>Radar de Antipatrones de Memoria</span>
            </h2>
            <span className="text-xs text-text-secondary">
              Errores de ingeniería de software comunes en entrevistas y proyectos de sistemas.
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {COMMON_PITFALLS.map((pitfall) => (
              <div
                key={pitfall.id}
                className="p-3.5 rounded-xl bg-surface-container-low border border-border-subtle flex flex-col gap-2 transition-all hover:border-status-warning/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary">
                    {pitfall.title}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      pitfall.severity === "Crítico"
                        ? "bg-status-error/20 text-status-error border border-status-error/30"
                        : "bg-status-warning/20 text-status-warning border border-status-warning/30"
                    }`}
                  >
                    {pitfall.severity}
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {pitfall.description}
                </p>

                <div className="p-2 rounded bg-surface-container-lowest border border-border-subtle/60 text-[11px] text-text-muted">
                  <strong className="text-primary font-medium">Cómo evitarlo: </strong>
                  {pitfall.howToAvoid}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
