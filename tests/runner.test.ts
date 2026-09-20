import { analyzeDiagnostics } from "../lib/runner/diagnostics";
import {
  runCppExerciseTests,
  executeCppCode,
  transpileCppToJs,
  CppVector,
} from "../lib/runner/cppRunner";
import {
  TrackId,
  EvaluationType,
  ExerciseTestCase,
  TrackExercise,
  TrackLesson,
  TrackModule,
  PedagogicalExercise,
} from "../types/exercise";

let testsRun = 0;
let testsPassed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? `-> Detalle: ${detail}` : ""}`);
    throw new Error(`Assertion failed: ${testName}`);
  }
}

async function runAllTests() {
  console.log("=================================================");
  console.log("=== EJECUTANDO PRUEBAS UNITARIAS DE RUNNERS & DIAGNÓSTICOS ===");
  console.log("=================================================\n");

  // -------------------------------------------------------------
  // GRUPO 1: Diagnósticos de Python
  // -------------------------------------------------------------
  console.log("--- Grupo 1: Diagnósticos de Python ---");

  // Falta de dos puntos
  const pyNoColon = "if x > 10\n    print(x)";
  const diagNoColon = analyzeDiagnostics(pyNoColon, "python");
  assert(
    diagNoColon.some((d) => d.code === "missing-colon"),
    "Detecta falta de dos puntos ':' en if"
  );

  // Asignación en condición
  const pyAssignInIf = "if x = 5:\n    print(x)";
  const diagAssign = analyzeDiagnostics(pyAssignInIf, "python");
  assert(
    diagAssign.some((d) => d.code === "assignment-in-condition"),
    "Detecta asignación '=' en lugar de '==' en condición"
  );

  // Typos comunes
  const pyTypo = "pritn('hola')\nwhlie True:\n    pass";
  const diagTypo = analyzeDiagnostics(pyTypo, "python");
  assert(
    diagTypo.some((d) => d.message.includes("print")),
    "Detecta error ortográfico 'pritn' -> 'print'"
  );
  assert(
    diagTypo.some((d) => d.message.includes("while")),
    "Detecta error ortográfico 'whlie' -> 'while'"
  );

  // Booleano con minúscula
  const pyBool = "x = false\ny = true";
  const diagBool = analyzeDiagnostics(pyBool, "python");
  assert(
    diagBool.some((d) => d.message.includes("False")),
    "Detecta 'false' y sugiere 'False' con mayúscula"
  );

  // Delimitadores no cerrados
  const pyUnclosed = "total = (10 + 20 * [1, 2";
  const diagUnclosed = analyzeDiagnostics(pyUnclosed, "python");
  assert(
    diagUnclosed.some((d) => d.code === "unclosed-delimiter"),
    "Detecta delimitadores sin cerrar en Python"
  );

  // -------------------------------------------------------------
  // GRUPO 2: Diagnósticos de C++
  // -------------------------------------------------------------
  console.log("\n--- Grupo 2: Diagnósticos de C++ ---");

  // Falta de punto y coma
  const cppNoSemi = `#include <iostream>
using namespace std;
int main() {
    int edad = 20
    cout << edad << endl;
    return 0;
}`;
  const diagSemi = analyzeDiagnostics(cppNoSemi, "cpp");
  assert(
    diagSemi.some((d) => d.code === "missing-semicolon"),
    "Detecta falta de ';' en C++"
  );

  // Falta de include iostream
  const cppNoIostream = `int main() {
    std::cout << "Hola" << std::endl;
    return 0;
}`;
  const diagNoIo = analyzeDiagnostics(cppNoIostream, "cpp");
  assert(
    diagNoIo.some((d) => d.code === "missing-include-iostream"),
    "Detecta falta de '#include <iostream>'"
  );

  // Falta de prefijo std::
  const cppNoStd = `#include <iostream>
