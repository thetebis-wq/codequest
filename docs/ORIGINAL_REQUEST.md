# Original User Request

## 2026-09-20T01:59:50Z

Transform CodeQuest Lab from a theoretical architecture simulator into a comprehensive, practical, step-by-step programming school that teaches students how to program from absolute zero in Python 3.12 and C++ 20.

Working directory: c:\Proyectos\codequest
Integrity mode: development

## Requirements

### R1. Dos Tracks Independientes y Completos desde Cero: Python 3.12 y C++ 20
Reemplazar los 5 niveles teóricos por dos rutas de estudio estructuradas, separadas e independientes (para aprender cada lenguaje con su propia identidad, sin comparativas confusas):

**Track Python 3.12:**
1. **Módulo 1: Tu Primer Programa y la Consola:** Qué es un script, qué hace el intérprete, `print()`, comentarios `#`, salida de texto y números.
2. **Módulo 2: Variables y Tipos de Datos:** Qué es una variable (la analogía de la caja con etiqueta), nombres válidos, enteros (`int`), decimales (`float`), texto (`str`), booleanos (`bool`), cómo consultar el tipo con `type()`.
3. **Módulo 3: Operaciones y Expresiones:** Suma, resta, multiplicación, división real `/` y entera `//`, módulo `%`, concatenación de strings y f-strings (`f"Hola {nombre}"`).
4. **Módulo 4: Tomar Decisiones (Condicionales):** Operadores de comparación (`==`, `!=`, `<`, `>`, `<=`, `>=`), estructura `if`, `elif`, `else`, operadores lógicos `and`, `or`, `not`.
5. **Módulo 5: Repetición y Bucles:** Bucles contadores con `for ... in range(...)`, bucles condicionales `while`, control de bucles `break` y `continue`, el patrón del acumulador.
6. **Módulo 6: Funciones:** Qué es una función (una receta reutilizable), `def`, parámetros, argumentos, valor de retorno `return`, variables locales vs globales.
7. **Módulo 7: Colecciones de Datos:** Listas (`list`), agregar elementos con `.append()`, consultar por índice `[0]`, longitud con `len()`, tuplas y diccionarios básicos (`dict`).
8. **Módulo 8: Programación Orientada a Objetos (POO):** Qué es una `class`, qué es un objeto/instancia, el método constructor `__init__`, el parámetro `self`, atributos y métodos.
9. **Módulo 9: Módulos y Librerías:** Cómo importar y utilizar librerías estándar como `math` (`math.sqrt`), `random` (`random.randint`).

**Track C++ 20:**
1. **Módulo 1: Estructura Básica y Compilación:** La función `int main()`, directiva `#include <iostream>`, `std::cout`, el operador `<<`, salto de línea `\n`, el punto y coma `;`.
2. **Módulo 2: Variables y Tipado Estricto:** Declaración obligatoria de tipo (`int`, `double`, `char`, `bool`, `std::string`), inicialización, qué pasa si asignas un tipo incorrecto.
3. **Módulo 3: Operaciones Aritméticas y Lógicas:** Operadores `+`, `-`, `*`, `/`, `%`, comparación y operadores lógicos `&&`, `||`, `!`.
4. **Módulo 4: Control de Flujo:** `if`, `else if`, `else`, el operador ternario, sentencias de bloque con llaves `{ }`.
5. **Módulo 5: Bucles:** Bucle `for (int i = 0; i < n; i++)`, bucle `while`, bucle `do-while`.
6. **Módulo 6: Funciones en C++:** Prototipos y firmas, tipos de retorno, parámetros por valor vs por referencia (`&`), `void`.
7. **Módulo 7: Arreglos y Vectores:** Arrays nativos de tamaño fijo vs `std::vector` dinámico (`#include <vector>`, `.push_back()`, `.size()`).
8. **Módulo 8: Clases y Objetos en C++:** `class` y `struct`, especificadores de acceso (`public`, `private`), constructores, métodos miembros y el puntero implícito `this`.
9. **Módulo 9: Librerías Estándar de C++:** `#include <cmath>`, `#include <string>`, `#include <algorithm>`.

### R2. Metodología Práctica Intensiva (Cero Soluciones Pre-escritas)
- Cada lección debe contener 2 a 3 ejercicios prácticos progresivos.
- El editor de código del alumno NO debe incluir la solución terminada. Debe proveer plantillas guiadas con instrucciones paso a paso:
  # PASO 1: Declara una variable llamada 'edad' con el valor 20
  # PASO 2: Declara una variable llamada 'nombre' con tu nombre en texto
  # PASO 3: Imprime ambas usando print()
- Enunciados redactados en español claro, humano y sin pretensiones académicas innecesarias.

### R3. Visualización y Retroalimentación Inmediata
- El ejecutor WebAssembly (Pyodide para Python y motor de compilación para C++) debe validar el código del estudiante contra casos de prueba reales.
- El panel de pruebas debe mostrar claramente si la prueba fue superada o falló, mostrando qué se esperaba y qué produjo el código del estudiante.
- Diagnóstico amigable de errores comunes (falta de `:` en Python, falta de `;` en C++, nombres mal escritos, errores de indentación).

## Acceptance Criteria

### Amplitud y Progresión
- [ ] Catálogo completo con al menos 20 lecciones prácticas distribuidas secuencialmente entre Python y C++.
- [ ] Los conceptos de Variables, Tipos de datos, Consola, Condicionales, Bucles, Funciones, Colecciones, POO (Clases y Objetos) y Librerías están cubiertos de forma explícita.

### Verificación y Calidad
- [ ] Ningún ejercicio entrega la solución ya escrita en el starter code del alumno.
- [ ] Todos los ejercicios cuentan con pruebas unitarias que validan la solución real y fallan si el alumno no escribe el código.
- [ ] La compilación TypeScript (`npx tsc --noEmit`) y la compilación Next.js (`npm run build`) se ejecutan limpiamente con 0 errores.
- [ ] La interfaz de usuario permite seleccionar el Track (Python o C++) y avanzar módulo por módulo con registro de progreso local.
