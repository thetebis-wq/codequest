import { ExerciseTestCase, EvaluationType } from "@/types/exercise";
import { analyzeDiagnostics, DiagnosticItem } from "./diagnostics";

export interface TestCaseResult {
  id: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
}

export interface CppExecutionResult {
  stdout: string;
  stderr: string;
  testResults: TestCaseResult[];
  executionTimeMs: number;
  compilationError?: string;
  diagnostics?: DiagnosticItem[];
}

/**
 * Implementación de std::vector de C++ en JavaScript para permitir manipulación
 * idiomática tanto por índice (v[i]) como por métodos estándar (push_back, size, etc.)
 */
export class CppVector<T> extends Array<T> {
  constructor(...args: any[]) {
    if (args.length === 1 && typeof args[0] === "number") {
      super(args[0]);
    } else if (args.length === 1 && Array.isArray(args[0])) {
      super(...args[0]);
    } else {
      super(...args);
    }
  }

  push_back(val: T): void {
    this.push(val);
  }

  pop_back(): T | undefined {
    return this.pop();
  }

  size(): number {
    return this.length;
  }

  empty(): boolean {
    return this.length === 0;
  }

  clear(): void {
    this.length = 0;
  }

  at(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new Error("std::out_of_range: vector::_M_range_check");
    }
    return this[index];
  }

  begin() {
    return { _isIter: true, _arr: this, _idx: 0 };
  }

  end() {
    return { _isIter: true, _arr: this, _idx: this.length };
  }
}

/**
 * Buffer de entrada simulado para std::cin
 */
class CppCin {
  private tokens: string[] = [];

  constructor(inputString: string = "") {
    this.setInput(inputString);
  }

  setInput(inputString: string): void {
    this.tokens = inputString
      .trim()
      .split(/\s+/)
      .filter((t) => t.length > 0);
  }

  read(): any {
    if (this.tokens.length === 0) {
      return "";
    }
    const tok = this.tokens.shift()!;
    if (!isNaN(Number(tok)) && tok.trim() !== "") {
      return Number(tok);
    }
    return tok;
  }

  extract(target?: any): any {
    return this.read();
  }
}

/**
 * Buffer de salida simulado para std::cout
 */
class CppCout {
  public output: string = "";

  write(...items: any[]): void {
    for (const item of items) {
      if (item === "\n") {
        this.output += "\n";
      } else if (item instanceof CppVector || Array.isArray(item)) {
        this.output += `[${item.join(", ")}]`;
      } else if (typeof item === "boolean") {
        this.output += item ? "1" : "0";
      } else if (item === null || item === undefined) {
        this.output += "";
      } else {
        this.output += String(item);
      }
    }
  }

  getOutput(): string {
    return this.output;
  }

  clear(): void {
    this.output = "";
  }
}

/**
 * Divisor entero con semántica nativa de C++ (trunca hacia cero)
 */
function cppDiv(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Floating point exception (core dumped): división por cero");
  }
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return Math.trunc(a / b);
  }
  return a / b;
}

/**
 * Transpila código fuente en C++ 20 a JavaScript ejecutable dentro del sandbox del runner.
 */
