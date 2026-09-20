"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserProgress } from "@/lib/storage/progressStore";

interface InterviewProblem {
  id: string;
  title: string;
  topic: "Arreglos y Hash Maps" | "Punteros y Nodos" | "Estructuras de Pila" | "Sistemas y Caché";
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimitMinutes: number;
  timeLimitStr: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  keyChallenge: string;
}

const problems: InterviewProblem[] = [
  {
    id: "two-sum",
    title: "Suma de Dos Números (Two Sum)",
    topic: "Arreglos y Hash Maps",
    difficulty: "Easy",
    timeLimitMinutes: 15,
    timeLimitStr: "15 min",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Encuentra dos índices cuyos valores sumen el objetivo dado sin usar fuerza bruta cuadrática O(n²).",
    keyChallenge: "Uso de tabla hash para lookup en tiempo constante O(1) en Python (dict) y C++ (std::unordered_map).",
  },
  {
    id: "reverse-linked-list",
    title: "Inversión de Lista Enlazada In-Place",
    topic: "Punteros y Nodos",
    difficulty: "Medium",
    timeLimitMinutes: 25,
    timeLimitStr: "25 min",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Invierte una lista enlazada simple in-place mediante reasignación de punteros en C++ o referencias de objetos en Python.",
    keyChallenge: "Manejo riguroso de tres punteros (prev, curr, next) para no perder la referencia del nodo siguiente en memoria.",
  },
  {
    id: "valid-parentheses",
    title: "Validación de Paréntesis y Corchetes",
    topic: "Estructuras de Pila",
    difficulty: "Easy",
    timeLimitMinutes: 15,
    timeLimitStr: "15 min",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Verifica si una secuencia de símbolos está correctamente balanceada y anidada en orden LIFO.",
    keyChallenge: "Mapeo de pares de cierre a apertura y manejo del caso de subdesbordamiento de pila (pop en pila vacía).",
  },
  {
    id: "lru-cache",
    title: "Diseño de Caché LRU de Alta Frecuencia",
    topic: "Sistemas y Caché",
    difficulty: "Hard",
    timeLimitMinutes: 45,
    timeLimitStr: "45 min",
    timeComplexity: "O(1) get/put",
    spaceComplexity: "O(capacidad)",
    description: "Implementa una estructura Least Recently Used con operaciones get y put en tiempo estrictamente constante O(1).",
    keyChallenge: "Combinación de Hash Map para acceso O(1) con Lista Doblemente Enlazada para reordenar nodos en memoria sin costo de desplazamiento.",
  },
];

