# CodeQuest Lab 🚀

[![CI](https://github.com/thetebis-wq/codequest/actions/workflows/ci.yml/badge.svg)](https://github.com/thetebis-wq/codequest/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python&logoColor=white)
![C++](https://img.shields.io/badge/C%2B%2B-20-00599C?style=flat&logo=c%2B%2B&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Plataforma web gamificada e interactiva de aprendizaje profundo de programación desde cero en **Python 3.12** y **C++ 20**, con editor Monaco integrado, ejecución de código en tiempo real, diagnósticos pedagógicos guiados y tutor socrático impulsado por IA (Gemini).

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend & UI:** [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Editor de Código:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`)
- **Motores de Ejecución:**
  - **Python 3.12:** Ejecución real en el navegador mediante Pyodide (WebAssembly).
  - **C++ 20:** Motor de ejecución nativo en TypeScript con soporte de STL (`<iostream>`, `<vector>`, `<cmath>`, etc.), clases y memoria.
  - **Diagnósticos:** Análisis estático pedagógico en español para errores comunes de principiantes.
- **Tutor Socrático IA:** Google GenAI SDK (`@google/genai`) con modelo Gemini.

---

## 📂 Estructura del Proyecto

```text
codequest/
├── app/                  # Rutas y páginas de Next.js (App Router)
│   ├── analytics/        # Panel de analíticas y métricas de código
│   ├── api/tutor/        # Endpoint API para el Tutor Socrático con Gemini
│   ├── curriculum/       # Mapa curricular e interactivo de lecciones
│   ├── dashboard/        # Resumen de progreso y estadísticas del usuario
│   ├── interview/        # Retos de código estilo entrevista técnica
│   ├── lab/              # Entorno de laboratorio y resolución de ejercicios
│   └── settings/         # Preferencias y gestión de respaldos locales
├── components/           # Componentes UI modulares (Editor, Consola, Drawer)
├── content/              # Contenido pedagógico del curso
│   ├── curriculum/       # Definición de módulos y lecciones (Python y C++)
│   └── exercises/        # Catálogo de 36 ejercicios prácticos paso a paso
├── docs/                 # Documentación y blueprints del proyecto
│   ├── codequest-antigravity-brief.md
│   ├── PEDAGOGICAL_AUDIT_AND_BLUEPRINT.md
│   └── ROADMAP.md
├── lib/                  # Lógica de negocio y motores
│   ├── runner/           # Pyodide, C++ runner y análisis de diagnósticos
│   ├── storage/          # Persistencia en localStorage y exportación de backups
│   └── exercises.ts      # API unificada de consulta de ejercicios
├── tests/                # Suites de verificación y pruebas automatizadas
└── types/                # Definiciones de tipos TypeScript
```

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar suite de pruebas de verificación (runners, currículo y andamiaje)
npm test

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start

# Ejecutar linter
npm run lint
```

---

## 📚 Documentación Adicional

En la carpeta [`docs/`](./docs) encontrarás los detalles de diseño y arquitectura:
- [`codequest-antigravity-brief.md`](./docs/codequest-antigravity-brief.md): Objetivos personales, metodología y stack de herramientas.
- [`PEDAGOGICAL_AUDIT_AND_BLUEPRINT.md`](./docs/PEDAGOGICAL_AUDIT_AND_BLUEPRINT.md): Arquitectura pedagógica y blueprint curricular.
- [`ROADMAP.md`](./docs/ROADMAP.md): Hoja de ruta y futuros hitos del proyecto.
