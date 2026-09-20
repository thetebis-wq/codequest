import { TrackModule, TrackLesson, TrackExercise } from "@/types/exercise";

// ============================================================================
// MÓDULOS DEL TRACK PYTHON 3.12 (9 MÓDULOS SECUENCIALES DESDE CERO)
// ============================================================================

export const pythonModules: TrackModule[] = [
  {
    id: 1,
    track: "python",
    title: "Módulo 1: Tu Primer Programa y la Consola",
    subtitle: "Scripts, intérprete y salida estándar con print()",
    description:
      "Aprende qué es un programa en Python, cómo el intérprete traduce tus instrucciones paso a paso y cómo comunicarte con el usuario imprimiendo texto y números en la consola.",
    concepts: [
      "script de Python",
      "intérprete",
      "función print()",
      "comentarios con #",
      "salida de texto",
      "salida de números",
    ],
    lessonIds: ["py-m1-l1"],
  },
  {
    id: 2,
    track: "python",
    title: "Módulo 2: Variables y Tipos de Datos",
    subtitle: "Cajas en memoria y tipos primitivos de Python",
    description:
      "Domina el almacenamiento de datos en memoria mediante variables (la analogía de la caja con etiqueta) y los tipos esenciales: int, float, str y bool, inspeccionándolos con type().",
    concepts: [
      "variables",
      "analogía de la caja",
      "asignación con =",
      "enteros (int)",
      "decimales (float)",
      "texto (str)",
      "booleanos (bool)",
      "inspección con type()",
    ],
    lessonIds: ["py-m2-l1"],
  },
  {
    id: 3,
    track: "python",
    title: "Módulo 3: Operaciones y Expresiones",
    subtitle: "Aritmética, división entera, módulo y f-strings modernas",
    description:
      "Calcula expresiones matemáticas usando +, -, *, la división real /, la división entera // y el residuo %. Construye mensajes dinámicos y legibles mediante f-strings.",
    concepts: [
      "operadores aritméticos",
      "división real /",
      "división entera //",
      "operador módulo %",
      "precedencia de operadores",
      "f-strings (f'{variable}')",
    ],
    lessonIds: ["py-m3-l1"],
  },
  {
    id: 4,
    track: "python",
    title: "Módulo 4: Tomar Decisiones (Condicionales)",
    subtitle: "Bifurcaciones de flujo con if, elif, else y lógica booleana",
    description:
      "Haz que tu código tome decisiones inteligentes evaluando condiciones verdaderas o falsas con operadores de comparación y los conectores lógicos and, or y not.",
    concepts: [
      "operadores relacionales (==, !=, <, >, <=, >=)",
      "estructura if",
      "estructura elif",
      "cláusula else",
      "operadores lógicos (and, or, not)",
      "indentación en bloques",
    ],
    lessonIds: ["py-m4-l1"],
  },
  {
    id: 5,
    track: "python",
    title: "Módulo 5: Repetición y Bucles",
    subtitle: "Iteración con for, range(), bucles while y acumuladores",
    description:
      "Automatiza tareas repetitivas mediante bucles contadores for in range(), bucles condicionales while, control de flujo con break y el patrón del acumulador.",
    concepts: [
      "bucle for",
      "función range()",
      "bucle while",
      "condición de parada",
      "instrucción break",
      "patrón del acumulador",
    ],
    lessonIds: ["py-m5-l1", "py-m5-l2"],
  },
  {
    id: 6,
    track: "python",
    title: "Módulo 6: Funciones",
    subtitle: "Recetas reutilizables, parámetros, return y ámbito",
    description:
      "Escribe código modular y ordenado encapsulando lógica con def. Define parámetros, retorna resultados con return y comprende la diferencia entre variables locales y globales.",
    concepts: [
      "definición con def",
      "parámetros y argumentos",
      "sentencia return",
      "ámbito local vs global",
      "retorno temprano (guard clauses)",
    ],
    lessonIds: ["py-m6-l1", "py-m6-l2"],
  },
  {
    id: 7,
    track: "python",
    title: "Módulo 7: Colecciones de Datos",
    subtitle: "Listas indexadas, métodos dinámicos, tuplas y diccionarios",
    description:
      "Agrupa y manipula múltiples datos en memoria usando listas mutables, el método .append(), la función len(), tuplas inmutables y diccionarios de pares clave-valor.",
    concepts: [
      "listas (list)",
      "indexación base cero [0]",
      "método .append()",
      "función len()",
      "tuplas inmutables ()",
      "diccionarios (dict)",
      "búsqueda por clave",
    ],
    lessonIds: ["py-m7-l1", "py-m7-l2"],
  },
  {
    id: 8,
    track: "python",
    title: "Módulo 8: Programación Orientada a Objetos (POO)",
    subtitle: "Clases, instancias, métodos y el parámetro self",
    description:
      "Modela objetos del mundo real en código creando clases con class, inicializando atributos en el constructor __init__ y definiendo comportamientos con self.",
    concepts: [
      "clases con class",
      "instancias y objetos",
      "constructor __init__",
      "parámetro self",
      "atributos de instancia",
      "métodos y mutación de estado",
    ],
    lessonIds: ["py-m8-l1"],
  },
  {
    id: 9,
    track: "python",
    title: "Módulo 9: Módulos y Librerías",
    subtitle: "La biblioteca estándar: math, random y modularidad",
    description:
      "Aprovecha el poder del ecosistema Python utilizando la sentencia import para incorporar herramientas matemáticas con math y simulaciones de azar con random.",
    concepts: [
      "sentencia import",
      "librería math (sqrt, floor, hypot)",
      "librería random (seed, randint)",
      "azar determinista con semillas",
      "composición modular",
    ],
    lessonIds: ["py-m9-l1"],
  },
];

// ============================================================================
// LECCIONES DEL TRACK PYTHON 3.12 (12 LECCIONES ESTRUCTURADAS)
// ============================================================================

export const pythonLessons: TrackLesson[] = [
  // Módulo 1
  {
    id: "py-m1-l1",
    track: "python",
    moduleId: 1,
    order: 1,
    title: "La Consola y print()",
    subtitle: "Salida de datos y primeros pasos en la terminal",
    description:
      "Conoce la herramienta principal de comunicación de todo programador: la función print() y el uso de comentarios.",
    exerciseIds: ["py-m1-ex1", "py-m1-ex2", "py-m1-ex3"],
  },

  // Módulo 2
  {
    id: "py-m2-l1",
    track: "python",
    moduleId: 2,
    order: 1,
    title: "Variables y Tipado Primitivo",
    subtitle: "Almacenamiento con etiquetas y tipos básicos",
    description:
      "Aprende a guardar información en variables y a trabajar con números enteros, decimales, textos y booleanos.",
    exerciseIds: ["py-m2-ex1", "py-m2-ex2", "py-m2-ex3"],
  },

  // Módulo 3
  {
    id: "py-m3-l1",
    track: "python",
    moduleId: 3,
    order: 1,
    title: "Operadores Aritméticos y f-strings",
    subtitle: "Cálculos matemáticos y cadenas dinámicas",
    description:
      "Realiza sumas, divisiones reales y enteras, calcula residuos con el operador módulo y da formato elegante a tus textos.",
    exerciseIds: ["py-m3-ex1", "py-m3-ex2", "py-m3-ex3"],
  },

  // Módulo 4
  {
    id: "py-m4-l1",
    track: "python",
    moduleId: 4,
    order: 1,
    title: "Condicionales y Lógica Booleana",
    subtitle: "Toma de decisiones con if, elif, else y operadores lógicos",
    description:
      "Controla qué caminos sigue tu programa mediante condiciones lógicas y comparaciones de valores.",
    exerciseIds: ["py-m4-ex1", "py-m4-ex2", "py-m4-ex3"],
  },

  // Módulo 5
  {
    id: "py-m5-l1",
    track: "python",
    moduleId: 5,
    order: 1,
    title: "El Bucle for y Rangos Numéricos",
    subtitle: "Iteraciones contadas y acumulación",
    description:
      "Repite código de manera predecible sobre secuencias numéricas con la función range() y acumula resultados.",
    exerciseIds: ["py-m5-ex1", "py-m5-ex2"],
  },
  {
    id: "py-m5-l2",
    track: "python",
    moduleId: 5,
    order: 2,
    title: "El Bucle while y Control de Repetición",
    subtitle: "Bucles condicionales y salida anticipada",
    description:
      "Ejecuta bucles que dependen de estados dinámicos y aprende a detenerlos inmediatamente usando la instrucción break.",
    exerciseIds: ["py-m5-ex3", "py-m5-ex4"],
  },

  // Módulo 6
  {
    id: "py-m6-l1",
    track: "python",
    moduleId: 6,
    order: 1,
    title: "Declaración de Funciones y Retorno",
    subtitle: "Estructura de una función y la sentencia return",
    description:
      "Aprende a empaquetar bloques de código reutilizables con def y a devolver respuestas con return.",
    exerciseIds: ["py-m6-ex1", "py-m6-ex2"],
  },
  {
    id: "py-m6-l2",
    track: "python",
    moduleId: 6,
    order: 2,
    title: "Ámbito de Variables y Decisiones en Funciones",
    subtitle: "Variables locales y retorno temprano",
    description:
      "Comprende el ciclo de vida de las variables locales y cómo usar condicionales para retornos inmediatos.",
    exerciseIds: ["py-m6-ex3", "py-m6-ex4"],
  },

  // Módulo 7
  {
    id: "py-m7-l1",
    track: "python",
    moduleId: 7,
    order: 1,
    title: "Listas: Creación, Métodos e Índices",
    subtitle: "Colecciones ordenadas y dinámicas",
    description:
      "Guarda secuencias de valores en listas, consúltalos por su posición numérica y hazlas crecer con .append().",
    exerciseIds: ["py-m7-ex1", "py-m7-ex2"],
  },
  {
    id: "py-m7-l2",
    track: "python",
    moduleId: 7,
    order: 2,
    title: "Tuplas y Diccionarios",
    subtitle: "Inmutabilidad y mapeos clave-valor",
    description:
      "Conoce las tuplas de valores fijos y los diccionarios asociativos para buscar datos mediante claves descriptivas.",
    exerciseIds: ["py-m7-ex3", "py-m7-ex4"],
  },

  // Módulo 8
  {
    id: "py-m8-l1",
    track: "python",
    moduleId: 8,
    order: 1,
    title: "Clases, Instancias y Métodos",
    subtitle: "Modelado de objetos y el parámetro self",
    description:
      "Descubre el paradigma de programación orientada a objetos: crea clases, instancia objetos y define métodos con self.",
    exerciseIds: ["py-m8-ex1", "py-m8-ex2", "py-m8-ex3"],
  },

  // Módulo 9
  {
    id: "py-m9-l1",
    track: "python",
    moduleId: 9,
    order: 1,
    title: "La Librería Estándar: math y random",
    subtitle: "Cálculos científicos y generación de azar",
    description:
      "Aprende a importar y aplicar herramientas de la biblioteca estándar de Python para cálculos y simulaciones.",
    exerciseIds: ["py-m9-ex1", "py-m9-ex2", "py-m9-ex3"],
  },
];

// ============================================================================
// EJERCICIOS DEL TRACK PYTHON 3.12 (30 EJERCICIOS PRÁCTICOS PROGRESIVOS)
// Cero soluciones pre-escritas en starterCode (solo comentarios de andamiaje # PASO).
// ============================================================================

