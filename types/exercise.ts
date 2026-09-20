export type SupportedLanguage = "python" | "cpp";

export type TrackId = "python" | "cpp";

export type EvaluationType = "stdout" | "function_return" | "variable_check";

export interface AsymptoticComplexity {
  time: string;           // Ej: "O(1)", "O(n)", "O(n log n)"
  space: string;          // Ej: "O(1)", "O(n) bits", "O(n) bytes"
  proofExplanation: string;
}

export interface SocraticHint {
  level: 1 | 2 | 3;
  title: string;
  prompt: string;         // Pregunta guía que hace pensar al estudiante sin dar la solución
}

export interface ExerciseTestCase {
  id: string;
  description: string;
  input: string;          // Parámetros de entrada como string o JSON
  expectedOutput: string;
  evaluationType?: EvaluationType;
  targetVariable?: string;
  isHidden?: boolean;     // Pruebas visibles para depurar vs pruebas ocultas de evaluación
}

// Mantenemos compatibilidad hacia atrás con TestCase existente
export interface TestCase extends ExerciseTestCase {}

export interface LanguageBridge {
  pythonExplanation: string;  // Cómo lo resuelve la VM de Python (alto nivel, Heap, PyObject)
  cppExplanation: string;     // Cómo lo resuelve C++ en hardware (bajo nivel, Stack, punteros, bytes)
  comparativeTable?: Array<{
    dimension: string;
    python: string;
    cpp: string;
  }>;
}

export interface RealWorldContext {
  industry: string;             // Ej: "Aeroespacial y Satélites", "Fintech y Banca", "Motores Gráficos"
  problemStatement: string;     // Qué problema real de producción resuelve este código
  consequences: string;         // Qué desastre o bug de producción ocurre si se ignora el modelo de la máquina
}

export interface PedagogicalExercise {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  difficulty: "Fundamento" | "Intermedio" | "Avanzado";
  xpReward: number;
  entryFunctionName?: string;    // Nombre de la función principal a evaluar (ej: "intercambiar", "decode_telemetry")

  // Contexto de Ingeniería Real
  realWorldContext?: RealWorldContext;

  // 1. Especificación del Problema
  spec: {
    summary: string;
    learningObjectives: string[];
    constraints: {
      inputRange: string;
      timeLimitMs: number;
      auxiliarySpace: string;
    };
  };

  // 2. Fundamento Teórico y Matemático
  theory: {
    title: string;
    physicalReality?: string;    // La realidad del silicio: transistores, voltajes, celdas de memoria, ciclos de reloj
    mathematicalFoundation: string;
    mentalModel: string;
    historicalFootnote?: string; // Casos históricos reales (ej: Patriot Missile, Ariane 5)
    asymptoticComplexity: AsymptoticComplexity;
  };

  // 3. El Puente Conceptual (Python ↔ C++)
  languageBridge: LanguageBridge;

  // 4. Códigos Iniciales con Andamiaje (Scaffolding)
  starterCodes: {
    python: string;
    cpp: string;
  };

  // 5. Soluciones Canónicas de Referencia
  solutionReferences: {
    python: string;
    cpp: string;
  };

  // 6. Batería de Pruebas Unitarias
  testCases: TestCase[];

  // 7. Pistas Socráticas Escalonadas (3 Niveles)
  socraticHints: SocraticHint[];
}

export interface CurriculumLevel {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  concepts: string[];
  status: "active" | "locked" | "completed";
  exercises: PedagogicalExercise[];
}

// ---------------------------------------------------------------------------
// Nuevas interfaces para la arquitectura de Tracks (Python 3.12 y C++ 20)
// ---------------------------------------------------------------------------

export interface TrackExercise {
  id: string;
  track: TrackId;
  moduleId: number;
  lessonId: string;
  order: number;
  title: string;
  subtitle: string;
  difficulty: "Fundamento" | "Intermedio" | "Avanzado";
  xpReward: number;
  entryFunctionName?: string;
  evaluationType: EvaluationType;
  targetVariable?: string;
  spec: {
    summary: string;
    instructions: string[];
    learningObjectives: string[];
    constraints?: {
      inputRange?: string;
      timeLimitMs?: number;
      auxiliarySpace?: string;
    };
  };
  theory: {
    title: string;
    explanation: string;
    mentalModel: string;
    codeExample?: string;
  };
  starterCode: string;
  solutionReference: string;
  testCases: ExerciseTestCase[];
  socraticHints: SocraticHint[];
}

export interface TrackLesson {
  id: string;
  track: TrackId;
  moduleId: number;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  exerciseIds: string[];
}

export interface TrackModule {
  id: number;
  track: TrackId;
  title: string;
  subtitle: string;
  description: string;
  concepts: string[];
  lessonIds: string[];
}
