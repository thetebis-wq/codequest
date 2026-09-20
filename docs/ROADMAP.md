# Roadmap de Implementación: CodeQuest Lab

> **Guía Viva del Proyecto**  
> *Este documento es una brújula flexible: marca el norte del proyecto, pero se adaptará y refinará según avancemos y validemos cada nivel de aprendizaje.*

---

## Filosofía Rectora del Roadmap

1. **Pedagogía de Primeros Principios:** No avanzamos a un concepto sin antes haber entendido cómo funciona la máquina por dentro (RAM, CPU, Stack, Heap).
2. **El Puente Conceptual (Python $\leftrightarrow$ C++):** Cada hito contrasta el alto nivel dinámico con el bajo nivel estático de sistemas.
3. **Construcción Incremental y Verificable:** Cada fase termina con algo 100% funcional y probado en tu navegador antes de pasar a la siguiente.

---

```
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 0: Cimientos Técnicos, Tokens y Shell Base             │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 1: Arquitectura del Motor Pedagógico y Esquemas        │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 2: El Laboratorio IDE (Monaco Editor + Pyodide Local)  │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 3: Piloto Real de Aprendizaje: Nivel 0 y Nivel 1       │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 4: El Mapa de Currículo y Dashboard de Dominio         │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 5: Tutor Socrático Inteligente (Integración Gemini)    │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 6: Arena Técnica, Historial y Metacognición            │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ FASE 7: Persistencia Local-First, Respaldos y Pulido Final   │
  └─────────────────────────────────────────────────────────────┘
```

---

## Desglose Detallado por Fases

### Fase 0: Cimientos Técnicos, Tokens y Shell Base
*Objetivo: Tener la aplicación web levantada, limpia y con la identidad visual exacta de Stitch.*
- [x] Inicializar la estructura base de **Next.js 15** con TypeScript y Tailwind CSS en `c:\Proyectos\codequest`.
- [x] Configurar los tokens de color del tema oscuro (*DevLab Precision*: superficies `#131313`, primario `#adc7ff`, fuentes `Inter` y `JetBrains Mono`, iconos Material Symbols).
- [x] Crear el layout compartido:
  - `<Sidebar />`: Navegación lateral limpia hacia las secciones principales.
  - `<Header />`: Conmutador de lenguaje (Python / C++), racha de días reales y perfil.
- [x] **Resultado de la fase:** La web abre en `http://localhost:3000` con el shell visual impecable y sin errores de consola.

---

### Fase 1: Arquitectura del Motor Pedagógico y Esquemas
*Objetivo: Definir cómo se almacena y modela el conocimiento para que nunca falte teoría ni rigor.*
- [x] Diseñar el modelo de datos en TypeScript para los ejercicios (`PedagogicalExercise`):
  - Teoría y fundamentos matemáticos.
  - El puente conceptual (Python vs. C++).
  - Casos de prueba (entradas, salidas esperadas y pruebas de estrés).
  - Pistas socráticas graduadas (en 3 niveles, sin dar la respuesta).
- [x] Definir la estructura del catálogo en archivos JSON/Markdown dentro de `content/exercises/`.
- [x] **Resultado de la fase:** El sistema tiene un "contrato" riguroso que garantiza que ningún ejercicio sea una simple caja vacía tipo LeetCode.

---

### Fase 2: El Laboratorio IDE (Monaco Editor + Ejecución Local)
*Objetivo: Construir el corazón del proyecto: la pantalla de programación interactiva.*
- [x] Integrar **Monaco Editor** (el mismo editor de VS Code) adaptado con los colores oscuros de *DevLab Precision*.
- [x] Construir el layout de 3 paneles:
  1. **Panel Izquierdo:** Pestañas de Enunciado, Teoría/Matemática y Puente Conceptual.
  2. **Panel Central:** Editor de código interactivo con soporte de sintaxis para Python y C++.
  3. **Panel Derecho / Inferior:** Consola de salida y lista de casos de prueba evaluados en tiempo real.
- [x] Integrar **Pyodide (WebAssembly)**:
  - Permite ejecutar Python directamente en tu navegador, sin servidores, sin costos, sin latencia y con total seguridad.
- [x] **Resultado de la fase:** Puedes escribir código Python en el editor, presionar "Ejecutar" y ver los resultados y pruebas pasar de inmediato.

