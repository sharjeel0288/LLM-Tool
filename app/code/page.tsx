"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopyToast } from "@/hooks/useToast";
import { QuickTools } from "@/components/QuickTools";
import { Copy, Code, Minus, CheckCircle2, XCircle, FileCode, Brackets, Terminal, Sparkles } from "lucide-react";

const quickTools = [
  { name: "JSON Formatter", href: "#json", icon: <FileCode className="w-5 h-5" />, description: "Format JSON" },
  { name: "Code Minifier", href: "#minifier", icon: <Minus className="w-5 h-5" />, description: "Minify code" },
  { name: "Code Beautifier", href: "#beautifier", icon: <Sparkles className="w-5 h-5" />, description: "Beautify code" },
  { name: "JSON Validator", href: "#validator", icon: <CheckCircle2 className="w-5 h-5" />, description: "Validate JSON" },
  { name: "XML Formatter", href: "#xml", icon: <Brackets className="w-5 h-5" />, description: "Format XML" },
  { name: "SQL Formatter", href: "#sql", icon: <Terminal className="w-5 h-5" />, description: "Format SQL" },
  { name: "Code Diff", href: "#diff", icon: <Code className="w-5 h-5" />, description: "Compare code" },
];

export default function CodeToolsPage() {
  const { copyWithToast } = useCopyToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold">
              Code Tools
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Code Tools
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
            Code formatters, minifiers, validators, and generators
          </p>
        </div>

        <QuickTools tools={quickTools} title="Quick Access" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="json" className="scroll-mt-8">
            <JSONFormatterTool copyWithToast={copyWithToast} />
          </div>
          <div id="minifier" className="scroll-mt-8">
            <CodeMinifierTool copyWithToast={copyWithToast} />
          </div>
          <div id="beautifier" className="scroll-mt-8">
            <CodeBeautifierTool copyWithToast={copyWithToast} />
          </div>
          <div id="validator" className="scroll-mt-8">
            <JSONValidatorTool />
          </div>
          <div id="xml" className="scroll-mt-8">
            <XMLFormatterTool copyWithToast={copyWithToast} />
          </div>
          <div id="sql" className="scroll-mt-8">
            <SQLFormatterTool copyWithToast={copyWithToast} />
          </div>
          <div id="diff" className="scroll-mt-8">
            <CodeDiffTool />
          </div>
          <SyntaxHighlighterTool />
        </div>
      </div>
    </div>
  );
}

