export interface DiagnosticItem {
  line: number;
  column?: number;
  severity: "error" | "warning" | "info";
  code: string;
  message: string;
  suggestion?: string;
}

/**
 * Analizador estático de diagnósticos pedagógicos para estudiantes principiantes.
 * Genera explicaciones claras, amables y constructivas en español sobre errores comunes
 * de sintaxis y convención en Python 3.12 y C++ 20.
 */
export function analyzeDiagnostics(code: string, language: "python" | "cpp"): DiagnosticItem[] {
  if (!code || code.trim().length === 0) {
    return [
      {
        line: 1,
        severity: "warning",
        code: "empty-code",
        message: "El editor está vacío.",
        suggestion: "Escribe tu código siguiendo las instrucciones del ejercicio.",
      },
    ];
  }

  if (language === "python") {
    return analyzePythonDiagnostics(code);
  } else {
    return analyzeCppDiagnostics(code);
  }
}

// ---------------------------------------------------------------------------
// Reglas y análisis para Python 3.12
// ---------------------------------------------------------------------------

function analyzePythonDiagnostics(code: string): DiagnosticItem[] {
  const diagnostics: DiagnosticItem[] = [];
  const lines = code.split(/\r?\n/);

  // 1. Balance de delimitadores (paréntesis, corchetes, llaves)
  const delimiterStack: Array<{ char: string; line: number; col: number }> = [];
  let inMultilineString: null | "'''" | '"""' = null;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx];
    const lineNum = lineIdx + 1;
    let i = 0;

    while (i < rawLine.length) {
      // Manejo de cadenas multilínea
      if (!inMultilineString) {
        if (rawLine.startsWith('"""', i)) {
          inMultilineString = '"""';
          i += 3;
          continue;
        }
        if (rawLine.startsWith("'''", i)) {
          inMultilineString = "'''";
          i += 3;
          continue;
        }
      } else {
        if (rawLine.startsWith(inMultilineString, i)) {
          inMultilineString = null;
          i += 3;
          continue;
        }
        i++;
        continue;
      }

      const ch = rawLine[i];

      // Ignorar comentarios de línea
      if (ch === "#") {
        break;
      }

      // Ignorar cadenas normales de una línea
      if (ch === '"' || ch === "'") {
        const quote = ch;
        i++;
        while (i < rawLine.length && rawLine[i] !== quote) {
          if (rawLine[i] === "\\") i++; // escape
          i++;
        }
        i++; // saltar comilla de cierre
        continue;
      }

      if (ch === "(" || ch === "[" || ch === "{") {
        delimiterStack.push({ char: ch, line: lineNum, col: i + 1 });
      } else if (ch === ")" || ch === "]" || ch === "}") {
        if (delimiterStack.length === 0) {
          diagnostics.push({
            line: lineNum,
            column: i + 1,
            severity: "error",
            code: "unexpected-delimiter",
            message: `Delimitador de cierre '${ch}' inesperado sin apertura previa.`,
            suggestion: `Verifica si falta abrir '${getMatchingOpen(ch)}' antes de esta línea.`,
          });
        } else {
          const last = delimiterStack.pop()!;
          if (!isMatchingPair(last.char, ch)) {
            diagnostics.push({
              line: lineNum,
              column: i + 1,
              severity: "error",
              code: "mismatched-delimiter",
              message: `Se abrió '${last.char}' en la línea ${last.line} pero se cerró con '${ch}'.`,
              suggestion: `Reemplaza '${ch}' con '${getMatchingClose(last.char)}' para coincidir con la apertura.`,
            });
          }
        }
      }

      i++;
    }
  }

  // Delimitadores no cerrados al final
  while (delimiterStack.length > 0) {
    const unclosed = delimiterStack.pop()!;
    diagnostics.push({
      line: unclosed.line,
      column: unclosed.col,
      severity: "error",
      code: "unclosed-delimiter",
      message: `El delimitador '${unclosed.char}' no fue cerrado.`,
      suggestion: `Asegúrate de agregar '${getMatchingClose(unclosed.char)}' al terminar la expresión.`,
    });
  }

  // 2. Análisis línea por línea
  let prevColonLine = -1;
  let prevColonIndent = -1;
  let prevHeaderKeyword = "";

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx];
    const lineNum = lineIdx + 1;
    const trimmed = rawLine.trim();

    // Líneas vacías o de puro comentario
    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    // Calcular indentación
    const leadingWhitespaceMatch = rawLine.match(/^([ \t]*)/);
    const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[1] : "";
    const hasTabs = leadingWhitespace.includes("\t");
    const hasSpaces = leadingWhitespace.includes(" ");

    if (hasTabs && hasSpaces) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "mixed-tabs-spaces",
        message: "Mezcla de tabulaciones y espacios en la indentación.",
        suggestion: "Configura el editor para usar únicamente 4 espacios para cada nivel de sangría.",
      });
    }

    const currentIndent = leadingWhitespace.replace(/\t/g, "    ").length;

    // Verificar si la línea anterior exigía indentación (terminó en ':')
    if (prevColonLine !== -1) {
      if (currentIndent <= prevColonIndent) {
        diagnostics.push({
          line: lineNum,
          severity: "error",
          code: "expected-indentation-block",
          message: `Se esperaba un bloque indentado (con sangría) después de '${prevHeaderKeyword}' en la línea ${prevColonLine}.`,
          suggestion: `Agrega 4 espacios de sangría al inicio de esta línea para que pertenezca al bloque.`,
        });
      }
      prevColonLine = -1;
    }

    // Quitar comentarios de fin de línea para análisis sintáctico
    const codePart = removePythonCommentsAndStrings(rawLine).trim();
    if (!codePart) continue;

    // A. Falta de dos puntos ':' en sentencias que abren bloques
    const blockHeaderRegex = /^(def\s+[a-zA-Z0-9_]+\s*\(.*?\)|class\s+[a-zA-Z0-9_]+(\(.*?\))?|if\s+.+|elif\s+.+|else|for\s+.+\s+in\s+.+|while\s+.+|try|except(\s+.+)?|finally|with\s+.+)$/;
    if (blockHeaderRegex.test(codePart) && !codePart.endsWith(":")) {
      const kw = codePart.split(/\s+/)[0];
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "missing-colon",
        message: `Falta un ':' al final de la sentencia '${kw}'. En Python, los bloques deben terminar con dos puntos.`,
        suggestion: `Agrega dos puntos ':' al final de la línea ${lineNum}.`,
      });
    }

    // Registrar si esta línea abre un bloque con ':'
    if (codePart.endsWith(":")) {
      const matchKw = codePart.match(/^(def|class|if|elif|else|for|while|try|except|finally|with)\b/);
      if (matchKw) {
        prevColonLine = lineNum;
        prevColonIndent = currentIndent;
        prevHeaderKeyword = matchKw[1];
      }
    }

    // B. Asignación '=' en lugar de '==' dentro de una condición (if, elif, while)
    const conditionMatch = codePart.match(/^(if|elif|while)\s+(.+):?$/);
    if (conditionMatch) {
      const conditionExpr = conditionMatch[2];
      // Buscar '=' solitario (no precedido ni seguido de '=', '!', '<', '>')
      if (/(?<![!=<>])=(?![=])/.test(conditionExpr)) {
        diagnostics.push({
          line: lineNum,
          severity: "error",
          code: "assignment-in-condition",
          message: "Se detectó un solo signo '=' en la condición. En Python, '=' asigna un valor y '==' compara igualdad.",
          suggestion: "Reemplaza '=' por '==' para comparar si los dos valores son iguales.",
        });
      }
    }

    // C. Detección de errores ortográficos comunes (typos) en identificadores clave
    checkPythonTypos(rawLine, lineNum, diagnostics);

    // D. Detección de sintaxis de C/C++/Java en Python
    if (codePart.endsWith(";")) {
      diagnostics.push({
        line: lineNum,
        severity: "info",
        code: "unnecessary-semicolon",
        message: "En Python no es necesario terminar las sentencias con punto y coma ';'.",
        suggestion: "Puedes retirar el ';' al final de la línea.",
      });
    }

    if (/\bint\s+[a-zA-Z0-9_]+\s*=|float\s+[a-zA-Z0-9_]+\s*=|string\s+[a-zA-Z0-9_]+\s*=/.test(codePart)) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "type-annotation-c-style",
        message: "En Python no se declara el tipo de dato antes del nombre de la variable.",
        suggestion: "Escribe directamente el nombre de la variable y asigna su valor (ej: 'edad = 20').",
      });
    }

    if (codePart.includes("&&") || codePart.includes("||")) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "c-logical-operators",
        message: "En Python los operadores lógicos son palabras en inglés, no símbolos.",
        suggestion: "Usa 'and' en lugar de '&&', y 'or' en lugar de '||'.",
      });
    }
  }

  return diagnostics;
}