int main() {
    cout << "Hola" << endl;
    return 0;
}`;
  const diagNoStd = analyzeDiagnostics(cppNoStd, "cpp");
  assert(
    diagNoStd.some((d) => d.code === "missing-std-prefix"),
    "Detecta uso de 'cout' sin 'std::' ni 'using namespace std;'"
  );

  // Comillas simples para string
  const cppSingleQuote = `#include <iostream>
using namespace std;
int main() {
    string s = 'Hola Mundo';
    return 0;
}`;
  const diagSingleQuote = analyzeDiagnostics(cppSingleQuote, "cpp");
  assert(
    diagSingleQuote.some((d) => d.code === "single-quote-string-cpp"),
    "Detecta comillas simples '' para texto en C++"
  );

  // Llaves sin cerrar
  const cppUnclosedBrace = `int main() {
    if (true) {
        int x = 10;
    return 0;
}`;
  const diagUnclosedBrace = analyzeDiagnostics(cppUnclosedBrace, "cpp");
  assert(
    diagUnclosedBrace.some((d) => d.code === "unclosed-brace"),
    "Detecta llaves desbalanceadas en C++"
  );

  // Sintaxis Python en C++
  const cppPySyntax = `def mi_funcion():
    print("Hola")`;
  const diagPyInCpp = analyzeDiagnostics(cppPySyntax, "cpp");
  assert(
    diagPyInCpp.some((d) => d.code === "python-def-in-cpp"),
    "Detecta uso de 'def' en C++"
  );

  // -------------------------------------------------------------
  // GRUPO 3: Motor C++ 20 (Ejecución real y módulos 1 al 9)
  // -------------------------------------------------------------
  console.log("\n--- Grupo 3: Motor C++ 20 de Ejecución Real ---");

  // Módulo 1: Consola e iostream
  const cppM1 = `#include <iostream>
using namespace std;
int main() {
    cout << "Hola, CodeQuest!" << endl;
    return 0;
}`;
  const resM1 = await executeCppCode(cppM1);
  assert(resM1.stdout === "Hola, CodeQuest!", "Módulo 1: Ejecuta main() y captura cout con endl");

  // Módulo 2 & 3: Variables, tipado y operadores
  const cppM2M3 = `#include <iostream>
using namespace std;
int main() {
    int a = 15;
    int b = 4;
    int cociente = a / b; // División entera (15 / 4 = 3)
    int residuo = a % b;
    cout << "Cociente: " << cociente << ", Residuo: " << residuo << endl;
    return 0;
}`;
  const resM2M3 = await executeCppCode(cppM2M3);
  assert(
    resM2M3.stdout === "Cociente: 3, Residuo: 3",
    "Módulos 2 & 3: Variables y división entera en C++",
    `Obtenido: "${resM2M3.stdout}", Stderr: "${resM2M3.stderr}"`
  );

  // Módulo 4: Control de flujo (if-else)
  const cppM4 = `#include <iostream>
using namespace std;
int main() {
    int edad = 18;
    if (edad >= 18) {
        cout << "Mayor de edad" << endl;
    } else {
        cout << "Menor de edad" << endl;
    }
    return 0;
}`;
  const resM4 = await executeCppCode(cppM4);
  assert(resM4.stdout === "Mayor de edad", "Módulo 4: Condicionales if/else");

  // Módulo 5: Bucles for y while
  const cppM5 = `#include <iostream>
using namespace std;
int main() {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        total += i;
    }
    cout << "Suma: " << total << endl;
    return 0;
}`;
  const resM5 = await executeCppCode(cppM5);
  assert(resM5.stdout === "Suma: 15", "Módulo 5: Bucle for acumulador");

  // Módulo 6: Funciones con retorno
  const cppM6 = `#include <iostream>
