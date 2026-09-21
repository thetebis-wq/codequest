# CodeQuest Lab: Auditoría Integral y Blueprint Pedagógico

> **Documento Rector de Arquitectura, Auditoría y Fundamentación Pedagógica**  
> **Ubicación:** `docs/PEDAGOGICAL_AUDIT_AND_BLUEPRINT.md`  
> **Referencias:** `codequest-antigravity-brief.md`, `codequest-design.md`, Tokens *DevLab Precision* y 44 archivos exportados de Google Stitch.

---

## 1. Resumen Ejecutivo y Diagnóstico de Brechas

El propósito fundacional de **CodeQuest Lab** (definido en `codequest-antigravity-brief.md`) es servir como un entorno de aprendizaje personal y profundo para dominar **Python y C++**, huyendo explícitamente del *"vibe coding"* (programar por inercia confiando a ciegas en la IA) y construyendo un entendimiento riguroso de:
1. La sintaxis y la semántica profunda de cada lenguaje.
2. La teoría computacional y matemática subyacente a cada algoritmo.
3. La gestión de memoria, complejidad asintótica y arquitectura de sistemas.
4. Las mejores prácticas de ingeniería de software (arquitectura limpia, tipos sólidos, pruebas y seguridad).

### Diagnóstico de lo realizado en Stitch vs. el Propósito Real
Google Stitch es una herramienta excepcional para generar layouts visuales de alta fidelidad, pero al exportar 22 pantallas generó tres problemas estructurales que deben corregirse antes de codificar:

1. **Hipertrofia y Fragmentación de Pantallas (22 pantallas generadas para 5 vistas reales):**  
   Stitch exportó una página HTML completa por cada pestaña, filtro o estado de interfaz que se interactuó en el canvas (por ejemplo, 5 páginas completas solo para las pestañas de Configuración y 7 páginas completas para ver el Currículo de distintas formas).
2. **Ruido Visual y "Falsa Complejidad" (Extraneous Cognitive Load):**  
   Stitch inyectó elementos decorativos de "centro de control espacial / telemetría DevOps" (*"Compiler Service Synced • Sub-12ms Latency"*, *"Runtime Node Online GCC 13.2"*, *"Session Protocol #2488"*, *"Token Budget 84,200"*). Para un estudiante individual, estos elementos generan fatiga cognitiva, confunden el modelo mental y desvían la atención del aprendizaje.
3. **Vacío Pedagógico Estructurado:**  
   Las pantallas muestran cajas visuales muy atractivas, pero el contenido interno es estático y desconectado de un plan instruccional real. Falta la columna vertebral: el andamiaje cognitivo, la vinculación conceptual entre el alto nivel (Python) y el bajo nivel (C++), y un modelo formal de evaluación.

---

## 2. Auditoría Exhaustiva Pantalla por Pantalla (Los 22 Archivos de Stitch)

A continuación se audita cada archivo exportado, identificando redundancias, ruido y su destino en la arquitectura limpia:

| # | Archivo HTML Exportado | Captura PNG | Contenido Generado en Stitch | Veredicto & Razón Arquitectónica | Destino en la App Limpia |
|---|---|---|---|---|---|
| 1 | `code_dashboard_overview_progress.html` | `screen_dashboard_overview_progress.png` | Dashboard con métricas de racha, bienvenida, accesos directos y gráficas simuladas. | **CONSOLIDAR & LIMPIAR:** Mantener el layout de tarjetas, pero retirar insignias falsas de latencia y protocolos ficticios. | `app/dashboard/page.tsx` |
| 2 | `code_xp_mastery_rewards_hub.html` | `screen_xp_mastery_rewards_hub.png` | Hub de XP con árbol de rangos, multiplicadores y "Top 12% global". | **SIMPLIFICAR:** En una app monousuario, competir contra un ranking global simulado es ruido. Transformar en panel de "Dominio de Competencias" (*Mastery Map*). | Integrar como pestaña o modal en `/dashboard` o sub-ruta `/curriculum/mastery`. |
| 3 | `code_languages_track_overview_selection.html` | `screen_languages_track_overview_selection.png` | Tarjetas comparativas para elegir entre el track de Python y C++. | **FUSIONAR:** Es solo una pantalla intermedia de selección. La selección de lenguaje debe ser instantánea y ubicua. | Se absorbe en el Header global y en `/curriculum`. |
| 4 | `code_level_map_python_c_tracks.html` | `screen_level_map_python_c_tracks.png` | Vista comparativa de caminos de aprendizaje de ambos lenguajes. | **REDUNDANTE:** Duplica la pantalla de selección y el explorador de currículo. | Unificar en `/curriculum`. |
| 5 | `code_level_map_c_systems_track_1.html` | `screen_level_map_c_systems_track_1.png` | Mapa de niveles de C++ (Fase 1: Fundamentos y Tipos). | **FRAGMENTACIÓN:** Stitch exportó la misma vista filtrada por pestaña. | Se convierte en estado reactivo dentro de `/curriculum?track=cpp`. |
| 6 | `code_level_map_c_systems_track_2.html` | `screen_level_map_c_systems_track_2.png` | Mapa de niveles de C++ (Fase 2: Memoria y Punteros). | **FRAGMENTACIÓN:** Continuación directa del archivo anterior. | Se unifica en `/curriculum?track=cpp`. |
| 7 | `code_level_map_curriculum_explorer_modules.html` | `screen_level_map_curriculum_explorer_modules.png` | Vista del currículo en formato de módulos colapsables con toggle lista/grafo. | **EXCELENTE BASE:** Este es el verdadero diseño maestro que debe gobernar el mapa de niveles. | Base oficial de `app/curriculum/page.tsx`. |
| 8 | `code_level_map_curriculum_syllabus_exercise_directory.html` | `screen_level_map_curriculum_syllabus_exercise_directory.png` | Tabla con lista plana de todos los ejercicios del syllabus. | **VISTA ALTERNATIVA:** Es solo el toggle "Lista plana" del archivo #7. | Vista condicional (View Toggle) en `/curriculum`. |
| 9 | `code_python_track_deep_dive_syllabus_milestones.html` | `screen_python_track_deep_dive_syllabus_milestones.png` | Hitos detallados de Python con descripción de proyectos. | **REDUNDANTE:** Misma información que el explorador modular pero con más texto. | Se integra como datos dinámicos en `/curriculum`. |
| 10 | `code_python_track_runtime_architecture_mastery_hub.html` | `screen_python_track_runtime_architecture_mastery_hub.png` | Vista especializada sobre GIL, bytecode y runtime de Python. | **CONTENIDO DE LECCIÓN:** No es una pantalla de navegación, es el contenido teórico de una lección avanzada. | Mover al repositorio de lecciones teóricas (`content/python/level-6/theory.md`). |
| 11 | `code_exercise_lab_blank_scratchpad_ide.html` | `screen_exercise_lab_blank_scratchpad_ide.png` | IDE vacío con editor central, consola inferior y panel lateral vacío. | **ESTADO VACÍO:** Es exactamente la misma pantalla del Lab cuando no hay ejercicio seleccionado. | Modo `app/lab/scratchpad/page.tsx`. |
| 12 | `code_exercise_lab_scratchpad_ide.html` | `screen_exercise_lab_scratchpad_ide.png` | Mismo IDE con un script genérico precargado. | **DUPLICADO:** Es el mismo componente con datos en el buffer. | Se unifica con el Scratchpad. |
| 13 | `code_exercise_lab_prime_sieve.html` | `screen_exercise_lab_prime_sieve.png` | IDE cargado con el reto de la Criba de Eratóstenes, teoría, objetivos y pruebas. | **LA JOYA DE LA CORONA:** El diseño perfecto de 3 paneles (Teoría $\rightarrow$ Editor $\rightarrow$ Consola/Pruebas). | Base oficial de `app/lab/[exerciseId]/page.tsx`. |
| 14 | `code_exercise_lab_challenge_catalog_sandboxes.html` | `screen_exercise_lab_challenge_catalog_sandboxes.png` | Catálogo en cuadrícula con tarjetas de sandboxes y retos disponibles. | **CONSERVAR:** Excelente índice para explorar ejercicios por dificultad y tema. | `app/lab/page.tsx` (Index del Lab). |
| 15 | `code_interview_exercises_technical_arena.html` | `screen_interview_exercises_technical_arena.png` | Arena de preparación para entrevistas técnicas (estilo LeetCode/HackerRank) con filtros de dificultad y compañías. | **CONSERVAR:** Cumple con el objetivo explícito del brief de preparar entrevistas con límites de tiempo. | `app/interview/page.tsx`. |
| 16 | `code_saved_problems_bookmarks_codequest_lab.html` | `screen_saved_problems_bookmarks_codequest_lab.png` | Lista de ejercicios marcados como favoritos / guardados para repasar. | **SIMPLIFICAR:** No amerita una pantalla completa en el sidebar principal. | Filtro "Guardados" dentro de `/lab` y `/interview`. |
| 17 | `code_hints_ai_tutoring_codequest_lab.html` | `screen_hints_ai_tutoring_codequest_lab.png` | Configuración del Tutor Socrático IA (frecuencia de pistas, estilo pedagógico). | **PESTAÑA DE AJUSTES:** Es en realidad la Pestaña 3 del módulo de Settings. | Se ubica en `/settings?tab=tutor`. Además, el widget interactivo del tutor vive dentro de `/lab/[exerciseId]`. |
| 18 | `code_code_history_analytics.html` | `screen_code_history_analytics.png` | Historial de intentos pasados, gráfica de tiempos y análisis de errores comunes. | **CONSERVAR & PROFUNDIZAR:** Es vital para el aprendizaje reflexivo (*metacognición*). | `app/analytics/page.tsx`. |
| 19 | `code_settings_preferences_codequest_lab.html` | `screen_settings_preferences_codequest_lab.png` | Pestaña de Perfil y Metas de Aprendizaje del usuario. | **PESTAÑA DE AJUSTES:** Pestaña 1 de Settings. | `app/settings/page.tsx?tab=profile`. |
| 20 | `code_settings_editor_compiler_toolchain.html` | `screen_settings_editor_compiler_toolchain.png` | Pestaña de configuración de compiladores (flags de GCC, versión de Python, vim mode). | **PESTAÑA DE AJUSTES:** Pestaña 2 de Settings. | `app/settings/page.tsx?tab=editor`. |
| 21 | `code_settings_preferences_appearance_localization.html` | `screen_settings_preferences_appearance_localization.png` | Pestaña de tema oscuro/claro, fuente mono e idioma. | **PESTAÑA DE AJUSTES:** Pestaña 4 de Settings. | `app/settings/page.tsx?tab=appearance`. |
| 22 | `code_settings_data_privacy_backups.html` | `screen_settings_data_privacy_backups.png` | Pestaña de exportación/importación JSON de progreso y borrado de datos. | **PESTAÑA DE AJUSTES:** Pestaña 5 de Settings. | `app/settings/page.tsx?tab=data`. |