function checkPythonTypos(line: string, lineNum: number, diagnostics: DiagnosticItem[]): void {
  const cleanLine = stripPythonStringsAndComments(line);
  if (!cleanLine.trim()) return;

  const typoRules: Array<{ regex: RegExp; wrong: string; right: string; explanation: string }> = [
    {
      regex: /\b(pritn|prnt|pint)\s*\(/,
      wrong: "pritn/prnt",
      right: "print",
      explanation: "Parece un error de tipeo en la función 'print()'.",
    },
    {
      regex: /\b(whlie|wihle)\b/,
      wrong: "whlie/wihle",
      right: "while",
      explanation: "La palabra clave para bucles condicionales se escribe 'while'.",
    },
    {
      regex: /\b(flase|fals)\b/i,
      wrong: "flase/fals",
      right: "False",
      explanation: "En Python el valor booleano falso se escribe con mayúscula inicial: 'False'.",
    },
    {
      regex: /\bfalse\b/,
      wrong: "false",
      right: "False",
      explanation: "En Python los valores booleanos inician con mayúscula: usa 'False', no 'false'.",
    },
    {
      regex: /\b(ture|tru)\b/i,
      wrong: "ture/tru",
      right: "True",
      explanation: "En Python el valor booleano verdadero se escribe con mayúscula inicial: 'True'.",
    },
    {
      regex: /\btrue\b/,
      wrong: "true",
      right: "True",
      explanation: "En Python los valores booleanos inician con mayúscula: usa 'True', no 'true'.",
    },
    {
      regex: /\b(null|none)\b/,
      wrong: "null/none",
      right: "None",
      explanation: "En Python la ausencia de valor se representa con 'None' (con mayúscula inicial).",
    },
    {
      regex: /\b(retrun|retun)\b/,
      wrong: "retrun/retun",
      right: "return",
      explanation: "La instrucción para devolver un resultado desde una función es 'return'.",
    },
    {
      regex: /\b(improt|mport)\b/,
      wrong: "improt/mport",
      right: "import",
      explanation: "La directiva para cargar librerías se escribe 'import'.",
    },
    {
      regex: /\b(lenght|legnth)\s*\(/,
      wrong: "lenght/legnth",
      right: "len",
      explanation: "Para calcular el tamaño de una colección en Python se usa la función 'len()'.",
    },
    {
      regex: /\b(elsif|elseif)\b/,
      wrong: "elsif/elseif",
      right: "elif",
      explanation: "En Python la condición secundaria se escribe 'elif', no 'elseif' ni 'elsif'.",
    },
  ];

  for (const rule of typoRules) {
    if (rule.regex.test(cleanLine)) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "common-typo",
        message: rule.explanation,
        suggestion: `Cambia a '${rule.right}'.`,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Reglas y análisis para C++ 20
// ---------------------------------------------------------------------------

function analyzeCppDiagnostics(code: string): DiagnosticItem[] {
  const diagnostics: DiagnosticItem[] = [];
  const lines = code.split(/\r?\n/);

  // 1. Balance de llaves {} y paréntesis ()
  const braceStack: Array<{ char: string; line: number; col: number }> = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx];
    const lineNum = lineIdx + 1;
    let i = 0;

    while (i < rawLine.length) {
      // Ignorar comentarios de una línea //
      if (rawLine.startsWith("//", i)) {
        break;
      }
      // Ignorar literales de cadena ""
      if (rawLine[i] === '"') {
        i++;
        while (i < rawLine.length && rawLine[i] !== '"') {
          if (rawLine[i] === "\\") i++;
          i++;
        }
        i++;
        continue;
      }
      // Ignorar literales de char ''
      if (rawLine[i] === "'") {
        i++;
        while (i < rawLine.length && rawLine[i] !== "'") {
          if (rawLine[i] === "\\") i++;
          i++;
        }
        i++;
        continue;
      }

      const ch = rawLine[i];
      if (ch === "{" || ch === "(" || ch === "[") {
        braceStack.push({ char: ch, line: lineNum, col: i + 1 });
      } else if (ch === "}" || ch === ")" || ch === "]") {
        if (braceStack.length === 0) {
          diagnostics.push({
            line: lineNum,
            column: i + 1,
            severity: "error",
            code: "unexpected-closing-brace",
            message: `El carácter de cierre '${ch}' no tiene una apertura correspondiente.`,
            suggestion: `Revisa la estructura de bloques o elimina este '${ch}' sobrante.`,
          });
        } else {
          const last = braceStack.pop()!;
          if (!isMatchingPair(last.char, ch)) {
            diagnostics.push({
              line: lineNum,
              column: i + 1,
              severity: "error",
              code: "mismatched-brace",
              message: `Se abrió '${last.char}' en la línea ${last.line} pero se cerró con '${ch}'.`,
              suggestion: `Reemplaza '${ch}' por '${getMatchingClose(last.char)}'.`,
            });
          }
        }
      }
      i++;
    }
  }

  while (braceStack.length > 0) {
    const unclosed = braceStack.pop()!;
    diagnostics.push({
      line: unclosed.line,
      column: unclosed.col,
      severity: "error",
      code: "unclosed-brace",
      message: `El bloque abierto con '${unclosed.char}' en la línea ${unclosed.line} no está cerrado.`,
      suggestion: `Agrega '${getMatchingClose(unclosed.char)}' al final de la función o bloque.`,
    });
  }

  // 2. Comprobación global de librerías y namespace
  const hasIncludeIostream = /#include\s*<iostream>/.test(code);
  const hasIncludeVector = /#include\s*<vector>/.test(code);
  const hasIncludeString = /#include\s*<string>/.test(code);
  const hasIncludeCmath = /#include\s*<cmath>/.test(code);
  const hasUsingNamespaceStd = /using\s+namespace\s+std\s*;/.test(code);
  const hasMainFunction = /(int|void)\s+main\s*\(/.test(code);

  const cleanCodeNoComments = removeCppCommentsAndStrings(code);

  // A. Uso de cout/cin sin <iostream>
  if (/\b(cout|cin|endl)\b/.test(cleanCodeNoComments) && !hasIncludeIostream) {
    diagnostics.push({
      line: 1,
      severity: "error",
      code: "missing-include-iostream",
      message: "Estás usando flujos de consola ('cout' / 'cin' / 'endl') pero falta '#include <iostream>'.",
      suggestion: "Agrega '#include <iostream>' en la primera línea de tu programa.",
    });
  }

  // B. Uso de cout/cin/endl/string/vector sin prefijo std:: ni using namespace std;
  if (!hasUsingNamespaceStd) {
    const codeWithoutIncludes = cleanCodeNoComments.replace(/#include\s*<[^>]+>/g, "");
    const missingStdTokens = ["cout", "cin", "endl", "string", "vector"];
    for (const token of missingStdTokens) {
      const regex = new RegExp(`(?<!std::)\\b${token}\\b`);
      if (regex.test(codeWithoutIncludes)) {
        diagnostics.push({
          line: findFirstLineWithRegex(lines, regex),
          severity: "error",
          code: "missing-std-prefix",
          message: `'${token}' pertenece al espacio de nombres estándar. Falta el prefijo 'std::' o 'using namespace std;'.`,
          suggestion: `Escribe 'std::${token}' o declara 'using namespace std;' después de tus #include.`,
        });
        break; // Evitar saturar con 5 avisos idénticos
      }
    }
  }

  // C. Uso de vector sin <vector>
  if (/\b(std::)?vector\s*<.+>/.test(cleanCodeNoComments) && !hasIncludeVector) {
    diagnostics.push({
      line: 1,
      severity: "error",
      code: "missing-include-vector",
      message: "Estás usando 'std::vector' pero falta la librería '#include <vector>'.",
      suggestion: "Agrega '#include <vector>' al inicio del archivo.",
    });
  }

  // D. Falta de función principal main() si no es ejercicio puramente funcional
  if (!hasMainFunction && !/\b(int|double|void|bool|string|std::string)\s+[a-zA-Z0-9_]+\s*\(/.test(cleanCodeNoComments)) {
    diagnostics.push({
      line: 1,
      severity: "warning",
      code: "missing-main-function",
      message: "No se encontró la función principal 'int main()'. En C++, todo programa ejecutable inicia en main.",
      suggestion: "Define tu código dentro de: int main() { ... return 0; }",
    });
  }

  // 3. Inspección línea a línea para C++
  let inBlockComment = false;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx];
    const lineNum = lineIdx + 1;

    let codePart = rawLine;

    // Manejo de comentario de bloque multilínea abierto previamente
    if (inBlockComment) {
      const endIdx = codePart.indexOf("*/");
      if (endIdx !== -1) {
        inBlockComment = false;
        codePart = codePart.substring(endIdx + 2);
      } else {
        continue;
      }
    }

    // Procesar comentarios de bloque que inicien en esta línea
    while (codePart.includes("/*")) {
      const startIdx = codePart.indexOf("/*");
      const endIdx = codePart.indexOf("*/", startIdx + 2);
      if (endIdx !== -1) {
        codePart = codePart.substring(0, startIdx) + " " + codePart.substring(endIdx + 2);
      } else {
        inBlockComment = true;
        codePart = codePart.substring(0, startIdx);
        break;
      }
    }

    // Quitar comentarios de una línea '//' (respetando cadenas)
    codePart = stripCppInlineComment(codePart);

    const trimmed = codePart.trim();
    if (trimmed.length === 0) {
      continue;
    }

    // Directivas del preprocesador no llevan punto y coma
    if (trimmed.startsWith("#")) {
      continue;
    }

    // Detección de sintaxis Python en C++
    if (/^\s*def\s+[a-zA-Z0-9_]+/.test(trimmed)) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "python-def-in-cpp",
        message: "En C++ las funciones no se declaran con 'def'. Debes indicar el tipo de dato que retornan (ej: 'int' o 'void').",
        suggestion: "Reemplaza 'def' por el tipo de retorno correspondiente (ej: 'int miFuncion(...)').",
      });
    }

    if (/^\s*print\s*\(/.test(trimmed)) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "python-print-in-cpp",
        message: "En C++ no existe la función 'print()'. La salida por consola se hace con 'std::cout << ... << std::endl;'.",
        suggestion: "Reemplaza 'print(...)' por 'std::cout << ... << std::endl;'.",
      });
    }

    // Detección de comillas simples para strings largos
    // En C++, los caracteres literales válidos son 'c' o secuencias de escape '\n', '\t', '\0', '\\', '\'', etc.
    // Reemplazar secuencias válidas de char para no señalarlas erróneamente:
    const withoutValidChars = codePart.replace(/'(\\.|[^'\\])'/g, "''");
    const singleQuoteStringMatch = withoutValidChars.match(/'([^']{2,})'/);
    if (singleQuoteStringMatch) {
      diagnostics.push({
        line: lineNum,
        severity: "error",
        code: "single-quote-string-cpp",
        message: "En C++, las comillas simples '' son exclusivamente para un solo carácter ('a'). Para texto debes usar comillas dobles \"\".",
        suggestion: `Reemplaza '${singleQuoteStringMatch[0]}' por "${singleQuoteStringMatch[1]}".`,
      });
    }

    // Detección de '=' en condiciones 'if (x = 5)'
    const ifConditionMatch = codePart.match(/\bif\s*\((.+)\)/);
    if (ifConditionMatch) {
      const cond = ifConditionMatch[1];
      if (/(?<![!=<>])=(?![=])/.test(cond)) {
        diagnostics.push({
          line: lineNum,
          severity: "error",
          code: "assignment-in-cpp-condition",
          message: "Se detectó un '=' solitario en la condición. En C++, esto asigna un nuevo valor en vez de comparar.",
          suggestion: "Usa '==' para comprobar igualdad.",
        });
      }
    }

    // Falta de punto y coma ';' al final de sentencias comunes
    const cleanLine = removeCppCommentsAndStrings(codePart).trim();
    if (shouldEndWithSemicolon(cleanLine, lines, lineIdx)) {
      if (!cleanLine.endsWith(";")) {
        diagnostics.push({
          line: lineNum,
          severity: "error",
          code: "missing-semicolon",
          message: "Falta un punto y coma ';' al final de esta instrucción.",
          suggestion: "Agrega ';' al final de la línea.",
        });
      }
    }
  }

  return diagnostics;
}

