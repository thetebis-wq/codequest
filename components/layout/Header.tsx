"use client";

import { usePathname } from "next/navigation";
import { useUserProgress } from "@/lib/storage/progressStore";

export default function Header() {
  const pathname = usePathname();
  const { progress, isMounted, activeTrack, setActiveTrack } = useUserProgress();
  const userProgress = {
    totalXp: isMounted ? progress.totalXp : 0,
    streakDays: isMounted ? progress.streakDays : 1,
  };

  // Dynamic breadcrumb based on route
  const getBreadcrumb = () => {
    if (pathname.startsWith("/lab")) {
      return { section: "Laboratorio IDE", current: "Espacio de Trabajo" };
    }
    if (pathname.startsWith("/curriculum")) {
      return { section: "Currículo", current: "Mapa de Niveles" };
    }
    if (pathname.startsWith("/interview")) {
      return { section: "Entrevistas", current: "Arena Técnica" };
    }
    if (pathname.startsWith("/analytics")) {
      return { section: "Métricas", current: "Historial y Metacognición" };
    }
    if (pathname.startsWith("/settings")) {
      return { section: "Sistema", current: "Configuración" };
    }
    return { section: "Dashboard", current: "Resumen de Aprendizaje" };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container/80 backdrop-blur-xl z-40 flex items-center justify-between px-space-lg border-b border-border-subtle select-none">
      {/* Left: Breadcrumb & Context Indicator */}
      <div className="flex items-center gap-space-md">


        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-text-muted">
          <span className="text-text-secondary">{breadcrumb.section}</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-medium text-on-surface">{breadcrumb.current}</span>
        </div>
      </div>

      {/* Right: Study Streak, Mastery XP & Profile */}
      <div className="flex items-center gap-space-md">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-border-subtle text-xs">
          <span className="material-symbols-outlined text-tertiary text-[16px]">
            local_fire_department
          </span>
          <span className="font-mono text-on-surface font-medium">
            {userProgress.streakDays} Día{userProgress.streakDays > 1 ? "s" : ""} de Racha
          </span>
        </div>

        {/* XP Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-border-subtle text-xs">
          <span className="material-symbols-outlined text-status-warning text-[16px]">
            bolt
          </span>
          <span className="font-mono text-on-surface font-medium">
            {userProgress.totalXp} XP
          </span>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-space-xs cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-semibold text-xs border border-primary/30">
            CQ
          </div>
          <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
            Estudiante
          </span>
        </div>
      </div>
    </header>
  );
}