using namespace std;
int multiplicar(int a, int b) {
    return a * b;
}
int main() {
    cout << multiplicar(6, 7) << endl;
    return 0;
}`;
  const resM6 = await executeCppCode(cppM6);
  assert(resM6.stdout === "42", "Módulo 6: Definición y llamada de funciones");

  // Módulo 7: std::vector dinámico
  const cppM7 = `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> datos;
    datos.push_back(10);
    datos.push_back(20);
    datos.push_back(30);
    cout << "Tamano: " << datos.size() << ", Primero: " << datos[0] << ", Ultimo: " << datos[2] << endl;
    return 0;
}`;
  const resM7 = await executeCppCode(cppM7);
  assert(
    resM7.stdout === "Tamano: 3, Primero: 10, Ultimo: 30",
    "Módulo 7: std::vector con push_back, size() y acceso [i]"
  );

  // Módulo 8: Clases y Objetos
  const cppM8 = `#include <iostream>
#include <string>
using namespace std;

class Termostato {
public:
    int temperatura;
    Termostato(int tempInicial) : temperatura(tempInicial) {}
    void calentar(int delta) {
        temperatura += delta;
    }
};

int main() {
    Termostato t(20);
    t.calentar(5);
    cout << "Temp actual: " << t.temperatura << endl;
    return 0;
}`;
  const resM8 = await executeCppCode(cppM8);
  assert(
    resM8.stdout === "Temp actual: 25",
    "Módulo 8: POO con class, constructor e inicialización de miembros",
    `Obtenido: "${resM8.stdout}", Stderr: "${resM8.stderr}"`
  );

  // Módulo 9: Librerías estándar (<cmath> y <algorithm>)
  const cppM9 = `#include <iostream>
#include <cmath>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    double raiz = sqrt(25.0);
    double potencia = pow(2.0, 4.0);
    cout << "Raiz: " << raiz << ", Pow: " << potencia << endl;
    return 0;
}`;
  const resM9 = await executeCppCode(cppM9);
  assert(
    resM9.stdout === "Raiz: 5, Pow: 16",
    "Módulo 9: <cmath> con sqrt y pow",
    `Obtenido: "${resM9.stdout}", Stderr: "${resM9.stderr}"`
  );

  // -------------------------------------------------------------
  // GRUPO 4: Pruebas Unitarias de Evaluador C++ (runCppExerciseTests)
  // -------------------------------------------------------------
  console.log("\n--- Grupo 4: Evaluación de Casos de Prueba (runCppExerciseTests) ---");

  // A. Solución correcta debe aprobar
  const userCppCode = `#include <iostream>
using namespace std;
int main() {
    cout << "Hola Mundo" << endl;
    return 0;
}`;
  const testCases: ExerciseTestCase[] = [
    {
      id: "tc-1",
      description: "Debe imprimir Hola Mundo",
      input: "",
      expectedOutput: "Hola Mundo",
      evaluationType: "stdout",
    },
  ];
  const evalResult = await runCppExerciseTests(userCppCode, undefined, testCases);
  assert(
    evalResult.testResults[0].passed === true,
    "Código correcto pasa la prueba de stdout"
  );

  // B. Solución incorrecta debe FALLAR de forma genuina
  const wrongCppCode = `#include <iostream>
using namespace std;
int main() {
    cout << "Adios Mundo" << endl;
    return 0;
}`;
  const evalWrongResult = await runCppExerciseTests(wrongCppCode, undefined, testCases);
  assert(
    evalWrongResult.testResults[0].passed === false,
    "Código con salida diferente falla la prueba"
  );
  assert(
    evalWrongResult.testResults[0].actualOutput === "Adios Mundo",
    "Registra exactamente la salida real obtenida ('Adios Mundo')"
  );

  // C. Código con solo comentarios / andamiaje (scaffold) DEBE FALLAR
  const scaffoldCppCode = `// PASO 1: Declara una variable
