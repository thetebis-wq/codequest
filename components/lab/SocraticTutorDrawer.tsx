"use client";

import { useState, useRef, useEffect } from "react";
import { PedagogicalExercise } from "@/types/exercise";

interface Message {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  mode?: string;
}

interface SocraticTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: PedagogicalExercise | null;
  currentCode: string;
  language: "python" | "cpp";
  lastError: string | null;
}

export default function SocraticTutorDrawer({
  isOpen,
  onClose,
  exercise,
  currentCode,
  language,
  lastError,
}: SocraticTutorDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "tutor",
      text: `Hola. Soy tu **Mentor Socrático** en CodeQuest Lab.\n\nMi rol no es darte la respuesta ni escribir el código por ti, sino ayudarte a razonar cómo funciona la máquina por dentro: la memoria, las instrucciones y la lógica de sistemas.\n\n¿En qué punto de tu razonamiento te encuentras? Puedes elegir una de las pistas guiadas o preguntarme directamente.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tutorMode, setTutorMode] = useState<string>("local_socratic");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendTutorRequest = async (payload: {
    action?: string;
    userMessage?: string;
  }) => {
    if (isLoading) return;

    const userText =
      payload.userMessage ||
      (payload.action === "HINT_LEVEL_1"
        ? "💡 Dame una pista de nivel 1 (dirección inicial)"
        : payload.action === "HINT_LEVEL_2"
        ? "🔍 Dame una pista de nivel 2 (mecánica de memoria)"
        : payload.action === "HINT_LEVEL_3"
        ? "⚠️ Dame una pista de nivel 3 (inspección crítica)"
        : payload.action === "EXPLAIN_THEORY"
        ? "🧠 Explícame el fundamento teórico de este reto"
        : payload.action === "EXPLAIN_ERROR"
        ? "🐞 Ayúdame a diagnosticar el último error"
        : "Consulta al tutor");

    const userMsgId = `user-${Date.now()}`;
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        sender: "user",
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];

    setMessages(newMessages);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: exercise?.id,
          code: currentCode,
          language,
          lastError,
          action: payload.action,
          userMessage: payload.userMessage,
        }),
      });

      const data = await res.json();
      if (data.mode) {
        setTutorMode(data.mode);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `tutor-${Date.now()}`,
          sender: "tutor",
          text: data.reply || "No pude procesar la consulta en este momento.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          mode: data.mode,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `tutor-${Date.now()}`,
          sender: "tutor",
          text: "⚠️ Ocurrió una desconexión con el servicio pedagógico. Intenta nuevamente.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    sendTutorRequest({ userMessage: inputQuery.trim() });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] md:w-[480px] bg-surface-card border-l border-border-subtle shadow-2xl z-50 flex flex-col transition-all duration-300 animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-container-low shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text-primary">Tutor Socrático</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${
                  tutorMode === "gemini_online"
                    ? "bg-primary-container/20 text-primary border-primary/30"
                    : "bg-surface-container-high text-secondary border-border-subtle"
                }`}
              >
                {tutorMode === "gemini_online" ? "Gemini 2.5 Flash" : "Motor Socrático Local"}
              </span>
            </div>
            <span className="text-[11px] text-text-muted">
              Primeros Principios • Sin Soluciones Regaladas
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container-high transition-colors"
          title="Cerrar panel"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="p-3 border-b border-border-subtle bg-surface-container-lowest flex flex-wrap gap-1.5 shrink-0">
        <button
          onClick={() => sendTutorRequest({ action: "HINT_LEVEL_1" })}
          disabled={isLoading}
          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container border border-border-subtle text-text-secondary hover:text-text-primary transition-all disabled:opacity-50 flex items-center gap-1"
        >
          <span>💡 Pista Nivel 1</span>
        </button>

        <button
          onClick={() => sendTutorRequest({ action: "HINT_LEVEL_2" })}
          disabled={isLoading}
          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container border border-border-subtle text-text-secondary hover:text-text-primary transition-all disabled:opacity-50 flex items-center gap-1"
        >
          <span>🔍 Pista Nivel 2</span>
        </button>

        <button
          onClick={() => sendTutorRequest({ action: "HINT_LEVEL_3" })}
          disabled={isLoading}
          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container border border-border-subtle text-text-secondary hover:text-text-primary transition-all disabled:opacity-50 flex items-center gap-1"
        >
          <span>⚠️ Pista Nivel 3</span>
        </button>

        <button
          onClick={() => sendTutorRequest({ action: "EXPLAIN_THEORY" })}
          disabled={isLoading}
          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-primary-container/15 hover:bg-primary-container/25 border border-primary/30 text-primary transition-all disabled:opacity-50 flex items-center gap-1"
        >
          <span>🧠 Teoría de Memoria</span>
        </button>

        {lastError && (
          <button
            onClick={() => sendTutorRequest({ action: "EXPLAIN_ERROR" })}
            disabled={isLoading}
            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-status-error/15 hover:bg-status-error/25 border border-status-error/40 text-status-error transition-all disabled:opacity-50 flex items-center gap-1 animate-pulse"
          >
            <span>🐞 Diagnosticar Error</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => {
          const isTutor = msg.sender === "tutor";
          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 max-w-[90%] ${
                isTutor ? "self-start" : "self-end items-end"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono px-1">
                <span>{isTutor ? "Mentor Socrático" : "Tú"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  isTutor
                    ? "bg-surface-container-high border border-border-subtle text-text-primary rounded-tl-none whitespace-pre-wrap"
                    : "bg-primary-container text-on-primary-container rounded-tr-none font-medium"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="self-start flex flex-col gap-1 max-w-[85%] animate-pulse">
            <div className="text-[10px] text-text-muted font-mono px-1">
              <span>Mentor Socrático reflexionando...</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-high border border-border-subtle rounded-tl-none flex items-center gap-2 text-text-secondary text-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-300"></span>
              <span className="ml-1 text-[11px] font-mono">Analizando estado de la máquina...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-border-subtle bg-surface-container-low shrink-0 flex flex-col gap-2">
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Pregúntale al tutor sobre la lógica o la memoria..."
            disabled={isLoading}
            className="flex-1 bg-surface-container-high border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors disabled:opacity-50 font-sans"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-3.5 py-2 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold flex items-center justify-center transition-all disabled:opacity-40 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-text-muted font-mono">
          <span>Regla: El tutor guía con preguntas, no regala código.</span>
          <span>{language === "python" ? "Python 3.12" : "C++ 20"}</span>
        </div>
      </div>
    </div>
  );
}
