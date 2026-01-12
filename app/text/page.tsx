"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopyToast } from "@/hooks/useToast";
import { QuickTools } from "@/components/QuickTools";
import { Copy, FileText, Code, GitCompare, Search, Type, FileSpreadsheet, Image, Link as LinkIcon, Hash, Layers } from "lucide-react";
import CryptoJS from "crypto-js";
import { diffWords } from "diff";
import ReactMarkdown from "react-markdown";

const quickTools = [
  { name: "Text Analysis", href: "#text-analysis", icon: <FileText className="w-5 h-5" />, description: "Word count & stats" },
  { name: "JSON Formatter", href: "#json-formatter", icon: <Code className="w-5 h-5" />, description: "Format & validate" },
  { name: "Case Converter", href: "#case-converter", icon: <Type className="w-5 h-5" />, description: "Change text case" },
  { name: "Text Diff", href: "#text-diff", icon: <GitCompare className="w-5 h-5" />, description: "Compare texts" },
  { name: "Regex Tester", href: "#regex", icon: <Search className="w-5 h-5" />, description: "Test patterns" },
  { name: "Base64", href: "#base64", icon: <Layers className="w-5 h-5" />, description: "Encode/decode" },
  { name: "Hash Generator", href: "#hash", icon: <Hash className="w-5 h-5" />, description: "MD5, SHA256..." },
  { name: "CSV to JSON", href: "#csv", icon: <FileSpreadsheet className="w-5 h-5" />, description: "Convert format" },
];

export default function TextToolsPage() {
  const { copyWithToast } = useCopyToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
              Text Tools
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Text Tools
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
            Text analysis, formatting, encoding, validation, and manipulation tools
          </p>
        </div>

        <QuickTools tools={quickTools} title="Quick Access" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="text-analysis" className="scroll-mt-8">
            <TextAnalysisTool />
          </div>
          <TextStatsTool />
          <div id="json-formatter" className="scroll-mt-8">
            <JSONFormatterTool copyWithToast={copyWithToast} />
          </div>
          <div id="case-converter" className="scroll-mt-8">
            <CaseConverterTool copyWithToast={copyWithToast} />
          </div>
          <div id="text-diff" className="scroll-mt-8">
            <DiffTool />
          </div>
          <div id="regex" className="scroll-mt-8">
            <RegexTool />
          </div>
          <MarkdownTool />
          <div id="csv" className="scroll-mt-8">
            <CSVTool copyWithToast={copyWithToast} />
          </div>
          <div id="base64" className="scroll-mt-8">
            <Base64Tool copyWithToast={copyWithToast} />
          </div>
          <div id="hash" className="scroll-mt-8">
            <HashTool copyWithToast={copyWithToast} />
          </div>
          <URLParserTool />
          <Base64ImageTool copyWithToast={copyWithToast} />
        </div>
      </div>
    </div>
  );
}

// Text Analysis Tool
function TextAnalysisTool() {
  const [text, setText] = useState("");
  
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    lines: text.split("\n").length,
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">Text Analysis & Word Counter</CardTitle>
        </div>
        <CardDescription className="text-sm">Analyze your text and get detailed statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.characters}</div>
            <div className="text-sm text-muted-foreground mt-1">Characters</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 rounded-xl border border-cyan-200/50 dark:border-cyan-800/50">
            <div className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">{stats.charactersNoSpaces}</div>
            <div className="text-sm text-muted-foreground mt-1">No Spaces</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">{stats.words}</div>
            <div className="text-sm text-muted-foreground mt-1">Words</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 rounded-xl border border-pink-200/50 dark:border-pink-800/50">
            <div className="text-3xl font-bold text-pink-700 dark:text-pink-300">{stats.paragraphs}</div>
            <div className="text-sm text-muted-foreground mt-1">Paragraphs</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50">
            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{stats.sentences}</div>
            <div className="text-sm text-muted-foreground mt-1">Sentences</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
            <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{stats.lines}</div>
            <div className="text-sm text-muted-foreground mt-1">Lines</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Text Stats
