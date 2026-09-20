import { TrackModule, TrackLesson, TrackExercise } from "@/types/exercise";

// ============================================================================
// MÓDULOS DEL TRACK C++ 20 (9 MÓDULOS SECUENCIALES DESDE CERO)
// ============================================================================

export const cppModules: TrackModule[] = [
  {
    id: 1,
    track: "cpp",
    title: "Módulo 1: Estructura Básica y Compilación",
    subtitle: "Punto de entrada int main(), directiva #include y flujo de salida std::cout",
    description:
      "Descubre cómo opera el modelo de compilación en C++, la anatomía de la función principal main(), el flujo de salida std::cout con el operador de inserción <<, el salto de línea \\n y la disciplina del punto y coma (;).",
    concepts: [
      "función int main()",
      "directiva #include <iostream>",
      "flujo de salida std::cout",
      "operador de inserción <<",
      "salto de línea \\n y std::endl",
      "terminador punto y coma ;",
    ],
    lessonIds: ["cpp-m1-l1"],
  },
  {
    id: 2,
    track: "cpp",
    title: "Módulo 2: Variables y Tipado Estricto",
    subtitle: "Tipos fundamentales en memoria: int, double, char, bool y std::string",
    description:
      "Aprende cómo C++ reserva memoria estática y segura para tus datos. Domina los tipos primitivos int, double, char y bool, así como las cadenas dinámicas de std::string, comprendiendo la importancia de la inicialización y el tipado estricto.",
    concepts: [
      "declaración de tipo explícita",
      "enteros con int",
      "números decimales con double",
      "caracteres con char",
      "booleanos con bool",
      "cadenas de texto con std::string",
      "inicialización de variables",
    ],
    lessonIds: ["cpp-m2-l1"],
  },
  {
    id: 3,
    track: "cpp",
    title: "Módulo 3: Operaciones Aritméticas y Lógicas",
    subtitle: "Aritmética entera vs real, módulo % y operadores relacionales y booleanos",
    description:
      "Calcula expresiones numéricas comprendiendo la división entera truncada de C++, el residuo con el operador módulo % y la toma de decisiones lógicas con comparadores y operadores booleanos (&&, ||, !).",
    concepts: [
      "operadores aritméticos (+, -, *)",
      "división entera truncada (/)",
      "operador residuo módulo (%)",
      "operadores relacionales (==, !=, <, >, <=, >=)",
      "operadores lógicos (&&, ||, !)",
      "precedencia y cortocircuito booleano",
    ],
    lessonIds: ["cpp-m3-l1", "cpp-m3-l2"],
  },
  {
    id: 4,
    track: "cpp",
    title: "Módulo 4: Control de Flujo",
    subtitle: "Bifurcaciones con if, else if, else, bloques { } y operador ternario",
    description:
      "Guía la ejecución de tu programa a través de caminos alternativos evaluando condiciones con if, else if y else en bloques delimitados por llaves { }, y domina expresiones concisas con el operador ternario (? :).",
    concepts: [
      "estructura condicional if",
      "cláusula alternativa else",
      "bifurcaciones múltiples con else if",
      "ámbito de bloque con llaves { }",
      "operador ternario condicional (? :)",
    ],
    lessonIds: ["cpp-m4-l1"],
  },
  {
    id: 5,
    track: "cpp",
    title: "Módulo 5: Bucles",
    subtitle: "Iteración con for, bucles while y control do-while",
    description:
      "Automatiza tareas repetitivas mediante el bucle contador for (int i = 0; i < n; i++), iteraciones controladas por condición con while y el bucle de ejecución garantizada do-while.",
    concepts: [
      "bucle for contador",
      "variable de control e incremento",
      "bucle condicional while",
      "bucle do-while post-condición",
      "patrón del acumulador",
      "prevención de ciclos infinitos",
    ],
    lessonIds: ["cpp-m5-l1", "cpp-m5-l2"],
  },
  {
    id: 6,
    track: "cpp",
    title: "Módulo 6: Funciones en C++",
    subtitle: "Firmas, tipos de retorno, procedimientos void y paso por valor vs referencia (&)",
    description:
      "Escribe código modular y reutilizable definiendo funciones con tipos de retorno explícitos o void, comprendiendo la diferencia fundamental entre el paso de parámetros por copia (valor) y por referencia (&) para modificar datos en memoria.",
    concepts: [
      "firma y prototipo de función",
      "tipo de retorno y sentencia return",
      "funciones void (procedimientos)",
      "parámetros formales y argumentos",
      "paso por valor (copia)",
      "paso por referencia (&)",
    ],
    lessonIds: ["cpp-m6-l1", "cpp-m6-l2"],
  },
  {
    id: 7,
    track: "cpp",
    title: "Módulo 7: Arreglos y Vectores",
    subtitle: "Arrays nativos de tamaño fijo vs std::vector dinámico en C++",
    description:
      "Compara arreglos nativos de tamaño estático con el contenedor dinámico por excelencia de la biblioteca estándar de C++: std::vector, dominando la adición de elementos con .push_back(), la consulta de tamaño con .size() y el acceso indexado.",
    concepts: [
      "arreglos nativos de tamaño fijo",
      "indexación en base cero [i]",
      "contenedor dinámico std::vector",
      "inserción al final con .push_back()",
      "consulta de longitud con .size()",
      "recorrido e inspección de elementos",
    ],
    lessonIds: ["cpp-m7-l1", "cpp-m7-l2"],
  },
  {
    id: 8,
    track: "cpp",
    title: "Módulo 8: Clases y Objetos en C++",
    subtitle: "struct vs class, encapsulamiento public/private, constructores y puntero this",
    description:
      "Aprende el paradigma orientado a objetos en C++: empaqueta datos con struct y protege el estado interno con class mediante especificadores de acceso public y private, inicializa miembros con constructores y utiliza el puntero implícito this.",
    concepts: [
      "estructuras con struct",
      "clases con class",
      "especificadores de acceso (public y private)",
      "constructores de inicialización",
      "métodos miembros y comportamiento",
      "el puntero implícito this (this->)",
    ],
    lessonIds: ["cpp-m8-l1"],
  },
  {
    id: 9,
    track: "cpp",
    title: "Módulo 9: Librerías Estándar de C++",
    subtitle: "La biblioteca estándar: #include <cmath>, <string> y algoritmos con <algorithm>",
    description:
      "Aprovecha las herramientas nativas de C++ incluyendo librerías estándar: cálculos numéricos con <cmath> (sqrt, pow), conversiones de texto con <string> (to_string, stoi) y algoritmos potentes de manipulación con <algorithm> (std::sort, std::reverse).",
    concepts: [
      "librería matemática <cmath> (std::sqrt, std::pow)",
      "librería de cadenas <string> (std::to_string, std::stoi)",
      "librería de algoritmos <algorithm> (std::sort, std::reverse)",
      "iteradores de contenedores (.begin(), .end())",
      "modularidad y reutilización estándar",
    ],
    lessonIds: ["cpp-m9-l1", "cpp-m9-l2"],
  },
];

// ============================================================================
// LECCIONES DEL TRACK C++ 20 (14 LECCIONES ESTRUCTURADAS)
// ============================================================================

export const cppLessons: TrackLesson[] = [
  // Módulo 1
  {
    id: "cpp-m1-l1",
    track: "cpp",
    moduleId: 1,
    order: 1,
    title: "Estructura del Programa y Salida Básica",
    subtitle: "La función int main(), #include <iostream> y el flujo std::cout",
    description:
      "Aprende la anatomía mínima de todo programa en C++: la directiva #include, la función principal int main(), el envío de caracteres a consola con std::cout << y la terminación de sentencias con punto y coma (;).",
    exerciseIds: ["cpp-m1-ex1", "cpp-m1-ex2", "cpp-m1-ex3"],
  },

  // Módulo 2
  {
    id: "cpp-m2-l1",
    track: "cpp",
    moduleId: 2,
    order: 1,
    title: "Variables y Tipado Primitivo en C++",
    subtitle: "Tipos de datos fundamentales y la librería <string>",
    description:
      "Comprende cómo declarar e inicializar variables con tipado estricto usando int, double, char, bool y std::string, evitando errores de conversión indebida.",
    exerciseIds: ["cpp-m2-ex1", "cpp-m2-ex2", "cpp-m2-ex3"],
  },

  // Módulo 3
  {
    id: "cpp-m3-l1",
    track: "cpp",
    moduleId: 3,
    order: 1,
    title: "Operadores Aritméticos y Residuo",
    subtitle: "Cálculos matemáticos y división entera",
    description:
      "Domina los operadores de cálculo numérico (+, -, *), comprende la división entera truncada de C++ y utiliza el operador módulo % para obtener el residuo.",
    exerciseIds: ["cpp-m3-ex1", "cpp-m3-ex2"],
  },
  {
    id: "cpp-m3-l2",
    track: "cpp",
    moduleId: 3,
    order: 2,
    title: "Operadores Relacionales y Lógica Booleana",
    subtitle: "Comparación de valores y conectores &&, ||, !",
    description:
      "Evalúa condiciones complejas mediante comparaciones numéricas y los operadores lógicos AND (&&), OR (||) y NOT (!).",
    exerciseIds: ["cpp-m3-ex3"],
  },

  // Módulo 4
  {
    id: "cpp-m4-l1",
    track: "cpp",
    moduleId: 4,
    order: 1,
    title: "Condicionales y Bloques de Código",
    subtitle: "Bifurcaciones con if, else if, else y el operador ternario",
    description:
      "Controla el flujo de ejecución mediante sentencias condicionales delimitadas por bloques con llaves { } y expresiones compactas con el operador ternario (? :).",
    exerciseIds: ["cpp-m4-ex1", "cpp-m4-ex2", "cpp-m4-ex3"],
  },

  // Módulo 5
  {
    id: "cpp-m5-l1",
    track: "cpp",
    moduleId: 5,
    order: 1,
    title: "El Bucle for y Conteo de Iteraciones",
    subtitle: "Bucles clásicos con variable de control y acumulación",
    description:
      "Aprende a ejecutar repeticiones con límites conocidos usando el bucle for (int i = 0; i < n; i++) y a acumular valores iterativamente.",
    exerciseIds: ["cpp-m5-ex1", "cpp-m5-ex2"],
  },
  {
    id: "cpp-m5-l2",
    track: "cpp",
    moduleId: 5,
    order: 2,
    title: "Bucles while y do-while",
    subtitle: "Repeticiones basadas en estado y ejecución garantizada",
    description:
      "Implementa bucles dependientes de condiciones dinámicas con while y domina el bucle do-while para garantizar al menos una iteración previa a la evaluación.",
    exerciseIds: ["cpp-m5-ex3", "cpp-m5-ex4"],
  },

  // Módulo 6
  {
    id: "cpp-m6-l1",
    track: "cpp",
    moduleId: 6,
    order: 1,
    title: "Declaración de Funciones y Retorno",
    subtitle: "Firmas de función, retorno de valores y el tipo void",
    description:
      "Modulariza tu lógica creando funciones con firmas tipadas, devolviendo cómputos mediante return y definiendo rutinas de consola con void.",
    exerciseIds: ["cpp-m6-ex1", "cpp-m6-ex2"],
  },
  {
    id: "cpp-m6-l2",
    track: "cpp",
    moduleId: 6,
    order: 2,
    title: "Parámetros por Referencia y Efectos Secundarios",
    subtitle: "Paso por valor (copia) vs paso por referencia con el operador &",
    description:
      "Comprende cómo C++ pasa datos a las funciones: optimiza el uso de memoria y modifica variables originales empleando referencias con &.",
    exerciseIds: ["cpp-m6-ex3"],
  },

  // Módulo 7
  {
    id: "cpp-m7-l1",
    track: "cpp",
    moduleId: 7,
    order: 1,
    title: "Arreglos Fijos Nativos",
    subtitle: "Estructuras estáticas de memoria contigua en C++",
    description:
      "Almacena series de datos en memoria consecutiva mediante arreglos nativos de tamaño fijo e itera a través de sus posiciones indexadas.",
    exerciseIds: ["cpp-m7-ex1"],
  },
  {
    id: "cpp-m7-l2",
    track: "cpp",
    moduleId: 7,
    order: 2,
    title: "El Contenedor Dinámico std::vector",
    subtitle: "Vectores con tamaño variable, .push_back() y .size()",
    description:
      "Aprovecha el contenedor dinámico más utilizado en C++ (#include <vector>), agregando datos en tiempo de ejecución y consultando su tamaño.",
    exerciseIds: ["cpp-m7-ex2", "cpp-m7-ex3"],
  },

  // Módulo 8
  {
    id: "cpp-m8-l1",
    track: "cpp",
    moduleId: 8,
    order: 1,
    title: "Clases, Structs y Encapsulamiento",
    subtitle: "Modelado de objetos, constructores, public/private y el puntero this",
    description:
      "Aprende a encapsular datos y comportamiento en C++ utilizando struct y class, gestionando accesos con public y private y referenciando la instancia con this.",
    exerciseIds: ["cpp-m8-ex1", "cpp-m8-ex2", "cpp-m8-ex3"],
  },

  // Módulo 9
  {
    id: "cpp-m9-l1",
    track: "cpp",
    moduleId: 9,
    order: 1,
    title: "Biblioteca Matemática cmath y Cadenas Avanzadas",
    subtitle: "Cálculos con <cmath> y conversiones con <string>",
    description:
      "Utiliza funciones matemáticas avanzadas como std::sqrt y std::pow desde <cmath> y convierte entre números y textos con std::to_string y std::stoi.",
    exerciseIds: ["cpp-m9-ex1", "cpp-m9-ex2"],
  },
  {
    id: "cpp-m9-l2",
    track: "cpp",
    moduleId: 9,
    order: 2,
    title: "Algoritmos Estándar: Ordenamiento e Inversión",
    subtitle: "Manipulación de datos con la librería <algorithm>",
    description:
      "Aplica algoritmos estándar de alto rendimiento como std::sort y std::reverse sobre contenedores vectoriales usando sus iteradores .begin() y .end().",
    exerciseIds: ["cpp-m9-ex3"],
  },
];