// JSON Formatter
function JSONFormatterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">JSON Formatter & Validator</CardTitle>
        </div>
        <CardDescription className="text-sm">Format, validate, and minify JSON data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={formatJSON}>Format</Button>
          <Button onClick={minifyJSON} variant="outline">Minify</Button>
        </div>
        <Textarea
          placeholder="Paste JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {output && (
          <>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono"
            />
            <Button onClick={() => copyWithToast(output, "JSON")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Code Minifier
function CodeMinifierTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [type, setType] = useState<"html" | "css" | "js">("js");

  const minify = () => {
    let result = input;
    if (type === "js") {
      result = result
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .replace(/\s+/g, " ")
        .replace(/;\s*}/g, "}")
        .trim();
    } else if (type === "css") {
      result = result
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/\s*:\s*/g, ":")
        .replace(/\s*;\s*/g, ";")
        .trim();
    } else if (type === "html") {
      result = result
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .trim();
    }
    setOutput(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Minus className="w-5 h-5" />
          Code Minifier
        </CardTitle>
        <CardDescription>Minify HTML, CSS, or JavaScript code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={type} onValueChange={(v: any) => setType(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder={`Paste your ${type.toUpperCase()} code here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        <Button onClick={minify}>Minify</Button>
        {output && (
          <>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono"
            />
            <div className="text-sm text-muted-foreground">
              Size: {input.length} → {output.length} bytes ({(100 - (output.length / input.length) * 100).toFixed(1)}% reduction)
            </div>
            <Button onClick={() => copyWithToast(output, "Minified code")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Code Beautifier
function CodeBeautifierTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [type, setType] = useState<"js" | "css" | "html">("js");

  const beautify = () => {
    let result = input;
    if (type === "js") {
      // Simple JS beautification
      result = result
        .replace(/;/g, ";\n")
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}\n")
        .replace(/\n\s*\n/g, "\n")
        .split("\n")
        .map(line => {
          let indent = 0;
          if (line.includes("{")) indent++;
          if (line.includes("}")) indent--;
          return "  ".repeat(indent) + line.trim();
        })
        .join("\n");
    } else if (type === "css") {
      result = result
        .replace(/\{/g, " {\n  ")
        .replace(/\}/g, "\n}\n")
        .replace(/;/g, ";\n  ")
        .replace(/\n\s*\n/g, "\n");
    } else if (type === "html") {
      result = result
        .replace(/>/g, ">\n")
        .replace(/</g, "\n<")
        .replace(/\n\s*\n/g, "\n")
        .split("\n")
        .map(line => line.trim())
        .filter(line => line)
        .join("\n");
    }
    setOutput(result);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-xl">Code Beautifier</CardTitle>
        </div>
        <CardDescription className="text-sm">Format and beautify code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={type} onValueChange={(v: any) => setType(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder={`Paste your ${type.toUpperCase()} code here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        <Button onClick={beautify}>Beautify</Button>
        {output && (
          <>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono"
            />
            <Button onClick={() => copyWithToast(output, "Beautified code")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// JSON Validator
function JSONValidatorTool() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const validate = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
    } catch (e: any) {
      setIsValid(false);
      setError(e.message);
    }
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-xl">JSON Validator</CardTitle>
        </div>
        <CardDescription className="text-sm">Validate JSON syntax</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste JSON to validate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        <Button onClick={validate}>Validate</Button>
        {isValid !== null && (
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            isValid ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
          }`}>
            {isValid ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-semibold">Valid JSON</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <span className="text-red-600 font-semibold">Invalid JSON</span>
                  {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// XML Formatter
function XMLFormatterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatXML = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "text/xml");
      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(xmlDoc);
      
      // Simple indentation
      let indent = 0;
      formatted = formatted.split(">").map((tag, i, arr) => {
        if (i === arr.length - 1) return tag;
        let result = "";
        if (tag.includes("</")) indent--;
        result = "  ".repeat(Math.max(0, indent)) + tag + ">";
        if (!tag.includes("</") && !tag.includes("/>") && tag.trim()) indent++;
        return result;
      }).join("\n");
      
      setOutput(formatted);
    } catch (e) {
      setOutput("Error: Invalid XML");
    }
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Brackets className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-xl">XML Formatter</CardTitle>
        </div>
        <CardDescription className="text-sm">Format and prettify XML</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste XML here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        <Button onClick={formatXML}>Format XML</Button>
        {output && (
          <>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono"
            />
            <Button onClick={() => copyWithToast(output, "XML")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// SQL Formatter
function SQLFormatterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatSQL = () => {
    let formatted = input
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ", ")
      .replace(/\s*\(\s*/g, " (")
      .replace(/\s*\)\s*/g, ") ")
      .replace(/\s*SELECT\s+/gi, "\nSELECT ")
      .replace(/\s*FROM\s+/gi, "\nFROM ")
      .replace(/\s*WHERE\s+/gi, "\nWHERE ")
      .replace(/\s*JOIN\s+/gi, "\nJOIN ")
      .replace(/\s*INNER\s+JOIN\s+/gi, "\nINNER JOIN ")
      .replace(/\s*LEFT\s+JOIN\s+/gi, "\nLEFT JOIN ")
      .replace(/\s*RIGHT\s+JOIN\s+/gi, "\nRIGHT JOIN ")
      .replace(/\s*GROUP\s+BY\s+/gi, "\nGROUP BY ")
      .replace(/\s*ORDER\s+BY\s+/gi, "\nORDER BY ")
      .replace(/\s*HAVING\s+/gi, "\nHAVING ")
      .trim();
    
    setOutput(formatted);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          SQL Formatter
        </CardTitle>
        <CardDescription>Format SQL queries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="SELECT * FROM users WHERE id=1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        <Button onClick={formatSQL}>Format SQL</Button>
        {output && (
          <>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono"
            />
            <Button onClick={() => copyWithToast(output, "SQL")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Code Diff Tool
function CodeDiffTool() {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");

  const diff = (() => {
    const lines1 = code1.split("\n");
    const lines2 = code2.split("\n");
    const maxLen = Math.max(lines1.length, lines2.length);
    const diffLines: Array<{ type: "same" | "add" | "remove" | "modify"; line: string }> = [];
    
    for (let i = 0; i < maxLen; i++) {
      if (i >= lines1.length) {
        diffLines.push({ type: "add", line: lines2[i] });
      } else if (i >= lines2.length) {
        diffLines.push({ type: "remove", line: lines1[i] });
      } else if (lines1[i] === lines2[i]) {
        diffLines.push({ type: "same", line: lines1[i] });
      } else {
        diffLines.push({ type: "remove", line: lines1[i] });
        diffLines.push({ type: "add", line: lines2[i] });
      }
    }
    
    return diffLines;
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Diff</CardTitle>
        <CardDescription>Compare two code snippets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Code 1</Label>
            <Textarea
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              className="min-h-[200px] font-mono"
              placeholder="Original code..."
            />
          </div>
          <div>
            <Label>Code 2</Label>
            <Textarea
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              className="min-h-[200px] font-mono"
              placeholder="Modified code..."
            />
          </div>
        </div>
        {code1 && code2 && (
          <div className="p-4 bg-muted rounded-lg font-mono text-sm">
            {diff.map((item, i) => (
              <div
                key={i}
                className={`${
                  item.type === "add"
                    ? "bg-green-200 dark:bg-green-900"
                    : item.type === "remove"
                    ? "bg-red-200 dark:bg-red-900"
                    : ""
                }`}
              >
                {item.type === "add" && "+ "}
                {item.type === "remove" && "- "}
                {item.type === "same" && "  "}
                {item.line}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Syntax Highlighter (Simple)
function SyntaxHighlighterTool() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"js" | "ts" | "py" | "html" | "css">("js");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Preview</CardTitle>
        <CardDescription>Preview code with syntax highlighting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={language} onValueChange={(v: any) => setLanguage(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="ts">TypeScript</SelectItem>
            <SelectItem value="py">Python</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder={`Enter ${language.toUpperCase()} code...`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[300px] font-mono"
        />
        {code && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">Preview ({language})</div>
            <pre className="text-sm font-mono overflow-auto">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

