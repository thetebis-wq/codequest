"use client";

import { useState, useRef } from "react";
import {
  exportBackupJson,
  importBackupJson,
  resetProgress,
  useUserProgress,
} from "@/lib/storage/progressStore";

type SettingsTab = "profile" | "toolchain" | "tutor" | "appearance" | "backup";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportBackup = () => {
    try {
      const jsonStr = exportBackupJson();
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `codequest_backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification("¡Copia de seguridad exportada correctamente!");
    } catch (e) {
      showNotification("Error al generar el archivo de respaldo.", "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;
      const ok = importBackupJson(content);
      if (ok) {
        showNotification("¡Progreso y notas restaurados con éxito desde el archivo!");
      } else {
        showNotification("El archivo JSON no tiene el formato válido de CodeQuest.", "error");
      }
    };
    reader.onerror = () => {
      showNotification("Error al leer el archivo seleccionado.", "error");
    };
    reader.readAsText(file);

    // Reset input value to allow re-uploading same file if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de reiniciar todo tu progreso y notas? Esta acción no se puede deshacer a menos que tengas un respaldo JSON."
    );
    if (confirmed) {
      resetProgress();
      showNotification("Progreso reiniciado a valores predeterminados.");
    }
  };

  const { progress: currentStats, isMounted } = useUserProgress();

  return (
    <div className="p-space-lg max-w-7xl mx-auto w-full flex flex-col gap-space-lg select-none">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-lg transition-all animate-in slide-in-from-top ${
            notification.type === "success"
              ? "bg-status-success/20 border-status-success text-status-success"
              : "bg-status-error/20 border-status-error text-status-error"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              {notification.type === "success" ? "check_circle" : "error"}
            </span>
            <span>{notification.text}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:opacity-75 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle shadow-md">
        <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
          <span>Ajustes del Sistema</span>
          <span>•</span>
          <span className="text-primary font-medium">Configuración Unificada</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Preferencias de CodeQuest Lab
        </h1>
        <p className="text-xs text-text-secondary max-w-2xl">
          Administra tu entorno de aprendizaje, directrices del tutor socrático, configuración del editor y respaldos locales.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto p-1 bg-surface-container-lowest rounded-xl border border-border-subtle scrollbar-none">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "profile"
              ? "bg-primary-container text-on-primary-container shadow-sm font-semibold"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
          <span>Perfil y Metas</span>
        </button>

        <button
          onClick={() => setActiveTab("toolchain")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "toolchain"
              ? "bg-primary-container text-on-primary-container shadow-sm font-semibold"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          <span>Compilador y Editor</span>
        </button>

        <button
          onClick={() => setActiveTab("tutor")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "tutor"
              ? "bg-primary-container text-on-primary-container shadow-sm font-semibold"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          <span>Tutor Socrático IA</span>
        </button>

        <button
          onClick={() => setActiveTab("appearance")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "appearance"
              ? "bg-primary-container text-on-primary-container shadow-sm font-semibold"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">palette</span>
          <span>Apariencia</span>
        </button>

        <button
          onClick={() => setActiveTab("backup")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "backup"
              ? "bg-primary-container text-on-primary-container shadow-sm font-semibold"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">database</span>
          <span>Datos y Respaldo JSON</span>
        </button>
      </div>

      {/* Tab Panel Content */}
      <div className="p-space-lg rounded-xl bg-surface-card border border-border-subtle shadow-md">
        {activeTab === "profile" && (
          <div className="flex flex-col gap-space-md max-w-xl text-xs">
            <h3 className="text-base font-bold text-text-primary">
              Perfil de Aprendizaje
            </h3>
            <div className="flex flex-col gap-1">
              <label className="text-text-secondary font-medium">Nombre de Estudiante</label>
              <input
                type="text"
                defaultValue="Alex (Aprendiz)"
                className="bg-surface-container-lowest border border-border-subtle rounded-lg px-3 py-2 text-text-primary font-mono focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-text-secondary font-medium">Meta Principal</label>
              <textarea
                rows={3}
                defaultValue="Dominar Python 3.12 y C++ 20 desde primeros principios para preparar entrevistas de ingeniería de software de alto nivel."
                className="bg-surface-container-lowest border border-border-subtle rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-primary resize-none leading-relaxed"
              />
            </div>

            <div className="p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex flex-col gap-1 font-mono text-[11px]">
              <span className="text-text-muted">Estado de Cuenta Local:</span>
              <span className="text-primary font-bold">{isMounted ? currentStats.totalXp : 0} XP acumulados</span>
              <span className="text-text-secondary">{isMounted ? currentStats.completedExerciseIds.length : 0} ejercicios superados</span>
            </div>
          </div>
        )}

        {activeTab === "toolchain" && (
          <div className="flex flex-col gap-space-md max-w-xl text-xs">
            <h3 className="text-base font-bold text-text-primary">
              Entorno de Ejecución y Compilación
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-text-secondary">Motor Python</span>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-primary flex items-center justify-between">
                <span>Pyodide 0.26 (WebAssembly en Cliente)</span>
                <span className="text-[10px] text-status-success font-bold">Activo Local</span>
              </div>
              <span className="text-[11px] text-text-muted leading-relaxed">
                Ejecución aislada y segura en tu navegador con soporte nativo para inspección de bytecode ('dis').
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-text-secondary">Estándar C++</span>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-secondary flex items-center justify-between">
                <span>GCC 13.2 (C++20 Nativo)</span>
                <span className="text-[10px] text-on-surface-variant font-bold">Simulador de Stack</span>
              </div>
              <span className="text-[11px] text-text-muted leading-relaxed">
                Inspección didáctica de direcciones de memoria en el Call Stack y análisis de fugas con Valgrind.
              </span>
            </div>
          </div>
        )}

        {activeTab === "tutor" && (
          <div className="flex flex-col gap-space-md max-w-xl text-xs">
            <h3 className="text-base font-bold text-text-primary">
              Directrices del Tutor Socrático
            </h3>
            <p className="text-text-secondary leading-relaxed">
              El tutor de IA (Gemini 2.5 Flash) está configurado con restricciones pedagógicas estrictas: tiene terminantemente prohibido darte la solución resuelta. Siempre te formulará preguntas y analogías de hardware para guiarte a la respuesta.
            </p>
            <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-primary/30 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
              <div className="flex flex-col">
                <span className="font-semibold text-text-primary">Guardarraíl Pedagógico Activo</span>
                <span className="text-[11px] text-text-muted">Pistas escalonadas en 3 niveles de andamiaje.</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle/50">
              <span className="font-semibold text-text-primary">Configuración de API Key:</span>
              <p className="text-[11px] text-text-muted">
                Para activar la IA generativa de Google en vivo, coloca tu clave en el archivo <code className="text-primary font-mono">.env.local</code> del proyecto:
              </p>
              <pre className="p-3 rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-[11px] text-text-secondary overflow-x-auto">
GEMINI_API_KEY=tu_clave_de_google_ai_studio_aqui
              </pre>
              <span className="text-[11px] text-secondary">
                * Si no defines la variable, el tutor seguirá funcionando mediante el Motor Socrático Local predeterminado.
              </span>
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="flex flex-col gap-space-md max-w-xl text-xs">
            <h3 className="text-base font-bold text-text-primary">
              Sistema Visual
            </h3>
            <p className="text-text-secondary">
              Tema oscuro <strong>DevLab Precision</strong> diseñado para largas sesiones de estudio sin fatiga visual.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-background border border-border-subtle flex items-center justify-center font-mono text-[10px] text-primary">
                #13
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-text-primary">Obsidian Canvas (#131313)</span>
                <span className="text-[11px] text-text-muted">Tipografías: Inter + JetBrains Mono</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "backup" && (
          <div className="flex flex-col gap-space-md max-w-xl text-xs">
            <h3 className="text-base font-bold text-text-primary">
              Privacidad y Respaldo Local-First
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Tus datos, soluciones, notas y racha residen exclusivamente en tu navegador. Puedes descargar una copia de seguridad en formato JSON en cualquier momento o restaurarla en otra computadora.
            </p>

            {/* Hidden file input for restore */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={handleExportBackup}
                className="px-4 py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Exportar Copia de Seguridad JSON</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-lg bg-surface-card-elevated hover:bg-surface-card-hover border border-border-subtle text-text-primary font-medium flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">upload</span>
                <span>Restaurar Copia desde Archivo</span>
              </button>
            </div>

            <div className="pt-4 border-t border-border-subtle/50 flex flex-col gap-2">
              <span className="text-xs font-semibold text-status-error">Zona de Peligro</span>
              <p className="text-[11px] text-text-muted">
                Si deseas comenzar desde cero y borrar todos los datos locales:
              </p>
              <div>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-lg bg-status-error/10 hover:bg-status-error/20 border border-status-error/30 text-status-error text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                  <span>Reiniciar Todo el Progreso</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