export const pythonExercises: TrackExercise[] = [
  // --------------------------------------------------------------------------
  // MÓDULO 1: TU PRIMER PROGRAMA Y LA CONSOLA
  // --------------------------------------------------------------------------
  {
    id: "py-m1-ex1",
    track: "python",
    moduleId: 1,
    lessonId: "py-m1-l1",
    order: 1,
    title: "¡Hola Mundo!",
    subtitle: "Tu primera instrucción en Python",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Escribe tu primer programa en Python usando la función print() para enviar un mensaje de bienvenida a la terminal.",
      instructions: [
        "Usa la función print() con comillas para imprimir exactamente el texto '¡Hola, Mundo!' (respetando los signos de admiración y la coma).",
      ],
      learningObjectives: [
        "Entender el concepto de script e intérprete de Python",
        "Aprender a invocar la función estándar print()",
        "Comprender la necesidad de delimitar textos con comillas",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Consola y la Función print()",
      explanation:
        "En Python, un script es un archivo de texto con instrucciones que el intérprete ejecuta línea por línea desde arriba hacia abajo. La función `print()` es el canal principal para enviar información hacia el exterior (la salida estándar o consola). Cuando deseas mostrar un texto literal, debes encerrarlo entre comillas dobles (\"...\") o simples ('...').",
      mentalModel:
        "Imagina que el intérprete es un actor leyendo un guion teatral en voz alta, y print() es el megáfono que proyecta sus palabras al público.",
      codeExample: 'print("Hola, explorador")',
    },
    starterCode: `# PASO 1: Usa la función print() para mostrar en pantalla el saludo
# PASO 2: Escribe entre comillas exactamente: ¡Hola, Mundo!
# Tu código va aquí:
`,
    solutionReference: `print("¡Hola, Mundo!")`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir exactamente '¡Hola, Mundo!'",
        input: "",
        expectedOutput: "¡Hola, Mundo!",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "¿Cómo mostramos mensajes?",
        prompt:
          "¿Qué función de Python te permite enviar texto a la pantalla? Escribe su nombre seguido de paréntesis.",
      },
      {
        level: 2,
        title: "Cadenas entre comillas",
        prompt:
          "Si no pones comillas alrededor del texto, Python pensará que son variables. ¿Pusiste las comillas al texto '¡Hola, Mundo!'?",
      },
      {
        level: 3,
        title: "Sintaxis precisa",
        prompt:
          'Escribe en tu editor exactamente: print("¡Hola, Mundo!") y presiona Ejecutar.',
      },
    ],
  },

  {
    id: "py-m1-ex2",
    track: "python",
    moduleId: 1,
    lessonId: "py-m1-l1",
    order: 2,
    title: "Múltiples Salidas y Números",
    subtitle: "Mostrando texto y datos numéricos en líneas sucesivas",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Aprende a imprimir números sin comillas y a producir múltiples líneas consecutivas de salida con llamadas separadas a print().",
      instructions: [
        "En la primera línea, usa print() para mostrar el texto: 'Nivel de Combustible:'",
        "En la segunda línea, usa print() para mostrar el número entero 100 (sin comillas).",
      ],
      learningObjectives: [
        "Comprender que los números no requieren comillas en Python",
        "Observar que cada llamada a print() produce un salto de línea automático",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Salida de Números y Saltos de Línea",
      explanation:
        "A diferencia del texto, los números representan cantidades matemáticas vivas y se escriben directamente sin comillas (por ejemplo, `100` o `42`). Cada vez que ejecutas una instrucción `print()`, Python agrega automáticamente un salto de línea al final, de modo que la siguiente instrucción se mostrará en una nueva fila.",
      mentalModel:
        "El texto entre comillas es un cartel rotulado. Un número sin comillas es una cantidad que la computadora comprende directamente.",
      codeExample: 'print("Puntaje:")\nprint(50)',
    },
    starterCode: `# PASO 1: En la primera línea imprime: Nivel de Combustible:
# PASO 2: En la segunda línea imprime el número 100 (sin comillas)
# Tu código va aquí:
`,
    solutionReference: `print("Nivel de Combustible:")
print(100)`,
    testCases: [
      {
        id: "tc-1",
        description:
          "Debe imprimir 'Nivel de Combustible:' y en la siguiente línea '100'",
        input: "",
        expectedOutput: "Nivel de Combustible:\n100",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Dos llamadas a print()",
        prompt:
          "Para mostrar dos líneas separadas, necesitas escribir dos instrucciones print() independientes, una debajo de la otra.",
      },
      {
        level: 2,
        title: "¿Texto o número?",
        prompt:
          "El texto 'Nivel de Combustible:' lleva comillas, pero el número 100 debe ir como valor numérico puro sin comillas.",
      },
      {
        level: 3,
        title: "Estructura final",
        prompt:
          'Línea 1: print("Nivel de Combustible:")\nLínea 2: print(100)',
      },
    ],
  },

  {
    id: "py-m1-ex3",
    track: "python",
    moduleId: 1,
    lessonId: "py-m1-l1",
    order: 3,
    title: "Comentarios y Documentación",
    subtitle: "Escribir notas para humanos con el símbolo #",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Los comentarios inician con el símbolo '#' y son ignorados por el intérprete. Demuestra que puedes documentar código sin alterar la salida esperada.",
      instructions: [
        "Escribe un comentario en la primera línea que empiece con el símbolo # (por ejemplo: # Verificación de arranque).",
        "En la siguiente línea, imprime exactamente el mensaje: 'Sistema en linea'",
      ],
      learningObjectives: [
        "Identificar la sintaxis del carácter # para comentarios de una sola línea",
        "Entender que los comentarios no producen ninguna salida en consola",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Comentarios en Python",
      explanation:
        "Cualquier texto que comience con el símbolo `#` es ignorado por completo por el intérprete de Python hasta el final de esa línea. Los comentarios sirven para explicar el 'por qué' de una decisión, guiar a otros desarrolladores o recordarte detalles cuando retomes tu código en el futuro.",
      mentalModel:
        "Un comentario es como una nota invisible para la máquina ejecutora, pero luminosa para cualquier humano que lea el archivo.",
      codeExample: '# Esta nota no hace nada\nprint("Visible en consola")',
    },
    starterCode: `# PASO 1: Escribe un comentario explicativo que empiece con #
# PASO 2: En la siguiente línea imprime exactamente: Sistema en linea
# Tu código va aquí:
`,
    solutionReference: `# Inicialización de módulos primarios
print("Sistema en linea")`,
    testCases: [
      {
        id: "tc-1",
        description:
          "Debe imprimir únicamente 'Sistema en linea' sin verse afectado por los comentarios",
        input: "",
        expectedOutput: "Sistema en linea",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "El símbolo de comentario",
        prompt:
          "¿Qué símbolo se usa en Python para decirle al intérprete que ignore una línea? Es el caracter numeral (#).",
      },
      {
        level: 2,
        title: "Líneas separadas",
        prompt:
          "Coloca el comentario en la primera línea y la función print('Sistema en linea') en la línea siguiente.",
      },
      {
        level: 3,
        title: "Solución guiada",
        prompt:
          'Escribe:\n# Comprobando el sistema\nprint("Sistema en linea")',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 2: VARIABLES Y TIPOS DE DATOS
  // --------------------------------------------------------------------------
  {
    id: "py-m2-ex1",
    track: "python",
    moduleId: 2,
    lessonId: "py-m2-l1",
    order: 1,
    title: "Tu Primera Variable",
    subtitle: "Guardar valores con el operador de asignación =",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Una variable es un identificador que apunta a un dato en la memoria. Crea variables para el nombre de tu nave y la tripulación e imprímelas.",
      instructions: [
        "Crea una variable llamada nave y asígnale el texto 'Apolo'.",
        "Crea una variable llamada tripulantes y asígnale el entero 3.",
        "Imprime la variable nave en la primera línea.",
        "Imprime la variable tripulantes en la segunda línea.",
      ],
      learningObjectives: [
        "Declarar y asignar variables usando el operador =",
        "Reutilizar identificadores como argumentos de la función print()",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Variables: La Caja con Etiqueta",
      explanation:
        "Imagina una caja de cartón en la memoria de la computadora con una etiqueta adhesiva. La etiqueta es el nombre de la variable (por ejemplo, `nave`), y lo que pones dentro es el dato (`'Apolo'`). El signo `=` se llama operador de asignación: evalúa lo que está a la derecha y lo guarda en la variable de la izquierda.",
      mentalModel:
        "La variable es una etiqueta adherida a un casillero de memoria. Cuando mencionas el nombre de la etiqueta sin comillas, Python busca el contenido dentro del casillero.",
      codeExample: 'jugador = "Ada"\npuntos = 50\nprint(jugador)\nprint(puntos)',
    },
    starterCode: `# PASO 1: Crea la variable 'nave' con el valor "Apolo"
# PASO 2: Crea la variable 'tripulantes' con el valor 3
# PASO 3: Imprime nave con print()
# PASO 4: Imprime tripulantes con print()
# Tu código va aquí:
`,
    solutionReference: `nave = "Apolo"
tripulantes = 3
print(nave)
print(tripulantes)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir 'Apolo' y '3' en líneas consecutivas",
        input: "",
        expectedOutput: "Apolo\n3",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Asignación con =",
        prompt:
          "Para guardar un dato en una variable escribe: nombre_variable = valor. ¿Declaraste nave = 'Apolo'?",
      },
      {
        level: 2,
        title: "Imprimir la variable",
        prompt:
          "Para imprimir el valor que guarda una variable, pasa su nombre a print() SIN comillas: print(nave).",
      },
      {
        level: 3,
        title: "Comprobación paso a paso",
        prompt:
          'Escribe cuatro líneas:\nnave = "Apolo"\ntripulantes = 3\nprint(nave)\nprint(tripulantes)',
      },
    ],
  },

  {
    id: "py-m2-ex2",
    track: "python",
    moduleId: 2,
    lessonId: "py-m2-l1",
    order: 2,
    title: "Los Cuatro Tipos Fundamentales",
    subtitle: "int, float, str y bool en acción",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "Python categoriza la información en distintos tipos de datos primitivos. Declara una variable de cada tipo fundamental e imprímelas en orden.",
      instructions: [
        "Crea una variable nivel con el entero 5.",
        "Crea una variable velocidad con el decimal 9.8.",
        "Crea una variable piloto con el texto 'Kael'.",
        "Crea una variable activo con el booleano True (¡con 'T' mayúscula!).",
        "Imprime cada una de las 4 variables en una línea separada, en ese mismo orden.",
      ],
      learningObjectives: [
        "Diferenciar entre int (entero), float (decimal), str (cadena) y bool (booleano)",
        "Reconocer que en Python los booleanos son True y False con mayúscula inicial",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Tipos Primitivos de Python",
      explanation:
        "Cada dato tiene una naturaleza específica: `int` representa números enteros (como 5 o -12), `float` representa números con punto decimal continuo (como 9.8 o 3.1416), `str` representa cadenas de texto entre comillas ('Kael'), y `bool` representa verdades lógicas binarias (`True` o `False`). En Python, los booleanos siempre llevan la primera letra en mayúscula obligatoria.",
      mentalModel:
        "Son recipientes con formas distintas: un vaso para líquidos continuos (float), una caja para contar piezas enteras (int) y un interruptor de encendido/apagado (bool).",
      codeExample:
        'vidas = 3          # int\naltura = 1.75      # float\nnombre = "Sam"     # str\nvivo = True        # bool',
    },
    starterCode: `# PASO 1: Crea la variable nivel = 5 (int)
# PASO 2: Crea la variable velocidad = 9.8 (float)
# PASO 3: Crea la variable piloto = "Kael" (str)
# PASO 4: Crea la variable activo = True (bool, ¡T mayúscula!)
# PASO 5: Imprime nivel, velocidad, piloto y activo (uno por línea)
# Tu código va aquí:
`,
    solutionReference: `nivel = 5
velocidad = 9.8
piloto = "Kael"
activo = True
print(nivel)
print(velocidad)
print(piloto)
print(activo)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir los 4 valores en líneas separadas",
        input: "",
        expectedOutput: "5\n9.8\nKael\nTrue",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Booleanos en Python",
        prompt:
          "En Python no se escribe 'true' ni 'TRUE'. La palabra reservada es exactamente 'True' con T mayúscula y el resto en minúsculas.",
      },
      {
        level: 2,
        title: "Decimales con punto",
        prompt:
          "Para números decimales como 9.8 usa el punto '.', nunca una coma.",
      },
      {
        level: 3,
        title: "Orden de impresión",
        prompt:
          "Haz cuatro llamadas consecutivas: print(nivel), print(velocidad), print(piloto), print(activo).",
      },
    ],
  },

  {
    id: "py-m2-ex3",
    track: "python",
    moduleId: 2,
    lessonId: "py-m2-l1",
    order: 3,
    title: "Inspección de Tipos con type()",
    subtitle: "Descubre la clase de cualquier objeto con type()",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "La función incorporada type() te permite inspeccionar a qué tipo o clase pertenece cualquier dato en tiempo de ejecución.",
      instructions: [
        "Declara una variable llamada puntaje y asígnale el número entero 42.",
        "Usa print() para mostrar el resultado de llamar a type(puntaje).",
      ],
      learningObjectives: [
        "Utilizar la función type() para introspección de datos",
        "Entender que Python asocia internamente una clase a cada valor",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Función type()",
      explanation:
        "Python es un lenguaje de tipado dinámico pero fuertemente tipado: no necesitas declarar el tipo de antemano, pero la máquina siempre sabe con exactitud qué tipo es cada valor. Si llamas a `type(variable)`, Python devuelve la clase correspondiente, por ejemplo `<class 'int'>`.",
      mentalModel:
        "type() es como un escáner de materiales: le apuntas a un objeto y te dice en la pantalla si es metal, madera o plástico.",
      codeExample: "x = 42\nprint(type(x))  # <class 'int'>",
    },
    starterCode: `# PASO 1: Declara una variable llamada puntaje con el valor 42
# PASO 2: Usa print(type(puntaje)) para mostrar su tipo en pantalla
# Tu código va aquí:
`,
    solutionReference: `puntaje = 42
print(type(puntaje))`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe mostrar en pantalla: <class 'int'>",
        input: "",
        expectedOutput: "<class 'int'>",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Anidar funciones",
        prompt:
          "Puedes colocar la llamada a type() dentro de print(): print(type(...)).",
      },
      {
        level: 2,
        title: "La variable puntaje",
        prompt:
          "Declara puntaje = 42 primero, y luego en la siguiente línea llama a print(type(puntaje)).",
      },
      {
        level: 3,
        title: "Código exacto",
        prompt: "puntaje = 42\nprint(type(puntaje))",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 3: OPERACIONES Y EXPRESIONES
  // --------------------------------------------------------------------------
  {
    id: "py-m3-ex1",
    track: "python",
    moduleId: 3,
    lessonId: "py-m3-l1",
    order: 1,
    title: "División Real vs División Entera",
    subtitle: "Aprende la diferencia vital entre los operadores / y //",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "En Python existen dos operadores de división: / produce siempre un número decimal (float), mientras que // trunca los decimales y devuelve el cociente entero (int).",
      instructions: [
        "Declara a = 15 y b = 4.",
        "Imprime la suma a + b en la primera línea.",
        "Imprime la división real a / b en la segunda línea.",
        "Imprime la división entera a // b en la tercera línea.",
      ],
      learningObjectives: [
        "Utilizar los operadores aritméticos +, / y //",
        "Comprender la diferencia conceptual entre división real y división entera",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Las Dos Divisiones de Python",
      explanation:
        "Python 3 resuelve de manera impecable la división aritmética: el operador `/` realiza la división matemática real con coma flotante (`15 / 4 = 3.75`). Si estás contando elementos indivisibles (como personas o páginas), usas el operador de división de piso `//`, que descarta la parte fraccionaria y devuelve únicamente el entero (`15 // 4 = 3`).",
      mentalModel:
        "Si tienes 15 manzanas para 4 personas: con / cada persona recibe 3.75 manzanas (troceadas). Con // cada persona recibe 3 manzanas enteras y lo demás sobra.",
      codeExample: "print(10 / 4)   # 2.5 (float)\nprint(10 // 4)  # 2 (int)",
    },
    starterCode: `# PASO 1: Declara a = 15
# PASO 2: Declara b = 4
# PASO 3: Imprime a + b
# PASO 4: Imprime a / b (división real con barra simple)
# PASO 5: Imprime a // b (división entera con doble barra)
# Tu código va aquí:
`,
    solutionReference: `a = 15
b = 4
print(a + b)
print(a / b)
print(a // b)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir la suma (19), la división real (3.75) y la división entera (3)",
        input: "",
        expectedOutput: "19\n3.75\n3",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Operadores de división",
        prompt:
          "Recuerda que una sola barra '/' calcula decimales exactos, y dos barras '//' truncan los decimales.",
      },
      {
        level: 2,
        title: "Tres impresiones consecutivas",
        prompt:
          "Calcula directamente dentro de print: print(a + b), print(a / b), print(a // b).",
      },
      {
        level: 3,
        title: "Solución línea por línea",
        prompt:
          "a = 15\nb = 4\nprint(a + b)\nprint(a / b)\nprint(a // b)",
      },
    ],
  },

  {
    id: "py-m3-ex2",
    track: "python",
    moduleId: 3,
    lessonId: "py-m3-l1",
    order: 2,
    title: "El Operador Módulo %",
    subtitle: "Calcula el residuo de una división con el símbolo %",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "El operador módulo % calcula el sobrante o residuo de una división entera. Esencial para saber si un número es par, para ciclos y para cálculos de reloj.",
      instructions: [
        "Calcula el residuo de dividir 17 entre 5 usando % y guárdalo en la variable residuo.",
        "Calcula el residuo de dividir 10 entre 2 usando % y guárdalo en la variable par.",
        "Imprime residuo en la primera línea e imprime par en la segunda línea.",
      ],
      learningObjectives: [
        "Dominar el uso del operador residuo %",
        "Entender que un residuo 0 al dividir entre 2 indica paridad",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Operador Módulo (%)",
      explanation:
        "17 dividido entre 5 es 3 con un residuo de 2 (porque 5 * 3 = 15, y faltan 2 para llegar a 17). En Python, `17 % 5` da exactamente `2`. Por otro lado, 10 dividido entre 2 es 5 exacto sin residuo, por lo que `10 % 2` da `0`. Por esta razón, la condición `numero % 2 == 0` es la forma estándar de comprobar si un número es par.",
      mentalModel:
        "Si repartes 17 cartas entre 5 jugadores en una mesa, cada uno recibe 3 cartas y te sobran 2 cartas en la mano. El módulo es lo que te queda en la mano.",
      codeExample: "sobrante = 14 % 3  # 2 (porque 3*4=12, sobran 2)\nprint(sobrante)",
    },
    starterCode: `# PASO 1: Calcula el residuo de 17 entre 5 con % y guárdalo en 'residuo'
# PASO 2: Calcula el residuo de 10 entre 2 con % y guárdalo en 'par'
# PASO 3: Imprime 'residuo'
# PASO 4: Imprime 'par'
# Tu código va aquí:
`,
    solutionReference: `residuo = 17 % 5
par = 10 % 2
print(residuo)
print(par)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir 2 (17 % 5) y 0 (10 % 2)",
        input: "",
        expectedOutput: "2\n0",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "El símbolo de módulo",
        prompt:
          "Usa el signo de porcentaje '%' para obtener el residuo: 17 % 5.",
      },
      {
        level: 2,
        title: "Asignar a variables",
        prompt:
          "Guarda los cálculos: residuo = 17 % 5 y par = 10 % 2.",
      },
      {
        level: 3,
        title: "Impresión final",
        prompt:
          "Escribe:\nresiduo = 17 % 5\npar = 10 % 2\nprint(residuo)\nprint(par)",
      },
    ],
  },

  {
    id: "py-m3-ex3",
    track: "python",
    moduleId: 3,
    lessonId: "py-m3-l1",
    order: 3,
    title: "Mensajes Dinámicos con f-strings",
    subtitle: "Interpolación limpia de variables dentro de texto",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "Las f-strings te permiten incrustar expresiones y variables directamente dentro de cadenas de texto usando llaves {}.",
      instructions: [
        "Declara la variable usuario con el valor 'Ada'.",
        "Declara la variable intentos con el entero 3.",
        "Usa print() con una f-string para mostrar exactamente: 'Hola Ada, te quedan 3 intentos.'",
      ],
      learningObjectives: [
        "Construir cadenas de texto formateadas con f'Hola {nombre}'",
        "Evitar conversiones manuales engorrosas con str() y concatenaciones con +",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Cadenas Formateadas: f-strings",
      explanation:
        "Las f-strings (disponibles desde Python 3.6) son la forma moderna, limpia y rápida de formatear texto. Antepones una letra `f` a las comillas y encierras cualquier variable o expresión entre llaves `{}`. Python evalúa el contenido de las llaves y lo convierte automáticamente a texto.",
      mentalModel:
        "Las llaves {} son ventanas transparentes en un póster de texto donde el valor actual de la variable se proyecta con precisión.",
      codeExample:
        'nombre = "Bob"\nedad = 20\nprint(f"Me llamo {nombre} y tengo {edad} anios.")',
    },
    starterCode: `# PASO 1: Crea la variable usuario con el valor "Ada"
# PASO 2: Crea la variable intentos con el valor 3
# PASO 3: Imprime usando una f-string exactamente: "Hola Ada, te quedan 3 intentos."
# Tu código va aquí:
`,
    solutionReference: `usuario = "Ada"
intentos = 3
print(f"Hola {usuario}, te quedan {intentos} intentos.")`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir 'Hola Ada, te quedan 3 intentos.'",
        input: "",
        expectedOutput: "Hola Ada, te quedan 3 intentos.",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "La letra f al inicio",
        prompt:
          "Asegúrate de anteponer la letra f minúscula inmediatamente antes de la primera comilla: f\"...\".",
      },
      {
        level: 2,
        title: "Incrustar variables",
        prompt:
          "Coloca las variables entre llaves: {usuario} e {intentos}.",
      },
      {
        level: 3,
        title: "Texto idéntico",
        prompt:
          'Escribe:\nusuario = "Ada"\nintentos = 3\nprint(f"Hola {usuario}, te quedan {intentos} intentos.")',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 4: TOMAR DECISIONES (CONDICIONALES)
  // --------------------------------------------------------------------------
  {
    id: "py-m4-ex1",
    track: "python",
    moduleId: 4,
    lessonId: "py-m4-l1",
    order: 1,
    title: "Tu Primera Decisión con if",
    subtitle: "Comparaciones y bloques indentados en Python",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "Un bloque if ejecuta código únicamente si su condición lógica es verdadera (True). Evalúa si una puntuación supera la marca mínima de aprobación.",
      instructions: [
        "Declara la variable puntaje = 85.",
        "Escribe una estructura if para comprobar si puntaje >= 60.",
        "Dentro del bloque if (con sangría de 4 espacios), imprime 'Aprobado'.",
      ],
      learningObjectives: [
        "Escribir una sentencia if con los dos puntos ':' obligatorios",
        "Aplicar la regla de indentación (sangría) que define el bloque de código en Python",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Sentencia if y la Indentación",
      explanation:
        "En Python, los bloques de código no se definen con llaves `{}` sino con indentación (sangría de 4 espacios). La sentencia `if condicion:` evalúa una expresión booleana: si resulta `True`, ejecuta las líneas indentadas que le siguen; si es `False`, las ignora completamente.",
      mentalModel:
        "Una bifurcación en una vía de tren: si la señal está en verde (True), el tren toma el desvío hacia la estación; si está en rojo, continúa derecho.",
      codeExample:
        'temperatura = 30\nif temperatura > 25:\n    print("Hace calor")',
    },
    starterCode: `# PASO 1: Declara puntaje = 85
# PASO 2: Escribe la condición: if puntaje >= 60:
# PASO 3: Dentro del bloque (con 4 espacios de sangría), imprime "Aprobado"
# Tu código va aquí:
`,
    solutionReference: `puntaje = 85
if puntaje >= 60:
    print("Aprobado")`,
    testCases: [
      {
        id: "tc-1",
        description: "Con puntaje 85 debe imprimir 'Aprobado'",
        input: "",
        expectedOutput: "Aprobado",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Los dos puntos ':'",
        prompt:
          "¿Pusiste los dos puntos ':' al final de la línea del if? Sin ellos, Python emitirá un error de sintaxis.",
      },
      {
        level: 2,
        title: "Sangría de 4 espacios",
        prompt:
          "La línea de print() debe tener 4 espacios de sangría hacia la derecha para que pertenezca al bloque if.",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          'puntaje = 85\nif puntaje >= 60:\n    print("Aprobado")',
      },
    ],
  },

  {
    id: "py-m4-ex2",
    track: "python",
    moduleId: 4,
    lessonId: "py-m4-l1",
    order: 2,
    title: "Clasificación con if, elif, else",
    subtitle: "Evalúa múltiples casos secuenciales mutuamente excluyentes",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "Cuando tienes más de dos posibles resultados, encadena condiciones con elif ('else if') y finaliza con else para el caso por defecto.",
      instructions: [
        "Declara calificacion = 75.",
        "Si calificacion >= 90, imprime 'Excelente'.",
        "Si no, pero calificacion >= 70 (usa elif), imprime 'Bueno'.",
        "Para cualquier otro caso (usa else), imprime 'Necesita mejorar'.",
      ],
      learningObjectives: [
        "Encadenar condiciones alternativas con elif",
        "Utilizar la cláusula else como vía de escape o valor por defecto",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Estructuras if - elif - else",
      explanation:
        "Python evalúa las condiciones en orden de arriba a abajo. Tan pronto como encuentra una condición verdadera (`True`), ejecuta su bloque indentado y descarta de inmediato todas las ramas posteriores (`elif` o `else`). Si ninguna condición previa fue verdadera, se ejecuta el bloque `else`.",
      mentalModel:
        "Un clasificador de frutas por tamaño: pasa primero por la rejilla grande (90+); si no cabe, prueba la mediana (70+); si tampoco cabe, cae en la caja general (else).",
      codeExample:
        'hora = 14\nif hora < 12:\n    print("Buenos dias")\nelif hora < 19:\n    print("Buenas tardes")\nelse:\n    print("Buenas noches")',
    },
    starterCode: `# PASO 1: Crea calificacion = 75
# PASO 2: Si calificacion >= 90 imprime "Excelente"
# PASO 3: Si no, si calificacion >= 70 (elif) imprime "Bueno"
# PASO 4: Si no (else) imprime "Necesita mejorar"
# Tu código va aquí:
`,
    solutionReference: `calificacion = 75
if calificacion >= 90:
    print("Excelente")
elif calificacion >= 70:
    print("Bueno")
else:
    print("Necesita mejorar")`,
    testCases: [
      {
        id: "tc-1",
        description: "Con 75 debe evaluar la rama elif e imprimir 'Bueno'",
        input: "",
        expectedOutput: "Bueno",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "La palabra clave elif",
        prompt:
          "En Python no se escribe 'else if', se contrae en la palabra 'elif'.",
      },
      {
        level: 2,
        title: "Dos puntos en cada rama",
        prompt:
          "Recuerda terminar if ..., elif ... y else: con el signo de dos puntos ':'.",
      },
      {
        level: 3,
        title: "Solución completa",
        prompt:
          'calificacion = 75\nif calificacion >= 90:\n    print("Excelente")\nelif calificacion >= 70:\n    print("Bueno")\nelse:\n    print("Necesita mejorar")',
      },
    ],
  },

  {
    id: "py-m4-ex3",
    track: "python",
    moduleId: 4,
    lessonId: "py-m4-l1",
    order: 3,
    title: "Combinando Condiciones Lógicas",
    subtitle: "Control de acceso con and, or y not",
    difficulty: "Intermedio",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "Los operadores lógicos and (ambas condiciones verdaderas) y or (al menos una verdadera) permiten formular reglas de negocio complejas.",
      instructions: [
        "Declara tiene_llave = True.",
        "Declara conoce_codigo = False.",
        "Declara nivel_seguridad = 2.",
        "Escribe un if: si (tiene_llave o conoce_codigo) Y ADEMÁS (nivel_seguridad <= 2), imprime 'Acceso Permitido'.",
        "De lo contrario (else), imprime 'Acceso Denegado'.",
      ],
      learningObjectives: [
        "Combinar operadores relacionales y conectores lógicos and y or",
        "Usar paréntesis para definir explícitamente el orden de precedencia lógica",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Operadores Lógicos: and, or, not",
      explanation:
        "El operador `and` requiere que ambas partes sean `True` para resultar en `True`. El operador `or` solo requiere que una de las dos partes sea `True`. Al agrupar con paréntesis `(A or B) and C`, garantizas que primero se resuelva la alternativa entre llave o código y luego se verifique el nivel de seguridad.",
      mentalModel:
        "Para abordar un vuelo comercial necesitas (Pasaporte O Cédula) Y ADEMÁS (Boleto Válido). Si tienes documento pero no boleto, no subes.",
      codeExample:
        'edad = 20\ntiene_pase = True\nif edad >= 18 and tiene_pase:\n    print("Adelante")',
    },
    starterCode: `# PASO 1: Declara tiene_llave = True
# PASO 2: Declara conoce_codigo = False
# PASO 3: Declara nivel_seguridad = 2
# PASO 4: Si (tiene_llave or conoce_codigo) and (nivel_seguridad <= 2):
#             imprime "Acceso Permitido"
#         Si no (else):
#             imprime "Acceso Denegado"
# Tu código va aquí:
`,
    solutionReference: `tiene_llave = True
conoce_codigo = False
nivel_seguridad = 2

if (tiene_llave or conoce_codigo) and (nivel_seguridad <= 2):
    print("Acceso Permitido")
else:
    print("Acceso Denegado")`,
    testCases: [
      {
        id: "tc-1",
        description:
          "Debe evaluar True para (tiene_llave or conoce_codigo) and (nivel_seguridad <= 2) e imprimir 'Acceso Permitido'",
        input: "",
        expectedOutput: "Acceso Permitido",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Operadores en inglés",
        prompt:
          "En Python los operadores lógicos se escriben en palabras en inglés: 'and', 'or', 'not'.",
      },
      {
        level: 2,
        title: "Agrupación con paréntesis",
        prompt:
          "Escribe la condición: if (tiene_llave or conoce_codigo) and (nivel_seguridad <= 2):",
      },
      {
        level: 3,
        title: "Verificación de la condición",
        prompt:
          "Como tiene_llave es True, la parte izquierda es True. Como 2 <= 2 es True, ambas son True e imprime 'Acceso Permitido'.",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 5: REPETICIÓN Y BUCLES
  // --------------------------------------------------------------------------
  {
    id: "py-m5-ex1",
    track: "python",
    moduleId: 5,
    lessonId: "py-m5-l1",
    order: 1,
    title: "Conteo Automático con for y range()",
    subtitle: "Iterando sobre secuencias numéricas en Python",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "El bucle for repite un bloque de código para cada elemento de una secuencia. Usa la función range() para contar del 1 al 5.",
      instructions: [
        "Escribe un bucle for con una variable i.",
        "Usa range(1, 6) para generar los números del 1 al 5 inclusive.",
        "Dentro del bucle, imprime el valor de i en cada vuelta.",
      ],
      learningObjectives: [
        "Comprender la sintaxis del bucle for ... in",
        "Entender que range(inicio, fin) incluye el inicio pero excluye el fin",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Bucle for y la Función range()",
      explanation:
        "La función `range(inicio, fin)` genera una progresión de números enteros que comienza en `inicio` y se detiene exactamente una unidad antes de llegar a `fin`. Por lo tanto, `range(1, 6)` produce los números 1, 2, 3, 4 y 5. En cada iteración del bucle `for`, la variable de control toma el siguiente número de la secuencia.",
      mentalModel:
        "Un contador mecánico de personas en una entrada: por cada paso que da una persona, el marcador avanza un dígito.",
      codeExample: "for i in range(3):\n    print(i)  # Imprime 0, 1, 2",
    },
    starterCode: `# PASO 1: Escribe el bucle: for i in range(1, 6):
# PASO 2: Dentro del bucle (con sangría de 4 espacios), imprime i
# Tu código va aquí:
`,
    solutionReference: `for i in range(1, 6):
    print(i)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir los números del 1 al 5, uno por línea",
        input: "",
        expectedOutput: "1\n2\n3\n4\n5",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Límite superior de range",
        prompt:
          "Si quieres llegar hasta el 5, ¿cuál debe ser el segundo argumento de range(1, ...)? Recuerda que se detiene uno antes.",
      },
      {
        level: 2,
        title: "Dos puntos y sangría",
        prompt:
          "La línea de 'for' termina con dos puntos ':' y la línea de 'print(i)' va indentada.",
      },
      {
        level: 3,
        title: "Código final",
        prompt: "for i in range(1, 6):\n    print(i)",
      },
    ],
  },

  {
    id: "py-m5-ex2",
    track: "python",
    moduleId: 5,
    lessonId: "py-m5-l1",
    order: 2,
    title: "El Patrón del Acumulador con for",
    subtitle: "Sumar elementos iterativamente en una variable total",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "El patrón del acumulador consiste en inicializar una variable en cero y sumarle el valor de cada elemento en cada paso del bucle.",
      instructions: [
        "Inicializa una variable total = 0.",
        "Usa un bucle for numero in range(1, 6): para recorrer los números del 1 al 5.",
        "Dentro del bucle, suma numero a total (total = total + numero).",
        "Fuera del bucle (sin sangría), imprime el valor final de total.",
      ],
      learningObjectives: [
        "Implementar el patrón de diseño del acumulador",
        "Diferenciar entre código dentro del bucle (acumulación) y fuera del bucle (resultado final)",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Patrón del Acumulador",
      explanation:
        "Acumular es una de las tareas más frecuentes en computación. Creas una variable acumuladora antes de comenzar el bucle (inicializada en el elemento neutro de la suma: 0). En cada iteración, agregas el nuevo valor a la variable (`total = total + numero`). Al finalizar el ciclo, la variable guarda la suma consolidada de todos los pasos.",
      mentalModel:
        "Una alcancía: empiezas con la alcancía vacía (0) y cada día metes monedas (1, luego 2, luego 3...). Al terminar la semana cuentas cuánto acumulaste.",
      codeExample:
        "suma = 0\nfor x in [10, 20, 30]:\n    suma = suma + x\nprint(suma)  # 60",
    },
    starterCode: `# PASO 1: Inicializa total = 0
# PASO 2: Escribe el bucle: for numero in range(1, 6):
# PASO 3: Dentro del bucle, acumula: total = total + numero
# PASO 4: Fuera del bucle, imprime total con print()
# Tu código va aquí:
`,
    solutionReference: `total = 0
for numero in range(1, 6):
    total = total + numero
print(total)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe sumar 1 + 2 + 3 + 4 + 5 e imprimir 15",
        input: "",
        expectedOutput: "15",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Inicializar antes del bucle",
        prompt:
          "Si colocas total = 0 dentro del bucle, se reiniciará en cada vuelta. Debe ir ANTES del bucle.",
      },
      {
        level: 2,
        title: "Imprimir al final",
        prompt:
          "La llamada a print(total) no debe llevar espacios al inicio, para ejecutarse solo cuando el bucle termine.",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          "total = 0\nfor numero in range(1, 6):\n    total = total + numero\nprint(total)",
      },
    ],
  },

  {
    id: "py-m5-ex3",
    track: "python",
    moduleId: 5,
    lessonId: "py-m5-l2",
    order: 1,
    title: "Cuenta Regresiva con while",
    subtitle: "Repetición basada en una condición dinámica",
    difficulty: "Fundamento",
    xpReward: 110,
    evaluationType: "stdout",
    spec: {
      summary:
        "El bucle while repite sus instrucciones mientras una condición lógica siga siendo verdadera. Simula una cuenta regresiva espacial.",
      instructions: [
        "Crea la variable cuenta con el valor 3.",
        "Escribe un bucle while que se ejecute mientras cuenta > 0.",
        "Dentro del bucle, imprime cuenta y luego réstale 1 a cuenta (cuenta = cuenta - 1).",
        "Fuera del bucle, imprime '¡Despegue!'.",
      ],
      learningObjectives: [
        "Controlar la ejecución de bucles condicionales while",
        "Comprender la importancia de actualizar la condición para evitar bucles infinitos",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Bucle while",
      explanation:
        "Mientras el bucle `for` itera sobre una colección de longitud conocida, el bucle `while condicion:` evalúa su condición antes de cada ciclo. Si la condición es `True`, ejecuta el cuerpo; si es `False`, se detiene. Es indispensable modificar la variable de control dentro del cuerpo del bucle para garantizar que en algún momento la condición se vuelva falsa.",
      mentalModel:
        "Un semáforo inteligente: mientras haya autos esperando en la fila, la luz verde continúa. Cada vez que pasa un auto, la fila disminuye hasta quedar vacía.",
      codeExample:
        'n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Cero")',
    },
    starterCode: `# PASO 1: Crea la variable cuenta = 3
# PASO 2: Escribe el bucle: while cuenta > 0:
# PASO 3: Dentro del bucle imprime cuenta
# PASO 4: Dentro del bucle decrementa: cuenta = cuenta - 1
# PASO 5: Fuera del bucle imprime: ¡Despegue!
# Tu código va aquí:
`,
    solutionReference: `cuenta = 3
while cuenta > 0:
    print(cuenta)
    cuenta = cuenta - 1
print("¡Despegue!")`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe contar 3, 2, 1 y finalizar con ¡Despegue!",
        input: "",
        expectedOutput: "3\n2\n1\n¡Despegue!",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Decrementar la variable",
        prompt:
          "No olvides la línea cuenta = cuenta - 1 dentro del bucle; si no la pones, la cuenta siempre valdrá 3 y el programa nunca terminará.",
      },
      {
        level: 2,
        title: "El mensaje final",
        prompt:
          "La instrucción print('¡Despegue!') va fuera del bucle, alineada al margen izquierdo.",
      },
      {
        level: 3,
        title: "Código ordenado",
        prompt:
          'cuenta = 3\nwhile cuenta > 0:\n    print(cuenta)\n    cuenta = cuenta - 1\nprint("¡Despegue!")',
      },
    ],
  },

  {
    id: "py-m5-ex4",
    track: "python",
    moduleId: 5,
    lessonId: "py-m5-l2",
    order: 2,
    title: "Interrupción de Bucles con break",
    subtitle: "Detener la repetición anticipadamente cuando ocurre un evento",
    difficulty: "Intermedio",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "La instrucción break permite cancelar y salir de un bucle de inmediato cuando se cumple un criterio específico.",
      instructions: [
        "Inicializa la variable n = 1.",
        "Crea un bucle infinito: while True:",
        "Dentro del bucle, si n > 3, ejecuta la instrucción break para salir.",
        "Imprime el valor de n.",
        "Incrementa n en 1 (n = n + 1).",
      ],
      learningObjectives: [
        "Utilizar la instrucción break para controlar salidas forzadas de bucles",
        "Entender el flujo de ejecución de bucles basados en centinelas",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Sentencia break",
      explanation:
        "En ocasiones no conoces la condición exacta de parada al inicio del bucle o deseas detener la ejecución en medio del cuerpo. La sentencia `break` aborta instantáneamente el bucle más interno en el que se encuentra y transfiere la ejecución a la siguiente línea que esté fuera de él.",
      mentalModel:
        "El botón rojo de parada de emergencia en una escalera mecánica: no importa en qué punto del viaje te encuentres, al presionarlo todo se detiene al instante.",
      codeExample:
        "x = 1\nwhile True:\n    if x > 2:\n        break\n    print(x)\n    x += 1",
    },
    starterCode: `# PASO 1: Crea n = 1
# PASO 2: Escribe el bucle: while True:
# PASO 3: Dentro del bucle: if n > 3: usa 'break'
# PASO 4: Dentro del bucle: imprime n
# PASO 5: Dentro del bucle: incrementa n = n + 1
# Tu código va aquí:
`,
    solutionReference: `n = 1
while True:
    if n > 3:
        break
    print(n)
    n = n + 1`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir 1, 2, 3 y detenerse antes de imprimir 4",
        input: "",
        expectedOutput: "1\n2\n3",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "El condicional del break",
        prompt:
          "Coloca if n > 3: seguido en la siguiente línea indentada de la palabra break.",
      },
      {
        level: 2,
        title: "Orden dentro del bucle",
        prompt:
          "Primero evalúas si debes salir con break. Si no sales, imprimes n y luego le sumas 1 a n.",
      },
      {
        level: 3,
        title: "Estructura final",
        prompt:
          "n = 1\nwhile True:\n    if n > 3:\n        break\n    print(n)\n    n = n + 1",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 6: FUNCIONES
  // --------------------------------------------------------------------------
  {
    id: "py-m6-ex1",
    track: "python",
    moduleId: 6,
    lessonId: "py-m6-l1",
    order: 1,
    title: "Tu Primera Función con def y return",
    subtitle: "Empaquetando lógica reutilizable con valor de retorno",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "function_return",
    entryFunctionName: "cuadrado",
    spec: {
      summary:
        "Una función es un bloque de código reutilizable con nombre propio. Define una función llamada cuadrado que reciba un número n y devuelva su cuadrado (n * n).",
      instructions: [
        "Define la función usando la palabra clave def: def cuadrado(n):",
        "Dentro de la función, usa return para devolver el valor de n multiplicado por sí mismo (n * n).",
      ],
      learningObjectives: [
        "Declarar funciones personalizadas en Python con def",
        "Definir parámetros y retornar resultados computados con return",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Funciones: Recetas Reutilizables",
      explanation:
        "Una función agrupa un conjunto de operaciones bajo un nombre descriptivo. Se define con `def nombre_funcion(parametros):`. La palabra clave `return` entrega el resultado del cálculo a la parte del programa que llamó a la función. Si omites el `return`, Python devolverá `None` por defecto.",
      mentalModel:
        "Una máquina expendedora: introduces una moneda (argumento), la máquina procesa internamente la solicitud y expulsa un producto por la compuerta de salida (return).",
      codeExample:
        "def duplicar(x):\n    return x * 2\n\nresultado = duplicar(5)  # 10",
    },
    starterCode: `# PASO 1: Define la función llamada 'cuadrado' con el parámetro 'n'
# PASO 2: Usa la palabra clave return para devolver n * n
# Tu código va aquí:
`,
    solutionReference: `def cuadrado(n):
    return n * n`,
    testCases: [
      {
        id: "tc-1",
        description: "cuadrado(4) debe retornar 16",
        input: "4",
        expectedOutput: "16",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-2",
        description: "cuadrado(0) debe retornar 0",
        input: "0",
        expectedOutput: "0",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-3",
        description: "cuadrado(-5) debe retornar 25",
        input: "-5",
        expectedOutput: "25",
        evaluationType: "function_return",
        isHidden: true,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "La palabra reservada def",
        prompt:
          "Comienza la línea con la palabra 'def' seguida del nombre de la función y los paréntesis: def cuadrado(n):",
      },
      {
        level: 2,
        title: "Devolver el valor",
        prompt:
          "No uses print() dentro de la función. Usa return seguido de la operación matemática: return n * n.",
      },
      {
        level: 3,
        title: "Solución completa",
        prompt: "def cuadrado(n):\n    return n * n",
      },
    ],
  },

  {
    id: "py-m6-ex2",
    track: "python",
    moduleId: 6,
    lessonId: "py-m6-l1",
    order: 2,
    title: "Múltiples Parámetros y Cálculos",
    subtitle: "Funciones geométricas con más de un argumento de entrada",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "function_return",
    entryFunctionName: "calcular_area",
    spec: {
      summary:
        "Las funciones pueden recibir múltiples parámetros separados por comas. Define calcular_area(base, altura) para calcular el área de un rectángulo.",
      instructions: [
        "Define la función calcular_area con dos parámetros: base y altura.",
        "Retorna el producto de multiplicar base por altura.",
      ],
      learningObjectives: [
        "Definir y utilizar funciones con múltiples argumentos formales",
        "Operar con parámetros numéricos y retornar el resultado",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Funciones con Múltiples Parámetros",
      explanation:
        "Para recibir más de un dato en una función, separa los nombres de los parámetros mediante comas dentro de los paréntesis: `def f(a, b):`. Al llamar la función, los valores pasados se asocian en el mismo orden posicional.",
      mentalModel:
        "Una balanza con dos platillos: necesitas colocar los dos pesos (base y altura) para que el mecanismo calcule el resultado equilibrado.",
      codeExample:
        "def sumar(a, b):\n    return a + b\n\nprint(sumar(10, 5))  # 15",
    },
    starterCode: `# PASO 1: Define la función calcular_area(base, altura)
# PASO 2: Retorna el resultado de multiplicar base por altura
# Tu código va aquí:
`,
    solutionReference: `def calcular_area(base, altura):
    return base * altura`,
    testCases: [
      {
        id: "tc-1",
        description: "calcular_area(5, 10) debe retornar 50",
        input: "5, 10",
        expectedOutput: "50",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-2",
        description: "calcular_area(7, 3) debe retornar 21",
        input: "7, 3",
        expectedOutput: "21",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-3",
        description: "calcular_area(0, 15) debe retornar 0",
        input: "0, 15",
        expectedOutput: "0",
        evaluationType: "function_return",
        isHidden: true,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Separar parámetros",
        prompt:
          "En la firma de la función, coloca ambos parámetros separados por una coma: (base, altura).",
      },
      {
        level: 2,
        title: "El operador de multiplicación",
        prompt:
          "El operador de multiplicación en Python es el asterisco '*'. Usa: return base * altura.",
      },
      {
        level: 3,
        title: "Estructura de la función",
        prompt:
          "def calcular_area(base, altura):\n    return base * altura",
      },
    ],
  },

  {
    id: "py-m6-ex3",
    track: "python",
    moduleId: 6,
    lessonId: "py-m6-l2",
    order: 1,
    title: "Variables Locales vs Globales",
    subtitle: "El ciclo de vida y ámbito de variables dentro de una función",
    difficulty: "Intermedio",
    xpReward: 130,
    evaluationType: "function_return",
    entryFunctionName: "aplicar_descuento",
    spec: {
      summary:
        "Las variables creadas dentro de una función son locales a ella. Crea una función aplicar_descuento(precio, porcentaje) que calcule el descuento localmente y devuelva el precio final rebajado.",
      instructions: [
        "Define la función aplicar_descuento(precio, porcentaje).",
        "Calcula la variable local descuento = precio * (porcentaje / 100).",
        "Retorna el precio final: precio - descuento.",
      ],
      learningObjectives: [
        "Comprender el ámbito (scope) local de las variables creadas en una función",
        "Estructurar cálculos intermedios limpios antes de la sentencia return",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Ámbito Local vs Global",
      explanation:
        "Una variable definida dentro de una función solo existe mientras esa función se está ejecutando. En cuanto la función finaliza y entrega su retorno, las variables locales desaparecen de la memoria. Esta protección evita que variables auxiliares interfieran con el resto de tu programa.",
      mentalModel:
        "Una pizarra en una sala de reuniones privada: escribes notas para llegar a una conclusión, pero al terminar la reunión se borra la pizarra sin afectar a las demás oficinas.",
      codeExample:
        "def calcular_total(subtotal):\n    impuesto = subtotal * 0.16\n    return subtotal + impuesto",
    },
    starterCode: `# PASO 1: Define la función aplicar_descuento(precio, porcentaje)
# PASO 2: Calcula la variable local descuento = precio * (porcentaje / 100)
# PASO 3: Retorna precio - descuento
# Tu código va aquí:
`,
    solutionReference: `def aplicar_descuento(precio, porcentaje):
    descuento = precio * (porcentaje / 100)
    return precio - descuento`,
    testCases: [
      {
        id: "tc-1",
        description: "aplicar_descuento(100, 20) debe retornar 80.0",
        input: "100, 20",
        expectedOutput: "80.0",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-2",
        description: "aplicar_descuento(50, 10) debe retornar 45.0",
        input: "50, 10",
        expectedOutput: "45.0",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-3",
        description: "aplicar_descuento(200, 50) debe retornar 100.0",
        input: "200, 50",
        expectedOutput: "100.0",
        evaluationType: "function_return",
        isHidden: true,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Cálculo del porcentaje",
        prompt:
          "Para convertir un porcentaje a fracción decimal, divídelo entre 100: (porcentaje / 100).",
      },
      {
        level: 2,
        title: "Variable intermedia",
        prompt:
          "Crea descuento = precio * (porcentaje / 100) en la primera línea indentada, y return precio - descuento en la segunda.",
      },
      {
        level: 3,
        title: "Función completa",
        prompt:
          "def aplicar_descuento(precio, porcentaje):\n    descuento = precio * (porcentaje / 100)\n    return precio - descuento",
      },
    ],
  },

  {
    id: "py-m6-ex4",
    track: "python",
    moduleId: 6,
    lessonId: "py-m6-l2",
    order: 2,
    title: "Validaciones y Retorno Temprano",
    subtitle: "Usa return dentro de condicionales para terminar de inmediato",
    difficulty: "Intermedio",
    xpReward: 130,
    evaluationType: "function_return",
    entryFunctionName: "es_mayor_de_edad",
    spec: {
      summary:
        "Una función puede devolver valores booleanos dependiendo de una condición. Crea la función es_mayor_de_edad(edad) que devuelva True si edad >= 18, o False si no lo es.",
      instructions: [
        "Define la función es_mayor_de_edad(edad).",
        "Si edad >= 18, retorna el booleano True.",
        "Si no, retorna el booleano False.",
      ],
      learningObjectives: [
        "Escribir flujos de control con retorno temprano (guard clauses)",
        "Retornar valores booleanos explícitos desde una función",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Retorno Temprano (Guard Clauses)",
      explanation:
        "Tan pronto como la ejecución de una función se topa con la instrucción `return`, la función se detiene de inmediato y entrega el valor. Puedes colocar sentencias `return` dentro de bloques `if` para resolver casos límite de forma concisa sin anidar código innecesariamente.",
      mentalModel:
        "Un control de acceso: si cumples el requisito de edad, te sellan el pase (return True) y no necesitas hacer la fila de revisiones adicionales.",
      codeExample:
        "def es_positivo(numero):\n    if numero > 0:\n        return True\n    return False",
    },
    starterCode: `# PASO 1: Define la función es_mayor_de_edad(edad)
# PASO 2: Si edad >= 18 retorna True
# PASO 3: De lo contrario, retorna False
# Tu código va aquí:
`,
    solutionReference: `def es_mayor_de_edad(edad):
    if edad >= 18:
        return True
    return False`,
    testCases: [
      {
        id: "tc-1",
        description: "es_mayor_de_edad(20) debe retornar True",
        input: "20",
        expectedOutput: "True",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-2",
        description: "es_mayor_de_edad(15) debe retornar False",
        input: "15",
        expectedOutput: "False",
        evaluationType: "function_return",
        isHidden: false,
      },
      {
        id: "tc-3",
        description: "es_mayor_de_edad(18) debe retornar True (caso límite)",
        input: "18",
        expectedOutput: "True",
        evaluationType: "function_return",
        isHidden: true,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Comparación mayor o igual",
        prompt:
          "El operador mayor o igual se escribe '>='. ¿Comprobaste si edad >= 18?",
      },
      {
        level: 2,
        title: "Booleanos con mayúscula",
        prompt:
          "Recuerda que en Python los booleanos son True y False con la primera letra en mayúscula.",
      },
      {
        level: 3,
        title: "Código recomendado",
        prompt:
          "def es_mayor_de_edad(edad):\n    if edad >= 18:\n        return True\n    return False",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 7: COLECCIONES DE DATOS
  // --------------------------------------------------------------------------
  {
    id: "py-m7-ex1",
    track: "python",
    moduleId: 7,
    lessonId: "py-m7-l1",
    order: 1,
    title: "Listas, Índices y Longitud",
    subtitle: "Colecciones ordenadas y acceso mediante índice base-cero [0]",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "Una lista agrupa múltiples elementos en orden correlativo. Los índices comienzan en 0. Crea una lista de frutas e imprime su primer elemento y su tamaño total.",
      instructions: [
        "Crea una lista llamada frutas con los textos: 'manzana', 'platano', 'cereza'.",
        "Imprime el primer elemento de la lista usando la indexación frutas[0].",
        "Imprime la cantidad total de elementos usando la función len(frutas).",
      ],
      learningObjectives: [
        "Declarar listas usando corchetes [] y comas",
        "Acceder a elementos individuales usando índices basados en cero",
        "Determinar la longitud de cualquier colección con la función len()",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Listas en Python",
      explanation:
        "Una lista (`list`) es una secuencia ordenada de datos encerrada entre corchetes `[...]`. En computación es estándar usar indexación base cero: el primer elemento se encuentra en la posición `[0]`, el segundo en `[1]`, etc. La función `len(lista)` devuelve el número entero de elementos presentes.",
      mentalModel:
        "Una cajonera numerada: el primer cajón de arriba tiene la etiqueta '0'. Para tomar la manzana, abres el cajón 0.",
      codeExample:
        'colores = ["rojo", "verde", "azul"]\nprint(colores[0])  # rojo\nprint(len(colores))  # 3',
    },
    starterCode: `# PASO 1: Crea la lista frutas con "manzana", "platano", "cereza"
# PASO 2: Imprime el primer elemento con frutas[0]
# PASO 3: Imprime el número de elementos con len(frutas)
# Tu código va aquí:
`,
    solutionReference: `frutas = ["manzana", "platano", "cereza"]
print(frutas[0])
print(len(frutas))`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir 'manzana' y luego '3' en la siguiente línea",
        input: "",
        expectedOutput: "manzana\n3",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Indexación base cero",
        prompt:
          "Recuerda que en Python la primera posición es 0, no 1. ¿Usaste frutas[0]?",
      },
      {
        level: 2,
        title: "La función len()",
        prompt:
          "Para saber cuántos elementos hay en la lista pasa la variable a len: len(frutas).",
      },
      {
        level: 3,
        title: "Solución completa",
        prompt:
          'frutas = ["manzana", "platano", "cereza"]\nprint(frutas[0])\nprint(len(frutas))',
      },
    ],
  },

  {
    id: "py-m7-ex2",
    track: "python",
    moduleId: 7,
    lessonId: "py-m7-l1",
    order: 2,
    title: "Agregando Elementos con append()",
    subtitle: "Crecimiento dinámico de listas en tiempo de ejecución",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "Las listas son mutables: pueden cambiar de tamaño dinámicamente. Usa el método .append() para agregar elementos a una lista vacía.",
      instructions: [
        "Crea una lista vacía llamada numeros: numeros = []",
        "Agrega el entero 10 a la lista usando numeros.append(10).",
        "Agrega el entero 20 a la lista usando numeros.append(20).",
        "Imprime la lista completa usando print(numeros).",
      ],
      learningObjectives: [
        "Crear listas vacías e inicializarlas progresivamente",
        "Utilizar el método de mutación .append()",
        "Observar la representación textual estándar de una lista en consola: [10, 20]",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Métodos de Lista: .append()",
      explanation:
        "A diferencia de las variables de tipos primitivos, los objetos como las listas ofrecen métodos (funciones adjuntas a la propia lista). El método `.append(elemento)` añade el valor indicado al final de la lista, modificando el objeto original directamente sin necesidad de reasignarlo con `=`. ",
      mentalModel:
        "Un tren de carga: cada llamada a .append() engancha un nuevo vagón al final de la formación.",
      codeExample:
        'amigos = []\namigos.append("Leo")\namigos.append("Sara")\nprint(amigos)  # ["Leo", "Sara"]',
    },
    starterCode: `# PASO 1: Crea una lista vacía: numeros = []
# PASO 2: Agrega el número 10 con numeros.append(10)
# PASO 3: Agrega el número 20 con numeros.append(20)
# PASO 4: Imprime la lista completa con print(numeros)
# Tu código va aquí:
`,
    solutionReference: `numeros = []
numeros.append(10)
numeros.append(20)
print(numeros)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe mostrar la lista formateada: [10, 20]",
        input: "",
        expectedOutput: "[10, 20]",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Lista vacía",
        prompt:
          "Una lista vacía se crea simplemente abriendo y cerrando corchetes: numeros = [].",
      },
      {
        level: 2,
        title: "Llamar a append",
        prompt:
          "Usa la notación de punto: numeros.append(10) y luego numeros.append(20).",
      },
      {
        level: 3,
        title: "Impresión directa",
        prompt:
          "Al hacer print(numeros), Python imprimirá automáticamente los corchetes y comas: [10, 20].",
      },
    ],
  },

  {
    id: "py-m7-ex3",
    track: "python",
    moduleId: 7,
    lessonId: "py-m7-l2",
    order: 1,
    title: "Estructuras Clave-Valor con dict",
    subtitle: "Asociando datos con etiquetas descriptivas en lugar de índices",
    difficulty: "Fundamento",
    xpReward: 120,
    evaluationType: "stdout",
    spec: {
      summary:
        "Un diccionario almacena pares clave-valor encerrados entre llaves {}. Te permite buscar información por su nombre en lugar de una posición numérica.",
      instructions: [
        "Crea un diccionario llamado nave con las claves 'nombre': 'Sonda I' y 'energia': 100.",
        "Imprime el valor de la clave 'nombre' usando nave['nombre'].",
        "Imprime el valor de la clave 'energia' usando nave['energia'].",
      ],
      learningObjectives: [
        "Definir diccionarios con la sintaxis {clave: valor}",
        "Acceder a valores específicos mediante la clave correspondiente",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Diccionarios en Python (dict)",
      explanation:
        "Los diccionarios asocian una clave única con un valor. Se delimitan con llaves `{}` y cada par se separa con comas, usando dos puntos `:` entre la clave y el valor. Para consultar un dato, se utiliza `diccionario[clave]`. Es la estructura más rápida y versátil para representar registros con propiedades con nombre.",
      mentalModel:
        "Una agenda de contactos o un diccionario físico: buscas por la palabra que te interesa (la clave) para leer su definición asociada (el valor).",
      codeExample:
        'usuario = {"nombre": "Leo", "rol": "admin"}\nprint(usuario["nombre"])  # Leo\nprint(usuario["rol"])     # admin',
    },
    starterCode: `# PASO 1: Crea el diccionario: nave = {"nombre": "Sonda I", "energia": 100}
# PASO 2: Imprime nave["nombre"]
# PASO 3: Imprime nave["energia"]
# Tu código va aquí:
`,
    solutionReference: `nave = {"nombre": "Sonda I", "energia": 100}
print(nave["nombre"])
print(nave["energia"])`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir 'Sonda I' y en la siguiente línea '100'",
        input: "",
        expectedOutput: "Sonda I\n100",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Llaves y dos puntos",
        prompt:
          "Un diccionario usa llaves {} y separa cada clave de su valor con dos puntos ':'.",
      },
      {
        level: 2,
        title: "Acceder a las claves",
        prompt:
          "Para leer un valor escribe el nombre del diccionario seguido de corchetes con la clave: nave['nombre'].",
      },
      {
        level: 3,
        title: "Código paso a paso",
        prompt:
          'nave = {"nombre": "Sonda I", "energia": 100}\nprint(nave["nombre"])\nprint(nave["energia"])',
      },
    ],
  },

  {
    id: "py-m7-ex4",
    track: "python",
    moduleId: 7,
    lessonId: "py-m7-l2",
    order: 2,
    title: "Modificando Diccionarios y Tuplas Inmutables",
    subtitle: "Actualizar claves y entender coordenadas fijas con tuplas",
    difficulty: "Intermedio",
    xpReward: 130,
    evaluationType: "stdout",
    spec: {
      summary:
        "Los diccionarios son mutables y permiten cambiar valores existentes o añadir nuevas claves. Las tuplas (con paréntesis) son secuencias inmutables que garantizan que los datos no cambiarán.",
      instructions: [
        "Declara el diccionario: estado = {'vida': 50, 'escudo': 20}",
        "Actualiza la clave 'vida' asignándole el valor 80.",
        "Agrega una nueva clave 'coordenadas' que contenga la tupla inmutable (10, 25).",
        "Imprime estado['vida'] en la primera línea.",
        "Imprime estado['coordenadas'] en la segunda línea.",
      ],
      learningObjectives: [
        "Modificar y agregar entradas en diccionarios existentes",
        "Comprender la sintaxis y el propósito de las tuplas inmutables ()",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Mutabilidad en Diccionarios y Tuplas",
      explanation:
        "Para modificar un valor o insertar una nueva clave en un diccionario basta con asignar: `diccionario[clave] = nuevo_valor`. Por otra parte, una tupla se crea con paréntesis ordinarios `(x, y)` y es estrictamente inmutable: una vez creada, no se puede modificar ni alterar. Esto la convierte en la opción ideal para coordenadas geográficas, colores RGB o dimensiones fijas.",
      mentalModel:
        "El diccionario es una pizarra donde puedes borrar y reescribir cifras. La tupla es una placa de piedra tallada: sus números son eternos e inalterables.",
      codeExample:
        'datos = {"vidas": 3}\ndatos["vidas"] = 4\ndatos["pos"] = (100, 200)\nprint(datos["vidas"])\nprint(datos["pos"])',
    },
    starterCode: `# PASO 1: Declara: estado = {"vida": 50, "escudo": 20}
# PASO 2: Actualiza la vida: estado["vida"] = 80
# PASO 3: Agrega la tupla: estado["coordenadas"] = (10, 25)
# PASO 4: Imprime estado["vida"]
# PASO 5: Imprime estado["coordenadas"]
# Tu código va aquí:
`,
    solutionReference: `estado = {"vida": 50, "escudo": 20}
estado["vida"] = 80
estado["coordenadas"] = (10, 25)
print(estado["vida"])
print(estado["coordenadas"])`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir la vida actualizada (80) y la tupla (10, 25)",
        input: "",
        expectedOutput: "80\n(10, 25)",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Actualizar un valor",
        prompt:
          "Para actualizar la vida a 80, escribe: estado['vida'] = 80.",
      },
      {
        level: 2,
        title: "Crear una tupla",
        prompt:
          "Una tupla se escribe con paréntesis normales: (10, 25). Asígnala con estado['coordenadas'] = (10, 25).",
      },
      {
        level: 3,
        title: "Impresión final",
        prompt:
          "Llama a print(estado['vida']) y print(estado['coordenadas']).",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 8: PROGRAMACIÓN ORIENTADA A OBJETOS (POO)
  // --------------------------------------------------------------------------
  {
    id: "py-m8-ex1",
    track: "python",
    moduleId: 8,
    lessonId: "py-m8-l1",
    order: 1,
    title: "Tu Primera Clase y el Constructor __init__",
    subtitle: "Creando instancias con atributos propios mediante la plantilla class",
    difficulty: "Intermedio",
    xpReward: 130,
    evaluationType: "stdout",
    spec: {
      summary:
        "Una clase es una plantilla para fabricar objetos. El método constructor __init__ se ejecuta automáticamente al instanciar un objeto para asignarle sus atributos iniciales.",
      instructions: [
        "Define una clase llamada Robot usando: class Robot:",
        "Dentro de la clase, define el constructor def __init__(self, nombre):",
        "En el constructor, guarda el nombre en la instancia: self.nombre = nombre",
        "Fuera de la clase, crea una instancia llamada mi_robot = Robot('Titan').",
        "Imprime el atributo nombre usando print(mi_robot.nombre).",
      ],
      learningObjectives: [
        "Declarar una clase con la palabra reservada class",
        "Implementar el método constructor especial __init__",
        "Entender el rol del parámetro self y acceder a atributos con la notación de punto",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Clases y Objetos: El Molde y la Galleta",
      explanation:
        "Una clase (`class`) es el molde conceptual o plano arquitectónico; el objeto o instancia es la entidad real construida a partir de ese molde. El método especial `__init__(self, ...)` es el constructor que inicializa los datos del objeto recién nacido. El parámetro `self` representa a la instancia concreta que se está creando en ese preciso momento.",
      mentalModel:
        "Un plano de construcción (class Robot) no ocupa un terreno ni tiene ventanas reales. Cada casa construida siguiendo ese plano (mi_robot) es una instancia real con su propia dirección y color.",
      codeExample:
        'class Gato:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nmichi = Gato("Felix")\nprint(michi.nombre)',
    },
    starterCode: `# PASO 1: Declara la clase: class Robot:
# PASO 2: Define el constructor: def __init__(self, nombre):
# PASO 3: Asigna el atributo: self.nombre = nombre
# PASO 4: Fuera de la clase, instancia: mi_robot = Robot("Titan")
# PASO 5: Imprime el atributo: print(mi_robot.nombre)
# Tu código va aquí:
`,
    solutionReference: `class Robot:
    def __init__(self, nombre):
        self.nombre = nombre

mi_robot = Robot("Titan")
print(mi_robot.nombre)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe imprimir el atributo nombre del robot: 'Titan'",
        input: "",
        expectedOutput: "Titan",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Doble guion bajo en __init__",
        prompt:
          "El método constructor lleva dos guiones bajos antes y dos después: def __init__(self, nombre):",
      },
      {
        level: 2,
        title: "El parámetro self",
        prompt:
          "Para guardar el dato en la instancia usa: self.nombre = nombre.",
      },
      {
        level: 3,
        title: "Instanciación y consulta",
        prompt:
          'Crea el robot con mi_robot = Robot("Titan") y accede a su propiedad con mi_robot.nombre.',
      },
    ],
  },

  {
    id: "py-m8-ex2",
    track: "python",
    moduleId: 8,
    lessonId: "py-m8-l1",
    order: 2,
    title: "Comportamiento con Métodos",
    subtitle: "Funciones que pertenecen a la clase y operan sobre self",
    difficulty: "Intermedio",
    xpReward: 140,
    evaluationType: "stdout",
    spec: {
      summary:
        "Los métodos son funciones asociadas a una clase. Utilizan self para interactuar con los atributos internos de la instancia.",
      instructions: [
        "Define una clase Persona con su constructor __init__(self, nombre) que guarde self.nombre = nombre.",
        "Define dentro de la clase el método saludar(self) que imprima: f'Hola, soy {self.nombre}'.",
        "Fuera de la clase, crea una instancia p = Persona('Carlos').",
        "Ejecuta el método llamando a p.saludar().",
      ],
      learningObjectives: [
        "Definir métodos de instancia dentro de una clase",
        "Invocar métodos usando la notación objeto.metodo()",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Métodos de Instancia",
      explanation:
        "Cualquier función definida dentro del cuerpo de una clase que acepte `self` como primer parámetro es un método de instancia. Cuando invocas `p.saludar()`, Python pasa automáticamente la instancia `p` como el argumento `self`, permitiendo al método acceder a todos los atributos de esa persona específica.",
      mentalModel:
        "Los atributos son lo que el objeto TIENE (sus datos); los métodos son lo que el objeto HACE (sus habilidades o acciones).",
      codeExample:
        'class Perro:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def ladrar(self):\n        print(f"{self.nombre} dice Guau!")',
    },
    starterCode: `# PASO 1: Define la clase Persona con __init__(self, nombre): self.nombre = nombre
# PASO 2: Define el método saludar(self) que imprima f"Hola, soy {self.nombre}"
# PASO 3: Fuera de la clase, crea: p = Persona("Carlos")
# PASO 4: Llama al método: p.saludar()
# Tu código va aquí:
`,
    solutionReference: `class Persona:
    def __init__(self, nombre):
        self.nombre = nombre

    def saludar(self):
        print(f"Hola, soy {self.nombre}")

p = Persona("Carlos")
p.saludar()`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe ejecutar el método e imprimir 'Hola, soy Carlos'",
        input: "",
        expectedOutput: "Hola, soy Carlos",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Primer parámetro siempre self",
        prompt:
          "Todo método de instancia debe recibir 'self' como su primer parámetro: def saludar(self):",
      },
      {
        level: 2,
        title: "Acceder al nombre dentro del método",
        prompt:
          "Usa una f-string con {self.nombre}: print(f'Hola, soy {self.nombre}').",
      },
      {
        level: 3,
        title: "Invocación sin pasar self manualmente",
        prompt:
          "Al llamar al método escribes p.saludar(), con paréntesis vacíos; Python se encarga de inyectar self automáticamente.",
      },
    ],
  },

  {
    id: "py-m8-ex3",
    track: "python",
    moduleId: 8,
    lessonId: "py-m8-l1",
    order: 3,
    title: "Encapsulamiento y Estado de un Objeto",
    subtitle: "Métodos que modifican atributos internos a lo largo del tiempo",
    difficulty: "Intermedio",
    xpReward: 140,
    evaluationType: "stdout",
    spec: {
      summary:
        "Los objetos mantienen un estado interno que puede mutar mediante métodos. Modela una cuenta bancaria capaz de recibir depósitos y actualizar su saldo.",
      instructions: [
        "Crea una clase CuentaBancaria con un constructor __init__(self, saldo_inicial) que guarde self.saldo = saldo_inicial.",
        "Crea el método depositar(self, monto) que sume monto al saldo actual: self.saldo = self.saldo + monto.",
        "Fuera de la clase, crea mi_cuenta = CuentaBancaria(100).",
        "Llama a mi_cuenta.depositar(50).",
        "Imprime el saldo resultante con print(mi_cuenta.saldo).",
      ],
      learningObjectives: [
        "Modificar y persistir el estado interno de un objeto mediante métodos",
        "Comprender el concepto de encapsulamiento de datos y comportamiento",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Estado y Persistencia",
      explanation:
        "Una de las mayores ventajas de la POO es que los objetos retienen su propio estado en la memoria. Cuando llamas a `mi_cuenta.depositar(50)`, el atributo `self.saldo` cambia de 100 a 150 y conserva ese nuevo valor para cualquier operación futura.",
      mentalModel:
        "Tu cuenta de ahorros real: el saldo no es una variable suelta en el aire; vive dentro de tu cuenta personal y cambia cada vez que realizas un depósito o retiro.",
      codeExample:
        "class Contador:\n    def __init__(self):\n        self.cuenta = 0\n    def sumar(self):\n        self.cuenta += 1",
    },
    starterCode: `# PASO 1: Define la clase CuentaBancaria
# PASO 2: En __init__(self, saldo_inicial) asigna self.saldo = saldo_inicial
# PASO 3: En el método depositar(self, monto) actualiza self.saldo = self.saldo + monto
# PASO 4: Crea mi_cuenta = CuentaBancaria(100)
# PASO 5: Deposita: mi_cuenta.depositar(50)
# PASO 6: Imprime mi_cuenta.saldo
# Tu código va aquí:
`,
    solutionReference: `class CuentaBancaria:
    def __init__(self, saldo_inicial):
        self.saldo = saldo_inicial

    def depositar(self, monto):
        self.saldo = self.saldo + monto

mi_cuenta = CuentaBancaria(100)
mi_cuenta.depositar(50)
print(mi_cuenta.saldo)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe actualizar el saldo de 100 a 150 e imprimir 150",
        input: "",
        expectedOutput: "150",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Actualizar self.saldo",
        prompt:
          "Dentro del método depositar, suma el monto al saldo: self.saldo = self.saldo + monto.",
      },
      {
        level: 2,
        title: "Llamar a depositar",
        prompt:
          "Primero inicializas la cuenta con 100 y luego llamas a mi_cuenta.depositar(50).",
      },
      {
        level: 3,
        title: "Imprimir el saldo",
        prompt:
          "Al final, imprime el saldo con print(mi_cuenta.saldo).",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 9: MÓDULOS Y LIBRERÍAS
  // --------------------------------------------------------------------------
  {
    id: "py-m9-ex1",
    track: "python",
    moduleId: 9,
    lessonId: "py-m9-l1",
    order: 1,
    title: "Importando el Módulo math",
    subtitle: "Raíces cuadradas y redondeo de piso con la librería matemática estándar",
    difficulty: "Intermedio",
    xpReward: 130,
    evaluationType: "stdout",
    spec: {
      summary:
        "Python incluye una potente biblioteca estándar. La sentencia import math te permite acceder a funciones matemáticas de alta precisión como math.sqrt() y math.floor().",
      instructions: [
        "Importa el módulo math usando: import math",
        "Calcula la raíz cuadrada de 64 con math.sqrt(64) y guárdala en la variable raiz.",
        "Calcula el piso entero de 7.9 con math.floor(7.9) y guárdalo en la variable piso.",
        "Imprime raiz en la primera línea.",
        "Imprime piso en la segunda línea.",
      ],
      learningObjectives: [
        "Utilizar la sentencia import para cargar módulos estándar de Python",
        "Invocar funciones de módulos mediante la notación modulo.funcion()",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Biblioteca Estándar y el Módulo math",
      explanation:
        "Python viene con la filosofía 'baterías incluidas'. El módulo `math` contiene funciones matemáticas implementadas a bajo nivel para máxima eficiencia y precisión. `math.sqrt(x)` devuelve la raíz cuadrada (como un float) y `math.floor(x)` redondea cualquier número decimal hacia abajo al entero más próximo.",
      mentalModel:
        "Importar un módulo es como abrir una caja de herramientas especializada que tenías guardada en tu taller.",
      codeExample:
        "import math\nprint(math.sqrt(25))   # 5.0\nprint(math.floor(3.8)) # 3",
    },
    starterCode: `# PASO 1: Importa el módulo: import math
# PASO 2: Calcula la raíz de 64: raiz = math.sqrt(64)
# PASO 3: Calcula el piso de 7.9: piso = math.floor(7.9)
# PASO 4: Imprime raiz
# PASO 5: Imprime piso
# Tu código va aquí:
`,
    solutionReference: `import math

raiz = math.sqrt(64)
piso = math.floor(7.9)
print(raiz)
print(piso)`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe calcular y mostrar raiz (8.0) y piso (7)",
        input: "",
        expectedOutput: "8.0\n7",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "La palabra clave import",
        prompt:
          "En la primera línea del archivo escribe: import math.",
      },
      {
        level: 2,
        title: "Notación de punto",
        prompt:
          "Para usar una función de math, antepón el nombre del módulo: math.sqrt(64) y math.floor(7.9).",
      },
      {
        level: 3,
        title: "Resultado esperado",
        prompt:
          "math.sqrt(64) genera el flotante 8.0 y math.floor(7.9) genera el entero 7.",
      },
    ],
  },

  {
    id: "py-m9-ex2",
    track: "python",
    moduleId: 9,
    lessonId: "py-m9-l1",
    order: 2,
    title: "Azar Controlado con random.seed y randint",
    subtitle: "Simulaciones y números pseudoaleatorios reproducibles",
    difficulty: "Intermedio",
    xpReward: 140,
    evaluationType: "stdout",
    spec: {
      summary:
        "El módulo random genera números pseudoaleatorios. Al fijar una semilla con random.seed(), la secuencia aleatoria se vuelve completamente predecible y reproducible.",
      instructions: [
        "Importa el módulo random usando: import random",
        "Fija la semilla determinista en 42 usando: random.seed(42)",
        "Genera un entero entre 1 y 6 usando random.randint(1, 6) y guárdalo en dado1.",
        "Genera otro entero entre 1 y 6 usando random.randint(1, 6) y guárdalo en dado2.",
        "Imprime dado1 en la primera línea e imprime dado2 en la segunda línea.",
      ],
      learningObjectives: [
        "Generar números enteros aleatorios en un rango inclusivo con random.randint()",
        "Comprender el concepto de semilla (seed) para pruebas científicas y deterministas",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Generación Pseudoaleatoria y Semillas",
      explanation:
        "Las computadoras convencionales no generan azar cuántico puro; utilizan algoritmos matemáticos deterministas que generan secuencias que parecen aleatorias. Al fijar la semilla inicial con `random.seed(42)`, la computadora siempre generará exactamente los mismos números en el mismo orden. Esto es vital para videojuegos con mundos reproducibles y pruebas automatizadas.",
      mentalModel:
        "Una baraja de cartas mezclada de una forma matemática idéntica. Si dos jugadores usan la baraja número 42, a ambos les saldrán las mismas cartas exactamente.",
      codeExample:
        "import random\nrandom.seed(10)\nprint(random.randint(1, 10))",
    },
    starterCode: `# PASO 1: Importa el módulo: import random
# PASO 2: Fija la semilla: random.seed(42)
# PASO 3: Lanza el primer dado: dado1 = random.randint(1, 6)
# PASO 4: Lanza el segundo dado: dado2 = random.randint(1, 6)
# PASO 5: Imprime dado1
# PASO 6: Imprime dado2
# Tu código va aquí:
`,
    solutionReference: `import random

random.seed(42)
dado1 = random.randint(1, 6)
dado2 = random.randint(1, 6)
print(dado1)
print(dado2)`,
    testCases: [
      {
        id: "tc-1",
        description:
          "Con semilla 42, los dos lanzamientos de dados de 6 caras dan 6 y 1",
        input: "",
        expectedOutput: "6\n1",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Importar random y fijar la semilla",
        prompt:
          "Escribe import random en la primera línea y luego random.seed(42) para que el resultado sea siempre idéntico.",
      },
      {
        level: 2,
        title: "Rango con randint",
        prompt:
          "random.randint(1, 6) incluye tanto el 1 como el 6. Llama a la función dos veces para guardar dado1 y dado2.",
      },
      {
        level: 3,
        title: "Código final",
        prompt:
          "import random\nrandom.seed(42)\ndado1 = random.randint(1, 6)\ndado2 = random.randint(1, 6)\nprint(dado1)\nprint(dado2)",
      },
    ],
  },

  {
    id: "py-m9-ex3",
    track: "python",
    moduleId: 9,
    lessonId: "py-m9-l1",
    order: 3,
    title: "Desafío Final: Teorema de Pitágoras con math.hypot",
    subtitle: "Cálculo de distancia euclidiana combinando librerías y f-strings",
    difficulty: "Avanzado",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Aplica lo aprendido usando funciones especializadas de math. La función math.hypot(x, y) calcula la hipotenusa de un triángulo rectángulo o la distancia euclidiana entre coordenadas.",
      instructions: [
        "Importa el módulo math usando: import math",
        "Declara los catetos cateto_a = 3.0 y cateto_b = 4.0.",
        "Calcula la distancia calculando la hipotenusa con math.hypot(cateto_a, cateto_b) y guárdala en la variable distancia.",
        "Imprime el resultado usando una f-string con el formato exacto: 'Distancia: {distancia}'.",
      ],
      learningObjectives: [
        "Descubrir y utilizar funciones matemáticas avanzadas de la biblioteca estándar",
        "Combinar resultados numéricos de librerías con f-strings para presentación limpia",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Composición de Módulos y Código Profesional",
      explanation:
        "En lugar de programar fórmulas complejas manualmente (`sqrt(a**2 + b**2)`), los desarrolladores profesionales recurren a las funciones probadas y optimizadas de la biblioteca estándar. `math.hypot()` calcula la raíz de la suma de cuadrados evitando problemas de desbordamiento numérico (overflow).",
      mentalModel:
        "Un maestro constructor que no inventa tornillos desde cero: sabe qué herramienta especializada tomar de su caja de herramientas para un trabajo impecable.",
      codeExample:
        'import math\ndist = math.hypot(6.0, 8.0)\nprint(f"Distancia: {dist}")  # Distancia: 10.0',
    },
    starterCode: `# PASO 1: Importa el módulo: import math
# PASO 2: Declara cateto_a = 3.0 y cateto_b = 4.0
# PASO 3: Calcula la hipotenusa: distancia = math.hypot(cateto_a, cateto_b)
# PASO 4: Imprime usando f-string: f"Distancia: {distancia}"
# Tu código va aquí:
`,
    solutionReference: `import math

cateto_a = 3.0
cateto_b = 4.0
distancia = math.hypot(cateto_a, cateto_b)
print(f"Distancia: {distancia}")`,
    testCases: [
      {
        id: "tc-1",
        description: "Debe calcular la hipotenusa 5.0 e imprimir 'Distancia: 5.0'",
        input: "",
        expectedOutput: "Distancia: 5.0",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Función math.hypot",
        prompt:
          "La función math.hypot recibe dos valores (los catetos) y devuelve la hipotenusa.",
      },
      {
        level: 2,
        title: "Interpolación en f-string",
        prompt:
          "Usa print(f'Distancia: {distancia}') respetando las mayúsculas y los dos puntos.",
      },
      {
        level: 3,
        title: "Solución completa",
        prompt:
          'import math\ncateto_a = 3.0\ncateto_b = 4.0\ndistancia = math.hypot(cateto_a, cateto_b)\nprint(f"Distancia: {distancia}")',
      },
    ],
  },
];