// ============================================================================
// EJERCICIOS DEL TRACK C++ 20 (28 EJERCICIOS PRÁCTICOS PROGRESIVOS)
// Cero soluciones pre-escritas en starterCode (solo comentarios guiados // PASO).
// ============================================================================

export const cppExercises: TrackExercise[] = [
  // --------------------------------------------------------------------------
  // MÓDULO 1: ESTRUCTURA BÁSICA Y COMPILACIÓN
  // --------------------------------------------------------------------------
  {
    id: "cpp-m1-ex1",
    track: "cpp",
    moduleId: 1,
    lessonId: "cpp-m1-l1",
    order: 1,
    title: "¡Hola, C++20!",
    subtitle: "Tu primer programa compilable en C++",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Escribe tu primer programa en C++20. Debes incluir la librería estándar de entrada y salida, declarar la función principal int main(), emitir un saludo hacia la terminal mediante std::cout y retornar 0 para indicar éxito.",
      instructions: [
        "En la primera línea, incluye la cabecera estándar de flujos con '#include <iostream>'.",
        "Define la función principal con la firma 'int main() { ... }'.",
        "Dentro del cuerpo de main, usa 'std::cout << \"¡Hola, C++20!\\n\";' para mostrar el saludo con salto de línea.",
        "Finaliza la función con la instrucción 'return 0;'.",
      ],
      learningObjectives: [
        "Comprender la función del preprocesador y la directiva #include",
        "Identificar la función int main() como el punto de entrada obligatorio en C++",
        "Aprender a enviar texto a la salida estándar con std::cout y el operador <<",
        "Comprender que cada instrucción en C++ finaliza obligatoriamente con punto y coma (;)",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Anatomía de un Programa en C++",
      explanation:
        "A diferencia de los lenguajes interpretados, C++ es un lenguaje compilado directamente a código máquina nativo. Todo programa ejecutable requiere una función de inicio llamada `int main()`. Para comunicarnos con la terminal, solicitamos la biblioteca estándar de flujos mediante `#include <iostream>`. El objeto `std::cout` (Console Output) recibe los datos que queremos mostrar usando el operador de inserción `<<`. Al terminar, devolvemos `0` al sistema operativo como convención universal de que el programa concluyó sin fallos.",
      mentalModel:
        "Imagina que std::cout es una tubería conectada a la pantalla. El operador << empuja tus letras y datos a través de esa tubería para que el usuario pueda verlos.",
      codeExample: '#include <iostream>\n\nint main() {\n    std::cout << "Hola Mundo\\n";\n    return 0;\n}',
    },
    starterCode: `// PASO 1: Incluye la cabecera estándar de entrada y salida con #include <iostream>
// PASO 2: Declara la función principal int main()
// PASO 3: Imprime exactamente el texto "¡Hola, C++20!\\n" usando std::cout y el operador <<
// PASO 4: Concluye la función retornando 0 (return 0;)
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    std::cout << "¡Hola, C++20!\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m1-ex1-1",
        description: "Debe emitir exactamente '¡Hola, C++20!' hacia la consola",
        input: "",
        expectedOutput: "¡Hola, C++20!",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "La puerta de entrada",
        prompt:
          "¿Cuál es el nombre y tipo de retorno de la función obligatoria donde inicia la ejecución de todo programa en C++? Inicia con 'int main()'.",
      },
      {
        level: 2,
        title: "La librería de flujos",
        prompt:
          "Si usas 'std::cout', el compilador necesita saber dónde está declarado. ¿Agregaste '#include <iostream>' en la primera línea?",
      },
      {
        level: 3,
        title: "Sintaxis precisa",
        prompt:
          'Asegúrate de escribir:\nstd::cout << "¡Hola, C++20!\\n";\nreturn 0;\n¡No olvides cerrar las llaves {} y poner punto y coma en cada instrucción!',
      },
    ],
  },

  {
    id: "cpp-m1-ex2",
    track: "cpp",
    moduleId: 1,
    lessonId: "cpp-m1-l1",
    order: 2,
    title: "Múltiples Salidas y Números",
    subtitle: "Imprimiendo textos y valores numéricos en líneas sucesivas",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Aprende a emitir múltiples líneas sucesivas en la consola y comprende que los valores numéricos no requieren comillas en C++.",
      instructions: [
        "Incluye la librería '#include <iostream>' y define la función 'int main()'.",
        "En la primera instrucción con std::cout, imprime el texto 'Compilador: GCC\\n' (con salto de línea).",
        "En la segunda instrucción con std::cout, imprime el número 20 seguido de '\\n' (el número 20 va sin comillas).",
        "Finaliza retornando 0.",
      ],
      learningObjectives: [
        "Diferenciar entre cadenas de texto delimitadas por comillas y números literales",
        "Generar saltos de línea explícitos mediante el carácter de escape '\\n'",
        "Comprender la ejecución secuencial de instrucciones en C++",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Literales Numéricos y Saltos de Línea en C++",
      explanation:
        "En C++, los textos van siempre entre comillas dobles (como `\"Compilador: GCC\"`), mientras que los números se escriben directamente sin comillas (como `20`). Además, `std::cout` no agrega saltos de línea de manera automática: si quieres que el siguiente dato aparezca en una nueva línea, debes insertar explícitamente el carácter especial `\\n`.",
      mentalModel:
        "std::cout escribe de corrido como una máquina de escribir; el carácter '\\n' equivale a presionar la palanca de retorno de carro para bajar al renglón siguiente.",
      codeExample: 'std::cout << "Version:\\n";\nstd::cout << 3 << "\\n";',
    },
    starterCode: `// PASO 1: Incluye la cabecera <iostream>
// PASO 2: Declara la función int main()
// PASO 3: Imprime "Compilador: GCC\\n" usando std::cout
// PASO 4: En la siguiente línea imprime el número 20 seguido de "\\n"
// PASO 5: Retorna 0 y cierra la función con llaves {}
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    std::cout << "Compilador: GCC\\n";
    std::cout << 20 << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m1-ex2-1",
        description: "Debe emitir dos líneas: 'Compilador: GCC' y en la siguiente el número '20'",
        input: "",
        expectedOutput: "Compilador: GCC\n20",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Dos instrucciones separadas",
        prompt:
          "Para que salgan dos líneas en la consola, puedes usar dos instrucciones 'std::cout' consecutivas, cada una terminada en punto y coma.",
      },
      {
        level: 2,
        title: "Comillas solo para texto",
        prompt:
          "El texto 'Compilador: GCC' va entre comillas dobles, pero el número 20 debe ir como valor numérico sin comillas: 'std::cout << 20 << \"\\n\";'.",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          'Escribe en main:\nstd::cout << "Compilador: GCC\\n";\nstd::cout << 20 << "\\n";\nreturn 0;',
      },
    ],
  },

  {
    id: "cpp-m1-ex3",
    track: "cpp",
    moduleId: 1,
    lessonId: "cpp-m1-l1",
    order: 3,
    title: "Encadenamiento de Flujo con <<",
    subtitle: "Conectando múltiples datos en una sola instrucción",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Aprende a encadenar múltiples valores de distintos tipos (texto y números) en una única sentencia utilizando el operador de flujo << varias veces seguidas.",
      instructions: [
        "Incluye <iostream> y define 'int main()'.",
        "En una única instrucción usando std::cout y el operador << encadenado, imprime: el texto 'Modulo ', luego el número 1, luego el texto ' listo\\n'.",
        "Finaliza la sentencia con punto y coma (;) y retorna 0.",
      ],
      learningObjectives: [
        "Dominar el encadenamiento de flujo múltiple con el operador <<",
        "Comprender la elegancia de componer mensajes en una sola línea de código sin múltiples llamadas",
        "Aprender a respetar los espacios en blanco entre palabras al concatenar",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Encadenamiento de Flujos (Stream Chaining)",
      explanation:
        "Una de las características más potentes y elegantes de los flujos en C++ es que el operador `<<` retorna una referencia al mismo flujo `std::cout`. Esto te permite encadenar múltiples inserciones una tras otra: `std::cout << valor1 << valor2 << valor3;`. El compilador procesa las inserciones de izquierda a derecha, enviándolas en orden a la consola.",
      mentalModel:
        "Piensa en el operador << como un enganche de vagones de tren: puedes conectar tantos vagones como quieras (textos, números o saltos) a la misma locomotora std::cout.",
      codeExample: 'std::cout << "Nivel " << 5 << " desbloqueado\\n";',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Usa una sola sentencia std::cout encadenando: "Modulo ", el número 1, y " listo\\n"
// PASO 3: Finaliza con punto y coma y retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    std::cout << "Modulo " << 1 << " listo\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m1-ex3-1",
        description: "Debe emitir 'Modulo 1 listo' en una sola línea",
        input: "",
        expectedOutput: "Modulo 1 listo",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "¿Cómo encadenar?",
        prompt:
          "Puedes colocar el operador '<<' varias veces en la misma línea: std::cout << dato1 << dato2 << dato3;",
      },
      {
        level: 2,
        title: "Atención a los espacios",
        prompt:
          "Recuerda incluir los espacios: '\"Modulo \"' tiene un espacio al final, y '\" listo\\n\"' tiene un espacio al inicio para que el número 1 no quede pegado a las palabras.",
      },
      {
        level: 3,
        title: "Sentencia completa",
        prompt:
          'Escribe:\nstd::cout << "Modulo " << 1 << " listo\\n";\nreturn 0;',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 2: VARIABLES Y TIPADO ESTRICTO
  // --------------------------------------------------------------------------
  {
    id: "cpp-m2-ex1",
    track: "cpp",
    moduleId: 2,
    lessonId: "cpp-m2-l1",
    order: 1,
    title: "Enteros y Números Decimales",
    subtitle: "Declaración estricta con int y double",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Declara variables numéricas en C++ con sus tipos estrictos: un número entero para las vidas de un jugador y un decimal de doble precisión para la salud.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara una variable de tipo 'int' llamada 'vidas' e inicialízala con el valor 3.",
        "Declara una variable de tipo 'double' llamada 'salud' e inicialízala con el valor 98.5.",
        "Imprime en la primera línea: 'Vidas: ' seguido de la variable vidas y un salto de línea '\\n'.",
        "Imprime en la segunda línea: 'Salud: ' seguido de la variable salud y un salto de línea '\\n'.",
        "Retorna 0 al finalizar.",
      ],
      learningObjectives: [
        "Aprender la sintaxis de tipado estricto: tipo nombre = valor;",
        "Comprender la diferencia entre enteros con int y decimales de coma flotante con double",
        "Imprimir el contenido de variables numéricas intercaladas con texto",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Tipado Estricto de C++",
      explanation:
        "En C++, cada variable tiene un tipo inmutable desde el momento de su creación. El compilador necesita saber el tipo con anticipación para calcular exactamente cuántos bytes reservar en la memoria RAM del ordenador. El tipo `int` típicamente ocupa 4 bytes y almacena enteros con signo (ej: 3, -15). El tipo `double` ocupa 8 bytes y permite almacenar números con fracciones decimales de altísima precisión (ej: 98.5). Si intentas guardar un texto dentro de un int, el compilador rechazará tu programa antes de que pueda ejecutarse.",
      mentalModel:
        "Declara una variable como elegir una caja con la forma exacta del objeto: una caja 'int' solo admite figuras cuadradas rígidas; una caja 'double' admite figuras con fracciones decimales.",
      codeExample: 'int puntos = 100;\ndouble precision = 0.95;',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara una variable 'int vidas = 3;'
// PASO 3: Declara una variable 'double salud = 98.5;'
// PASO 4: Imprime "Vidas: " con vidas y "\\n"
// PASO 5: Imprime "Salud: " con salud y "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int vidas = 3;
    double salud = 98.5;
    std::cout << "Vidas: " << vidas << "\\n";
    std::cout << "Salud: " << salud << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m2-ex1-1",
        description: "Debe imprimir 'Vidas: 3' y 'Salud: 98.5' en líneas consecutivas",
        input: "",
        expectedOutput: "Vidas: 3\nSalud: 98.5",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Declaración con tipo primero",
        prompt:
          "En C++ siempre escribes el tipo de dato antes del nombre de la variable: 'int vidas = 3;'",
      },
      {
        level: 2,
        title: "Números con punto decimal",
        prompt:
          "Para números con decimales como 98.5 usamos 'double': 'double salud = 98.5;'",
      },
      {
        level: 3,
        title: "Líneas de salida",
        prompt:
          'Escribe:\nstd::cout << "Vidas: " << vidas << "\\n";\nstd::cout << "Salud: " << salud << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m2-ex2",
    track: "cpp",
    moduleId: 2,
    lessonId: "cpp-m2-l1",
    order: 2,
    title: "Caracteres y Booleanos",
    subtitle: "Uso de char (comillas simples) y bool (1 o 0)",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Explora los tipos char para caracteres individuales y bool para estados lógicos de verdad o falsedad, entendiendo cómo C++ representa valores booleanos en la consola.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara una variable de tipo 'char' llamada 'rango' con el valor 'A' (debe usar comillas simples 'A').",
        "Declara una variable de tipo 'bool' llamada 'activo' con el valor 'true'.",
        "Imprime en la primera línea: 'Rango: ' seguido de la variable rango y '\\n'.",
        "Imprime en la segunda línea: 'Activo: ' seguido de la variable activo y '\\n'.",
        "Retorna 0 al final.",
      ],
      learningObjectives: [
        "Identificar que el tipo char representa un único carácter y se delimita estrictamente con comillas simples ('')",
        "Comprender que el tipo bool admite únicamente los valores literales true o false",
        "Observar que std::cout por defecto muestra 1 para true y 0 para false",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Tipo char y la Lógica Booleana en C++",
      explanation:
        "El tipo `char` ocupa exactamente 1 byte de memoria y almacena un solo símbolo del código ASCII. En C++, existe una regla sintáctica fundamental: las cadenas de texto van entre comillas dobles (`\"texto\"`), pero los caracteres individuales van **estrictamente entre comillas simples** (`'A'`). Por su parte, `bool` representa una variable lógica de verdadero (`true`) o falso (`false`). Al enviar un booleano a `std::cout`, C++ imprime por defecto `1` para representar verdadero y `0` para falso.",
      mentalModel:
        "Una comilla simple ('A') es un sello para una sola letra. Un bool es un interruptor de luz: 1 significa encendido (true), 0 significa apagado (false).",
      codeExample: "char tecla = 'W';\nbool encendido = true;",
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara una variable 'char rango = \\'A\\';' (con comillas simples)
// PASO 3: Declara una variable 'bool activo = true;'
// PASO 4: Imprime "Rango: " seguido de rango y salto de línea
// PASO 5: Imprime "Activo: " seguido de activo y salto de línea
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    char rango = 'A';
    bool activo = true;
    std::cout << "Rango: " << rango << "\\n";
    std::cout << "Activo: " << activo << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m2-ex2-1",
        description: "Debe imprimir 'Rango: A' y 'Activo: 1' (true evaluado como 1)",
        input: "",
        expectedOutput: "Rango: A\nActivo: 1",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Comillas simples para char",
        prompt:
          "Recuerda que en C++ los caracteres tipo char usan comillas simples: 'A', mientras que el texto largo usa comillas dobles.",
      },
      {
        level: 2,
        title: "¿Qué imprime un booleano?",
        prompt:
          "Cuando imprimes una variable bool con valor true, std::cout imprimirá un número 1. ¡Esto es completamente normal y correcto en C++!",
      },
      {
        level: 3,
        title: "Código paso a paso",
        prompt:
          "Declara:\nchar rango = 'A';\nbool activo = true;\nY luego usa std::cout con cada uno.",
      },
    ],
  },

  {
    id: "cpp-m2-ex3",
    track: "cpp",
    moduleId: 2,
    lessonId: "cpp-m2-l1",
    order: 3,
    title: "Cadenas Dinámicas con std::string",
    subtitle: "Manejo de texto moderno incluyendo la cabecera <string>",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Utiliza la clase std::string de la biblioteca estándar para almacenar y manipular texto flexible de múltiples caracteres.",
      instructions: [
        "En la parte superior, incluye ambas librerías: '#include <iostream>' y '#include <string>'.",
        "Define la función 'int main()'.",
        "Declara una variable de tipo 'std::string' llamada 'usuario' con el valor '\"Kaelen\"'.",
        "Declara una variable de tipo 'int' llamada 'nivel' con el valor 10.",
        "Imprime en una sola línea encadenada: 'Jugador: ' << usuario << ' | Nivel: ' << nivel << '\\n'.",
        "Retorna 0 al finalizar.",
      ],
      learningObjectives: [
        "Aprender a incluir la librería estándar <string>",
        "Declarar y utilizar objetos de tipo std::string para textos de cualquier longitud",
        "Componer salidas combinando objetos de texto con variables numéricas enteras",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Clase std::string en C++",
      explanation:
        "C++ primitivo heredó de C los arreglos de caracteres terminados en nulo (`char[]`), los cuales son propensos a desbordamientos de memoria. Para solucionar esto, C++ moderno introdujo `std::string` en la cabecera `#include <string>`. Un `std::string` administra su propia memoria dinámicamente, crece según lo necesites y te permite guardar nombres, frases y oraciones con total seguridad.",
      mentalModel:
        "std::string es una libreta elástica: no tienes que preocuparte por cuántas letras escribes, la libreta se estira automáticamente para que todo quepa.",
      codeExample: '#include <iostream>\n#include <string>\n\nint main() {\n    std::string nave = "Apollo";\n    std::cout << nave << "\\n";\n}',
    },
    starterCode: `// PASO 1: Incluye las cabeceras <iostream> y <string>
// PASO 2: Declara la función int main()
// PASO 3: Declara 'std::string usuario = "Kaelen";'
// PASO 4: Declara 'int nivel = 10;'
// PASO 5: Imprime en una sola línea: "Jugador: " << usuario << " | Nivel: " << nivel << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <string>

int main() {
    std::string usuario = "Kaelen";
    int nivel = 10;
    std::cout << "Jugador: " << usuario << " | Nivel: " << nivel << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m2-ex3-1",
        description: "Debe imprimir 'Jugador: Kaelen | Nivel: 10'",
        input: "",
        expectedOutput: "Jugador: Kaelen | Nivel: 10",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Dos librerías necesarias",
        prompt:
          "Para usar std::cout necesitas '#include <iostream>', y para usar std::string necesitas '#include <string>'. ¿Pusiste ambas al inicio?",
      },
      {
        level: 2,
        title: "Tipo de la variable",
        prompt:
          "El tipo de la variable es 'std::string' (con el prefijo std::): 'std::string usuario = \"Kaelen\";'.",
      },
      {
        level: 3,
        title: "Línea de impresión",
        prompt:
          'Usa el encadenamiento:\nstd::cout << "Jugador: " << usuario << " | Nivel: " << nivel << "\\n";',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 3: OPERACIONES ARITMÉTICAS Y LÓGICAS
  // --------------------------------------------------------------------------
  {
    id: "cpp-m3-ex1",
    track: "cpp",
    moduleId: 3,
    lessonId: "cpp-m3-l1",
    order: 1,
    title: "Aritmética y División Truncada",
    subtitle: "Comportamiento de la división entre enteros en C++",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Experimenta con las operaciones aritméticas fundamentales en C++ y comprende por qué la división entre dos números enteros trunca los decimales hacia cero.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara una variable entera 'int total = 17;' y otra 'int paquetes = 4;'.",
        "En la primera línea imprime 'Cociente: ' seguido del resultado de la división entera 'total / paquetes' y salto de línea '\\n'.",
        "En la segunda línea imprime 'Producto: ' seguido del resultado de la multiplicación 'total * paquetes' y salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Aplicar operadores aritméticos básicos (*, /) en C++",
        "Comprender que en C++, si ambos operandos son int, la división descarta la parte decimal sin redondear",
        "Observar que 17 / 4 produce exactamente 4 y no 4.25",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Regla de la División Entera en C++",
      explanation:
        "En C++, el resultado de una operación depende estrictamente del tipo de sus operandos. Si divides dos números de tipo `int` (como `17 / 4`), el compilador realiza una división entera: descarta por completo la parte fraccionaria (truncamiento hacia cero), entregando `4`. Para obtener `4.25`, al menos uno de los números debería ser de tipo `double` (ej: `17.0 / 4`). Por otro lado, la multiplicación con `*` preserva el producto íntegro.",
      mentalModel:
        "Imagina repartir 17 monedas de oro en 4 cofres idénticos sin poder cortar monedas a la mitad: cada cofre recibe 4 monedas completas (el cociente entero).",
      codeExample: 'int a = 15;\nint b = 2;\nint r = a / b; // r vale 7',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int total = 17;' e 'int paquetes = 4;'
// PASO 3: Imprime "Cociente: " seguido de total / paquetes y salto de línea
// PASO 4: Imprime "Producto: " seguido de total * paquetes y salto de línea
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int total = 17;
    int paquetes = 4;
    std::cout << "Cociente: " << total / paquetes << "\\n";
    std::cout << "Producto: " << total * paquetes << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m3-ex1-1",
        description: "Debe emitir 'Cociente: 4' y 'Producto: 68'",
        input: "",
        expectedOutput: "Cociente: 4\nProducto: 68",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "¿Cómo calcular en la misma sentencia?",
        prompt:
          "Puedes realizar la operación directamente dentro de std::cout: 'std::cout << \"Cociente: \" << total / paquetes << \"\\n\";'.",
      },
      {
        level: 2,
        title: "División entera",
        prompt:
          "Como 'total' y 'paquetes' son enteros, 17 / 4 da como resultado 4. ¡Eso es lo esperado por el ejercicio!",
      },
      {
        level: 3,
        title: "Ambas salidas",
        prompt:
          'Línea 1: std::cout << "Cociente: " << total / paquetes << "\\n";\nLínea 2: std::cout << "Producto: " << total * paquetes << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m3-ex2",
    track: "cpp",
    moduleId: 3,
    lessonId: "cpp-m3-l1",
    order: 2,
    title: "El Operador Módulo %",
    subtitle: "Cálculo del residuo para verificación y distribución",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Utiliza el operador módulo (%) para calcular el residuo exacto que queda tras una división entera.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara 'int energia = 29;' y 'int ranuras = 6;'.",
        "Declara una variable entera 'int residuo = energia % ranuras;'.",
        "Imprime en consola: 'Residuo: ' seguido del valor de la variable residuo y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender la función del operador módulo (%) en C++",
        "Aprender a calcular el resto no divisible de una partición entera",
        "Identificar la utilidad del módulo para verificar divisibilidad y paridad",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Operador Módulo (%) en la Computación",
      explanation:
        "El operador módulo (`%`) devuelve el residuo que sobra al dividir dos números enteros. Por ejemplo, en `29 % 6`, el 6 cabe 4 veces en 29 (6 * 4 = 24), y sobran 5. Por lo tanto, `29 % 6` es exactamente `5`. El operador módulo solo funciona con tipos enteros y es una herramienta indispensable en programación para saber si un número es par (`n % 2 == 0`) o para mantener números dentro de un rango cíclico.",
      mentalModel:
        "El operador módulo es como mirar el reloj de 12 horas: si pasan 15 horas después de las 12, haces 15 % 12 y sabes que son las 3 en punto.",
      codeExample: 'int horas = 25;\nint horaReloj = horas % 24; // Vale 1',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int energia = 29;' e 'int ranuras = 6;'
// PASO 3: Calcula el residuo en una variable: 'int residuo = energia % ranuras;'
// PASO 4: Imprime "Residuo: " seguido del valor de residuo y salto de línea
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int energia = 29;
    int ranuras = 6;
    int residuo = energia % ranuras;
    std::cout << "Residuo: " << residuo << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m3-ex2-1",
        description: "Debe emitir 'Residuo: 5'",
        input: "",
        expectedOutput: "Residuo: 5",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "El operador de residuo",
        prompt:
          "En C++, para obtener lo que sobra de una división se usa el símbolo de porcentaje: 'energia % ranuras'.",
      },
      {
        level: 2,
        title: "Guardar en variable",
        prompt:
          "Crea una variable entera 'residuo' donde guardes el resultado del cálculo: 'int residuo = energia % ranuras;'.",
      },
      {
        level: 3,
        title: "Impresión final",
        prompt:
          'Muestra el resultado con:\nstd::cout << "Residuo: " << residuo << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m3-ex3",
    track: "cpp",
    moduleId: 3,
    lessonId: "cpp-m3-l2",
    order: 3,
    title: "Conectores Lógicos &&, ||, !",
    subtitle: "Evaluación de condiciones compuestas en C++",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Evalúa condiciones complejas de seguridad combinando comparaciones numéricas y operadores lógicos booleanos (AND con &&).",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara 'int oxigeno = 85;' y 'bool presurizado = true;'.",
        "Declara una variable booleana: 'bool seguro = (oxigeno >= 80) && presurizado;'.",
        "Imprime en consola: 'Seguro: ' seguido del valor de la variable seguro y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Utilizar el operador relacional mayor o igual que (>=)",
        "Comprender el operador lógico AND (&&) que requiere que ambas expresiones sean verdaderas",
        "Comprender la evaluación de expresiones booleanas compuestas",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Operadores Lógicos en C++: &&, ||, !",
      explanation:
        "Los operadores lógicos permiten conectar múltiples condiciones en una sola expresión booleana:\n- `&&` (AND lógico): Verdadero solo si **ambos** lados son verdaderos.\n- `||` (OR lógico): Verdadero si **al menos uno** de los lados es verdadero.\n- `!` (NOT lógico): Invierte el valor (convierte true en false y viceversa).\nC++ evalúa estas expresiones con cortocircuito: en `A && B`, si `A` es falso, C++ ni siquiera evalúa `B` porque el resultado final es obligatoriamente falso.",
      mentalModel:
        "El operador && es como una cerradura de doble llave: para que la puerta se abra (true), necesitas que ambas llaves giren al mismo tiempo.",
      codeExample: 'bool acceso = (edad >= 18) && tieneCredencial;',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int oxigeno = 85;' y 'bool presurizado = true;'
// PASO 3: Evalúa la condición compuesta: 'bool seguro = (oxigeno >= 80) && presurizado;'
// PASO 4: Imprime "Seguro: " seguido de seguro y salto de línea
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int oxigeno = 85;
    bool presurizado = true;
    bool seguro = (oxigeno >= 80) && presurizado;
    std::cout << "Seguro: " << seguro << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m3-ex3-1",
        description: "Debe emitir 'Seguro: 1' (ambas condiciones verdaderas)",
        input: "",
        expectedOutput: "Seguro: 1",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Conector AND",
        prompt:
          "En C++, el operador lógico 'Y' se escribe con dos símbolos ampersand seguidos: '&&'.",
      },
      {
        level: 2,
        title: "Comparación mayor o igual",
        prompt:
          "Para verificar si el oxígeno es al menos 80, escribe '(oxigeno >= 80)'.",
      },
      {
        level: 3,
        title: "Composición booleana",
        prompt:
          'Escribe:\nbool seguro = (oxigeno >= 80) && presurizado;\nstd::cout << "Seguro: " << seguro << "\\n";',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 4: CONTROL DE FLUJO
  // --------------------------------------------------------------------------
  {
    id: "cpp-m4-ex1",
    track: "cpp",
    moduleId: 4,
    lessonId: "cpp-m4-l1",
    order: 1,
    title: "Bifurcación if y else",
    subtitle: "Toma de decisiones con bloques delimitados por llaves { }",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Usa una estructura if / else para verificar si la temperatura de un procesador excede el límite seguro e imprimir una advertencia adecuada.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara una variable entera 'int temperatura = 35;'.",
        "Si la temperatura es mayor que 30 ('if (temperatura > 30)'), imprime en su bloque: 'Alerta: Sobrecalentamiento\\n'.",
        "En caso contrario ('else'), imprime en su bloque: 'Temperatura Nominal\\n'.",
        "Usa siempre llaves '{ }' para delimitar el cuerpo de cada bloque y retorna 0 al finalizar.",
      ],
      learningObjectives: [
        "Comprender la sintaxis y evaluación de la sentencia if (condición)",
        "Aprender a usar la cláusula else para el camino alternativo",
        "Reconocer la obligatoriedad y buena práctica de encerrar bloques de código con llaves { }",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Sentencias Condicionales y Bloques de Ámbito { }",
      explanation:
        "La instrucción `if` evalúa una expresión entre paréntesis. Si el resultado es verdadero (distinto de cero), se ejecutan las sentencias contenidas en su bloque. Si es falso, el flujo salta al bloque `else` (si existe). En C++, las llaves `{ }` crean un bloque de código y delimitan el ámbito (scope) de las variables. Aunque C++ permite omitir las llaves para una sola línea, la guía de estilo moderna de C++20 exige usar siempre `{ }` para prevenir errores de seguridad y ambigüedad.",
      mentalModel:
        "Una bifurcación if/else es como un desvío en una vía de tren: según la posición de la palanca (condición), el tren toma el carril principal o el carril alternativo.",
      codeExample: 'if (puntos >= 50) {\n    std::cout << "Aprobado\\n";\n} else {\n    std::cout << "Reprobado\\n";\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int temperatura = 35;'
// PASO 3: Con 'if (temperatura > 30)' imprime "Alerta: Sobrecalentamiento\\n"
// PASO 4: Con 'else' imprime "Temperatura Nominal\\n"
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int temperatura = 35;
    if (temperatura > 30) {
        std::cout << "Alerta: Sobrecalentamiento\\n";
    } else {
        std::cout << "Temperatura Nominal\\n";
    }
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m4-ex1-1",
        description: "Debe emitir 'Alerta: Sobrecalentamiento' porque 35 > 30",
        input: "",
        expectedOutput: "Alerta: Sobrecalentamiento",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Condición entre paréntesis",
        prompt:
          "En C++, la condición del if siempre se escribe entre paréntesis: 'if (temperatura > 30)'.",
      },
      {
        level: 2,
        title: "Llaves para los bloques",
        prompt:
          "Abre y cierra llaves '{ }' tanto para el cuerpo del if como para el cuerpo del else.",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          'Escribe:\nif (temperatura > 30) {\n    std::cout << "Alerta: Sobrecalentamiento\\n";\n} else {\n    std::cout << "Temperatura Nominal\\n";\n}',
      },
    ],
  },

  {
    id: "cpp-m4-ex2",
    track: "cpp",
    moduleId: 4,
    lessonId: "cpp-m4-l1",
    order: 2,
    title: "Clasificación Múltiple con else if",
    subtitle: "Manejo de múltiples rangos y categorías mutuamente excluyentes",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Implementa una escala de calificación clasificando un puntaje en categorías: Excelente (>= 90), Aprobado (>= 70) o Reprobado.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara 'int puntaje = 75;'.",
        "Si puntaje >= 90, imprime 'Excelente\\n'.",
        "De lo contrario, si puntaje >= 70 ('else if (puntaje >= 70)'), imprime 'Aprobado\\n'.",
        "En cualquier otro caso ('else'), imprime 'Reprobado\\n'.",
        "Retorna 0 al final.",
      ],
      learningObjectives: [
        "Encadenar múltiples condiciones mutuamente excluyentes con else if",
        "Comprender la evaluación en cascada desde la primera condición hasta el else por defecto",
        "Evitar redundancias en las condiciones aprovechando el descarte previo",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Cascada Condicional else if",
      explanation:
        "Cuando existen más de dos posibilidades lógicas, encadenamos condiciones usando `else if`. C++ comprueba la primera condición; si se cumple, ejecuta su bloque y salta inmediatamente fuera de toda la estructura. Solo si la primera falla, pasa a evaluar el siguiente `else if`. Si ninguna se cumple, se ejecuta el bloque `else` final.",
      mentalModel:
        "Imagina un clasificador de monedas: la moneda cae por una ranura con orificios de menor a mayor tamaño. La primera ranura en la que encaja detiene la moneda.",
      codeExample: 'if (x > 100) {\n    std::cout << "Alto\\n";\n} else if (x > 50) {\n    std::cout << "Medio\\n";\n} else {\n    std::cout << "Bajo\\n";\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int puntaje = 75;'
// PASO 3: Si puntaje >= 90 imprime "Excelente\\n"
// PASO 4: 'else if (puntaje >= 70)' imprime "Aprobado\\n"
// PASO 5: 'else' imprime "Reprobado\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int puntaje = 75;
    if (puntaje >= 90) {
        std::cout << "Excelente\\n";
    } else if (puntaje >= 70) {
        std::cout << "Aprobado\\n";
    } else {
        std::cout << "Reprobado\\n";
    }
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m4-ex2-1",
        description: "Para puntaje 75 debe emitir 'Aprobado'",
        input: "",
        expectedOutput: "Aprobado",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Orden de las comprobaciones",
        prompt:
          "Empieza con la condición más exigente: 'if (puntaje >= 90)', y luego pasa a 'else if (puntaje >= 70)'.",
      },
      {
        level: 2,
        title: "Palabra clave else if",
        prompt:
          "En C++ se escribe con dos palabras separadas por un espacio: 'else if (condicion)'.",
      },
      {
        level: 3,
        title: "Estructura final",
        prompt:
          'if (puntaje >= 90) {\n    std::cout << "Excelente\\n";\n} else if (puntaje >= 70) {\n    std::cout << "Aprobado\\n";\n} else {\n    std::cout << "Reprobado\\n";\n}',
      },
    ],
  },

  {
    id: "cpp-m4-ex3",
    track: "cpp",
    moduleId: 4,
    lessonId: "cpp-m4-l1",
    order: 3,
    title: "El Operador Ternario",
    subtitle: "Expresiones condicionales compactas (condición ? valor1 : valor2)",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Utiliza el operador ternario (? :) para asignar un estado textual en una sola línea según el nivel de combustible disponible.",
      instructions: [
        "Incluye <iostream> y <string>, y define int main().",
        "Declara 'int combustible = 15;'.",
        "Declara una variable 'std::string estado' asignándole el resultado del operador ternario: '(combustible > 20) ? \"Optimo\" : \"Critico\";'.",
        "Imprime en consola: 'Estado: ' seguido del valor de estado y salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender la diferencia entre una sentencia de control (if) y una expresión que devuelve valor (operador ternario)",
        "Dominar la sintaxis del operador ternario: condición ? si_verdadero : si_falso",
        "Asignar valores condicionales de manera compacta y limpia",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Operador Ternario (? :) en C++",
      explanation:
        "El operador ternario es el único operador en C++ que toma tres operandos:\n`condición ? valor_si_verdadero : valor_si_falso`.\nA diferencia de un bloque `if`, el operador ternario es una **expresión** que produce un valor directo de retorno. Por ello, puedes utilizarlo directamente a la derecha de un signo igual `=` para inicializar una variable de forma compacta y legible.",
      mentalModel:
        "Es una balanza instantánea: si la condición pesa más (es true), cae el plato izquierdo; si no, cae el plato derecho.",
      codeExample: 'std::string aviso = (temp > 100) ? "Peligro" : "Normal";',
    },
    starterCode: `// PASO 1: Incluye <iostream> y <string>, y define int main()
// PASO 2: Declara 'int combustible = 15;'
// PASO 3: Asigna a 'std::string estado' la expresión ternaria: (combustible > 20) ? "Optimo" : "Critico";
// PASO 4: Imprime "Estado: " seguido de estado y salto de línea
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <string>

int main() {
    int combustible = 15;
    std::string estado = (combustible > 20) ? "Optimo" : "Critico";
    std::cout << "Estado: " << estado << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m4-ex3-1",
        description: "Debe emitir 'Estado: Critico' porque 15 no es mayor a 20",
        input: "",
        expectedOutput: "Estado: Critico",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Partes del operador ternario",
        prompt:
          "La estructura es: (condición) ? valor_si_true : valor_si_false. El signo de interrogación separa la pregunta, y los dos puntos separan las opciones.",
      },
      {
        level: 2,
        title: "Tipo de la variable receptora",
        prompt:
          "Como vas a guardar 'Optimo' o 'Critico', la variable receptora debe ser de tipo 'std::string estado'.",
      },
      {
        level: 3,
        title: "Línea completa",
        prompt:
          'Escribe:\nstd::string estado = (combustible > 20) ? "Optimo" : "Critico";\nstd::cout << "Estado: " << estado << "\\n";',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 5: BUCLES
  // --------------------------------------------------------------------------
  {
    id: "cpp-m5-ex1",
    track: "cpp",
    moduleId: 5,
    lessonId: "cpp-m5-l1",
    order: 1,
    title: "Acumulador con Bucle for",
    subtitle: "El bucle contador clásico for (int i = 0; i < n; i++)",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Calcula la suma acumulada de los números enteros del 1 al 5 mediante un bucle for clásico de C++.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara una variable acumuladora 'int suma = 0;'.",
        "Crea un bucle for que inicie en 'int i = 1;', continúe mientras 'i <= 5;' e incremente 'i++'.",
        "Dentro del cuerpo del bucle for, acumula el valor sumando: 'suma += i;'.",
        "Fuera del bucle, imprime en consola: 'Suma total: ' seguido de la variable suma y '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Dominar la sintaxis de 3 partes del bucle for: inicialización, condición de continuación y paso de incremento",
        "Comprender el patrón del acumulador donde una variable exterior retiene la suma sucesiva",
        "Identificar el ciclo de vida de la variable de control 'i' dentro del bucle",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Bucle for en C++",
      explanation:
        "El bucle `for` condensa el control de repetición en un encabezado con tres cláusulas separadas por punto y coma:\n`for (inicialización; condición; incremento)`\n1. **Inicialización** (`int i = 1;`): Se ejecuta una única vez antes de empezar.\n2. **Condición** (`i <= 5;`): Se comprueba antes de cada ciclo; si es false, el bucle se detiene.\n3. **Incremento** (`i++`): Se ejecuta al final de cada ciclo, avanzando el contador hacia la condición de parada.",
      mentalModel:
        "Imagina un podómetro: inicia en cero, por cada paso que das (ciclo) avanza un número, y cuando la meta se alcanza, el podómetro suena y te detienes.",
      codeExample: 'for (int i = 0; i < 3; i++) {\n    std::cout << i << "\\n";\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara una variable acumuladora 'int suma = 0;'
// PASO 3: Construye un bucle 'for (int i = 1; i <= 5; i++)'
// PASO 4: Dentro del bucle, acumula: 'suma += i;'
// PASO 5: Fuera del bucle, imprime "Suma total: " << suma << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int suma = 0;
    for (int i = 1; i <= 5; i++) {
        suma += i;
    }
    std::cout << "Suma total: " << suma << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m5-ex1-1",
        description: "Debe emitir 'Suma total: 15' (1 + 2 + 3 + 4 + 5)",
        input: "",
        expectedOutput: "Suma total: 15",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Variable afuera",
        prompt:
          "Recuerda declarar 'int suma = 0;' antes de entrar al bucle for; si la declaras adentro, se reiniciaría en cada vuelta.",
      },
      {
        level: 2,
        title: "Encabezado del bucle",
        prompt:
          "El encabezado debe contar desde 1 hasta 5 inclusive: 'for (int i = 1; i <= 5; i++)'.",
      },
      {
        level: 3,
        title: "Impresión al terminar",
        prompt:
          'La instrucción std::cout debe colocarse después de cerrar la llave del bucle for:\nstd::cout << "Suma total: " << suma << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m5-ex2",
    track: "cpp",
    moduleId: 5,
    lessonId: "cpp-m5-l1",
    order: 2,
    title: "Conteo Regresivo con for",
    subtitle: "Iteraciones decrecientes hacia atrás (i--)",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Simula la cuenta regresiva del lanzamiento de un cohete imprimiendo los números del 3 al 1 en reversa mediante decrementos con i--, seguido de un mensaje final.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Escribe un bucle for que inicie en 'int i = 3;', continúe mientras 'i >= 1;' y decremente con 'i--'.",
        "Dentro del bucle, imprime el valor de 'i' seguido de un salto de línea '\\n'.",
        "Inmediatamente después del bucle for, imprime el mensaje '¡Despegue!\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Aprender a construir bucles decrecientes utilizando el operador de decremento i--",
        "Comprender la condición de frontera inferior (i >= 1)",
        "Coordinar la salida repetida con un mensaje de conclusión final",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Bucles Decrecientes en C++",
      explanation:
        "Los bucles no solo avanzan hacia adelante; también pueden recorrer secuencias en orden inverso. Al colocar `i--` en la sección de incremento, restamos una unidad en cada vuelta. La condición debe reflejar este sentido inverso: mientras que en un bucle ascendente usamos `<`, en uno descendente usamos `>=` para detener la cuenta cuando alcancemos el límite inferior deseado.",
      mentalModel:
        "Es un reloj de cuenta regresiva en una misión espacial: 3... 2... 1... ¡ignición!",
      codeExample: 'for (int i = 5; i > 0; i--) {\n    std::cout << i << "\\n";\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Escribe un bucle 'for (int i = 3; i >= 1; i--)'
// PASO 3: Dentro del bucle imprime 'i' con salto de línea '\\n'
// PASO 4: Tras el bucle imprime "¡Despegue!\\n"
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    for (int i = 3; i >= 1; i--) {
        std::cout << i << "\\n";
    }
    std::cout << "¡Despegue!\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m5-ex2-1",
        description: "Debe emitir '3', '2', '1' en líneas separadas y finalizar con '¡Despegue!'",
        input: "",
        expectedOutput: "3\n2\n1\n¡Despegue!",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Disminuir en vez de aumentar",
        prompt:
          "En lugar de 'i++', usa el operador de decremento 'i--' para restar 1 en cada iteración.",
      },
      {
        level: 2,
        title: "Condición límite",
        prompt:
          "El bucle debe seguir ejecutándose mientras 'i' sea mayor o igual a 1: 'i >= 1'.",
      },
      {
        level: 3,
        title: "Estructura del bucle",
        prompt:
          'for (int i = 3; i >= 1; i--) {\n    std::cout << i << "\\n";\n}\nstd::cout << "¡Despegue!\\n";',
      },
    ],
  },

  {
    id: "cpp-m5-ex3",
    track: "cpp",
    moduleId: 5,
    lessonId: "cpp-m5-l2",
    order: 3,
    title: "Reducción Continua con while",
    subtitle: "Bucles basados en condiciones dinámicas de estado",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Simula la descarga de energía de un reactor reduciendo su reserva de 10 en 10 mientras supere un umbral mínimo usando un bucle while.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara 'int energia = 40;'.",
        "Crea un bucle 'while (energia > 10)' que reduzca el nivel restando 10 en cada iteración ('energia -= 10;').",
        "Al salir del bucle while, imprime en consola: 'Energia remanente: ' seguido de la variable energia y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender la semántica del bucle while: comprueba primero, ejecuta después",
        "Aprender a mutar la variable de condición dentro del bucle para garantizar la terminación",
        "Comprobar el valor final cuando la condición se vuelve falsa",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Bucle while en C++",
      explanation:
        "El bucle `while` se utiliza cuando no sabemos con anticipación cuántas iteraciones exactas ocurrirán, sino que dependemos de que una condición dinámica se mantenga verdadera:\n`while (condición) { cuerpo }`\nC++ comprueba la condición antes de entrar al ciclo. Si la condición ya es falsa al inicio, el cuerpo no se ejecuta ni una sola vez. Es crucial que el código dentro del bloque modifique alguna variable que afecte a la condición; de lo contrario, se generaría un bucle infinito.",
      mentalModel:
        "Imagina beber de un vaso con una pajilla: mientras haya líquido en el vaso (while liquido > 0), tomas otro sorbo. Cuando el vaso queda vacío, te detienes.",
      codeExample: 'int saldo = 100;\nwhile (saldo > 20) {\n    saldo -= 30;\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int energia = 40;'
// PASO 3: Escribe el bucle 'while (energia > 10)'
// PASO 4: Dentro del bucle resta 10 a energia: 'energia -= 10;'
// PASO 5: Tras el bucle imprime "Energia remanente: " << energia << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int energia = 40;
    while (energia > 10) {
        energia -= 10;
    }
    std::cout << "Energia remanente: " << energia << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m5-ex3-1",
        description: "Debe emitir 'Energia remanente: 10' tras tres reducciones (40 -> 30 -> 20 -> 10)",
        input: "",
        expectedOutput: "Energia remanente: 10",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Condición de parada",
        prompt:
          "El bucle continuará mientras energia sea estrictamente mayor que 10: 'while (energia > 10)'.",
      },
      {
        level: 2,
        title: "Modificar la variable adentro",
        prompt:
          "Dentro del bloque debes restar: 'energia -= 10;'. De 40 pasa a 30, luego a 20, luego a 10 (donde ya no es > 10 y se detiene).",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          'while (energia > 10) {\n    energia -= 10;\n}\nstd::cout << "Energia remanente: " << energia << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m5-ex4",
    track: "cpp",
    moduleId: 5,
    lessonId: "cpp-m5-l2",
    order: 4,
    title: "Ejecución Garantizada con do-while",
    subtitle: "El bucle con post-evaluación en C++",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Utiliza la estructura do-while para garantizar que un intento se registre al menos una vez antes de verificar si se alcanzó el límite permitido.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara 'int intentos = 0;'.",
        "Escribe un bucle 'do { ... } while (intentos < 3);'.",
        "Dentro del bloque 'do', incrementa la variable: 'intentos++;'.",
        "Nota que la cláusula while del do-while termina obligatoriamente con punto y coma: ';'.",
        "Al finalizar el bucle, imprime: 'Intentos realizados: ' seguido de la variable intentos y '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender la diferencia crucial entre while (pre-condición) y do-while (post-condición)",
        "Garantizar la ejecución de al menos una iteración en situaciones como menús o validaciones de entrada",
        "Recordar que do-while es la única estructura de bucle que finaliza con punto y coma (;)",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Bucle do-while en C++",
      explanation:
        "A diferencia del bucle `while` habitual, el bucle `do-while` ejecuta primero el cuerpo de instrucciones y recién después evalúa la condición al pie:\n`do {\n    cuerpo\n} while (condición);`\nEsto asegura que el bloque se ejecute **como mínimo una vez**, independientemente de si la condición es inicialmente verdadera o falsa. Además, es muy fácil olvidar el punto y coma final `;` tras el paréntesis de condición, el cual es obligatorio por sintaxis en C++.",
      mentalModel:
        "Un do-while es como probar un bocado de comida antes de decidir si quieres seguir comiendo: necesariamente pruebas el primer bocado antes de evaluar si tienes hambre.",
      codeExample: 'int x = 0;\ndo {\n    x++;\n} while (x < 5);',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int intentos = 0;'
// PASO 3: Inicia la estructura con 'do {'
// PASO 4: Dentro del bloque incrementa: 'intentos++;'
// PASO 5: Cierra con '} while (intentos < 3);' (recuerda el punto y coma)
// PASO 6: Imprime "Intentos realizados: " << intentos << "\\n"
// PASO 7: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int intentos = 0;
    do {
        intentos++;
    } while (intentos < 3);
    std::cout << "Intentos realizados: " << intentos << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m5-ex4-1",
        description: "Debe emitir 'Intentos realizados: 3'",
        input: "",
        expectedOutput: "Intentos realizados: 3",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "La palabra clave do al inicio",
        prompt:
          "El bucle se abre con 'do {' y no lleva condición en la primera línea. La condición va al cerrar con '} while (...)'.",
      },
      {
        level: 2,
        title: "El punto y coma olvidado",
        prompt:
          "No olvides poner ';' justo después del while: '} while (intentos < 3);'.",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          'do {\n    intentos++;\n} while (intentos < 3);\nstd::cout << "Intentos realizados: " << intentos << "\\n";',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 6: FUNCIONES EN C++
  // --------------------------------------------------------------------------
  {
    id: "cpp-m6-ex1",
    track: "cpp",
    moduleId: 6,
    lessonId: "cpp-m6-l1",
    order: 1,
    title: "Función con Retorno de Valor",
    subtitle: "Firmas tipadas y la sentencia return",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Declara e implementa una función matemática tipada llamada 'calcularArea' que reciba base y altura enteras y devuelva su producto, probándola desde main().",
      instructions: [
        "Incluye <iostream>.",
        "Antes de la función main, define la función con firma: 'int calcularArea(int base, int altura)'.",
        "Dentro del cuerpo de calcularArea, retorna el producto: 'return base * altura;'.",
        "Dentro de main(), invoca la función pasando los valores 8 y 5: 'int resultado = calcularArea(8, 5);'.",
        "Imprime en consola: 'Area: ' seguido de la variable resultado y un salto de línea '\\n'.",
        "Retorna 0 desde main.",
      ],
      learningObjectives: [
        "Comprender la estructura de una firma de función en C++: tipo_retorno nombre(parámetros)",
        "Aprender a recibir múltiples parámetros con sus tipos declarados explícitamente",
        "Utilizar la sentencia return para devolver un cómputo a la función invocadora",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Funciones con Retorno en C++",
      explanation:
        "Una función en C++ es un bloque de instrucciones reutilizable con un contrato estricto de tipos:\n`tipo_retorno nombreFuncion(tipo1 param1, tipo2 param2) { ... }`\nEl `tipo_retorno` indica el tipo del dato que la función producirá hacia el exterior usando `return`. En C++, el compilador lee el archivo de arriba hacia abajo; por ello, la función debe estar definida o declarada antes de ser invocada dentro de `main()`.",
      mentalModel:
        "Una función con retorno es como una licuadora cerrada: le introduces fruta (argumentos), presiona el botón, y te entrega un vaso de jugo (el valor de retorno).",
      codeExample: 'int doble(int n) {\n    return n * 2;\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream>
// PASO 2: Declara la función 'int calcularArea(int base, int altura)'
// PASO 3: Dentro de calcularArea retorna 'base * altura;'
// PASO 4: En main() llama a calcularArea(8, 5) y guarda en 'int resultado'
// PASO 5: Imprime "Area: " << resultado << "\\n" y retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int calcularArea(int base, int altura) {
    return base * altura;
}

int main() {
    int resultado = calcularArea(8, 5);
    std::cout << "Area: " << resultado << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m6-ex1-1",
        description: "Debe emitir 'Area: 40' al multiplicar 8 por 5",
        input: "",
        expectedOutput: "Area: 40",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Ubicación de la función",
        prompt:
          "Define 'int calcularArea(int base, int altura)' arriba de la función 'int main()', para que main() la reconozca.",
      },
      {
        level: 2,
        title: "Retorno del producto",
        prompt:
          "Dentro de la función, escribe simplemente: 'return base * altura;'.",
      },
      {
        level: 3,
        title: "Invocación en main",
        prompt:
          'En main:\nint resultado = calcularArea(8, 5);\nstd::cout << "Area: " << resultado << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m6-ex2",
    track: "cpp",
    moduleId: 6,
    lessonId: "cpp-m6-l1",
    order: 2,
    title: "Procedimientos con void",
    subtitle: "Funciones que realizan acciones sin devolver valores",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Crea un procedimiento que utilice el tipo de retorno 'void' para emitir una alerta formateada de un sensor hacia la consola.",
      instructions: [
        "Incluye <iostream>.",
        "Antes de main(), define una función llamada 'reportarEstado' que retorne 'void' y reciba un parámetro 'int sensorId'.",
        "Dentro de reportarEstado, usa std::cout para imprimir: 'Sensor ' seguido de sensorId y ' ACTIVO\\n'.",
        "En la función main(), invoca la función pasando el identificador 101: 'reportarEstado(101);'.",
        "Retorna 0 desde main.",
      ],
      learningObjectives: [
        "Comprender el propósito de la palabra clave void para funciones que ejecutan acciones sin producir un resultado",
        "Reconocer cuándo utilizar void (acciones de consola, escritura de archivos o modificación de estado)",
        "Llamar a un procedimiento como una sentencia independiente",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Funciones void en C++",
      explanation:
        "Cuando una función se diseña para ejecutar una acción o efecto secundario (como imprimir en pantalla o emitir un sonido) en lugar de calcular una respuesta numérica o textual, su tipo de retorno se declara como `void` (vacío). Una función `void` no requiere una sentencia `return` con valor al final, ya que termina automáticamente al llegar a su última llave `}`.",
      mentalModel:
        "Una función void es como pulsar la bocina de un auto: el auto emite un sonido al exterior, pero no te devuelve ningún objeto físico en la mano.",
      codeExample: 'void saludar(int id) {\n    std::cout << "Usuario: " << id << "\\n";\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream>
// PASO 2: Declara 'void reportarEstado(int sensorId)'
// PASO 3: Dentro, imprime "Sensor " << sensorId << " ACTIVO\\n"
// PASO 4: En main() invoca 'reportarEstado(101);'
// PASO 5: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

void reportarEstado(int sensorId) {
    std::cout << "Sensor " << sensorId << " ACTIVO\\n";
}

int main() {
    reportarEstado(101);
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m6-ex2-1",
        description: "Debe emitir 'Sensor 101 ACTIVO'",
        input: "",
        expectedOutput: "Sensor 101 ACTIVO",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Tipo de retorno void",
        prompt:
          "La palabra 'void' reemplaza a 'int' al inicio de la función: 'void reportarEstado(int sensorId)'.",
      },
      {
        level: 2,
        title: "Sin return al final",
        prompt:
          "Las funciones void no necesitan 'return valor;'. Solo escribe la sentencia std::cout y cierra la llave.",
      },
      {
        level: 3,
        title: "Llamada simple",
        prompt:
          'En main(), llama a la función así:\nreportarEstado(101);\nreturn 0;',
      },
    ],
  },

  {
    id: "cpp-m6-ex3",
    track: "cpp",
    moduleId: 6,
    lessonId: "cpp-m6-l2",
    order: 3,
    title: "Paso por Referencia en Vectores",
    subtitle: "El operador & para modificar colecciones en memoria sin copias",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Aprende el paso por referencia en C++ usando el símbolo '&' para permitir que una función modifique los elementos de un std::vector directamente en la memoria original sin realizar copias pesadas.",
      instructions: [
        "Incluye <iostream> y <vector>.",
        "Declara la función: 'void duplicarElementos(std::vector<int>& valores)'. Observa el '&' tras el tipo.",
        "Dentro de la función, usa un bucle 'for (int i = 0; i < valores.size(); i++)' para multiplicar cada elemento por 2: 'valores[i] = valores[i] * 2;'.",
        "En main(), declara 'std::vector<int> datos = {3, 7};'.",
        "Invoca 'duplicarElementos(datos);'.",
        "Imprime: 'Valores: ' << datos[0] << ' ' << datos[1] << '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender el concepto de paso por referencia mediante el operador &",
        "Diferenciar entre modificar una copia local y modificar la estructura original en memoria",
        "Reconocer la importancia del paso por referencia para el rendimiento en C++",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Paso por Valor vs Paso por Referencia (&) en C++",
      explanation:
        "Por defecto, C++ pasa todos los argumentos por **valor**: crea una copia idéntica de la variable en una nueva zona de memoria. Si modificas esa copia dentro de la función, la variable original afuera no sufre ningún cambio. Además, copiar vectores grandes consume tiempo y procesador.\nAl agregar el operador `&` en el parámetro (ej: `std::vector<int>& v`), indicamos un **paso por referencia**: la función no recibe una copia, sino un alias directo a la misma celda de memoria original. Cualquier cambio que hagas en `v` modificará la variable que pasaste en `main()`.",
      mentalModel:
        "El paso por valor es fotocopiar un documento y tachar la fotocopia: el original queda intacto. El paso por referencia (&) es entregarle a la función el documento original con un bolígrafo: cualquier firma o tachón se hace en el original.",
      codeExample: 'void mutar(std::vector<int>& vec) {\n    vec[0] = 99;\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y <vector>
// PASO 2: Declara 'void duplicarElementos(std::vector<int>& valores)' (nota el &)
// PASO 3: Dentro, recorre con un for y multiplica cada valores[i] por 2
// PASO 4: En main(), declara 'std::vector<int> datos = {3, 7};'
// PASO 5: Invoca 'duplicarElementos(datos);'
// PASO 6: Imprime "Valores: " << datos[0] << " " << datos[1] << "\\n"
// PASO 7: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <vector>

void duplicarElementos(std::vector<int>& valores) {
    for (int i = 0; i < valores.size(); i++) {
        valores[i] = valores[i] * 2;
    }
}

int main() {
    std::vector<int> datos = {3, 7};
    duplicarElementos(datos);
    std::cout << "Valores: " << datos[0] << " " << datos[1] << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m6-ex3-1",
        description: "Debe emitir 'Valores: 6 14' tras duplicar el vector original",
        input: "",
        expectedOutput: "Valores: 6 14",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "El operador ampersand &",
        prompt:
          "En la firma de la función, coloca '&' junto al vector: 'std::vector<int>& valores'. Eso le dice a C++ que trabaje sobre el original.",
      },
      {
        level: 2,
        title: "Multiplicar por índice",
        prompt:
          "En el bucle for de la función, actualiza cada posición con: 'valores[i] = valores[i] * 2;'.",
      },
      {
        level: 3,
        title: "Comprobación en main",
        prompt:
          'En main:\nduplicarElementos(datos);\nstd::cout << "Valores: " << datos[0] << " " << datos[1] << "\\n";',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 7: ARREGLOS Y VECTORES
  // --------------------------------------------------------------------------
  {
    id: "cpp-m7-ex1",
    track: "cpp",
    moduleId: 7,
    lessonId: "cpp-m7-l1",
    order: 1,
    title: "Arreglos Nativos de Tamaño Fijo",
    subtitle: "Estructuras contiguas de tamaño estático en memoria",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Declara un arreglo nativo de enteros de tamaño 3, inicialízalo con valores literales, suma sus elementos con un bucle y calcula el promedio entero.",
      instructions: [
        "Incluye <iostream> y define int main().",
        "Declara un arreglo de tamaño 3: 'int lecturas[3] = {10, 20, 30};'.",
        "Declara una variable acumuladora 'int suma = 0;'.",
        "Usa un bucle 'for (int i = 0; i < 3; i++)' para sumar cada elemento: 'suma += lecturas[i];'.",
        "Imprime en consola: 'Promedio: ' seguido de 'suma / 3' y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Aprender la sintaxis de arreglos estáticos nativos: tipo nombre[tamaño];",
        "Comprender la indexación en base cero: las posiciones van de 0 a tamaño - 1",
        "Recorrer e inspeccionar arreglos secuencialmente mediante bucles contadores",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Arreglos Nativos en C++",
      explanation:
        "Un arreglo nativo (o C-style array) es un bloque contiguo de memoria donde todos los elementos son del mismo tipo y el tamaño se fija de forma permanente durante la compilación. Se declara como `tipo nombre[tamaño] = {val1, val2, ...};`. En C++, la indexación comienza siempre en cero: el primer elemento está en `lecturas[0]`, el segundo en `lecturas[1]` y el tercero en `lecturas[2]`. Intentar acceder a `lecturas[3]` provocaría un error de lectura fuera de límites.",
      mentalModel:
        "Imagina un casillero de correos con 3 casillas numeradas 0, 1 y 2 pegadas a la pared: el tamaño es fijo y no puedes agregar más casillas.",
      codeExample: 'int valores[2] = {100, 200};\nint primero = valores[0];',
    },
    starterCode: `// PASO 1: Incluye <iostream> y define int main()
// PASO 2: Declara 'int lecturas[3] = {10, 20, 30};'
// PASO 3: Declara 'int suma = 0;'
// PASO 4: Recorre con 'for (int i = 0; i < 3; i++)' y acumula 'suma += lecturas[i];'
// PASO 5: Imprime "Promedio: " << suma / 3 << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

int main() {
    int lecturas[3] = {10, 20, 30};
    int suma = 0;
    for (int i = 0; i < 3; i++) {
        suma += lecturas[i];
    }
    std::cout << "Promedio: " << suma / 3 << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m7-ex1-1",
        description: "Debe emitir 'Promedio: 20' (60 / 3)",
        input: "",
        expectedOutput: "Promedio: 20",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Índice base cero",
        prompt:
          "El bucle debe comenzar en 'int i = 0;' y continuar mientras 'i < 3;'.",
      },
      {
        level: 2,
        title: "Acceso con corchetes",
        prompt:
          "Para leer el elemento en la posición 'i', utiliza corchetes: 'lecturas[i]'.",
      },
      {
        level: 3,
        title: "Cálculo del promedio",
        prompt:
          'Imprime el resultado directamente:\nstd::cout << "Promedio: " << suma / 3 << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m7-ex2",
    track: "cpp",
    moduleId: 7,
    lessonId: "cpp-m7-l2",
    order: 2,
    title: "Inserción Dinámica con std::vector",
    subtitle: "Uso de .push_back() y consulta de tamaño con .size()",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Crea un vector dinámico de enteros utilizando std::vector, agrega elementos en tiempo de ejecución con .push_back() y consulta su tamaño con .size().",
      instructions: [
        "Incluye <iostream> y <vector>, y define int main().",
        "Declara un vector dinámico vacío de enteros: 'std::vector<int> inventario;'.",
        "Agrega el número 50 usando 'inventario.push_back(50);'.",
        "Agrega el número 75 usando 'inventario.push_back(75);'.",
        "En la primera línea imprime 'Total items: ' seguido de 'inventario.size()' y '\\n'.",
        "En la segunda línea imprime 'Primer item: ' seguido de 'inventario[0]' y '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Aprender a incluir y utilizar la plantilla de contenedor std::vector",
        "Insertar elementos dinámicamente al final del vector con el método .push_back()",
        "Consultar el número de elementos almacenados actualmente mediante el método .size()",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(n)",
      },
    },
    theory: {
      title: "El Contenedor Dinámico std::vector en C++",
      explanation:
        "A diferencia de los arreglos nativos que tienen un tamaño congelado, `std::vector` es una estructura de datos dinámica que gestiona su propia memoria en el heap. Crece o se encoge según tus necesidades. El método `.push_back(valor)` añade un elemento al final del vector, reservando automáticamente más memoria si es necesario. El método `.size()` devuelve la cantidad actual de elementos que contiene.",
      mentalModel:
        "std::vector es una mochila mágica que se expande cada vez que le metes un objeto nuevo con push_back, y te dice exactamente cuántos objetos tiene dentro con size().",
      codeExample: '#include <vector>\n\nstd::vector<int> v;\nv.push_back(10);\nint total = v.size(); // total vale 1',
    },
    starterCode: `// PASO 1: Incluye <iostream> y <vector>, y define int main()
// PASO 2: Declara 'std::vector<int> inventario;'
// PASO 3: Inserta 50 y luego 75 con inventario.push_back(...)
// PASO 4: Imprime "Total items: " seguido de inventario.size() y "\\n"
// PASO 5: Imprime "Primer item: " seguido de inventario[0] y "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> inventario;
    inventario.push_back(50);
    inventario.push_back(75);
    std::cout << "Total items: " << inventario.size() << "\\n";
    std::cout << "Primer item: " << inventario[0] << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m7-ex2-1",
        description: "Debe emitir 'Total items: 2' y 'Primer item: 50'",
        input: "",
        expectedOutput: "Total items: 2\nPrimer item: 50",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Librería obligatoria",
        prompt:
          "Asegúrate de incluir '#include <vector>' en la cabecera para que C++ conozca la clase vector.",
      },
      {
        level: 2,
        title: "El método push_back",
        prompt:
          "Para agregar elementos, llama al método: 'inventario.push_back(50);' e 'inventario.push_back(75);'.",
      },
      {
        level: 3,
        title: "Salidas requeridas",
        prompt:
          'std::cout << "Total items: " << inventario.size() << "\\n";\nstd::cout << "Primer item: " << inventario[0] << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m7-ex3",
    track: "cpp",
    moduleId: 7,
    lessonId: "cpp-m7-l2",
    order: 3,
    title: "Filtrado y Conteo en std::vector",
    subtitle: "Recorriendo un vector con bucles y condiciones",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Recorre un vector de pesos de paquetes e identifica cuántos de ellos cumplen con el estándar de peso válido (>= 10).",
      instructions: [
        "Incluye <iostream> y <vector>, y define int main().",
        "Inicializa un vector de enteros con lista de inicialización: 'std::vector<int> paquetes = {12, 5, 20, 8, 15};'.",
        "Declara un contador 'int validos = 0;'.",
        "Recorre el vector con 'for (int i = 0; i < paquetes.size(); i++)'.",
        "Si el elemento actual 'paquetes[i] >= 10', incrementa el contador con 'validos++;'.",
        "Al finalizar el bucle, imprime: 'Paquetes validos: ' seguido de la variable validos y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Inicializar vectores con sintaxis moderna de lista de inicialización = { ... }",
        "Combinar el método .size() con el bucle for para recorrer vectores de forma segura",
        "Implementar el patrón de filtrado y conteo condicional sobre colecciones",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(n)",
      },
    },
    theory: {
      title: "Recorrido de Vectores en C++",
      explanation:
        "La combinación de `std::vector` con un bucle `for` permite examinar colecciones de cualquier tamaño. Utilizar `paquetes.size()` como límite superior del contador asegura que el bucle se adapte automáticamente al número exacto de elementos del vector, evitando accesos fuera de rango.",
      mentalModel:
        "Es un inspector de aduana que revisa una fila de paquetes uno a uno: pesa cada paquete y, si supera los 10 kg, le pone un sello de aprobación (incrementa el contador).",
      codeExample: 'for (int i = 0; i < v.size(); i++) {\n    if (v[i] > 0) positivos++;\n}',
    },
    starterCode: `// PASO 1: Incluye <iostream> y <vector>, y define int main()
// PASO 2: Declara 'std::vector<int> paquetes = {12, 5, 20, 8, 15};'
// PASO 3: Declara 'int validos = 0;'
// PASO 4: Recorre con 'for (int i = 0; i < paquetes.size(); i++)'
// PASO 5: Si 'paquetes[i] >= 10', incrementa 'validos++'
// PASO 6: Imprime "Paquetes validos: " << validos << "\\n"
// PASO 7: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> paquetes = {12, 5, 20, 8, 15};
    int validos = 0;
    for (int i = 0; i < paquetes.size(); i++) {
        if (paquetes[i] >= 10) {
            validos++;
        }
    }
    std::cout << "Paquetes validos: " << validos << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m7-ex3-1",
        description: "Debe emitir 'Paquetes validos: 3' (12, 20 y 15 cumplen >= 10)",
        input: "",
        expectedOutput: "Paquetes validos: 3",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Inicializar el vector",
        prompt:
          "Puedes inicializar el vector directamente con llaves: 'std::vector<int> paquetes = {12, 5, 20, 8, 15};'.",
      },
      {
        level: 2,
        title: "Condición dentro del bucle",
        prompt:
          "Dentro del for, coloca un if para chequear cada paquete: 'if (paquetes[i] >= 10) validos++;'.",
      },
      {
        level: 3,
        title: "Estructura completa",
        prompt:
          'for (int i = 0; i < paquetes.size(); i++) {\n    if (paquetes[i] >= 10) {\n        validos++;\n    }\n}\nstd::cout << "Paquetes validos: " << validos << "\\n";',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 8: CLASES Y OBJETOS EN C++
  // --------------------------------------------------------------------------
  {
    id: "cpp-m8-ex1",
    track: "cpp",
    moduleId: 8,
    lessonId: "cpp-m8-l1",
    order: 1,
    title: "Agrupación de Datos con struct",
    subtitle: "Estructuras simples con campos públicos en C++",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Define una estructura llamada 'Nave' que agrupe los datos de escudo y propulsión, crea una instancia en main() y muestra sus valores usando la notación de punto.",
      instructions: [
        "Incluye <iostream>.",
        "Antes de main, define la estructura: 'struct Nave { int escudo; int propulsion; };'. Recuerda el punto y coma tras la llave de cierre.",
        "En main(), crea una instancia: 'Nave n;'.",
        "Asigna a sus campos: 'n.escudo = 100;' y 'n.propulsion = 80;'.",
        "Imprime en la primera línea: 'Escudo: ' seguido de n.escudo y '\\n'.",
        "Imprime en la segunda línea: 'Propulsion: ' seguido de n.propulsion y '\\n'.",
        "Retorna 0 al finalizar.",
      ],
      learningObjectives: [
        "Comprender la palabra clave struct para crear tipos de datos personalizados compuestos",
        "Reconocer que en struct los miembros son públicos por defecto",
        "Acceder y asignar campos individuales utilizando el operador punto (.)",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Estructuras (struct) en C++",
      explanation:
        "Una `struct` en C++ te permite agrupar múltiples variables relacionadas bajo un mismo nombre de tipo. Por ejemplo, en lugar de manejar variables sueltas como `escudo` y `propulsion`, creas un nuevo tipo `Nave` que las empaqueta juntas. La regla distintiva de `struct` en C++ es que **todos sus miembros son públicos por defecto**: cualquier parte del programa puede leerlos y modificarlos usando la sintaxis de punto (`instancia.campo`).",
      mentalModel:
        "Una struct es como una tarjeta de identificación: agrupa varios datos juntos (foto, nombre, ID) que forman una sola entidad conceptual.",
      codeExample: 'struct Punto {\n    int x;\n    int y;\n};\n\nPunto p;\np.x = 10;',
    },
    starterCode: `// PASO 1: Incluye <iostream>
// PASO 2: Declara 'struct Nave { int escudo; int propulsion; };' (recuerda el ';' al cerrar)
// PASO 3: En main(), declara 'Nave n;' y asigna n.escudo = 100; y n.propulsion = 80;
// PASO 4: Imprime "Escudo: " << n.escudo << "\\n"
// PASO 5: Imprime "Propulsion: " << n.propulsion << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

struct Nave {
    int escudo;
    int propulsion;
};

int main() {
    Nave n;
    n.escudo = 100;
    n.propulsion = 80;
    std::cout << "Escudo: " << n.escudo << "\\n";
    std::cout << "Propulsion: " << n.propulsion << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m8-ex1-1",
        description: "Debe emitir 'Escudo: 100' y 'Propulsion: 80'",
        input: "",
        expectedOutput: "Escudo: 100\nPropulsion: 80",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Punto y coma al final de la struct",
        prompt:
          "En C++, la definición de una struct o class debe terminar con punto y coma tras la llave de cierre: '};'.",
      },
      {
        level: 2,
        title: "Acceso con punto",
        prompt:
          "Para asignar un valor al campo de la instancia, escribe el nombre de la variable seguido de un punto: 'n.escudo = 100;'.",
      },
      {
        level: 3,
        title: "Código en main",
        prompt:
          'Nave n;\nn.escudo = 100;\nn.propulsion = 80;\nstd::cout << "Escudo: " << n.escudo << "\\n";\nstd::cout << "Propulsion: " << n.propulsion << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m8-ex2",
    track: "cpp",
    moduleId: 8,
    lessonId: "cpp-m8-l1",
    order: 2,
    title: "Encapsulamiento con class",
    subtitle: "Atributos privados, constructores y métodos de acceso (getters)",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Diseña una clase Bateria con encapsulamiento estricto: un atributo 'carga' privado, un constructor público para inicializarlo y un método getter público para consultar el nivel.",
      instructions: [
        "Incluye <iostream>.",
        "Define la clase 'Bateria':",
        "  - En la sección 'private:', declara 'int carga;'.",
        "  - En la sección 'public:', declara el constructor 'Bateria(int c) : carga(c) {}'.",
        "  - Agrega el método 'int getCarga() { return carga; }'.",
        "Cierra la clase con '};'.",
        "En main(), instancia un objeto 'Bateria b(95);'.",
        "Imprime en consola: 'Nivel de carga: ' seguido de 'b.getCarga()' y '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender el principio de encapsulamiento: proteger variables sensibles bajo la sección private",
        "Aprender a implementar constructores con listas de inicialización (: miembro(valor))",
        "Exponer métodos públicos (getters) para consultar el estado interno sin permitir mutaciones arbitrarias",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Clases y Encapsulamiento en C++",
      explanation:
        "Una `class` en C++ es la base de la Programación Orientada a Objetos. La diferencia fundamental con `struct` es que en una `class` los miembros son **privados por defecto**. El encapsulamiento consiste en ocultar los atributos sensibles bajo la etiqueta `private:`, de modo que ninguna función exterior pueda modificarlos accidentalmente. Para inicializar el objeto usamos un **constructor** (un método con el mismo nombre de la clase sin tipo de retorno) y para leer los datos exponemos métodos públicos (`public:`), conocidos comúnmente como getters.",
      mentalModel:
        "Una clase encapsulada es como un cajero automático: el dinero está en una bóveda blindada privada (private); solo puedes interactuar a través de la pantalla y el teclado públicos (public) para consultar tu saldo.",
      codeExample: 'class Termostato {\nprivate:\n    int temp;\npublic:\n    Termostato(int t) : temp(t) {}\n    int getTemp() { return temp; }\n};',
    },
    starterCode: `// PASO 1: Incluye <iostream>
// PASO 2: Declara 'class Bateria {' con 'private: int carga;'
// PASO 3: En 'public:' define el constructor 'Bateria(int c) : carga(c) {}'
// PASO 4: En 'public:' define 'int getCarga() { return carga; }'
// PASO 5: Cierra la clase con '};'
// PASO 6: En main(), declara 'Bateria b(95);' e imprime "Nivel de carga: " << b.getCarga() << "\\n"
// PASO 7: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

class Bateria {
private:
    int carga;
public:
    Bateria(int c) : carga(c) {}
    int getCarga() {
        return carga;
    }
};

int main() {
    Bateria b(95);
    std::cout << "Nivel de carga: " << b.getCarga() << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m8-ex2-1",
        description: "Debe emitir 'Nivel de carga: 95'",
        input: "",
        expectedOutput: "Nivel de carga: 95",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Especificadores de acceso",
        prompt:
          "Usa 'private:' para ocultar el atributo 'carga', y 'public:' para permitir que el constructor y 'getCarga()' sean llamados desde main().",
      },
      {
        level: 2,
        title: "El constructor",
        prompt:
          "El constructor se llama exactamente igual que la clase y no lleva tipo de retorno: 'Bateria(int c) : carga(c) {}'.",
      },
      {
        level: 3,
        title: "Llamada al método getter",
        prompt:
          'En main(), llama al método con paréntesis: b.getCarga():\nstd::cout << "Nivel de carga: " << b.getCarga() << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m8-ex3",
    track: "cpp",
    moduleId: 8,
    lessonId: "cpp-m8-l1",
    order: 3,
    title: "Métodos y el Puntero this",
    subtitle: "Mutación de estado y el puntero implícito this->",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Crea una clase Contador que utilice el puntero implícito this-> para distinguir los parámetros del constructor y modifique su estado interno mediante un método miembro mutador.",
      instructions: [
        "Incluye <iostream>.",
        "Define la clase 'Contador':",
        "  - 'private: int valor;'.",
        "  - En 'public:', constructor 'Contador(int valor) { this->valor = valor; }' usando this-> para resolver la ambigüedad con el parámetro.",
        "  - Método 'void incrementar() { this->valor += 1; }'.",
        "  - Método 'int getValor() { return this->valor; }'.",
        "Cierra la clase con '};'.",
        "En main(), crea una instancia: 'Contador c(10);'.",
        "Llama a 'c.incrementar();'.",
        "Imprime: 'Valor actual: ' seguido de 'c.getValor()' y '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Comprender el rol del puntero implícito this en todos los métodos miembros de C++",
        "Resolver ambigüedades de nombres cuando un parámetro se llama igual que un atributo miembro (this->valor = valor)",
        "Implementar métodos que mutan el estado interno de un objeto",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "El Puntero Implícito this en C++",
      explanation:
        "Dentro de cualquier método o constructor no estático de una clase, C++ proporciona automáticamente un puntero implícito llamado `this`. El puntero `this` apunta a la dirección de memoria exacta de la instancia actual sobre la que se está invocando el método. Usar `this->miembro` es una técnica indispensable cuando el nombre de un parámetro en el constructor es idéntico al nombre del atributo de la clase, permitiendo al compilador saber sin ambigüedad cuál es el campo del objeto y cuál es el parámetro recibido.",
      mentalModel:
        "this es el pronombre 'yo' o 'mi' del objeto: cuando el objeto dice 'this->valor', está diciendo 'mi propio valor', diferenciándolo de cualquier parámetro externo.",
      codeExample: 'class Punto {\n    int x;\n    Punto(int x) {\n        this->x = x;\n    }\n};',
    },
    starterCode: `// PASO 1: Incluye <iostream>
// PASO 2: Declara la clase Contador con 'private: int valor;'
// PASO 3: En public, define 'Contador(int valor) { this->valor = valor; }'
// PASO 4: En public, define 'void incrementar() { this->valor += 1; }'
// PASO 5: En public, define 'int getValor() { return this->valor; }'
// PASO 6: En main(), declara 'Contador c(10);', invoca 'c.incrementar();'
// PASO 7: Imprime "Valor actual: " << c.getValor() << "\\n" y retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>

class Contador {
private:
    int valor;
public:
    Contador(int valor) {
        this->valor = valor;
    }
    void incrementar() {
        this->valor += 1;
    }
    int getValor() {
        return this->valor;
    }
};

int main() {
    Contador c(10);
    c.incrementar();
    std::cout << "Valor actual: " << c.getValor() << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m8-ex3-1",
        description: "Debe emitir 'Valor actual: 11' tras incrementar 10 en 1",
        input: "",
        expectedOutput: "Valor actual: 11",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Uso del operador flecha ->",
        prompt:
          "Como 'this' es un puntero a la instancia actual, en C++ se utiliza el operador de flecha '->' para acceder a sus miembros: 'this->valor = valor;'.",
      },
      {
        level: 2,
        title: "El método incrementar",
        prompt:
          "El método mutador no devuelve nada, por lo que su tipo es void: 'void incrementar() { this->valor += 1; }'.",
      },
      {
        level: 3,
        title: "Flujo en main",
        prompt:
          'Contador c(10);\nc.incrementar();\nstd::cout << "Valor actual: " << c.getValor() << "\\n";\nreturn 0;',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MÓDULO 9: LIBRERÍAS ESTÁNDAR DE C++
  // --------------------------------------------------------------------------
  {
    id: "cpp-m9-ex1",
    track: "cpp",
    moduleId: 9,
    lessonId: "cpp-m9-l1",
    order: 1,
    title: "Biblioteca Matemática con <cmath>",
    subtitle: "Cálculo de raíces cuadradas y potencias con std::sqrt y std::pow",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary:
        "Utiliza las funciones matemáticas nativas de la cabecera estándar <cmath> para calcular la raíz cuadrada de 64 y elevar 2 a la quinta potencia.",
      instructions: [
        "Incluye <iostream> y <cmath>, y define int main().",
        "Calcula la raíz cuadrada de 64 usando 'std::sqrt(64)' y guárdala en una variable entera 'int raiz'.",
        "Calcula 2 elevado a la 5 usando 'std::pow(2, 5)' y guárdala en una variable entera 'int potencia'.",
        "En la primera línea imprime: 'Raiz: ' seguido de raiz y un salto de línea '\\n'.",
        "En la segunda línea imprime: 'Potencia: ' seguido de potencia y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Aprender a incluir y utilizar la cabecera estándar de matemáticas <cmath>",
        "Utilizar la función std::sqrt para el cálculo de raíces cuadradas",
        "Utilizar la función std::pow(base, exponente) para calcular potencias",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Biblioteca <cmath> en C++",
      explanation:
        "La cabecera `<cmath>` proporciona una amplia suite de funciones científicas y matemáticas altamente optimizadas a nivel de ensamblador por los compiladores de C++. Funciones fundamentales como `std::sqrt(x)` calculan raíces cuadradas, `std::pow(base, exp)` calcula potencias, y funciones como `std::abs`, `std::round`, `std::floor` y `std::ceil` permiten manipular y redondear magnitudes con total exactitud.",
      mentalModel:
        "<cmath> es una calculadora científica de bolsillo integrada directamente en el compilador de C++.",
      codeExample: '#include <cmath>\n\ndouble hipotenusa = std::sqrt(std::pow(3, 2) + std::pow(4, 2));',
    },
    starterCode: `// PASO 1: Incluye <iostream> y <cmath>, y define int main()
// PASO 2: Declara 'int raiz = std::sqrt(64);'
// PASO 3: Declara 'int potencia = std::pow(2, 5);'
// PASO 4: Imprime "Raiz: " << raiz << "\\n"
// PASO 5: Imprime "Potencia: " << potencia << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <cmath>

int main() {
    int raiz = std::sqrt(64);
    int potencia = std::pow(2, 5);
    std::cout << "Raiz: " << raiz << "\\n";
    std::cout << "Potencia: " << potencia << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m9-ex1-1",
        description: "Debe emitir 'Raiz: 8' y 'Potencia: 32'",
        input: "",
        expectedOutput: "Raiz: 8\nPotencia: 32",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Cabecera cmath",
        prompt:
          "Agrega '#include <cmath>' en la parte superior para habilitar las funciones matemáticas del espacio std::.",
      },
      {
        level: 2,
        title: "Prefijo std::",
        prompt:
          "Invoca las funciones con su prefijo estándar: 'std::sqrt(64)' y 'std::pow(2, 5)'.",
      },
      {
        level: 3,
        title: "Salida",
        prompt:
          'std::cout << "Raiz: " << raiz << "\\n";\nstd::cout << "Potencia: " << potencia << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m9-ex2",
    track: "cpp",
    moduleId: 9,
    lessonId: "cpp-m9-l1",
    order: 2,
    title: "Conversión de Cadenas con <string>",
    subtitle: "Conversión numérica bidireccional con std::to_string y std::stoi",
    difficulty: "Intermedio",
    xpReward: 150,
    evaluationType: "stdout",
    spec: {
      summary:
        "Realiza conversiones bidireccionales entre números y cadenas de texto utilizando las funciones estándar std::to_string y std::stoi de la librería <string>.",
      instructions: [
        "Incluye <iostream> y <string>, y define int main().",
        "Declara 'int codigo = 42;' y conviértelo a texto con 'std::string txt = std::to_string(codigo);'.",
        "Convierte la cadena literal '\"100\"' a número entero usando 'int parsed = std::stoi(\"100\");'.",
        "En la primera línea imprime 'Texto: ' seguido de la variable txt y un salto de línea '\\n'.",
        "En la segunda línea imprime 'Entero: ' seguido de 'parsed + 1' y un salto de línea '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Convertir números a cadenas de texto usando std::to_string",
        "Parsear cadenas de caracteres a números enteros usando std::stoi (String to Integer)",
        "Comprender la importancia de la conversión de tipos en la lectura y persistencia de datos",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "Conversión de Cadenas en C++ (<string>)",
      explanation:
        "En desarrollo real, los datos leídos de archivos, terminales o redes viajan frecuentemente como texto. Para procesarlos numéricamente, C++ ofrece funciones de conversión de alto nivel:\n- `std::to_string(valor)`: Convierte cualquier número entero o decimal en un objeto `std::string`.\n- `std::stoi(cadena)`: 'String TO Integer', analiza una cadena de texto y la convierte en un número `int`.\nEstas funciones reemplazan las antiguas y riesgosas funciones de C (`atoi`, `sprintf`) con total seguridad de tipos.",
      mentalModel:
        "std::to_string es un traductor que escribe un número en una hoja de papel (texto). std::stoi es un lector óptico que lee los caracteres en la hoja y los convierte en un número calculable en memoria.",
      codeExample: '#include <string>\n\nstd::string s = std::to_string(99);\nint n = std::stoi("50");',
    },
    starterCode: `// PASO 1: Incluye <iostream> y <string>, y define int main()
// PASO 2: Declara 'int codigo = 42;' y conviértelo: 'std::string txt = std::to_string(codigo);'
// PASO 3: Convierte el texto "100" a entero: 'int parsed = std::stoi("100");'
// PASO 4: Imprime "Texto: " << txt << "\\n"
// PASO 5: Imprime "Entero: " << parsed + 1 << "\\n"
// PASO 6: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <string>

int main() {
    int codigo = 42;
    std::string txt = std::to_string(codigo);
    int parsed = std::stoi("100");
    std::cout << "Texto: " << txt << "\\n";
    std::cout << "Entero: " << parsed + 1 << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m9-ex2-1",
        description: "Debe emitir 'Texto: 42' y 'Entero: 101' (100 + 1)",
        input: "",
        expectedOutput: "Texto: 42\nEntero: 101",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "De número a texto",
        prompt:
          "Para convertir un número en string usa: 'std::string txt = std::to_string(codigo);'.",
      },
      {
        level: 2,
        title: "De texto a número",
        prompt:
          "Para convertir una cadena con dígitos en int usa: 'int parsed = std::stoi(\"100\");'.",
      },
      {
        level: 3,
        title: "Impresión de la suma",
        prompt:
          'Para demostrar que parsed es un número real, súmale 1 al imprimir:\nstd::cout << "Entero: " << parsed + 1 << "\\n";',
      },
    ],
  },

  {
    id: "cpp-m9-ex3",
    track: "cpp",
    moduleId: 9,
    lessonId: "cpp-m9-l2",
    order: 3,
    title: "Algoritmos Estándar con <algorithm>",
    subtitle: "Ordenamiento con std::sort e inversión con std::reverse",
    difficulty: "Avanzado",
    xpReward: 200,
    evaluationType: "stdout",
    spec: {
      summary:
        "Aplica algoritmos estándar de alto rendimiento de la cabecera <algorithm> para ordenar un vector en orden ascendente y luego invertirlo.",
      instructions: [
        "Incluye <iostream>, <vector> y <algorithm>, y define int main().",
        "Declara 'std::vector<int> nums = {9, 2, 7, 4};'.",
        "Ordena el vector en orden ascendente usando: 'std::sort(nums.begin(), nums.end());'.",
        "Imprime en la primera línea: 'Primero: ' seguido de 'nums[0]' y '\\n'.",
        "Invierte el orden de los elementos usando: 'std::reverse(nums.begin(), nums.end());'.",
        "Imprime en la segunda línea: 'Nuevo primero: ' seguido de 'nums[0]' y '\\n'.",
        "Retorna 0.",
      ],
      learningObjectives: [
        "Aprender a incluir y aprovechar los algoritmos de la cabecera <algorithm>",
        "Comprender el uso de iteradores de rango .begin() y .end() para delimitar operaciones sobre contenedores",
        "Utilizar std::sort para ordenar en O(n log n) y std::reverse para voltear secuencias en tiempo lineal O(n)",
      ],
      constraints: {
        timeLimitMs: 5000,
        auxiliarySpace: "O(1)",
      },
    },
    theory: {
      title: "La Biblioteca <algorithm> y los Iteradores en C++",
      explanation:
        "La cabecera `<algorithm>` es una de las joyas de la Standard Template Library (STL) de C++. En lugar de obligarte a escribir algoritmos de ordenamiento manuales propensos a errores, C++ ofrece funciones genéricas ultra-optimizadas que operan sobre **iteradores**:\n- `nums.begin()`: Un iterador que apunta al primer elemento del contenedor.\n- `nums.end()`: Un iterador que apunta justo después del último elemento (rango semi-abierto `[inicio, fin)`).\nAl pasar este rango a `std::sort(inicio, fin)`, C++ aplica una variante híbrida de Introsort en tiempo O(n log n). Del mismo modo, `std::reverse(inicio, fin)` invierte el orden de los elementos in-place.",
      mentalModel:
        "Imagina que tus datos son una baraja de cartas: nums.begin() es el inicio del mazo y nums.end() es el final. std::sort baraja y ordena las cartas; std::reverse gira todo el mazo boca abajo.",
      codeExample: '#include <vector>\n#include <algorithm>\n\nstd::vector<int> v = {3, 1, 2};\nstd::sort(v.begin(), v.end()); // v es {1, 2, 3}',
    },
    starterCode: `// PASO 1: Incluye <iostream>, <vector> y <algorithm>, y define int main()
// PASO 2: Declara 'std::vector<int> nums = {9, 2, 7, 4};'
// PASO 3: Ordena el vector con 'std::sort(nums.begin(), nums.end());'
// PASO 4: Imprime "Primero: " << nums[0] << "\\n"
// PASO 5: Invierte el vector con 'std::reverse(nums.begin(), nums.end());'
// PASO 6: Imprime "Nuevo primero: " << nums[0] << "\\n"
// PASO 7: Retorna 0
// Tu código va aquí:
`,
    solutionReference: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {9, 2, 7, 4};
    std::sort(nums.begin(), nums.end());
    std::cout << "Primero: " << nums[0] << "\\n";
    std::reverse(nums.begin(), nums.end());
    std::cout << "Nuevo primero: " << nums[0] << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: "tc-cpp-m9-ex3-1",
        description: "Debe emitir 'Primero: 2' (menor al ordenar) y 'Nuevo primero: 9' (tras invertir)",
        input: "",
        expectedOutput: "Primero: 2\nNuevo primero: 9",
        evaluationType: "stdout",
        isHidden: false,
      },
    ],
    socraticHints: [
      {
        level: 1,
        title: "Tres librerías requeridas",
        prompt:
          "Debes incluir: '#include <iostream>', '#include <vector>' y '#include <algorithm>'.",
      },
      {
        level: 2,
        title: "Iteradores de inicio y fin",
        prompt:
          "Tanto std::sort como std::reverse reciben dos argumentos: 'nums.begin()' y 'nums.end()'.",
      },
      {
        level: 3,
        title: "Salidas paso a paso",
        prompt:
          'std::sort(nums.begin(), nums.end());\nstd::cout << "Primero: " << nums[0] << "\\n";\nstd::reverse(nums.begin(), nums.end());\nstd::cout << "Nuevo primero: " << nums[0] << "\\n";',
      },
    ],
  },
];
