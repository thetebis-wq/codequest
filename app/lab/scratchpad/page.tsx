"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getExerciseById, getAllExercises, getExercisesByTrack } from "@/lib/exercises";
import { UnifiedExercise } from "@/lib/exercises";
import MonacoCodeEditor from "@/components/lab/MonacoCodeEditor";
import ConsoleAndTestPanel from "@/components/lab/ConsoleAndTestPanel";
import SocraticTutorDrawer from "@/components/lab/SocraticTutorDrawer";
import { runPythonExerciseTests } from "@/lib/runner/pyodideRunner";
import { runCppExerciseTests } from "@/lib/runner/cppRunner";
import { analyzeDiagnostics, DiagnosticItem } from "@/lib/runner/diagnostics";
import { completeExercise, isExerciseCompleted } from "@/lib/storage/progressStore";

function ScratchpadContent() {
  const searchParams = useSearchParams();
  const exerciseId = searchParams.get("exercise") || "py-m1-ex1";

  const exercise = useMemo<UnifiedExercise>(() => {
    const found = getExerciseById(exerciseId);
    return found || getAllExercises()[0];
  }, [exerciseId]);

  const exerciseTrack = exercise.track || "python";

  // List of exercises in the same track for sequential navigation
  const trackExercises = useMemo(() => {
    return getExercisesByTrack(exerciseTrack);
  }, [exerciseTrack]);

  const currentIndex = useMemo(() => {
    return trackExercises.findIndex((ex) => ex.id === exercise.id);
  }, [trackExercises, exercise.id]);

  const prevExercise = currentIndex > 0 ? trackExercises[currentIndex - 1] : null;
  const nextExercise =
    currentIndex >= 0 && currentIndex < trackExercises.length - 1
      ? trackExercises[currentIndex + 1]
      : null;

  const [activeTab, setActiveTab] = useState<"spec" | "theory" | "diagnostics" | "hints">("spec");
  const [activeFile, setActiveFile] = useState<"python" | "cpp">(
    exerciseTrack === "cpp" ? "cpp" : "python"
  );
  const [panelTab, setPanelTab] = useState<"console" | "tests" | "diagnostics" | "split">("split");

  const [pythonCode, setPythonCode] = useState<string>(
    exercise.starterCodes?.python || exercise.starterCode || ""
  );
  const [cppCode, setCppCode] = useState<string>(
    exercise.starterCodes?.cpp || exercise.starterCode || ""
  );

  const [consoleOutput, setConsoleOutput] = useState<string>(
    "Presiona 'Ejecutar' para compilar e interpretar tu código en tiempo real..."
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<
    Array<{
      id: string;
      passed: boolean;
      actualOutput: string;
      input?: string;
      expectedOutput?: string;
      error?: string;
    }>
  >([]);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [completedNotification, setCompletedNotification] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // Sincronizar estado al cambiar de ejercicio
  useEffect(() => {
    const current = getExerciseById(exerciseId) || getAllExercises()[0];
    const track = current.track || "python";
    setActiveFile(track === "cpp" ? "cpp" : "python");
    setPythonCode(current.starterCodes?.python || current.starterCode || "");
    setCppCode(current.starterCodes?.cpp || current.starterCode || "");
    setConsoleOutput("Presiona 'Ejecutar' para evaluar tu solución...");
    setTestResults([]);
    setIsCompleted(isExerciseCompleted(current.id));
    setCompletedNotification(null);
    setLastError(null);
  }, [exerciseId]);

  // Diagnósticos estáticos en tiempo real del código actual
  const currentCode = activeFile === "python" ? pythonCode : cppCode;
  const diagnostics = useMemo<DiagnosticItem[]>(() => {
    return analyzeDiagnostics(currentCode, activeFile);
  }, [currentCode, activeFile]);

  const errorDiagnosticsCount = diagnostics.filter((d) => d.severity === "error").length;
  const warningDiagnosticsCount = diagnostics.filter((d) => d.severity === "warning").length;

  const handleComplete = () => {
    const { isNew, currentXp } = completeExercise(exercise.id, exercise.xpReward);
    setIsCompleted(true);
    if (isNew) {
      setCompletedNotification(`¡Reto Superado! +${exercise.xpReward} XP registrados. Total: ${currentXp} XP`);
    } else {
      setCompletedNotification(`Ejercicio repasado con éxito. Total XP: ${currentXp}`);
    }
    setTimeout(() => setCompletedNotification(null), 4000);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setLastError(null);

    if (activeFile === "python") {
      setConsoleOutput("Iniciando motor CPython 3.12 (WebAssembly)...");

      try {
        const evalResponse = await runPythonExerciseTests(
          pythonCode,
          exercise.entryFunctionName,
          exercise.testCases,
          (status) => setConsoleOutput(status),
          exercise.evaluationType,
          exercise.targetVariable
        );

        if (evalResponse.syntaxError) {
          setConsoleOutput(`[Error de Ejecución o Sintaxis en Python 3.12]:\n${evalResponse.syntaxError}`);
          setLastError(evalResponse.syntaxError);
          setTestResults(evalResponse.testResults);
          setPanelTab("split");
          setIsRunning(false);
          return;
        }

        let log = `[CPython 3.12 (WebAssembly) - Tiempo de ejecución: ${evalResponse.executionTimeMs}ms]\n`;
        if (evalResponse.stdout) {
          log += `\n--- Salida Estándar (stdout) ---\n${evalResponse.stdout}\n`;
        }
        if (evalResponse.stderr) {
          log += `\n--- Alertas (stderr) ---\n${evalResponse.stderr}\n`;
        }

        const passedCount = evalResponse.testResults.filter((t) => t.passed).length;
        const totalCount = evalResponse.testResults.length;
        log += `\n[Evaluación de Pruebas Unitarias: ${passedCount}/${totalCount} superadas]`;

        setTestResults(evalResponse.testResults);
        setConsoleOutput(log);
        setPanelTab("split");

        const firstFail = evalResponse.testResults.find((t) => !t.passed);
        if (firstFail) {
          setLastError(
            `Fallo en Prueba '${firstFail.id}':\nEntrada: ${firstFail.input}\nEsperado: ${firstFail.expectedOutput}\nObtenido: ${firstFail.actualOutput}`
          );
        } else if (passedCount === totalCount && totalCount > 0) {
          handleComplete();
        }
      } catch (err: any) {
        setConsoleOutput(`[Error Inesperado en Pyodide]:\n${err?.message || err}`);
        setLastError(String(err));
      }
    } else {
      // Motor de Ejecución Real C++ 20
      setConsoleOutput("Compilando y ejecutando con motor C++ 20...");

      try {
        const evalResponse = await runCppExerciseTests(
          cppCode,
          exercise.entryFunctionName,
          exercise.testCases,
          exercise.evaluationType,
          exercise.targetVariable
        );

        if (evalResponse.compilationError) {
          setConsoleOutput(`[Error de Compilación GCC C++20]:\n${evalResponse.compilationError}`);
          setLastError(evalResponse.compilationError);
          setTestResults(evalResponse.testResults);
          setPanelTab("split");
          setIsRunning(false);
          return;
        }

        let log = `[Compilación Nativa GCC - C++20 - Tiempo de ejecución: ${evalResponse.executionTimeMs}ms]\n`;
        if (evalResponse.stdout) {
          log += `\n--- Salida Estándar (std::cout) ---\n${evalResponse.stdout}\n`;
        }
        if (evalResponse.stderr) {
          log += `\n--- Alertas (std::cerr) ---\n${evalResponse.stderr}\n`;
        }

        const passedCount = evalResponse.testResults.filter((t) => t.passed).length;
        const totalCount = evalResponse.testResults.length;
        log += `\n[Evaluación de Pruebas Unitarias: ${passedCount}/${totalCount} superadas]`;

        setTestResults(evalResponse.testResults);
        setConsoleOutput(log);
        setPanelTab("split");

        const firstFail = evalResponse.testResults.find((t) => !t.passed);
        if (firstFail) {
          setLastError(
            `Fallo en Prueba '${firstFail.id}':\nEntrada: ${firstFail.input}\nEsperado: ${firstFail.expectedOutput}\nObtenido: ${firstFail.actualOutput}`
          );
        } else if (passedCount === totalCount && totalCount > 0) {
          handleComplete();
        }
      } catch (err: any) {
        setConsoleOutput(`[Error en Motor C++]:\n${err?.message || err}`);
        setLastError(String(err));
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] select-none">
      {/* Barra Secundaria Superior: Navegación Secuencial y Acciones */}
      <div className="h-12 bg-surface-container-lowest border-b border-border-subtle px-space-md flex items-center justify-between shrink-0 gap-2">
        {/* Navegación y Posición en el Currículo */}
        <div className="flex items-center gap-space-sm text-xs min-w-0">
          <Link
            href="/curriculum"
            className="text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors font-medium shrink-0"
            title="Volver al Currículo"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span className="hidden sm:inline">Currículo</span>
          </Link>

          <span className="text-text-muted">/</span>

          {/* Track Badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold shrink-0 ${
              exerciseTrack === "python"
                ? "bg-primary-container/30 text-primary border border-primary/30"
                : "bg-secondary-container/30 text-secondary border border-secondary/30"
            }`}
          >
            {exerciseTrack === "python" ? "Python 3.12" : "C++ 20"}
          </span>

          {/* Posición en el Track */}
          <span className="text-[11px] font-mono text-text-secondary hidden md:inline truncate">
            {currentIndex >= 0
              ? `Módulo ${exercise.moduleId} • Reto ${currentIndex + 1} de ${trackExercises.length}`
              : `Nivel ${exercise.level}`}
          </span>

          <span className="text-text-muted hidden md:inline">•</span>

          <span className="font-semibold text-text-primary truncate">
            {exercise.title}
          </span>

          {/* Botones de Navegación Secuencial (Anterior / Siguiente) */}
          <div className="flex items-center gap-1 pl-1">
            {prevExercise ? (
              <Link
                href={`/lab/scratchpad?exercise=${prevExercise.id}`}
                className="p-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-text-primary transition-colors flex items-center"
                title={`Anterior: ${prevExercise.title}`}
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </Link>
            ) : (
              <span className="p-1 rounded bg-surface-container-lowest text-text-muted opacity-40 cursor-not-allowed flex items-center">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </span>
            )}

            {nextExercise ? (
              <Link
                href={`/lab/scratchpad?exercise=${nextExercise.id}`}
                className="p-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-text-primary transition-colors flex items-center"
                title={`Siguiente: ${nextExercise.title}`}
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            ) : (
              <span className="p-1 rounded bg-surface-container-lowest text-text-muted opacity-40 cursor-not-allowed flex items-center">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2 shrink-0">
          {completedNotification && (
            <span className="text-[11px] font-mono text-status-success bg-status-success/10 border border-status-success/30 px-2.5 py-1 rounded-md animate-pulse hidden sm:inline">
              {completedNotification}
            </span>
          )}

          <button
            onClick={() => setIsTutorOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all bg-surface-card-elevated hover:bg-surface-card-hover border border-primary/40 text-primary"
            title="Abrir Mentor Socrático"
          >
            <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">
              psychology
            </span>
            <span className="hidden sm:inline">Tutor Socrático</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${
              isRunning
                ? "bg-status-success/10 text-status-success cursor-wait"
                : "bg-status-success/20 hover:bg-status-success/30 text-status-success border border-status-success/40"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isRunning ? "hourglass_empty" : "play_arrow"}
            </span>
            <span>
              {isRunning
                ? "Ejecutando..."
                : activeFile === "python"
                ? "Ejecutar Python 3.12"
                : "Compilar C++ 20"}
            </span>
          </button>

          <button
            onClick={handleComplete}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${
              isCompleted
                ? "bg-primary/20 text-primary border border-primary/40"
                : "bg-primary-container hover:bg-primary-container/90 text-on-primary-container"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCompleted ? "task_alt" : "military_tech"}
            </span>
            <span className="hidden sm:inline">
              {isCompleted ? "Completado ✓" : `Completar (+${exercise.xpReward} XP)`}
            </span>
            <span className="sm:hidden">
              {isCompleted ? "✓" : `+${exercise.xpReward} XP`}
            </span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-background">
        {/* PANEL IZQUIERDO: Enunciado, Teoría, Diagnósticos y Pistas (4 cols) */}
        <div className="lg:col-span-4 border-r border-border-subtle flex flex-col bg-surface-card overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-border-subtle bg-surface-container-lowest text-xs font-medium overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("spec")}
              className={`flex items-center gap-1 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "spec"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Enunciado</span>
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex items-center gap-1 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "theory"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Teoría</span>
            </button>
            <button
              onClick={() => setActiveTab("diagnostics")}
              className={`flex items-center gap-1 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "diagnostics"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">stethoscope</span>
              <span>Diagnósticos</span>
              {errorDiagnosticsCount > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-status-error/20 text-status-error">
                  {errorDiagnosticsCount}
                </span>
              ) : warningDiagnosticsCount > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-status-warning/20 text-status-warning">
                  {warningDiagnosticsCount}
                </span>
              ) : null}
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`flex items-center gap-1 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "hints"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              <span>Pistas ({exercise.socraticHints?.length || 0})</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-md text-xs leading-relaxed text-text-secondary">
            {/* ENUNCIADO */}
            {activeTab === "spec" && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary uppercase font-bold">
                      Módulo {exercise.moduleId} • {exercise.difficulty}
                    </span>
                    <span className="text-text-muted">•</span>
                    <span className="text-[10px] font-mono text-status-warning">
                      +{exercise.xpReward} XP
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-text-primary">
                    {exercise.title}
                  </h2>
                  <span className="text-xs text-text-secondary italic">
                    {exercise.subtitle}
                  </span>
                </div>

                {exercise.realWorldContext && (
                  <div className="p-3 rounded-lg bg-surface-container-low border border-primary/30 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-primary font-mono font-bold text-[10px] uppercase">
                      <span className="material-symbols-outlined text-[14px]">factory</span>
                      <span>Caso Real de Producción • {exercise.realWorldContext.industry}</span>
                    </div>
                    <p className="text-text-primary text-[11px] leading-relaxed">
                      {exercise.realWorldContext.problemStatement}
                    </p>
                    <div className="text-[10px] text-status-error bg-status-error/10 border border-status-error/20 p-2 rounded">
                      <strong>Consecuencia en producción:</strong> {exercise.realWorldContext.consequences}
                    </div>
                  </div>
                )}

                <div className="p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex flex-col gap-2">
                  <span className="font-semibold text-text-primary font-mono text-[11px] uppercase">
                    Instrucciones Paso a Paso:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {exercise.spec?.instructions && exercise.spec.instructions.length > 0 ? (
                      exercise.spec.instructions.map((inst, i) => (
                        <div key={i} className="flex items-start gap-2 text-text-primary">
                          <span className="w-5 h-5 rounded-full bg-surface-container-highest text-primary font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{inst}</span>
                        </div>
                      ))
                    ) : (
                      <p>{exercise.spec.summary}</p>
                    )}
                  </div>
                </div>

                {exercise.spec.learningObjectives && exercise.spec.learningObjectives.length > 0 && (
                  <div className="p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex flex-col gap-1.5">
                    <span className="font-semibold text-text-primary font-mono text-[11px]">
                      Objetivos de Aprendizaje:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-text-secondary">
                      {exercise.spec.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exercise.spec.constraints && (
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-border-subtle flex flex-col gap-1 font-mono text-[11px]">
                    <span className="text-text-muted">Restricciones del Reto:</span>
                    {exercise.spec.constraints.inputRange && (
                      <span className="text-text-primary">Entrada: {exercise.spec.constraints.inputRange}</span>
                    )}
                    {exercise.spec.constraints.auxiliarySpace && (
                      <span className="text-text-secondary">Espacio: {exercise.spec.constraints.auxiliarySpace}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TEORÍA */}
            {activeTab === "theory" && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-text-primary">
                  {exercise.theory.title}
                </h3>

                {exercise.theory.explanation && (
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {exercise.theory.explanation}
                  </p>
                )}

                {exercise.theory.codeExample && (
                  <div className="p-3 rounded-lg bg-surface-container-lowest border border-border-subtle flex flex-col gap-1 font-mono text-xs">
                    <span className="text-text-muted text-[10px] uppercase font-bold">
                      Ejemplo de Código:
                    </span>
                    <pre className="text-primary overflow-x-auto whitespace-pre-wrap">
                      {exercise.theory.codeExample}
                    </pre>
                  </div>
                )}

                {exercise.theory.mentalModel && (
                  <div className="p-space-sm rounded-lg bg-surface-container-high border border-border-subtle flex flex-col gap-1">
                    <span className="font-semibold text-primary font-mono text-xs">Modelo Mental:</span>
                    <p className="text-text-primary">{exercise.theory.mentalModel}</p>
                  </div>
                )}

                {exercise.theory.physicalReality && (
                  <div className="p-3 rounded-lg bg-surface-container-lowest border border-border-subtle flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-secondary uppercase font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">memory</span>
                      <span>La Realidad Física del Silicio</span>
                    </span>
                    <p className="text-text-secondary text-[11px] leading-relaxed whitespace-pre-wrap">
                      {exercise.theory.physicalReality}
                    </p>
                  </div>
                )}

                {exercise.theory.historicalFootnote && (
                  <div className="p-2.5 rounded-lg bg-status-warning/10 border border-status-warning/30 flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-status-warning uppercase font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">history_edu</span>
                      <span>Incidente Histórico Real</span>
                    </span>
                    <p className="text-text-primary text-[11px] leading-relaxed">
                      {exercise.theory.historicalFootnote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* DIAGNÓSTICOS AMIGABLES */}
            {activeTab === "diagnostics" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      stethoscope
                    </span>
                    <span>Diagnóstico Pedagógico</span>
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-text-muted">
                    {activeFile === "cpp" ? "C++ 20" : "Python 3.12"}
                  </span>
                </div>

                <p className="text-text-muted text-[11px]">
                  Analizador en tiempo real de errores frecuentes, omisiones de sintaxis y buenas prácticas:
                </p>

                {diagnostics.length === 0 ? (
                  <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/30 flex flex-col items-center justify-center text-center gap-2 my-4">
                    <span className="material-symbols-outlined text-status-success text-[32px]">
                      check_circle
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-status-success">
                        ¡Código Limpio y Válido!
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        No se detectaron faltas de sintaxis, errores de puntuación ni palabras reservadas mal escritas.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {diagnostics.map((diag, index) => {
                      const isError = diag.severity === "error";
                      const isWarning = diag.severity === "warning";

                      return (
                        <div
                          key={`${diag.code}-${index}`}
                          className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all ${
                            isError
                              ? "bg-status-error/10 border-status-error/30 text-text-primary"
                              : isWarning
                              ? "bg-status-warning/10 border-status-warning/30 text-text-primary"
                              : "bg-surface-container-low border-border-subtle"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`px-1.5 py-0.2 rounded font-bold uppercase text-[9px] ${
                                  isError
                                    ? "bg-status-error text-white"
                                    : isWarning
                                    ? "bg-status-warning text-black"
                                    : "bg-primary text-white"
                                }`}
                              >
                                {diag.severity}
                              </span>
                              <span className="font-semibold">Línea {diag.line}</span>
                            </div>
                            <span className="text-[10px] text-text-muted">{diag.code}</span>
                          </div>

                          <p className="text-xs font-medium leading-relaxed">
                            {diag.message}
                          </p>

                          {diag.suggestion && (
                            <div className="p-2 rounded bg-surface-container-lowest/80 border border-border-subtle/50 text-[11px] text-text-secondary flex items-start gap-1.5">
                              <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">
                                lightbulb
                              </span>
                              <span>{diag.suggestion}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* PISTAS SOCRÁTICAS */}
            {activeTab === "hints" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-primary">
                    Pistas Socráticas Graduadas
                  </h3>
                  <button
                    onClick={() => setIsTutorOpen(true)}
                    className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    <span>Abrir Chat</span>
                  </button>
                </div>
                <p className="text-text-muted text-[11px]">
                  Diseñadas para activar tu razonamiento sin darte la solución:
                </p>
                {exercise.socraticHints?.map((hint) => (
                  <div
                    key={hint.level}
                    className="p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex flex-col gap-1"
                  >
                    <span className="text-[10px] font-mono uppercase text-secondary font-bold">
                      Nivel {hint.level}: {hint.title}
                    </span>
                    <p className="text-text-primary">{hint.prompt}</p>
                  </div>
                ))}

                <button
                  onClick={() => setIsTutorOpen(true)}
                  className="w-full py-2.5 px-3 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 mt-2"
                >
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  <span>Dialogar con el Tutor Socrático</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PANEL CENTRAL: Monaco Editor (5 cols) */}
        <div className="lg:col-span-5 flex flex-col border-r border-border-subtle bg-surface-container-lowest">
          {/* Pestañas de Archivo del Editor (IDE File Tabs) */}
          <div className="h-9 bg-surface-container-lowest border-b border-border-subtle flex items-center justify-between px-2 text-xs font-mono">
            <div className="flex items-center gap-1">
              {exerciseTrack === "python" && (
                <button
                  onClick={() => setActiveFile("python")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-t-md text-[11px] font-medium transition-all bg-[#161616] text-primary border-t-2 border-primary`}
                >
                  <span>🐍</span>
                  <span>main.py</span>
                </button>
              )}

              {exerciseTrack === "cpp" && (
                <button
                  onClick={() => setActiveFile("cpp")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-t-md text-[11px] font-medium transition-all bg-[#161616] text-secondary border-t-2 border-secondary`}
                >
                  <span>⚡</span>
                  <span>main.cpp</span>
                </button>
              )}
            </div>

            <span className="text-[10px] text-text-muted pr-2">
              {exerciseTrack === "python" ? "Python 3.12 (Monaco)" : "C++ 20 (Monaco)"}
            </span>
          </div>

          {/* Área de Edición Individual con Monaco Editor */}
          <div className="flex-1 w-full h-[calc(100%-2.25rem)] overflow-hidden">
            <MonacoCodeEditor
              language={activeFile}
              value={activeFile === "python" ? pythonCode : cppCode}
              onChange={activeFile === "python" ? setPythonCode : setCppCode}
            />
          </div>
        </div>

        {/* PANEL DERECHO: Consola, Pruebas Unitarias y Diagnósticos (3 cols) */}
        <div className="lg:col-span-3 flex flex-col bg-surface-card overflow-hidden">
          <ConsoleAndTestPanel
            output={consoleOutput}
            testCases={exercise.testCases}
            testResults={testResults}
            onClear={() => setConsoleOutput("")}
            isRunning={isRunning}
            activeTab={panelTab}
            onTabChange={setPanelTab}
            diagnostics={diagnostics}
            language={activeFile}
          />
        </div>
      </div>

      {/* Drawer del Tutor Socrático */}
      <SocraticTutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        exercise={exercise}
        currentCode={activeFile === "cpp" ? cppCode : pythonCode}
        language={activeFile === "cpp" ? "cpp" : "python"}
        lastError={lastError}
      />
    </div>
  );
}

export default function ScratchpadPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-text-muted font-mono">Cargando Laboratorio...</div>}>
      <ScratchpadContent />
    </Suspense>
  );
}