// ---------------------------------------------------------------------------
// Funciones auxiliares de análisis
// ---------------------------------------------------------------------------

function isMatchingPair(open: string, close: string): boolean {
  return (
    (open === "(" && close === ")") ||
    (open === "[" && close === "]") ||
    (open === "{" && close === "}")
  );
}

function getMatchingOpen(close: string): string {
  if (close === ")") return "(";
  if (close === "]") return "[";
  if (close === "}") return "{";
  return "";
}

function getMatchingClose(open: string): string {
  if (open === "(") return ")";
  if (open === "[") return "]";
  if (open === "{") return "}";
  return "";
}

function stripPythonStringsAndComments(line: string): string {
  let result = "";
  let i = 0;
  while (i < line.length) {
    if (line[i] === "#") {
      break;
    }
    if (line.startsWith('"""', i) || line.startsWith("'''", i)) {
      const q = line.substring(i, i + 3);
      i += 3;
      while (i < line.length && !line.startsWith(q, i)) {
        if (line[i] === "\\") i++;
        i++;
      }
      i += 3;
      result += " ";
      continue;
    }
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i];
      i++;
      while (i < line.length && line[i] !== q) {
        if (line[i] === "\\") i++;
        i++;
      }
      i++;
      result += " ";
      continue;
    }
    result += line[i++];
  }
  return result;
}