---

## 3. Limpieza del Ruido Visual y "Falsa Complejidad"

Para maximizar la concentración del estudiante y reducir la carga cognitiva extraña:

### A. Elementos a Eliminar Incondicionalmente
1. **Badges de falsa infraestructura en el Sidebar:**
   * `Runtime Node Online: GCC 13.2 / Py 3.12` con luces verdes parpadeantes. Da la impresión de un panel de monitoreo de servidores Kubernetes, cuando es un entorno de estudio personal.
2. **Textos de relleno de "ciencia ficción" en cabeceras:**
   * *"Compiler Service Synced • Sub-12ms Latency"*
   * *"Session Protocol #2488"*
   * *"Stage 3 Active"*
   * *"Token Budget: 84,200 / 100,000 monthly"*
3. **Mecánicas superficiales de "juego móvil":**
   * Botón de *"Claim Daily Login Bonus"* (recompensa por iniciar sesión).
   * *"Global Rank: Top 12%"* (ficticio y desmotivante para un solo usuario).

### B. Elementos Pedagógicos Reales que los Reemplazan
1. **Indicador de Estado de Ejecución Real:**
   * Cuando se evalúa código: `Pyodide: Listo (WASM local)` o `Compilando C++20... (g++ -O2 -Wall)`.
2. **Indicador de Progreso por Concepto:**
   * En vez de "Protocolo 2488", mostrar: `Nivel 3: Bucles e Invariantes • Ejercicio 4 de 8`.
3. **Racha de Aprendizaje Genuina:**
   * Días consecutivos estudiando con registro de tiempo activo real (Pomodoro o minutos programando).