// PASO 2: Imprime Hola Mundo
`;
  const evalScaffoldResult = await runCppExerciseTests(scaffoldCppCode, undefined, testCases);
  assert(
    evalScaffoldResult.testResults[0].passed === false,
    "Starter code con solo comentarios no aprueba falsamente"
  );

  // D. Evaluación funcional (function_return)
  const fnCppCode = `int duplicar(int n) {
    return n * 2;
}`;
  const fnTestCases: ExerciseTestCase[] = [
    {
      id: "tc-fn-1",
      description: "Duplicar 5 es 10",
      input: "5",
      expectedOutput: "10",
      evaluationType: "function_return",
    },
    {
      id: "tc-fn-2",
      description: "Duplicar -3 es -6",
      input: "-3",
      expectedOutput: "-6",
      evaluationType: "function_return",
    },
  ];
  const evalFnResult = await runCppExerciseTests(fnCppCode, "duplicar", fnTestCases);
  assert(
    evalFnResult.testResults[0].passed === true && evalFnResult.testResults[1].passed === true,
    "Evaluación de función por retorno (function_return) pasa con valores reales"
  );

  // -------------------------------------------------------------
  // GRUPO 5: Evaluador Python (runPythonExerciseTests - Bug Auto-Pass Corregido)
  // -------------------------------------------------------------
  console.log("\n--- Grupo 5: Evaluador Python (Bug Auto-Pass Corregido) ---");
  const { runPythonExerciseTests } = await import("../lib/runner/pyodideRunner");

  const pyScaffoldCode = `# PASO 1: Declara variable edad
# PASO 2: Imprime tu edad
`;
  const pyTestCases: ExerciseTestCase[] = [
    {
      id: "py-tc-1",
      description: "Debe imprimir 20",
      input: "",
      expectedOutput: "20",
      evaluationType: "stdout",
    },
  ];

  const pyScaffoldResult = await runPythonExerciseTests(pyScaffoldCode, undefined, pyTestCases);
  assert(
    pyScaffoldResult.testResults[0].passed === false,
    "Python: Starter code con solo comentarios no aprueba falsamente (auto-pass eliminado)"
  );
  assert(
    pyScaffoldResult.testResults[0].actualOutput === "(sin código ejecutable)",
    "Python: Reporta '(sin código ejecutable)' en lugar de simular que pasó"
  );

  // -------------------------------------------------------------
  // GRUPO 6: Validación de Esquemas y Tipos de Dominio
  // -------------------------------------------------------------
  console.log("\n--- Grupo 6: Esquemas y Compatibilidad de Dominio ---");

  const sampleModule: TrackModule = {
    id: 1,
    track: "python",
    title: "Tu Primer Programa y la Consola",
    subtitle: "Módulo 1",
    description: "Aprende qué es un script y cómo usar print()",
    concepts: ["print", "script", "interprete"],
    lessonIds: ["py-m1-l1"],
  };

  const sampleLesson: TrackLesson = {
    id: "py-m1-l1",
    track: "python",
    moduleId: 1,
    order: 1,
    title: "La Consola y print()",
    subtitle: "Lección 1.1",
    description: "Salida de datos",
    exerciseIds: ["py-m1-l1-e1"],
  };

  const sampleExercise: TrackExercise = {
    id: "py-m1-l1-e1",
    track: "python",
    moduleId: 1,
    lessonId: "py-m1-l1",
    order: 1,
    title: "Hola, Consola",
    subtitle: "Tu primera salida",
    difficulty: "Fundamento",
    xpReward: 100,
    evaluationType: "stdout",
    spec: {
      summary: "Usa print para saludar",
      instructions: ["Usa print('Hola, Mundo!')"],
      learningObjectives: ["Aprender print"],
    },
    theory: {
      title: "La función print",
      explanation: "Envía texto a stdout",
      mentalModel: "La consola como pantalla de texto",
    },
    starterCode: "# PASO 1: Imprime 'Hola, Mundo!'\n",
    solutionReference: "print('Hola, Mundo!')",
    testCases: [
      {
        id: "tc-1",
        description: "Imprime Hola, Mundo!",
        input: "",
        expectedOutput: "Hola, Mundo!",
      },
    ],
    socraticHints: [],
  };

  assert(sampleModule.id === 1 && sampleModule.track === "python", "Esquema TrackModule válido");
  assert(sampleLesson.id === "py-m1-l1", "Esquema TrackLesson válido");
  assert(sampleExercise.evaluationType === "stdout", "Esquema TrackExercise válido");

  // -------------------------------------------------------------
  // GRUPO 7: Remediaciones & Pruebas de Regresión de Retadores
  // -------------------------------------------------------------
  console.log("\n--- Grupo 7: Remediaciones & Hardening de Retadores ---");

  // 7.1 compareOutputs: Evitar falso auto-pass con '0'
  const emptyCoutCode = `#include <iostream>
