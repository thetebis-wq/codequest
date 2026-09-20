"use client";

import Editor, { OnMount } from "@monaco-editor/react";

interface MonacoCodeEditorProps {
  language: "python" | "cpp";
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
}

export default function MonacoCodeEditor({
  language,
  value,
  onChange,
  height = "100%",
  readOnly = false,
}: MonacoCodeEditorProps) {
  const handleEditorMount: OnMount = (editor, monaco) => {
    // Definición del tema personalizado DevLab Precision
    monaco.editor.defineTheme("devlab-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "757575", fontStyle: "italic" },
        { token: "keyword", foreground: "dab9ff", fontStyle: "bold" },
        { token: "string", foreground: "adc7ff" },
        { token: "number", foreground: "ffb691" },
        { token: "type", foreground: "adc7ff", fontStyle: "bold" },
        { token: "function", foreground: "ffffff" },
        { token: "identifier", foreground: "e5e2e1" },
      ],
      colors: {
        "editor.background": "#161616",
        "editor.foreground": "#e5e2e1",
        "editor.lineHighlightBackground": "#201f1f",
        "editorCursor.foreground": "#adc7ff",
        "editorWhitespace.foreground": "#353534",
        "editorIndentGuide.background": "#2a2a2a",
        "editorIndentGuide.activeBackground": "#414754",
        "editorLineNumber.foreground": "#555555",
        "editorLineNumber.activeForeground": "#adc7ff",
        "editorGutter.background": "#161616",
      },
    });

    monaco.editor.setTheme("devlab-dark");
  };

  return (
    <div className="w-full h-full overflow-hidden bg-[#161616]">
      <Editor
        height={height}
        language={language === "cpp" ? "cpp" : "python"}
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          readOnly,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          lineHeight: 21,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          folding: true,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 },
          lineNumbersMinChars: 3,
        }}
        loading={
          <div className="flex items-center justify-center h-full text-xs text-text-muted font-mono">
            <span>Cargando editor de código...</span>
          </div>
        }
      />
    </div>
  );
}