function TextStatsTool() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    lines: text.split("\n").length,
    readingTime: Math.ceil(text.trim().split(/\s+/).length / 200),
    wordFrequency: (() => {
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];
      const freq: Record<string, number> = {};
      words.forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
      });
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    })(),
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-xl">Text Statistics</CardTitle>
        </div>
        <CardDescription className="text-sm">Detailed statistics and analysis of your text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{stats.characters}</div>
            <div className="text-sm text-muted-foreground">Characters</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{stats.words}</div>
            <div className="text-sm text-muted-foreground">Words</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{stats.sentences}</div>
            <div className="text-sm text-muted-foreground">Sentences</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{stats.readingTime}</div>
            <div className="text-sm text-muted-foreground">Min Read</div>
          </div>
        </div>
        {stats.wordFrequency.length > 0 && (
          <div>
            <div className="font-semibold mb-2">Top 10 Words</div>
            <div className="space-y-1">
              {stats.wordFrequency.map(([word, count]) => (
                <div key={word} className="flex justify-between p-2 bg-muted rounded">
                  <span>{word}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
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
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Code className="w-5 h-5 text-green-600 dark:text-green-400" />
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

// Case Converter
function CaseConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");

  const cases = {
    camel: input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, ""),
    pascal: input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    }).replace(/\s+/g, ""),
    snake: input.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join("_"),
    kebab: input.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join("-"),
    upper: input.toUpperCase(),
    lower: input.toLowerCase(),
    title: input.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }),
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Type className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-xl">Case Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert text between different case styles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to convert..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="grid gap-3">
          {Object.entries(cases).map(([name, value]) => (
            <div key={name} className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold capitalize">{name} Case</div>
                  <div className="text-sm font-mono">{value}</div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyWithToast(value, `${name} case`)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Diff Tool
function DiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const diff = diffWords(text1, text2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="w-5 h-5" />
          Text Diff Checker
        </CardTitle>
        <CardDescription>Compare two texts and see the differences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Text 1</Label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-[150px]"
            placeholder="Original text..."
          />
        </div>
        <div>
          <Label>Text 2</Label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[150px]"
            placeholder="Modified text..."
          />
        </div>
        {text1 && text2 && (
          <div className="p-4 bg-muted rounded-lg">
            {diff.map((part, i) => (
              <span
                key={i}
                className={
                  part.added
                    ? "bg-green-200 dark:bg-green-900"
                    : part.removed
                    ? "bg-red-200 dark:bg-red-900"
                    : ""
                }
              >
                {part.value}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Regex Tool
function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("g");

  let matches: RegExpMatchArray[] = [];
  let error = "";

  if (pattern) {
    try {
      const regex = new RegExp(pattern, flags);
      const allMatches = Array.from(text.matchAll(regex));
      matches = allMatches;
    } catch (e: any) {
      error = e.message;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Regex Tester
        </CardTitle>
        <CardDescription>Test regular expressions against text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Regular Expression</Label>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="/pattern/flags"
            className="font-mono"
          />
        </div>
        <div className="flex gap-2">
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={flags.includes("g")}
              onChange={(e) =>
                setFlags(e.target.checked ? flags + "g" : flags.replace("g", ""))
              }
            />
            Global (g)
          </Label>
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={flags.includes("i")}
              onChange={(e) =>
                setFlags(e.target.checked ? flags + "i" : flags.replace("i", ""))
              }
            />
            Case Insensitive (i)
          </Label>
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={flags.includes("m")}
              onChange={(e) =>
                setFlags(e.target.checked ? flags + "m" : flags.replace("m", ""))
              }
            />
            Multiline (m)
          </Label>
        </div>
        <div>
          <Label>Test Text</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] font-mono"
            placeholder="Enter text to test against..."
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {matches.length > 0 && (
          <div className="space-y-2">
            <div className="font-semibold">Matches ({matches.length}):</div>
            {matches.map((match, i) => (
              <div key={i} className="p-2 bg-muted rounded text-sm font-mono">
                {match[0]} (at index {match.index})
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Markdown Tool
function MarkdownTool() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is **markdown** text.");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Markdown Preview</CardTitle>
        <CardDescription>Preview markdown in real-time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Markdown</Label>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[400px] font-mono"
            />
          </div>
          <div>
            <Label>Preview</Label>
            <div className="min-h-[400px] p-4 border rounded-md bg-background overflow-auto prose dark:prose-invert max-w-none">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// CSV Tool
function CSVTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  const convertToJSON = () => {
    const lines = csv.trim().split("\n");
    if (lines.length === 0) return;
    const headers = lines[0].split(",").map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] || "";
      });
      return obj;
    });
    setJson(JSON.stringify(data, null, 2));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          CSV to JSON Converter
        </CardTitle>
        <CardDescription>Convert CSV data to JSON format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>CSV Data</Label>
          <Textarea
            placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            className="min-h-[150px] font-mono"
          />
        </div>
        <Button onClick={convertToJSON}>Convert to JSON</Button>
        {json && (
          <>
            <div>
              <Label>JSON Output</Label>
              <Textarea
                value={json}
                readOnly
                className="min-h-[150px] font-mono"
              />
            </div>
            <Button onClick={() => copyWithToast(json, "JSON")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy JSON
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Base64 Tool
function Base64Tool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleChange = () => {
    if (!input) {
      setOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setOutput("Error: Invalid input");
    }
  };

  // Update output when input or mode changes
  useEffect(() => {
    handleChange();
  }, [input, mode]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base64 Encoder/Decoder</CardTitle>
        <CardDescription>Encode or decode text to/from Base64</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
          >
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
          >
            Decode
          </Button>
        </div>
        <div>
          <Label>{mode === "encode" ? "Text to Encode" : "Base64 to Decode"}</Label>
          <Textarea
            placeholder={mode === "encode" ? "Enter text..." : "Enter base64..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] font-mono"
          />
        </div>
        {output && (
          <>
            <div>
              <Label>{mode === "encode" ? "Encoded" : "Decoded"}</Label>
              <Textarea
                value={output}
                readOnly
                className="min-h-[150px] font-mono"
              />
            </div>
            <Button onClick={() => copyWithToast(output, "Base64")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Hash Tool
function HashTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }
    setHashes({
      MD5: CryptoJS.MD5(input).toString(),
      SHA1: CryptoJS.SHA1(input).toString(),
      SHA256: CryptoJS.SHA256(input).toString(),
      SHA512: CryptoJS.SHA512(input).toString(),
    });
  }, [input]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hash Generator</CardTitle>
        <CardDescription>Generate MD5, SHA1, SHA256, and SHA512 hashes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[150px]"
        />
        <div className="space-y-2">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{algo}</div>
                  <div className="text-sm font-mono text-muted-foreground break-all">{hash}</div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyWithToast(hash, `${algo} hash`)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// URL Parser
function URLParserTool() {
  const [url, setUrl] = useState("");
  const [parsed, setParsed] = useState<any>(null);

  const parse = () => {
    try {
      const urlObj = new URL(url);
      setParsed({
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin,
        searchParams: Object.fromEntries(urlObj.searchParams),
      });
    } catch (e) {
      setParsed({ error: "Invalid URL" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="w-5 h-5" />
          URL Parser
        </CardTitle>
        <CardDescription>Parse and analyze URL components</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/path?query=value#hash"
            className="font-mono"
          />
          <Button onClick={parse}>Parse</Button>
        </div>
        {parsed && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            {parsed.error ? (
              <div className="text-red-500">{parsed.error}</div>
            ) : (
              Object.entries(parsed).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-semibold capitalize">{key}:</span>
                  <span className="font-mono text-sm">
                    {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Base64 Image
function Base64ImageTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64(result);
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          Image to Base64
        </CardTitle>
        <CardDescription>Convert images to Base64 data URLs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Upload Image</Label>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {preview && (
          <div className="flex flex-col items-center space-y-4">
            <img src={preview} alt="Preview" className="max-w-full h-auto border rounded-lg" />
            <Textarea
              value={base64}
              readOnly
              className="min-h-[100px] font-mono text-xs"
            />
            <Button onClick={() => copyWithToast(base64, "Base64 image")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Base64
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