using namespace std;
int main() {
    return 0;
}`;
  const zeroTestCases: ExerciseTestCase[] = [
    {
      id: "tc-zero-check",
      description: "Espera 0 pero código no escribe nada",
      input: "",
      expectedOutput: "0",
      evaluationType: "stdout",
    },
  ];
  const zeroRes = await runCppExerciseTests(emptyCoutCode, undefined, zeroTestCases);
  assert(
    zeroRes.testResults[0].passed === false,
    "compareOutputs: salida vacía NO pasa prueba esperando '0' (falso auto-pass eliminado)"
  );

  // 7.2 cin >> a >> b con adición numérica
  const cinSumCode = `#include <iostream>
using namespace std;
int main() {
    int a = 0, b = 0;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`;
  const cinTestCases: ExerciseTestCase[] = [
    {
      id: "tc-cin-sum",
      description: "5 + 10 = 15",
      input: "5 10",
      expectedOutput: "15",
      evaluationType: "stdout",
    },
  ];
  const cinRes = await runCppExerciseTests(cinSumCode, undefined, cinTestCases);
  assert(
    cinRes.testResults[0].passed === true && cinRes.testResults[0].actualOutput === "15",
    "cin >> a >> b: suma numérica produce 15 en vez de concatenar '510'"
  );

  // 7.3 this-> puntero implícito en clases
  const thisPtrCode = `#include <iostream>
using namespace std;
class Rectangulo {
public:
    int base;
    int altura;
    Rectangulo(int base, int altura) {
        this->base = base;
        this->altura = altura;
    }
    int area() {
        return this->base * this->altura;
    }
};
int main() {
    Rectangulo r(4, 5);
    cout << r.area() << endl;
    return 0;
}`;
  const thisRes = await executeCppCode(thisPtrCode);
  assert(
    thisRes.stdout === "20",
    "POO: Soporta 'this->miembro' sin error de sintaxis en JavaScript"
  );

  // 7.4 División entera y división por cero en C++
  const divCode = `#include <iostream>
using namespace std;
int main() {
    cout << 15 / 4 << endl;
    return 0;
}`;
  const divRes = await executeCppCode(divCode);
  assert(
    divRes.stdout === "3",
    "Aritmética C++: 15 / 4 evalúa como división entera truncada '3'"
  );

  const divZeroCode = `#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 0;
    int c = a / b;
    cout << c << endl;
    return 0;
}`;
  const divZeroRes = await executeCppCode(divZeroCode);
  assert(
    Boolean(divZeroRes.stdout !== "Infinity" && (divZeroRes.stderr.includes("cero") || (divZeroRes.compilationError && divZeroRes.compilationError.includes("cero")))),
    "Aritmética C++: División por cero lanza excepción y no produce 'Infinity'"
  );

  // 7.5 Vector constructor con tamaño: vector<int> v(5);
  const sizedVecCode = `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v(5);
    cout << "Size: " << v.size() << endl;
    return 0;
}`;
  const sizedVecRes = await executeCppCode(sizedVecCode);
  assert(
    sizedVecRes.stdout === "Size: 5",
    "std::vector: Constructor con tamaño 'vector<int> v(5)' inicializa correctamente con tamaño 5"
  );

  // 7.6 Diagnóstico C++: Caracteres de escape '\n' y comentarios con apostrofes
  const charEscapeCode = `#include <iostream>