function stripCppInlineComment(code: string): string {
  let result = "";
  let i = 0;
  while (i < code.length) {
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      result += q;
      i++;
      while (i < code.length && code[i] !== q) {
        if (code[i] === "\\") {
          result += code[i++];
        }
        if (i < code.length) result += code[i++];
      }
      if (i < code.length) result += code[i++];
      continue;
    }
    if (code.startsWith("//", i)) {
      break;
    }
    result += code[i++];
  }
  return result;
}

function removePythonCommentsAndStrings(code: string): string {
  // Quita comentarios de Python manteniendo la longitud relativa
  return code.replace(/#.*$/, "");
}

function removeCppCommentsAndStrings(code: string): string {
  let result = "";
  let i = 0;
  while (i < code.length) {
    if (code.startsWith("//", i)) {
      while (i < code.length && code[i] !== "\n") i++;
      continue;
    }
    if (code.startsWith("/*", i)) {
      i += 2;
      while (i < code.length && !code.startsWith("*/", i)) i++;
      i += 2;
      continue;
    }
    if (code[i] === '"') {
      result += '"';
      i++;
      while (i < code.length && code[i] !== '"') {
        if (code[i] === "\\") i++;
        i++;
      }
      result += '"';
      i++;
      continue;
    }
    result += code[i];
    i++;
  }
  return result;
}

function shouldEndWithSemicolon(line: string, allLines?: string[], currentLineIdx?: number): boolean {
  if (!line || line.length === 0) return false;
  if (line.endsWith("{") || line.endsWith("}") || line.endsWith(":")) return false;
  if (line.startsWith("#")) return false;

  // Sentencias de control sin bloque no terminan en ';' inmediatamente
  if (/^(if|else|for|while|switch)\s*\(/.test(line) && !line.startsWith("do")) {
    return false;
  }
  if (/^(else|do)\b/.test(line)) {
    return false;
  }

  // Si la línea es una firma de función (ej. 'int main()', 'void saludar(string s)'):
  // no requiere punto y coma si abre su bloque en esta o la siguiente línea (Allman style)
  if (/^[a-zA-Z0-9_:*&<>]+\s+[a-zA-Z0-9_]+\s*\(.*?\)\s*$/.test(line)) {
    if (allLines && currentLineIdx !== undefined) {
      for (let j = currentLineIdx + 1; j < allLines.length; j++) {
        const next = allLines[j].trim();
        if (next.length === 0 || next.startsWith("//") || next.startsWith("/*") || next.startsWith("*")) {
          continue;
        }
        if (next.startsWith("{")) {
          return false;
        }
        break;
      }
    } else {
      return false;
    }
  }

  // Sentencias que típicamente deben terminar en ';':
  // Declaraciones, asignaciones, llamadas, retornos, cout, cin
  const requiresSemicolonPatterns = [
    /\breturn\b/,
    /\b(cout|cin|std::cout|std::cin)\s*<<|>>/,
    /^(int|double|float|char|bool|string|std::string|auto|long)\s+[a-zA-Z0-9_]+/,
    /\b(push_back|pop_back|insert|clear)\s*\(.*\)/,
    /^[a-zA-Z0-9_]+\s*(\+\+|--|\+=|-=|\*=|\/=|%=|=)/,
  ];

  return requiresSemicolonPatterns.some((p) => p.test(line));
}

function findFirstLineWithRegex(lines: string[], regex: RegExp): number {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("#include")) continue;
    if (regex.test(lines[i])) {
      return i + 1;
    }
  }
  return 1;
}
