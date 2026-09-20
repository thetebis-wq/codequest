"use client";

import { useState } from "react";
import { TestCase } from "@/types/exercise";
import { DiagnosticItem } from "@/lib/runner/diagnostics";

interface ConsoleAndTestPanelProps {
  output: string;
  testCases: TestCase[];
  testResults?: Array<{
    id: string;
    passed: boolean;
    actualOutput: string;
    input?: string;
    expectedOutput?: string;
    error?: string;
  }>;
  onClear: () => void;
  isRunning?: boolean;
  activeTab?: "console" | "tests" | "diagnostics" | "split";
  onTabChange?: (tab: "console" | "tests" | "diagnostics" | "split") => void;
  diagnostics?: DiagnosticItem[];
  language?: "python" | "cpp";
}

export default function ConsoleAndTestPanel({
  output,
  testCases,
  testResults,
  onClear,
  isRunning = false,
  activeTab: externalTab,
  onTabChange,
  diagnostics = [],
  language = "python",
}: ConsoleAndTestPanelProps) {
  const [internalTab, setInternalTab] = useState<"console" | "tests" | "diagnostics" | "split">("split");
  const currentTab = externalTab ?? internalTab;

  const handleTabSelect = (tab: "console" | "tests" | "diagnostics" | "split") => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const hasResults = Boolean(testResults && testResults.length > 0);
  const passedCount = testResults?.filter((r) => r.passed).length || 0;
  const totalCount = testCases.length;
  const allPassed = hasResults && passedCount === totalCount;
  const passPercentage = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

  const errorDiagnosticsCount = diagnostics.filter((d) => d.severity === "error").length;
  const warningDiagnosticsCount = diagnostics.filter((d) => d.severity === "warning").length;

  const langLabel = language === "cpp" ? "C++ 20" : "Python 3.12";

  // Renderizador de lista de pruebas visuales
  const renderTestCards = () => (
    <div className="flex flex-col gap-2.5 p-space-sm">
      {/* Banner de Estado General de la Suite de Pruebas */}
      {hasResults ? (
        <div
          className={`p-3 rounded-xl border flex flex-col gap-2 transition-all ${
            allPassed
              ? "bg-status-success/10 border-status-success/40 text-status-success"
              : "bg-status-warning/10 border-status-warning/40 text-status-warning"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">
                {allPassed ? "verified" : "warning"}
              </span>
              <span>
                {allPassed
                  ? `¡Suite Completa Superada! (${passedCount}/${totalCount})`
                  : `Discrepancia en Pruebas: ${passedCount}/${totalCount} pasadas`}
              </span>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-surface-container-highest">
              {passPercentage}%
            </span>
          </div>

          {/* Barra de Progreso Visual */}
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                allPassed ? "bg-status-success" : "bg-status-warning"
              }`}
              style={{ width: `${passPercentage}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-surface-container-low border border-border-subtle flex items-center gap-2 text-xs text-text-muted">
          <span className="material-symbols-outlined text-[16px] text-primary">info</span>
          <span>
            Presiona <strong>&quot;Ejecutar {langLabel}&quot;</strong> para evaluar tu código contra estos casos.
          </span>
        </div>
      )}

      {/* Lista Detallada de Pruebas */}
      <div className="flex flex-col gap-2">
        {testCases.map((tc, index) => {
          const res = testResults?.find((r) => r.id === tc.id);
          const hasRun = res !== undefined;
          const passed = res?.passed;

          return (
            <div
              key={tc.id}
              className={`p-3 rounded-xl border flex flex-col gap-2 transition-all shadow-sm ${
                !hasRun
                  ? "bg-surface-container-lowest border-border-subtle"
                  : passed
                  ? "bg-status-success/5 border-status-success/30 hover:border-status-success/60"
                  : "bg-status-error/10 border-status-error/40 hover:border-status-error/70"
              }`}
            >
              {/* Header de la prueba */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                      !hasRun
                        ? "bg-surface-container-high text-text-muted"
                        : passed
                        ? "bg-status-success text-black"
                        : "bg-status-error text-white"
                    }`}
                  >
                    {hasRun ? (passed ? "✓" : "✗") : index + 1}
                  </span>
                  <span className="text-xs font-semibold text-text-primary truncate">
                    Caso #{index + 1}: {tc.description}
                  </span>
                </div>

                {hasRun && (
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      passed
                        ? "bg-status-success/20 text-status-success border border-status-success/30"
                        : "bg-status-error/20 text-status-error border border-status-error/30"
                    }`}
                  >
                    {passed ? "Aprobada" : "Fallida"}
                  </span>
                )}
              </div>

              {/* Parámetros y Valores Evaluados */}
              <div className="grid grid-cols-1 gap-1.5 pt-1 text-[11px] font-mono bg-surface-container-lowest/60 p-2.5 rounded-lg border border-border-subtle/50">
                <div className="flex items-start gap-1">
                  <span className="text-text-muted shrink-0 w-16">Entrada:</span>
                  <span className="text-text-primary font-semibold break-all">{tc.input}</span>
                </div>

                <div className="flex items-start gap-1">
                  <span className="text-text-muted shrink-0 w-16">Esperado:</span>
                  <span className="text-status-success font-semibold break-all">
                    {tc.expectedOutput}
                  </span>
                </div>

                {hasRun && (
                  <div className="flex items-start gap-1 pt-1 border-t border-border-subtle/40">
                    <span className="text-text-muted shrink-0 w-16">Obtenido:</span>
                    <span
                      className={`font-semibold break-all ${
                        passed ? "text-status-success" : "text-status-error"
                      }`}
                    >
                      {res?.actualOutput || "Ninguna salida"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Renderizador de consola de texto estándar
  const renderConsoleOutput = () => (
    <div className="p-space-sm h-full flex flex-col">
      <pre className="text-text-secondary whitespace-pre-wrap leading-relaxed font-mono text-xs flex-1">
        {isRunning ? (
          <span className="text-primary animate-pulse flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
            {language === "cpp"
              ? "Compilando y ejecutando en motor C++ 20..."
              : "Ejecutando en máquina virtual CPython 3.12 (WebAssembly)..."}
          </span>
        ) : (
          output || (
            <span className="text-text-muted italic">
              Terminal listo. Presiona &quot;Ejecutar {langLabel}&quot; para compilar o evaluar tu solución.
            </span>
          )
        )}
      </pre>

      {/* Acceso directo a Pruebas desde Consola si hay resultados */}
      {hasResults && currentTab === "console" && (
        <button
          onClick={() => handleTabSelect("tests")}
          className="mt-2 p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-border-subtle text-xs flex items-center justify-between text-primary transition-colors shrink-0"
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">checklist</span>
            <span>Ver detalle de pruebas ({passedCount}/{totalCount})</span>
          </span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      )}
    </div>
  );

  // Renderizador de panel de diagnósticos amigables
  const renderDiagnostics = () => (
    <div className="p-space-sm h-full flex flex-col gap-2 overflow-y-auto">
      <div className="flex items-center justify-between text-xs pb-1 border-b border-border-subtle">
        <span className="font-semibold text-text-primary flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
          <span>Diagnósticos Amigables ({langLabel})</span>
        </span>
        <span className="text-[11px] font-mono text-text-muted">
          {diagnostics.length} observaciones
        </span>
      </div>

      {diagnostics.length === 0 ? (
        <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/30 flex flex-col items-center justify-center text-center gap-2 my-auto">
          <span className="material-symbols-outlined text-status-success text-[28px]">
            check_circle
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-status-success">
              ¡Sintaxis y Estructura Impecables!
            </span>
            <span className="text-[11px] text-text-secondary">
              No se detectaron errores comunes, faltas de puntuación ni palabras reservadas mal escritas.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {diagnostics.map((item, idx) => {
            const isError = item.severity === "error";
            const isWarning = item.severity === "warning";

            return (
              <div
                key={`${item.code}-${idx}`}
                className={`p-3 rounded-xl border flex flex-col gap-1.5 text-xs transition-all ${
                  isError
                    ? "bg-status-error/10 border-status-error/30"
                    : isWarning
                    ? "bg-status-warning/10 border-status-warning/30"
                    : "bg-surface-container-low border-border-subtle"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold uppercase text-[9px] ${
                        isError
                          ? "bg-status-error text-white"
                          : isWarning
                          ? "bg-status-warning text-black"
                          : "bg-primary text-white"
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-text-primary font-semibold">
                      Línea {item.line}
                      {item.column ? `:${item.column}` : ""}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-text-muted">
                    {item.code}
                  </span>
                </div>

                <p className="text-text-primary font-medium leading-relaxed">
                  {item.message}
                </p>

                {item.suggestion && (
                  <div className="p-2 rounded bg-surface-container-lowest/80 border border-border-subtle/50 text-[11px] text-text-secondary flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">
                      lightbulb
                    </span>
                    <span>{item.suggestion}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-surface-card overflow-hidden">
      {/* Header con Selectores de Modo de Visualización */}
      <div className="h-9 bg-surface-container-lowest border-b border-border-subtle px-2 flex items-center justify-between text-xs font-mono select-none shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {/* Tab Consola */}
          <button
            onClick={() => handleTabSelect("console")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap ${
              currentTab === "console"
                ? "bg-surface-container text-on-surface font-semibold shadow-sm"
                : "text-text-muted hover:text-on-surface"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
            <span>Consola</span>
          </button>

          {/* Tab Pruebas */}
          <button
            onClick={() => handleTabSelect("tests")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap ${
              currentTab === "tests"
                ? "bg-surface-container text-on-surface font-semibold shadow-sm"
                : "text-text-muted hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">checklist</span>
            <span>Pruebas</span>
            {hasResults && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                  allPassed
                    ? "bg-status-success/20 text-status-success"
                    : "bg-status-warning/20 text-status-warning"
                }`}
              >
                {passedCount}/{totalCount}
              </span>
            )}
          </button>

          {/* Tab Diagnósticos */}
          <button
            onClick={() => handleTabSelect("diagnostics")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap ${
              currentTab === "diagnostics"
                ? "bg-surface-container text-on-surface font-semibold shadow-sm"
                : "text-text-muted hover:text-on-surface"
            }`}
            title="Diagnóstico amigable de sintaxis y convención"
          >
            <span className="material-symbols-outlined text-[14px]">stethoscope</span>
            <span>Diagnósticos</span>
            {errorDiagnosticsCount > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-status-error/20 text-status-error animate-pulse">
                {errorDiagnosticsCount}
              </span>
            ) : warningDiagnosticsCount > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-status-warning/20 text-status-warning">
                {warningDiagnosticsCount}
              </span>
            ) : null}
          </button>

          {/* Tab Vista Dividida */}
          <button
            onClick={() => handleTabSelect("split")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap ${
              currentTab === "split"
                ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                : "text-text-muted hover:text-on-surface"
            }`}
            title="Ver Consola y Pruebas simultáneamente"
          >
            <span className="material-symbols-outlined text-[14px]">vertical_split</span>
            <span>Ambas</span>
          </button>
        </div>

        {/* Acciones del Header */}
        <div className="flex items-center gap-2">
          {currentTab !== "tests" && currentTab !== "diagnostics" && (
            <button
              onClick={onClear}
              className="hover:text-text-primary text-[10px] text-text-muted transition-colors pr-1"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Área de Contenido según Modo */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {currentTab === "console" && (
          <div className="flex-1 overflow-y-auto">{renderConsoleOutput()}</div>
        )}

        {currentTab === "tests" && (
          <div className="flex-1 overflow-y-auto">{renderTestCards()}</div>
        )}

        {currentTab === "diagnostics" && (
          <div className="flex-1 overflow-y-auto">{renderDiagnostics()}</div>
        )}

        {currentTab === "split" && (
          <div className="flex-1 flex flex-col overflow-hidden divide-y divide-border-subtle">
            {/* Mitad Superior: Terminal de Salida */}
            <div className="h-1/2 overflow-y-auto bg-surface-container-lowest/30">
              <div className="sticky top-0 bg-surface-container-lowest/90 backdrop-blur px-2 py-1 text-[10px] text-text-muted font-mono uppercase tracking-wider flex items-center justify-between border-b border-border-subtle/50">
                <span>Terminal stdout / stderr</span>
                <button
                  onClick={onClear}
                  className="hover:text-text-primary transition-colors text-[9px]"
                >
                  Limpiar
                </button>
              </div>
              {renderConsoleOutput()}
            </div>

            {/* Mitad Inferior: Pruebas Unitarias Visuales */}
            <div className="h-1/2 overflow-y-auto bg-surface-card">
              <div className="sticky top-0 bg-surface-container-lowest/90 backdrop-blur px-2 py-1 text-[10px] text-text-muted font-mono uppercase tracking-wider border-b border-border-subtle/50 flex items-center justify-between">
                <span>Casos de Prueba</span>
                {hasResults && (
                  <span
                    className={`text-[9px] font-bold ${
                      allPassed ? "text-status-success" : "text-status-warning"
                    }`}
                  >
                    {passedCount}/{totalCount} Superadas
                  </span>
                )}
              </div>
              {renderTestCards()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