4. **Métricas de Rendimiento del Código Real del Usuario:**
   * Tiempo de ejecución medido en milisegundos reales.
   * Consumo aproximado de memoria auxiliar.
   * Pasos de prueba unitaria superados (ej: `5/5 pruebas pasadas • 0 leaks detectados`).

---

## 4. Marco Pedagógico y Académico Riguroso

Para que CodeQuest Lab sea verdaderamente una herramienta de formación académica de élite:

### A. Fundamentación en Ciencias del Aprendizaje
1. **Taxonomía Revisada de Bloom:**
   Cada nivel instruccional no salta de inmediato a programar desde cero. Sigue una progresión graduada:
   * **Recordar / Comprender:** La pestaña *Theory & Math* explica el teorema, los axiomas y el modelo mental.
   * **Analizar:** Se entrega un ejercicio con código base que contiene un error conceptual o caso de borde (como en la Criba de Eratóstenes), forzando al estudiante a inspeccionar y entender.
   * **Aplicar:** Escribir la implementación correcta que optimiza tiempo y espacio.
   * **Evaluar:** Correr la batería de pruebas y contrastar la complejidad asintótica teórica vs. la medida empíricamente.
2. **Andamiaje Cognitivo (*Cognitive Scaffolding & Fading*):**
   * En niveles iniciales: Ejercicios tipo *Parson's Problems* (ordenar bloques) o completar huecos críticos (*fill-in-the-blank*).
   * En niveles intermedios: Función con especificación estricta de precondiciones e invariantes.
   * En niveles avanzados (Arena de Entrevistas): Pantalla en blanco con enunciado y pruebas ocultas de estrés ($N = 10^6$).
3. **Práctica de Recuperación y Metacognición (*Retrieval Practice*):**
   * En cada ejercicio hay un campo obligatorio de **Notas Personales / Lecciones Aprendidas** ("¿Qué error cometí en el primer intento y cómo lo evito a futuro?"). Esto alimenta la pantalla de *Analytics*.

### B. El Puente Conceptual: Python $\leftrightarrow$ C++ (La Llave de la Maestría)
El núcleo formativo de CodeQuest es aprender simultáneamente un lenguaje de muy alto nivel con tipado dinámico y recolección de basura (**Python**) y un lenguaje de sistemas de bajo nivel con compilación nativa y control de memoria (**C++**).

En cada nivel curricular, la plataforma debe explicar explícitamente el puente entre ambos:

| Concepto Académico | Cómo se vive en Python (Abstracción) | Cómo funciona en C++ (Hardware y Memoria) | Lección Pedagógica Profunda |
|---|---|---|---|
| **Variables y Tipos** | Nombres que apuntan a objetos en Heap. Todo es un `PyObject`. Tipado dinámico con introspección en tiempo de ejecución. | Espacio exacto de bytes reservado en Stack o Heap. Tipado estático determinado en compilación (`sizeof(int) = 4`). | Por qué Python es flexible pero consume ~28 bytes por un simple entero, mientras C++ es ultrarrápido y mapea directo a registros de CPU. |
| **Arreglos / Listas** | `list` es un arreglo dinámico de punteros a objetos dispersos en memoria. | `std::vector<T>` aloja elementos contiguos en memoria; arreglos fijos `T arr[N]` viven contiguos en el Stack. | Localidad espacial de caché de la CPU: por qué iterar sobre un `vector<int>` en C++ es órdenes de magnitud más rápido que iterar una `list` en Python. |
| **Paso de Parámetros** | *Pass-by-assignment* (pasa la referencia al objeto). Modificar un mutable (`list`) altera el original; reasignar crea un nuevo puntero local. | Control explícito del programador: Paso por valor (`T`), paso por referencia (`T&`), paso por referencia constante (`const T&`) o puntero (`T*`). | Cómo evitar copias costosas de memoria y cómo prevenir efectos secundarios indeseados. |
| **Gestión de Memoria** | Automática mediante conteo de referencias (*Reference Counting*) y Recolector de Basura cíclico (*Generational GC*). El desarrollador no libera memoria. | Determinística mediante **RAII** (*Resource Acquisition Is Initialization*), destructores automáticos o punteros inteligentes (`std::unique_ptr`, `std::shared_ptr`). | La diferencia fundamental entre pausar el hilo para recolectar basura y liberar memoria en $O(1)$ cuando un objeto sale de ámbito (*scope*). |
| **Funciones y Closures** | Funciones son objetos de primera clase. Capturan el entorno léxico en un objeto de closure dinámico. | Funciones son direcciones en la sección `.text`. Las lambdas generan estructuras con operadores `operator()` y listas de captura por valor o referencia. | Cómo la pila de llamadas (*Call Stack*) y los registros manejan el salto de ejecución y qué sobrecosto tiene capturar variables. |
| **Polimorfismo y POO** | *Duck Typing* puro ("si camina como pato..."). La resolución de métodos se hace en tiempo de ejecución vía diccionario `__dict__` y MRO. | Tipado nominal estático. Polimorfismo en tiempo de compilación con plantillas (*Templates*), o en tiempo de ejecución mediante tablas virtuales (`vtable` y puntero `vptr`). | El balance de ingeniería entre flexibilidad dinámica y costo de indirección de memoria en tiempo de ejecución. |

