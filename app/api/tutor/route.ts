import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getExerciseById } from "@/lib/exercises";

const SOCRATIC_SYSTEM_INSTRUCTION = `
Eres el Mentor Pedagógico Socrático de "CodeQuest Lab".
Tu misión es enseñar ciencias de la computación e ingeniería de software a través de PRIMEROS PRINCIPIOS, comparando Python 3.12 y C++ 20.

REGLAS DE ORO SAGRADAS:
1. NUNCA, BAJO NINGUNA CIRCUNSTANCIA, ESCRIBAS EL CÓDIGO DE LA SOLUCIÓN COMPLETA PARA EL ESTUDIANTE.
2. Si el estudiante te pide "dame la solución" o "resuelve el ejercicio", recuérdale amablemente que tu función es guiar su razonamiento y hazle una pregunta que le permita dar el siguiente paso por sí mismo.
3. Si el estudiante tiene un error de sintaxis, compilación o fallo en una prueba unitaria:
   - Señala la línea o la operación sospechosa.
   - Explica qué está ocurriendo a nivel de máquina o modelo mental (ej: sobreescritura destructiva de memoria, puntero no inicializado, imprecisión de punto flotante IEEE 754, etc.).
   - Pregunta al estudiante qué cree que ocurre con el valor anterior en la memoria cuando se ejecuta esa línea.
4. Mantén tus respuestas CONCISAS, DIDÁCTICAS Y ENFOCADAS (máximo 2 párrafos breves o viñetas claras).
5. Usa terminología precisa de sistemas cuando sea relevante: Stack, Heap, Call Stack, Punteros, Referencias, Bytecode, Registros de CPU, IEEE 754.
6. Si te preguntan sobre el puente conceptual (Python vs C++), contrasta la abstracción de alto nivel con la gestión de bajo nivel.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      exerciseId,
      code,
      language,
      lastError,
      action,
      userMessage,
      history = [],
    } = body;

    const exercise = exerciseId ? getExerciseById(exerciseId) : null;
    const apiKey = process.env.GEMINI_API_KEY;

    // --- FALLBACK LOCAL OFFLINE SI NO HAY API KEY ---
    if (!apiKey) {
      let fallbackReply = "";

      if (action === "HINT_LEVEL_1" && exercise?.socraticHints?.[0]) {
        fallbackReply = `💡 **Pista Nivel 1: ${exercise.socraticHints[0].title}**\n\n${exercise.socraticHints[0].prompt}`;
      } else if (action === "HINT_LEVEL_2" && exercise?.socraticHints?.[1]) {
        fallbackReply = `🔍 **Pista Nivel 2: ${exercise.socraticHints[1].title}**\n\n${exercise.socraticHints[1].prompt}`;
      } else if (action === "HINT_LEVEL_3" && exercise?.socraticHints?.[2]) {
        fallbackReply = `⚠️ **Pista Nivel 3: ${exercise.socraticHints[2].title}**\n\n${exercise.socraticHints[2].prompt}`;
      } else if (action === "EXPLAIN_THEORY" && exercise) {
        fallbackReply = `🧠 **Fundamento Teórico: ${exercise.theory.title}**\n\n${exercise.theory.mathematicalFoundation}\n\n*Modelo Mental:* ${exercise.theory.mentalModel}`;
      } else if (action === "EXPLAIN_ERROR" && lastError) {
        fallbackReply = `🔍 **Diagnóstico de Error:**\n\nEl sistema reportó:\n\`\`\`\n${lastError}\n\`\`\`\n\n¿Qué tipo de dato o valor esperaba la función en el paso donde ocurrió este fallo? Revisa si alguna variable fue sobreescrita antes de ser leída.`;
      } else {
        const hint1 = exercise?.socraticHints?.[0]
          ? `💡 **${exercise.socraticHints[0].title}:**\n${exercise.socraticHints[0].prompt}`
          : "Revisa las precondiciones y el flujo de memoria de tu código.";
        fallbackReply = `🤖 **Mentor Socrático:**\n\n${hint1}\n\n*(Nota: Puedes configurar \`GEMINI_API_KEY\` en \`.env.local\` para activar el diálogo dinámico con IA en vivo).*`;
      }

      return NextResponse.json({
        reply: fallbackReply,
        mode: "local_socratic",
      });
    }

    // --- MODO GEMINI 2.5 FLASH ONLINE ---
    const ai = new GoogleGenAI({ apiKey });

    // Preparar el contexto pedagógico
    const contextPrompt = `
EJERCICIO ACTIVO:
- Título: ${exercise?.title || "Laboratorio Scratchpad"}
- Lenguaje seleccionado: ${language || "python"}
- Fundamento: ${exercise?.theory?.title || "Fundamentos de Computación"}
- Teoría Matemática: ${exercise?.theory?.mathematicalFoundation || "N/A"}
- Modelo Mental: ${exercise?.theory?.mentalModel || "N/A"}
- Puente Conceptual: Python: ${exercise?.languageBridge?.pythonExplanation || "N/A"} | C++: ${exercise?.languageBridge?.cppExplanation || "N/A"}
- Pistas socráticas pedagógicas del ejercicio: ${
      exercise?.socraticHints?.map((h) => `[Nivel ${h.level} - ${h.title}]: ${h.prompt}`).join(" | ") || "N/A"
    }

CÓDIGO ACTUAL DEL ESTUDIANTE:
\`\`\`${language || "python"}
${code || "# (Editor vacío)"}
\`\`\`

ÚLTIMO ERROR O FALLO DE TEST REPORTADO:
${lastError ? `\`\`\`\n${lastError}\n\`\`\`` : "Ninguno (o no ha ejecutado aún)."}

PETICIÓN O PREGUNTA DEL ESTUDIANTE:
${userMessage || (action ? `Acción solicitada: ${action}` : "¿Cómo voy con mi solución?")}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contextPrompt,
      config: {
        systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
        temperature: 0.3, // Temperatura baja para respuestas precisas y rigurosas
      },
    });

    const reply = response.text || "No se pudo generar la respuesta. Por favor intenta de nuevo.";

    return NextResponse.json({
      reply,
      mode: "gemini_online",
    });
  } catch (error: any) {
    console.error("Error en /api/tutor:", error);

    // Fallback de contingencia ante cualquier error de red o cuota de API
    return NextResponse.json(
      {
        reply: `⚠️ Ocurrió una interrupción temporal con el servicio de IA: ${error?.message || "Error desconocido"}.
        
Puedes apoyarte en la pestaña de **Teoría y Matemática** y en el **Puente Conceptual** en el panel izquierdo mientras se restablece la conexión.`,
        mode: "error_fallback",
      },
      { status: 200 }
    );
  }
}