export function transpileCppToJs(cppCode: string): { jsCode: string; error?: string } {
  try {
    const lines = cppCode.split(/\r?\n/);
    const transformedLines: string[] = [];

    let inBlockComment = false;
    let inClass = false;
    let className = "";
    let currentMethodParams = new Set<string>();

    // Lista de nombres de clases y sus campos miembros definidos por el usuario en este archivo
    const declaredClasses = new Set<string>();
    const classFields: Record<string, Set<string>> = {};
    let curClassScan = "";
    for (const line of lines) {
      const trimmedLine = line.trim();
      const matchClass = trimmedLine.match(/\b(class|struct)\s+([a-zA-Z0-9_]+)/);
      if (matchClass) {
        curClassScan = matchClass[2];
        declaredClasses.add(curClassScan);
        classFields[curClassScan] = new Set<string>();
      } else if (curClassScan && trimmedLine === "};") {
        curClassScan = "";
      } else if (curClassScan) {
        const matchField = trimmedLine.match(/^(?:(?:const|unsigned)\s+)?(?:int|double|float|char|bool|string|std::string|auto|long)\s+([a-zA-Z0-9_]+)\s*(?:=.*?)?;$/);
        if (matchField) {
          classFields[curClassScan].add(matchField[1]);
        }
      }
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Manejo de comentarios de bloque
      if (inBlockComment) {
        if (line.includes("*/")) {
          inBlockComment = false;
          line = line.substring(line.indexOf("*/") + 2);
        } else {
          transformedLines.push("// " + line);
          continue;
        }
      }

      if (line.includes("/*")) {
        const commentStart = line.indexOf("/*");
        if (line.includes("*/")) {
          const commentEnd = line.indexOf("*/") + 2;
          line = line.substring(0, commentStart) + " " + line.substring(commentEnd);
        } else {
          inBlockComment = true;
          line = line.substring(0, commentStart);
        }
      }

      // Comentarios de una línea
      let commentPart = "";
      const commentIdx = line.indexOf("//");
      if (commentIdx !== -1) {
        commentPart = line.substring(commentIdx);
        line = line.substring(0, commentIdx);
      }

      // Normalizar this-> a this.
      line = line.replace(/\bthis->/g, "this.");

      // Reemplazar división entera fuera de cadenas
      line = replaceDivisionOutsideStrings(line);

      let trimmed = line.trim();

      // 1. Directivas del preprocesador y 'using namespace std;'
      if (
        trimmed.startsWith("#include") ||
        trimmed.startsWith("#define") ||
        trimmed.startsWith("using namespace std;") ||
        trimmed.length === 0
      ) {
        transformedLines.push(commentPart ? commentPart : "");
        continue;
      }

      // Reemplazar prefijos std:: y utilidades estándar antes de procesar declaraciones
      line = line
        .replace(/\bstd::endl\b/g, '"\\n"')
        .replace(/\bendl\b/g, '"\\n"')
        .replace(/\bstd::sqrt\b/g, "Math.sqrt")
        .replace(/\bstd::pow\b/g, "Math.pow")
        .replace(/\bstd::abs\b/g, "Math.abs")
        .replace(/\bstd::round\b/g, "Math.round")
        .replace(/\bstd::floor\b/g, "Math.floor")
        .replace(/\bstd::ceil\b/g, "Math.ceil")
        .replace(/\bstd::max\b/g, "Math.max")
        .replace(/\bstd::min\b/g, "Math.min")
        .replace(/\bstd::to_string\b/g, "String")
        .replace(/\bto_string\b/g, "String")
        .replace(/\bstd::stoi\b/g, "parseInt")
        .replace(/\bstoi\b/g, "parseInt")
        .replace(/\bstd::sort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.sort((a, b) => a - b)")
        .replace(/\bsort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.sort((a, b) => a - b)")
        .replace(/\bstd::reverse\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.reverse()")
        .replace(/\breverse\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.reverse()");

      trimmed = line.trim();

      // 2. Control de clases y especificadores de acceso
      if (/^\s*(public|private|protected)\s*:\s*$/.test(trimmed)) {
        transformedLines.push("// " + trimmed);
        continue;
      }

      // Declaración de clase o struct: 'class Rectangulo {' o 'struct Punto {'
      const classDeclMatch = trimmed.match(/^(class|struct)\s+([a-zA-Z0-9_]+)\s*\{?$/);
      if (classDeclMatch) {
        inClass = true;
        className = classDeclMatch[2];
        currentMethodParams.clear();
        transformedLines.push(`class ${className} {`);
        continue;
      }

      if (inClass && (trimmed === "};" || trimmed === "}")) {
        currentMethodParams.clear();
        if (trimmed === "};") {
          inClass = false;
          className = "";
        }
        transformedLines.push("}");
        continue;
      }

      // Declaración de variables miembros dentro de clase: 'int temperatura;' -> 'temperatura;'
      if (inClass) {
        const memberVarMatch = trimmed.match(
          /^(?:(?:const|unsigned)\s+)?(?:int|double|float|char|bool|string|std::string|auto|long)\s+([a-zA-Z0-9_]+)\s*(?:=.*?)?;$/
        );
        if (memberVarMatch) {
          transformedLines.push(`  ${memberVarMatch[1]};`);
          continue;
        }
      }

      // Constructor con lista de inicialización de miembros:
      // 'Rectangulo(int b, int h) : base(b), altura(h) {}'
      if (inClass && className) {
        const ctorMatch = trimmed.match(new RegExp(`^${className}\\s*\\((.*?)\\)\\s*(?::\\s*(.*?))?\\s*(\\{.*)?$`));
        if (ctorMatch) {
          const params = cleanParameters(ctorMatch[1]);
          currentMethodParams = new Set(params.split(",").map((s) => s.trim()).filter(Boolean));
          const initList = ctorMatch[2];
          const hasClosingBrace = trimmed.endsWith("{}") || trimmed.endsWith("}");
          let ctorBody = `constructor(${params}) {`;
          if (initList) {
            // procesar lista 'base(b), altura(h)'
            const inits = initList.split(",").map((s) => s.trim());
            for (const init of inits) {
              const fieldMatch = init.match(/([a-zA-Z0-9_]+)\s*\((.*?)\)/);
              if (fieldMatch) {
                ctorBody += ` this.${fieldMatch[1]} = ${fieldMatch[2]};`;
              }
            }
          }
          if (hasClosingBrace) {
            ctorBody += " }";
          }
          transformedLines.push(ctorBody);
          continue;
        }
      }

      // 3. Transformación de std::cout y cout
      if (/\b(std::)?cout\s*<</.test(line)) {
        const transformedCout = transformCoutStatement(line);
        transformedLines.push(transformedCout + (commentPart ? " " + commentPart : ""));
        continue;
      }

      // 4. Transformación de std::cin y cin
      if (/\b(std::)?cin\s*>>/.test(line)) {
        const transformedCin = transformCinStatement(line);
        transformedLines.push(transformedCin + (commentPart ? " " + commentPart : ""));
        continue;
      }

      // 5. Transformación de Bucles for estándar y Range-Based For:
      // 'for (int i = 0; i < n; i++)' -> 'for (let i = 0; i < n; i++)'
      if (/^\s*for\s*\(\s*(?:const\s+)?(int|double|float|char|auto|long|size_t)\s+([a-zA-Z0-9_]+)\s*=/.test(trimmed)) {
        const forTransformed = line.replace(
          /(\bfor\s*\(\s*(?:const\s+)?)(?:int|double|float|char|auto|long|size_t)(\s+)/,
          "$1let$2"
        );
        transformedLines.push(forTransformed + (commentPart ? " " + commentPart : ""));
        continue;
      }

      // 'for (auto x : vec)' -> 'for (let x of vec)'
      const rangeForMatch = trimmed.match(/^for\s*\(\s*(?:const\s+)?(?:auto|int|double|float|char|string|std::string)(?:\s*&)?\s+([a-zA-Z0-9_]+)\s*:\s*(.+?)\s*\)\s*\{?$/);
      if (rangeForMatch) {
        const varName = rangeForMatch[1];
        const container = rangeForMatch[2];
        const openBrace = trimmed.endsWith("{") ? " {" : "";
        transformedLines.push(`for (let ${varName} of ${container})${openBrace}`);
        continue;
      }

      // 6. Instanciación de clases de usuario (antes de prototipos de función):
      // 'Alumno a("Lucas", 85);' -> 'let a = new Alumno("Lucas", 85);'
      // 'Alumno a;' -> 'let a = new Alumno();'
      let matchedClassInstantiation = false;
      for (const uClass of declaredClasses) {
        const ctorCallRegex = new RegExp(`^${uClass}\\s+([a-zA-Z0-9_]+)\\s*(?:\\((.*?)\\))?\\s*;$`);
        const ctorMatch = trimmed.match(ctorCallRegex);
        if (ctorMatch) {
          const varName = ctorMatch[1];
          const args = ctorMatch[2] ? ctorMatch[2] : "";
          transformedLines.push(`let ${varName} = new ${uClass}(${args});`);
          matchedClassInstantiation = true;
          break;
        }
      }
      if (matchedClassInstantiation) continue;

      // 6.5. Transformación de std::vector (antes de prototipos de función)
      // Sized constructor: vector<int> v(5); o vector<int> v(5, val);
      const vectorSizedMatch = trimmed.match(
        /^(?:std::)?vector\s*<.*?>\s+([a-zA-Z0-9_]+)\s*\(\s*([^,)]+)(?:\s*,\s*([^)]+))?\s*\)\s*;$/
      );
      if (vectorSizedMatch) {
        const varName = vectorSizedMatch[1];
        const sizeExpr = vectorSizedMatch[2].trim();
        const valExpr = vectorSizedMatch[3] ? vectorSizedMatch[3].trim() : "0";
        transformedLines.push(`let ${varName} = new CppVector(new Array(${sizeExpr}).fill(${valExpr}));`);
        continue;
      }

      // Initializer list: vector<int> v = {1, 2, 3};
      const vectorInitMatch = trimmed.match(/^(?:std::)?vector\s*<.*?>\s+([a-zA-Z0-9_]+)\s*=\s*\{(.*?)\}\s*;$/);
      if (vectorInitMatch) {
        transformedLines.push(`let ${vectorInitMatch[1]} = new CppVector([${vectorInitMatch[2]}]);`);
        continue;
      }

      // Empty vector: vector<int> v;
      const vectorEmptyMatch = trimmed.match(/^(?:std::)?vector\s*<.*?>\s+([a-zA-Z0-9_]+)\s*;$/);
      if (vectorEmptyMatch) {
        transformedLines.push(`let ${vectorEmptyMatch[1]} = new CppVector();`);
        continue;
      }

      // 7. Prototipos de función sin cuerpo (ej: 'int sumar(int a, int b);')
      if (/^[a-zA-Z0-9_:*&<>]+\s+[a-zA-Z0-9_]+\s*\(.*?\)\s*;$/.test(trimmed) && !trimmed.startsWith("return")) {
        transformedLines.push("// prototype: " + trimmed);
        continue;
      }

      // 8. Definición de funciones y métodos:
      // 'int main() {' o 'void saludar(string nombre) {' o 'int sumar(int a, int b) {'
      // o 'int cuadrado(int x) { return x * x; }'
      const funcDefMatch = trimmed.match(/^([a-zA-Z0-9_:*&<>]+\s+)?([a-zA-Z0-9_]+)\s*\((.*?)\)\s*(\{.*)?$/);
      if (
        funcDefMatch &&
        !inClass &&
        !/^(if|for|while|switch|catch)\b/.test(funcDefMatch[2])
      ) {
        const funcName = funcDefMatch[2];
        const rawParams = funcDefMatch[3];
        const params = cleanParameters(rawParams);
        const rest = funcDefMatch[4]
          ? (funcDefMatch[4].startsWith("{") ? " " + funcDefMatch[4] : " " + funcDefMatch[4])
          : (trimmed.endsWith("{") ? " {" : "");

        transformedLines.push(`function ${funcName}(${params})${rest}`);
        continue;
      }

      // Métodos miembros dentro de clase: 'int getArea() {'
      if (inClass) {
        const methodMatch = trimmed.match(/^([a-zA-Z0-9_:*&<>]+\s+)?([a-zA-Z0-9_]+)\s*\((.*?)\)\s*(\{.*)?$/);
        if (methodMatch && !/^(if|for|while|switch)\b/.test(methodMatch[2])) {
          const methodName = methodMatch[2];
          const rawParams = methodMatch[3];
          const params = cleanParameters(rawParams);
          currentMethodParams = new Set(params.split(",").map((s) => s.trim()).filter(Boolean));
          const rest = methodMatch[4] || "{";
          transformedLines.push(`${methodName}(${params}) ${rest}`);
          continue;
        }

        // Si es una línea dentro del cuerpo de la clase/método:
        // Prefijar campos miembros de esta clase con 'this.'
        if (className && classFields[className]) {
          let lineWithThis = line;
          for (const field of classFields[className]) {
            if (currentMethodParams.has(field)) {
              continue;
            }
            lineWithThis = lineWithThis.replace(
              new RegExp(`(?<!\\.|this\\.|[a-zA-Z0-9_])\\b${field}\\b`, "g"),
              `this.${field}`
            );
          }
          transformedLines.push(lineWithThis + (commentPart ? " " + commentPart : ""));
          continue;
        }
      }

      // 10. Arreglos fijos nativos: 'int arr[5] = {1, 2, 3};'
      const arrayInitMatch = trimmed.match(/^[a-zA-Z0-9_]+\s+([a-zA-Z0-9_]+)\s*\[.*?\]\s*=\s*\{(.*?)\}\s*;$/);
      if (arrayInitMatch) {
        transformedLines.push(`let ${arrayInitMatch[1]} = [${arrayInitMatch[2]}];`);
        continue;
      }
      const arrayEmptyMatch = trimmed.match(/^[a-zA-Z0-9_]+\s+([a-zA-Z0-9_]+)\s*\[(.*?)\]\s*;$/);
      if (arrayEmptyMatch && !trimmed.startsWith("return")) {
        const sizeExpr = arrayEmptyMatch[2].trim() || "0";
        transformedLines.push(`let ${arrayEmptyMatch[1]} = new Array(${sizeExpr}).fill(0);`);
        continue;
      }

      // 11. Declaraciones de tipos primitivos:
      // 'int x = 10, y = 20;' o 'double pi = 3.14;' o 'string s = "hola";'
      const primitiveDeclRegex = /^(?:const\s+)?(int|double|float|char|bool|string|std::string|auto|long)\s+([^;]+);$/;
      const primMatch = trimmed.match(primitiveDeclRegex);
      if (primMatch && !inClass) {
        const isConst = trimmed.startsWith("const");
        const type = primMatch[1];
        const declKeyword = isConst ? "const" : "let";
        const declarations = primMatch[2];

        if (type === "int" || type === "long") {
          const transformedDecls = splitTopLevelCommas(declarations)
            .map((decl) => {
              const eqIdx = decl.indexOf("=");
              if (eqIdx !== -1) {
                const varName = decl.substring(0, eqIdx).trim();
                const expr = decl.substring(eqIdx + 1).trim();
                return `${varName} = Math.trunc(${expr})`;
              }
              return `${decl.trim()} = 0`;
            })
            .join(", ");
          transformedLines.push(`${declKeyword} ${transformedDecls};`);
          continue;
        }

        transformedLines.push(`${declKeyword} ${declarations};`);
        continue;
      }



      // 12. Llamadas a métodos de string y utilidades estándar
      let processedLine = line;
      // Reemplazar prefijos std::
      processedLine = processedLine
        .replace(/\bstd::endl\b/g, '"\\n"')
        .replace(/\bendl\b/g, '"\\n"')
        .replace(/\bstd::sqrt\b/g, "Math.sqrt")
        .replace(/\bstd::pow\b/g, "Math.pow")
        .replace(/\bstd::abs\b/g, "Math.abs")
        .replace(/\bstd::round\b/g, "Math.round")
        .replace(/\bstd::floor\b/g, "Math.floor")
        .replace(/\bstd::ceil\b/g, "Math.ceil")
        .replace(/\bstd::max\b/g, "Math.max")
        .replace(/\bstd::min\b/g, "Math.min")
        .replace(/\bstd::to_string\b/g, "String")
        .replace(/\bto_string\b/g, "String")
        .replace(/\bstd::stoi\b/g, "parseInt")
        .replace(/\bstoi\b/g, "parseInt")
        .replace(/\bstd::sort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.sort((a, b) => a - b)")
        .replace(/\bsort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.sort((a, b) => a - b)")
        .replace(/\bstd::reverse\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.reverse()")
        .replace(/\breverse\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.reverse()");

      transformedLines.push(processedLine + (commentPart ? " " + commentPart : ""));
    }

    return { jsCode: transformedLines.join("\n") };
  } catch (err: any) {
    return { jsCode: "", error: `Error de compilación C++: ${err?.message || err}` };
  }
}

/**
 * Reemplaza operadores de división '/' con llamada a 'cppDiv' para emular semántica de C++
 */
function replaceDivision(expr: string): string {
  let result = expr;
  let prev = "";
  while (result !== prev) {
    prev = result;
    result = result.replace(/([a-zA-Z0-9_().]+)\s*\/\s*([a-zA-Z0-9_().]+)/g, (match, p1, p2) => {
      if (/\.\d+/.test(p1) || /\.\d+/.test(p2)) {
        return `(${p1} / ${p2})`;
      }
      return `cppDiv(${p1}, ${p2})`;
    });
  }
  return result;
}

/**
 * Reemplaza división en una línea ignorando contenido dentro de literales de cadena
 */
function replaceDivisionOutsideStrings(line: string): string {
  let result = "";
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i];
      result += q;
      i++;
      while (i < line.length && line[i] !== q) {
        if (line[i] === "\\") result += line[i++];
        if (i < line.length) result += line[i++];
      }
      if (i < line.length) result += line[i++];
      continue;
    }
    let seg = "";
    while (i < line.length && line[i] !== '"' && line[i] !== "'") {
      seg += line[i++];
    }
    result += replaceDivision(seg);
  }
  return result;
}

/**
 * Divide una lista de declaraciones por coma respetando paréntesis, corchetes y llaves
 */
function splitTopLevelCommas(str: string): string[] {
  const parts: string[] = [];
  let cur = "";
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === "(") parenDepth++;
    else if (ch === ")") parenDepth--;
    else if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth--;
    else if (ch === "[") bracketDepth++;
    else if (ch === "]") bracketDepth--;
    else if (ch === "," && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
      parts.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim().length > 0) {
    parts.push(cur.trim());
  }
  return parts;
}

/**
 * Limpia firmas de parámetros en C++ retirando tipos y referencias:
 * 'int a, int& b, const string& nombre' -> 'a, b, nombre'
 */
function cleanParameters(paramStr: string): string {
  if (!paramStr || paramStr.trim().length === 0) return "";

  const parts = paramStr.split(",").map((p) => p.trim());
  const cleanNames = parts.map((part) => {
    // Quita 'const', tipos, '*', '&'
    const words = part.replace(/[&*]/g, " ").trim().split(/\s+/);
    return words[words.length - 1];
  });

  return cleanNames.join(", ");
}

/**
 * Transforma una sentencia de flujo 'cout << a << b << endl;'
 * a llamadas de método '__cout__.write(a, b, ...);'
 */
function transformCoutStatement(line: string): string {
  const match = line.match(/\b(?:std::)?cout\s*<<\s*(.+?);/);
  if (!match) return line;

  const rawChain = match[1];
  const items = splitStreamChain(rawChain);
  const writeCalls = items
    .map((item) => {
      const trimmed = item.trim();
      if (trimmed === "std::endl" || trimmed === "endl") {
        return '"\\n"';
      }
      return trimmed;
    })
    .join(", ");

  return line.replace(/\b(?:std::)?cout\s*<<\s*.+?;/, `__cout__.write(${writeCalls});`);
}

/**
 * Transforma una sentencia 'cin >> a >> b;' a lecturas de __cin__
 */
function transformCinStatement(line: string): string {
  const match = line.match(/\b(?:std::)?cin\s*>>\s*(.+?);/);
  if (!match) return line;

  const rawChain = match[1];
  const vars = rawChain.split(">>").map((v) => v.trim());
  const assignments = vars
    .map((v) => `${v} = ((t = __cin__.read()) => (!isNaN(Number(t)) && String(t).trim() !== "" ? Number(t) : t))();`)
    .join(" ");

  return line.replace(/\b(?:std::)?cin\s*>>\s*.+?;/, assignments);
}

/**
 * Divide una cadena de inserciones de flujo '<<' respetando cadenas y paréntesis
 */
function splitStreamChain(chain: string): string[] {
  const items: string[] = [];
  let current = "";
  let inString = false;
  let quoteChar = "";
  let parenDepth = 0;

  for (let i = 0; i < chain.length; i++) {
    const ch = chain[i];

    if (!inString && (ch === '"' || ch === "'")) {
      inString = true;
      quoteChar = ch;
      current += ch;
      continue;
    }

    if (inString && ch === quoteChar) {
      if (i > 0 && chain[i - 1] !== "\\") {
        inString = false;
      }
      current += ch;
      continue;
    }

    if (!inString) {
      if (ch === "(") parenDepth++;
      if (ch === ")") parenDepth--;

      if (ch === "<" && chain[i + 1] === "<" && parenDepth === 0) {
        items.push(current.trim());
        current = "";
        i++; // saltar el segundo '<'
        continue;
      }
    }

    current += ch;
  }

  if (current.trim().length > 0) {
    items.push(current.trim());
  }

  return items;
}

/**
 * Retorna el entorno estándar de librerías de C++20 para inyectar en el sandbox
 */
function getSandboxPrelude(): string {
  return `
    let __step_counter__ = 0;
    const { sqrt, pow, abs, round, floor, ceil, min, max, sin, cos } = Math;
    const to_string = String;
    const stoi = (s) => parseInt(s, 10);
    const endl = "\\n";
    const std = {
      cout: __cout__,
      cin: __cin__,
      endl: "\\n",
      vector: CppVector,
      sqrt: Math.sqrt,
      pow: Math.pow,
      abs: Math.abs,
      round: Math.round,
      floor: Math.floor,
      ceil: Math.ceil,
      min: Math.min,
      max: Math.max,
      to_string: String,
      stoi: (s) => parseInt(s, 10),
      sort: (arr) => arr.sort((a, b) => a - b),
      reverse: (arr) => arr.reverse(),
    };
  `;
}

/**
 * Inyecta protección contra bucles infinitos en bucles while, for y do-while,
 * soportando tanto bucles con llaves { } como sentencias sin llaves.
 */
function injectLoopSafeguards(jsCode: string): string {
  const safeguard =
    'if (++__step_counter__ > 300000) throw new Error("Tiempo de ejecución excedido (bucle infinito).");';

  let result = "";
  let i = 0;
  const n = jsCode.length;

  while (i < n) {
    // Preservar literales de cadena
    if (jsCode[i] === '"' || jsCode[i] === "'" || jsCode[i] === "`") {
      const q = jsCode[i];
      result += q;
      i++;
      while (i < n && jsCode[i] !== q) {
        if (jsCode[i] === "\\") result += jsCode[i++];
        if (i < n) result += jsCode[i++];
      }
      if (i < n) result += jsCode[i++];
      continue;
    }

    // Preservar comentarios de una línea
    if (jsCode.startsWith("//", i)) {
      while (i < n && jsCode[i] !== "\n") {
        result += jsCode[i++];
      }
      continue;
    }

    // Preservar comentarios de bloque
    if (jsCode.startsWith("/*", i)) {
      while (i < n && !jsCode.startsWith("*/", i)) {
        result += jsCode[i++];
      }
      if (i < n) {
        result += jsCode[i++];
        result += jsCode[i++];
      }
      continue;
    }

    // 1. Manejo del bucle 'do'
    const isDo =
      (i === 0 || !/[a-zA-Z0-9_$]/.test(jsCode[i - 1])) &&
      jsCode.startsWith("do", i) &&
      (i + 2 >= n || !/[a-zA-Z0-9_$]/.test(jsCode[i + 2]));

    if (isDo) {
      result += "do";
      i += 2;
      let ws = "";
      while (i < n && /\s/.test(jsCode[i])) {
        ws += jsCode[i++];
      }
      if (i < n && jsCode[i] === "{") {
        result += `${ws}{ ${safeguard} `;
        i++;
      } else {
        // do unbraced: do stmt; while(...)
        let stmt = "";
        while (i < n && jsCode[i] !== ";") {
          stmt += jsCode[i++];
        }
        if (i < n && jsCode[i] === ";") {
          stmt += ";";
          i++;
        }
        result += `${ws}{ ${safeguard} ${stmt} }`;
      }
      continue;
    }

    // 2. Manejo de 'while' y 'for'
    const isWhile =
      (i === 0 || !/[a-zA-Z0-9_$]/.test(jsCode[i - 1])) &&
      jsCode.startsWith("while", i) &&
      (i + 5 >= n || !/[a-zA-Z0-9_$]/.test(jsCode[i + 5]));
    const isFor =
      (i === 0 || !/[a-zA-Z0-9_$]/.test(jsCode[i - 1])) &&
      jsCode.startsWith("for", i) &&
      (i + 3 >= n || !/[a-zA-Z0-9_$]/.test(jsCode[i + 3]));

    if (isWhile || isFor) {
      const kw = isWhile ? "while" : "for";
      const kwLen = kw.length;

      // Verificar si este 'while' es parte de un 'do { ... } while (...);'
      let isDoWhileCondition = false;
      if (isWhile) {
        let backIdx = result.length - 1;
        while (backIdx >= 0 && /\s/.test(result[backIdx])) backIdx--;
        if (backIdx >= 0 && result[backIdx] === "}") {
          let checkI = i + kwLen;
          while (checkI < n && /\s/.test(jsCode[checkI])) checkI++;
          if (checkI < n && jsCode[checkI] === "(") {
            let pDepth = 1;
            checkI++;
            while (checkI < n && pDepth > 0) {
              if (jsCode[checkI] === "(") pDepth++;
              else if (jsCode[checkI] === ")") pDepth--;
              checkI++;
            }
            while (checkI < n && /\s/.test(jsCode[checkI])) checkI++;
            if (checkI < n && jsCode[checkI] === ";") {
              isDoWhileCondition = true;
            }
          }
        }
      }

      if (isDoWhileCondition) {
        result += kw;
        i += kwLen;
        continue;
      }

      result += kw;
      i += kwLen;

      // Avanzar hasta '('
      while (i < n && /\s/.test(jsCode[i])) {
        result += jsCode[i++];
      }

      if (i < n && jsCode[i] === "(") {
        result += "(";
        i++;
        let parenDepth = 1;
        while (i < n && parenDepth > 0) {
          if (jsCode[i] === '"' || jsCode[i] === "'" || jsCode[i] === "`") {
            const q = jsCode[i];
            result += q;
            i++;
            while (i < n && jsCode[i] !== q) {
              if (jsCode[i] === "\\") result += jsCode[i++];
              if (i < n) result += jsCode[i++];
            }
            if (i < n) result += jsCode[i++];
            continue;
          }
          if (jsCode[i] === "(") parenDepth++;
          else if (jsCode[i] === ")") parenDepth--;
          result += jsCode[i++];
        }

        // Espacios tras el cierre ')'
        let ws = "";
        while (i < n && /\s/.test(jsCode[i])) {
          ws += jsCode[i++];
        }

        if (i < n && jsCode[i] === "{") {
          result += `${ws}{ ${safeguard} `;
          i++;
        } else if (i < n && jsCode[i] === ";") {
          result += `${ws}{ ${safeguard} }`;
          i++;
        } else {
          // Bucle sin llaves (ej: while (true) x++; o for (;;) x++;)
          let stmt = "";
          let pDepth = 0;
          let bDepth = 0;
          while (i < n) {
            const ch = jsCode[i];
            if (ch === "(") pDepth++;
            else if (ch === ")") pDepth--;
            else if (ch === "{") bDepth++;
            else if (ch === "}") bDepth--;
            else if (ch === ";" && pDepth === 0 && bDepth === 0) {
              stmt += ch;
              i++;
              break;
            }
            stmt += ch;
            i++;
          }
          result += `${ws}{ ${safeguard} ${stmt} }`;
        }
        continue;
      }
    }

    result += jsCode[i++];
  }

  return result;
}

/**
 * Ejecuta código C++ de forma aislada en el sandbox de JavaScript, capturando la consola.
 */
export async function executeCppCode(
  userCode: string,
  input: string = ""
): Promise<{
  stdout: string;
  stderr: string;
  compilationError?: string;
  executionTimeMs: number;
  diagnostics?: DiagnosticItem[];
}> {
  const startTime = performance.now();
  const diagnostics = analyzeDiagnostics(userCode, "cpp");
  const errorDiagnostics = diagnostics.filter((d) => d.severity === "error");

  // Si hay errores críticos en el análisis sintáctico previo, reportar como error de compilación
  if (errorDiagnostics.length > 0) {
    const errorMsg = errorDiagnostics
      .map((d) => `[Error Línea ${d.line}]: ${d.message}${d.suggestion ? ` -> ${d.suggestion}` : ""}`)
      .join("\n");

    return {
      stdout: "",
      stderr: errorMsg,
      compilationError: `Error de compilación GCC 13.2:\n${errorMsg}`,
      diagnostics,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  const { jsCode, error: transpileError } = transpileCppToJs(userCode);
  if (transpileError) {
    return {
      stdout: "",
      stderr: transpileError,
      compilationError: transpileError,
      diagnostics,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  const cout = new CppCout();
  const cin = new CppCin(input);

  try {
    // Inyectar protección de iteraciones máximas para evitar bucles infinitos
    const instrumentedCode = injectLoopSafeguards(jsCode);

    const sandbox = new Function(
      "__cout__",
      "__cin__",
      "CppVector",
      "cppDiv",
      `
      ${getSandboxPrelude()}
      ${instrumentedCode}

      if (typeof main === 'function') {
        main();
      }
    `
    );

    sandbox(cout, cin, CppVector, cppDiv);
    const endTime = performance.now();

    return {
      stdout: cout.getOutput().replace(/\r?\n$/, ""),
      stderr: "",
      diagnostics,
      executionTimeMs: Math.round(endTime - startTime),
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      stdout: cout.getOutput().replace(/\r?\n$/, ""),
      stderr: err?.message || String(err),
      compilationError: `Error de ejecución en C++: ${err?.message || err}`,
      diagnostics,
      executionTimeMs: Math.round(endTime - startTime),
    };
  }
}

/**
 * Ejecuta pruebas unitarias reales contra el código C++20 del estudiante.
 * Evalúa:
 * - "stdout": Salida estándar de la función main() comparada con expectedOutput.
 * - "function_return": Llamada a la función solicitada y comparación de su resultado.
 * - "variable_check": Inspección del estado de variables.
 */
export async function runCppExerciseTests(
  userCode: string,
  entryFunctionName?: string,
  testCases: ExerciseTestCase[] = [],
  evaluationType?: EvaluationType,
  targetVariable?: string
): Promise<CppExecutionResult> {
  const startTime = performance.now();
  const diagnostics = analyzeDiagnostics(userCode, "cpp");
  const errorDiagnostics = diagnostics.filter((d) => d.severity === "error");

  // Validación de código vacío o de puros comentarios
  const nonCommentCode = userCode
    .split(/\r?\n/)
    .map((l) => l.replace(/\/\/.*$/, "").trim())
    .filter((l) => l.length > 0)
    .join("\n");

  if (nonCommentCode.length === 0) {
    const endTime = performance.now();
    return {
      stdout: "",
      stderr: "",
      compilationError: "El archivo no contiene instrucciones de código ejecutable.",
      diagnostics,
      testResults: testCases.map((tc) => ({
        id: tc.id,
        passed: false,
        input: tc.input || "",
        expectedOutput: tc.expectedOutput,
        actualOutput: "(sin código ejecutable escrito)",
        error: "Debes escribir el código de la solución para superar esta prueba.",
      })),
      executionTimeMs: Math.round(endTime - startTime),
    };
  }

  // Si hay errores de compilación estáticos
  if (errorDiagnostics.length > 0) {
    const errorDetails = errorDiagnostics
      .map((d) => `Línea ${d.line}: ${d.message}${d.suggestion ? ` (${d.suggestion})` : ""}`)
      .join("\n");

    const endTime = performance.now();
    return {
      stdout: "",
      stderr: errorDetails,
      compilationError: `Error de compilación GCC:\n${errorDetails}`,
      diagnostics,
      testResults: testCases.map((tc) => ({
        id: tc.id,
        passed: false,
        input: tc.input || "",
        expectedOutput: tc.expectedOutput,
        actualOutput: `Error de compilación: ${errorDiagnostics[0].message}`,
        error: errorDiagnostics[0].message,
      })),
      executionTimeMs: Math.round(endTime - startTime),
    };
  }

  const { jsCode, error: transpileError } = transpileCppToJs(userCode);
  if (transpileError) {
    const endTime = performance.now();
    return {
      stdout: "",
      stderr: transpileError,
      compilationError: transpileError,
      diagnostics,
      testResults: testCases.map((tc) => ({
        id: tc.id,
        passed: false,
        input: tc.input || "",
        expectedOutput: tc.expectedOutput,
        actualOutput: transpileError,
        error: transpileError,
      })),
      executionTimeMs: Math.round(endTime - startTime),
    };
  }

  const effectiveEvalType: EvaluationType =
    evaluationType || (entryFunctionName ? "function_return" : targetVariable ? "variable_check" : "stdout");

  const testResults: TestCaseResult[] = [];
  let combinedStdout = "";
  let combinedStderr = "";

  // Instrumentar bucles contra ciclos infinitos
  const instrumentedCode = injectLoopSafeguards(jsCode);

  for (const tc of testCases) {
    const caseType = tc.evaluationType || effectiveEvalType;
    const cout = new CppCout();
    const cin = new CppCin(tc.input || "");

    try {
      if (caseType === "stdout") {
        // Ejecución con evaluación de salida por consola (cout)
        const sandbox = new Function(
          "__cout__",
          "__cin__",
          "CppVector",
          "cppDiv",
          `
          ${getSandboxPrelude()}
          ${instrumentedCode}

          if (typeof main === 'function') {
            main();
          }
        `
        );

        sandbox(cout, cin, CppVector, cppDiv);
        const actualOut = cout.getOutput().trim();
        combinedStdout = actualOut;

        const passed = compareOutputs(actualOut, tc.expectedOutput.trim());
        testResults.push({
          id: tc.id,
          passed,
          input: tc.input || "",
          expectedOutput: tc.expectedOutput,
          actualOutput: actualOut !== "" ? actualOut : "(sin salida por consola)",
        });
      } else if (caseType === "function_return") {
        // Ejecución funcional con llamada directa a entryFunctionName
        const targetFn = entryFunctionName || "solucion";
        const sandbox = new Function(
          "__cout__",
          "__cin__",
          "CppVector",
          "cppDiv",
          `
          ${getSandboxPrelude()}
          ${instrumentedCode}

          if (typeof ${targetFn} !== 'function') {
            throw new Error("La función '${targetFn}' no está declarada en tu código.");
          }

          return ${targetFn}(${tc.input || ""});
        `
        );

        const actualVal = sandbox(cout, cin, CppVector, cppDiv);
        const actualStr = formatCppValue(actualVal);
        const passed = compareOutputs(actualStr, tc.expectedOutput.trim());

        testResults.push({
          id: tc.id,
          passed,
          input: tc.input || "",
          expectedOutput: tc.expectedOutput,
          actualOutput: actualStr,
        });
      } else {
        // variable_check
        const targetVar = tc.targetVariable || targetVariable || tc.input;
        const varInstrumented = instrumentedCode.replace(
          new RegExp(`\\blet\\s+${targetVar}\\b`),
          targetVar
        );

        const sandbox = new Function(
          "__cout__",
          "__cin__",
          "CppVector",
          "cppDiv",
          `
          ${getSandboxPrelude()}
          let ${targetVar};
          ${varInstrumented}

          if (typeof main === 'function') {
            main();
          }

          if (typeof ${targetVar} === 'undefined') {
            throw new Error("La variable '${targetVar}' no existe en el programa.");
          }

          return ${targetVar};
        `
        );

        const actualVal = sandbox(cout, cin, CppVector, cppDiv);
        const actualStr = formatCppValue(actualVal);
        const passed = compareOutputs(actualStr, tc.expectedOutput.trim());

        testResults.push({
          id: tc.id,
          passed,
          input: `variable '${targetVar}'`,
          expectedOutput: tc.expectedOutput,
          actualOutput: actualStr,
        });
      }
    } catch (caseErr: any) {
      combinedStderr += `\n[Error ${tc.id}]: ${caseErr?.message || caseErr}`;
      testResults.push({
        id: tc.id,
        passed: false,
        input: tc.input || "",
        expectedOutput: tc.expectedOutput,
        actualOutput: `Error: ${caseErr?.message || caseErr}`,
        error: String(caseErr),
      });
    }
  }

  const endTime = performance.now();
  return {
    stdout: combinedStdout,
    stderr: combinedStderr.trim(),
    testResults,
    diagnostics,
    executionTimeMs: Math.round(endTime - startTime),
  };
}

function compareOutputs(actual: string, expected: string): boolean {
  if (actual === expected) return true;

  const actualTrim = actual.trim();
  const expectedTrim = expected.trim();

  // Si la salida real está vacía pero se esperaba contenido, no es correcto (evita falso auto-pass con '0')
  if (actualTrim === "" && expectedTrim !== "") {
    return false;
  }
  if (actualTrim !== "" && expectedTrim === "") {
    return false;
  }

  // Comparación numérica si aplica
  const numActual = Number(actualTrim);
  const numExpected = Number(expectedTrim);
  if (!isNaN(numActual) && !isNaN(numExpected)) {
    return Math.abs(numActual - numExpected) < 1e-6;
  }

  // Comparación normalizando espacios al final de cada línea
  const normActual = actual
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .join("\n");
  const normExpected = expected
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .join("\n");

  return normActual === normExpected;
}

function formatCppValue(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (val instanceof CppVector || Array.isArray(val)) {
    return `[${val.join(", ")}]`;
  }
  return String(val);
}