---

## 5. Arquitectura del Código Limpia y Modular (Next.js 15)

En lugar de arrastrar 22 archivos monolíticos redundantes, consolidamos la plataforma en **5 vistas de primer nivel**, respaldadas por componentes altamente modulares y tipados:

```
codequest/
├── app/
│   ├── layout.tsx                     # Shell común: Sidebar + Header (DevLab Precision)
│   ├── page.tsx                       # Redirección inteligente al Dashboard
│   ├── dashboard/
│   │   └── page.tsx                   # VISTA 1: Dashboard, racha, dominio por temas y accesos
│   ├── curriculum/
│   │   └── page.tsx                   # VISTA 2: Mapa de niveles unificado (Filtro Python/C++, Vista Módulos/Grafo)
│   ├── lab/
│   │   ├── page.tsx                   # VISTA 3A: Catálogo de ejercicios, sandboxes y retos
│   │   ├── scratchpad/page.tsx        # VISTA 3B: IDE libre sin problema asignado
│   │   └── [exerciseId]/page.tsx      # VISTA 3C: IDE Maestro con los 5 paneles pedagógicos
│   ├── interview/
│   │   └── page.tsx                   # VISTA 4: Arena técnica con cronómetro y filtros FAANG/Systems
│   ├── analytics/
│   │   └── page.tsx                   # VISTA 5: Historial de soluciones, gráficas reales de tiempo/espacio y errores
│   ├── settings/
│   │   └── page.tsx                   # VISTA 6: Ajustes consolidados en pestañas (Perfil, Editor, Tutor, Datos)
│   └── api/
│       ├── tutor/route.ts             # Endpoint seguro de streaming con Gemini API
│       └── run-cpp/route.ts           # Endpoint sandbox de compilación C++ (Piston/Judge0)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx                # Navegación lateral limpia (sin falsa telemetría)
│   │   └── Header.tsx                 # Switcher Python/C++, racha de estudio y perfil
│   ├── lab/
│   │   ├── CodeEditor.tsx             # Monaco Editor configurado con tema DevLab
│   │   ├── ProblemSpecPanel.tsx       # Enunciado, objetivos y restricciones I/O
│   │   ├── TheoryMathPanel.tsx        # Fundamento matemático, teorema y modelo mental
│   │   ├── LanguageBridgePanel.tsx    # Explicación del puente Python vs. C++
│   │   ├── OutputConsole.tsx          # Terminal interactiva de salida
│   │   ├── TestCasesList.tsx          # Lista de casos de prueba (esperado vs. obtenido)
│   │   └── SocraticTutorDrawer.tsx    # Asistente IA con preguntas guía
│   └── curriculum/
│       ├── LevelModuleCard.tsx        # Módulo de aprendizaje con badges de estado
│       └── SkillGraphView.tsx         # Vista de árbol de dependencias
├── content/                           # BASE DE CONOCIMIENTO Y EJERCICIOS ACADÉMICOS
│   ├── exercises/
│   │   ├── python/
│   │   │   ├── 01-variables.json
│   │   │   ├── 14-prime-sieve.json    # Reto de la Criba con rigor formal
│   │   │   └── ...
│   │   └── cpp/
│   │       ├── 01-types-memory.json
│   │       ├── 14-prime-sieve.json
│   │       └── ...
│   └── theory/                        # Documentos Markdown con la teoría profunda por nivel
├── lib/
│   ├── runner/
│   │   ├── pyodideRunner.ts           # Ejecutor WASM en navegador para Python
│   │   └── cppRunner.ts               # Cliente API para compilación C++
│   └── storage/
│       └── localStore.ts              # Persistencia Local-First (IndexedDB / LocalStorage)
```