using namespace std;
int main() {
    char c = '\\n'; // It's fine
    cout << c;
    return 0;
}`;
  const charDiag = analyzeDiagnostics(charEscapeCode, "cpp");
  assert(
    !charDiag.some((d) => d.code === "single-quote-string-cpp"),
    "Diagnóstico C++: Literales '\\n' y apóstrofes en comentarios no se marcan como error de comillas"
  );

  // 7.7 Diagnóstico C++: Formato Allman 'int main()\\n{' no produce error de punto y coma
  const allmanCode = `#include <iostream>
using namespace std;
int main()
{
    cout << "Hola" << endl;
    return 0;
}`;
  const allmanDiag = analyzeDiagnostics(allmanCode, "cpp");
  assert(
    !allmanDiag.some((d) => d.code === "missing-semicolon"),
    "Diagnóstico C++: Estilo Allman 'int main()\\n{' no reporta falta de ';' en la firma"
  );

  // 7.8 Diagnóstico Python: Typos dentro de cadenas de texto no producen falsos positivos
  const pyStringTypos = `mensaje = "El valor false no es un error de pritn"
print(mensaje)`;
  const pyStringDiag = analyzeDiagnostics(pyStringTypos, "python");
  assert(
    !pyStringDiag.some((d) => d.code === "common-typo"),
    "Diagnóstico Python: Palabras clave 'false' y 'pritn' dentro de strings no disparan errores falsos"
  );

  // 7.9 Función C++ definida en una sola línea
  const singleLineFnCode = `#include <iostream>
using namespace std;
int cuadrado(int x) { return x * x; }
int main() {
    cout << cuadrado(5) << endl;
    return 0;
}`;
  const singleLineFnRes = await executeCppCode(singleLineFnCode);
  assert(
    singleLineFnRes.stdout === "25",
    "C++: Soporta definición de funciones en una sola línea '{ return x * x; }'"
  );

  // 7.10 variable_check de variable declarada dentro de main()
  const localVarCode = `#include <iostream>
int main() {
    int puntaje = 80;
    return 0;
}`;
  const varCheckCases: ExerciseTestCase[] = [
    {
      id: "var-puntaje",
      description: "puntaje 80",
      input: "",
      expectedOutput: "80",
      evaluationType: "variable_check",
      targetVariable: "puntaje",
    },
  ];
  const varCheckRes = await runCppExerciseTests(
    localVarCode,
    undefined,
    varCheckCases,
    "variable_check",
    "puntaje"
  );
  assert(
    varCheckRes.testResults[0].passed === true && varCheckRes.testResults[0].actualOutput === "80",
    "variable_check: Puede inspeccionar variables declaradas localmente dentro de main()"
  );

  // 7.11 Salvaguardas de bucles do-while y bucles sin llaves
  const doWhileCode = `#include <iostream>
using namespace std;
int main() {
    int x = 0;
    do {
        x++;
    } while (x < 10);
    cout << x << endl;
    return 0;
}`;
  const doWhileRes = await executeCppCode(doWhileCode);
  assert(
    doWhileRes.stdout === "10",
    "Bucles: Bucle do-while legítimo ejecuta correctamente respetando condición de salida"
  );

  console.log("\n=================================================");
  console.log(`=== RESULTADO: ${testsPassed}/${testsRun} PRUEBAS EXITOSAS ===`);
  console.log("=================================================\n");
}

runAllTests().catch((err) => {
  console.error("Error en suite de pruebas:", err);
  process.exit(1);
});