---

### Fase 3: Piloto Real de Aprendizaje: Nivel 0 y Nivel 1
*Objetivo: Validar la experiencia de aprendizaje completa con los primeros contenidos reales desde cero.*
- [x] **Nivel 0: La Máquina y la Memoria:**
  - Lección teórica interactiva: ¿Qué es la RAM? ¿Qué es una dirección de memoria? ¿Por qué compilar a binario vs. interpretar bytecode?
- [x] **Nivel 1: Variables, Tipos Primitivos y Representación:**
  - Ejercicio 1 (Python & C++): Asignación, tipos enteros y flotantes (estándar IEEE 754: por qué los decimales tienen errores de redondeo binario).
  - Ejercicio 2: El intercambio de variables (*Swap*) y cómo se gestiona la memoria en Stack vs. Heap.
- [x] **Resultado de la fase:** Puedes cursar y completar tus dos primeros ejercicios reales con teoría profunda y código ejecutable.

---

### Fase 4: El Mapa de Currículo y Dashboard de Dominio
*Objetivo: Tener la visión panorámica de la escalera de aprendizaje y el seguimiento de progreso.*
- [x] Construir la vista `/curriculum`:
  - Visualización del árbol de niveles con estados: *Bloqueado*, *En progreso*, *Completado*.
  - Selector de ruta: Track Python y Track C++.
  - Toggle de vista: Módulos colapsables o Grafo de habilidades interconectadas.
- [x] Construir la vista `/dashboard`:
  - Tarjetas de progreso real por concepto (Variables $\rightarrow$ Control de Flujo $\rightarrow$ Memoria $\rightarrow$ Estructuras de Datos).
  - Acceso directo al último ejercicio en curso.
- [x] **Resultado de la fase:** Navegación completa entre el mapa de niveles, el dashboard y el laboratorio de código.

---

### Fase 5: Tutor Socrático Inteligente (Integración con Gemini)
*Objetivo: Añadir un mentor pedagógico que te guíe con preguntas sin revelarte la solución.*
- [x] Crear la ruta de API segura en Next.js (`/api/tutor`).
- [x] Configurar el sistema de prompts pedagógicos de Gemini:
  - Regla de oro: **Nunca entregar el código resuelto**.
  - Diagnosticar el error exacto del estudiante (ej: *"revisa la línea 5, estás sobrescribiendo el puntero antes de leer su valor"*).
  - Explicar la teoría matemática si el estudiante está atascado.
- [x] Diseñar el panel flotante / drawer en el IDE para interactuar con el tutor.
- [x] **Resultado de la fase:** Si te trabas en un ejercicio, puedes pedir una pista socrática contextualizada a tu código actual.

---

### Fase 6: Arena Técnica, Historial y Metacognición
*Objetivo: Preparación rigurosa para entrevistas técnicas y análisis de errores frecuentes.*
- [x] Construir la vista `/interview` (Technical Arena):
  - Retos algorítmicos clásicos con límite de tiempo opcional.
  - Filtro por tema (arreglos, cadenas, recursión, punteros) y dificultad conceptual.
- [x] Construir la vista `/analytics`:
  - Historial de intentos y soluciones pasadas.
  - Registro de errores comunes identificados (ej: *"tiendes a olvidar el caso base en recursión"*).
  - Espacio de notas personales para afianzar el aprendizaje.
- [x] **Resultado de la fase:** Capacidad para medirte con problemas de nivel entrevista y reflexionar sobre tu progreso.

---

### Fase 7: Persistencia Local-First, Respaldos y Pulido Final
*Objetivo: Garantizar que tus datos sean 100% tuyos, privados y respaldables.*
- [x] Implementar almacenamiento local con **IndexedDB** / LocalStorage:
  - Tu progreso, soluciones escritas y notas se guardan automáticamente en tu navegador.
- [x] Construir la vista `/settings`:
  - Pestaña de Respaldo: Botón para exportar todo tu progreso a un archivo `codequest_backup.json` y restaurarlo cuando quieras.
  - Pestañas de configuración de editor, apariencia y preferencias.
- [x] Auditoría final de rendimiento, accesibilidad y eliminación de cualquier residuo de código no utilizado.
- [x] **Resultado de la fase:** Aplicación completa, robusta, rápida y lista para tu uso diario.