---

## 6. Especificación Estándar de un Ejercicio Pedagógico

Para garantizar que ningún ejercicio sea superficial, cada problema en `content/exercises/` cumplirá estrictamente con la siguiente estructura tipada de TypeScript:

```typescript
export interface PedagogicalExercise {
  id: string;                          // Ej: "py-lvl3-ex14-prime-sieve"
  title: string;                       // "Criba de Eratóstenes y Divisibilidad"
  track: 'python' | 'cpp';
  level: number;                       // Nivel 3: Bucles y Optimización
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;

  // 1. Especificación del Problema
  spec: {
    summary: string;
    learningObjectives: string[];      // ["Manejo de máscaras booleanas", "Cota superior en sqrt(n)"]
    constraints: {
      inputRange: string;              // "2 <= n <= 10^7"
      timeLimitMs: number;             // 1000 ms
      auxiliarySpace: string;          // "O(n) bits"
    };
  };

  // 2. Fundamento Teórico y Matemático
  theory: {
    mathematicalFoundation: string;    // Teorema Fundamental de la Aritmética y factorización prima
    algorithmStrategy: string;         // Por qué tachar múltiplos desde p*p y no desde 2*p
    asymptoticComplexity: {
      time: "O(n log log n)";
      space: "O(n)";
      proofExplanation: string;        // Suma de inversos de primos (Teorema de Mertens)
    };
  };

  // 3. Puente Conceptual entre Lenguajes
  languageBridge: {
    pythonInsight: string;             // Lista de bools `[True] * (n + 1)` en Python y costo en memoria
    cppComparison: string;             // `std::vector<bool>` en C++ como arreglo empaquetado a nivel de bits (1 bit por elemento)
  };

  // 4. Código Inicial y Pruebas
  starterCode: string;                 // Código inicial con andamiaje o bug inyectado para depurar
  solutionReference: string;           // Solución canónica de referencia
  testCases: Array<{
    input: any;
    expectedOutput: any;
    isHidden: boolean;                 // Pruebas visibles vs. pruebas de estrés ocultas
    description: string;
  }>;

  // 5. Pistas Socráticas (3 Niveles Escalonados)
  socraticHints: [
    { level: 1; prompt: "¿Cuál es el múltiplo compuesto más pequeño de p que aún no ha sido tachado por primos anteriores?" },
    { level: 2; prompt: "Si un número k es divisible por un primo p > sqrt(n), ¿qué podemos deducir sobre su otro factor q?" },
    { level: 3; prompt: "Verifica si tu bucle interno comienza en p * p y se incrementa en pasos de p." }
  ];
}
```

---

## 7. Plan de Acción Inmediato y Preguntas de Alineación

Con este blueprint, el proyecto queda 100% blindado contra el ruido, la duplicación y el *vibe coding*.

### Preguntas Clave para el Usuario antes de Comenzar:
1. **Consolidación Estructural:** ¿Confirmas que procedamos a implementar las **5 vistas limpias** (`/dashboard`, `/curriculum`, `/lab`, `/interview`, `/analytics`, `/settings`), descartando la duplicación de los 22 archivos de Stitch pero reutilizando todos sus componentes de UI pulidos?
2. **Eliminación del Ruido Visual:** ¿Confirmas la eliminación de los falsos textos de telemetría de servidor (*"Sub-12ms Latency"*, *"Session Protocol #2488"*) para sustituirlos por métricas pedagógicas reales de tiempo de ejecución y memoria?
3. **Inicio de la Fase 1:** ¿Deseas que iniciemos inmediatamente con el andamiaje del proyecto en Next.js en el repositorio, configurando los tokens de *DevLab Precision*, el layout base (Sidebar y Header limpios) y la estructura de directorios?
