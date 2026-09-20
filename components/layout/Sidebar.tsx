"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const curriculumNav: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
  { name: "Mapa de Niveles", href: "/curriculum", icon: "account_tree" },
  { name: "Laboratorio IDE", href: "/lab", icon: "developer_mode" },
  { name: "Arena de Entrevistas", href: "/interview", icon: "terminal" },
];

const systemNav: NavItem[] = [
  { name: "Historial y Analítica", href: "/analytics", icon: "analytics" },
  { name: "Configuración", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) {
      return true;
    }
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between border-r border-border-subtle select-none">
      <div className="flex flex-col">
        {/* Brand / Logo */}
        <div className="h-16 px-space-md flex items-center gap-space-sm bg-surface-container-lowest border-b border-border-subtle">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
            <span className="material-symbols-outlined text-[20px]">terminal</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-text-primary tracking-tight text-base">
              CodeQuest
            </span>
            <span className="text-[11px] text-text-muted uppercase tracking-wider font-mono">
              Learning Lab
            </span>
          </div>
        </div>

        {/* Section 1: Currículo */}
        <div className="px-space-md pt-space-md pb-space-xs">
          <span className="text-[11px] text-text-muted uppercase font-semibold tracking-wider font-mono">
            Currículo Académico
          </span>
        </div>
        <nav className="flex flex-col gap-1 px-space-sm">
          {curriculumNav.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Section 2: Insights & Sistema */}
        <div className="px-space-md pt-space-md pb-space-xs">
          <span className="text-[11px] text-text-muted uppercase font-semibold tracking-wider font-mono">
            Reflexión y Ajustes
          </span>
        </div>
        <nav className="flex flex-col gap-1 px-space-sm">
          {systemNav.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer: Indicador Pedagógico Real (Sin falsa telemetría) */}
      <div className="p-space-sm m-space-sm rounded-lg bg-surface-card border border-border-subtle flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-muted font-mono uppercase">
            Enfoque
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-status-success font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
            Paso a Paso
          </span>
        </div>
        <div className="text-xs text-on-surface font-mono font-medium">
          Python 3.12 & C++20
        </div>
        <div className="text-[10px] text-text-muted">
          Primeros Principios • Sin Atajos
        </div>
      </div>
    </aside>
  );
}