export default function InterviewPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Todas");
  const [activeTimerProblem, setActiveTimerProblem] = useState<InterviewProblem | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const { progress, isMounted } = useUserProgress();

  // Manejo del temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, secondsRemaining]);

  const startProblemTimer = (problem: InterviewProblem) => {
    setActiveTimerProblem(problem);
    setSecondsRemaining(problem.timeLimitMinutes * 60);
    setTimerRunning(true);
  };

  const startMockInterview = () => {
    setActiveTimerProblem(problems[0]);
    setSecondsRemaining(45 * 60); // 45 min simulacro
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setActiveTimerProblem(null);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredProblems = problems.filter((prob) => {
    const matchTopic = selectedTopic === "Todos" || prob.topic === selectedTopic;
    const matchDiff = selectedDifficulty === "Todas" || prob.difficulty === selectedDifficulty;
    return matchTopic && matchDiff;
  });

  return (
    <div className="p-space-lg max-w-7xl mx-auto w-full flex flex-col gap-space-lg select-none">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <span>Preparación Técnica</span>
            <span>•</span>
            <span className="text-secondary font-medium">Algoritmos & Sistemas</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Arena de Entrevistas Técnicas
          </h1>
          <p className="text-xs text-text-secondary max-w-2xl leading-relaxed">
            Problemas de evaluación técnica de compañías de ingeniería de software. Concéntrate en la complejidad Big-O, los casos de borde en memoria y la justificación algorítmica.
          </p>
        </div>

        <button
          onClick={startMockInterview}
          className="px-4 py-2.5 rounded-lg bg-secondary-container hover:brightness-110 text-on-secondary-container font-semibold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">timer</span>
          <span>Simulacro Completo (45m)</span>
        </button>
      </div>

      {/* Floating Timer Banner if active */}
      {activeTimerProblem && (
        <div className="p-4 rounded-xl bg-secondary-container/20 border border-secondary/40 flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-mono font-bold">
              <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-primary">
                Sesión Cronometrada: {activeTimerProblem.title}
              </span>
              <span className="text-[11px] text-text-secondary font-mono">
                {secondsRemaining > 0 ? "Tiempo Restante para la Solución" : "¡Tiempo Agotado!"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`text-2xl font-mono font-bold tracking-widest ${
                secondsRemaining < 300 ? "text-status-error animate-pulse" : "text-secondary"
              }`}
            >
              {formatTimer(secondsRemaining)}
            </span>

            <Link
              href={`/lab/scratchpad?exercise=py-cpp-lvl1-variable-swap`}
              className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold hover:brightness-110 transition-all flex items-center gap-1"
            >
              <span>Abrir en IDE</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>

            <button
              onClick={stopTimer}
              className="p-1.5 rounded-lg hover:bg-surface-container-high text-text-muted hover:text-text-primary transition-colors"
              title="Detener cronómetro"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-xl border border-border-subtle">
        {/* Topic Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-text-muted mr-1">Tema:</span>
          {["Todos", "Arreglos y Hash Maps", "Punteros y Nodos", "Estructuras de Pila", "Sistemas y Caché"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                selectedTopic === t
                  ? "bg-secondary-container text-on-secondary-container font-semibold shadow-sm"
                  : "bg-surface-container-high text-text-secondary hover:text-text-primary hover:bg-surface-container"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-text-muted mr-1">Nivel:</span>
          {["Todas", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                selectedDifficulty === d
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                  : "bg-surface-container-high text-text-secondary hover:text-text-primary"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {filteredProblems.map((prob) => (
          <div
            key={prob.id}
            className="p-space-lg rounded-xl bg-surface-card border border-border-subtle hover:border-secondary/40 transition-all flex flex-col justify-between gap-space-md shadow-sm group"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-secondary font-bold">
                    {prob.topic}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      prob.difficulty === "Easy"
                        ? "bg-status-success/15 text-status-success border border-status-success/30"
                        : prob.difficulty === "Medium"
                        ? "bg-status-warning/15 text-status-warning border border-status-warning/30"
                        : "bg-status-error/15 text-status-error border border-status-error/30"
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {prob.timeLimitStr}
                </span>
              </div>

              <h2 className="text-base font-bold text-text-primary group-hover:text-secondary transition-colors">
                {prob.title}
              </h2>

              <p className="text-xs text-text-secondary leading-relaxed">
                {prob.description}
              </p>

              {/* Reto clave y complejidad */}
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-border-subtle flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-text-muted">
                  <span>Complejidad Requerida:</span>
                  <span className="text-primary font-semibold">{prob.timeComplexity} tiempo | {prob.spaceComplexity} espacio</span>
                </div>
                <div className="text-[11px] text-text-secondary">
                  <strong className="text-text-primary">Foco de Evaluación:</strong> {prob.keyChallenge}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between">
              <button
                onClick={() => startProblemTimer(prob)}
                className="text-xs font-mono text-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                <span>Iniciar Cronometrado</span>
              </button>

              <Link
                href={`/lab/scratchpad?exercise=py-cpp-lvl1-variable-swap`}
                className="px-3.5 py-1.5 rounded-lg bg-surface-card-elevated hover:bg-surface-card-hover border border-border-subtle text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <span>Resolver en IDE</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
