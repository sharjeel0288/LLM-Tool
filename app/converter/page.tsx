"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopyToast } from "@/hooks/useToast";
import { QuickTools } from "@/components/QuickTools";
import { Copy, ArrowLeftRight, Hash, Sparkles, Link as LinkIcon, FileText, Calendar, Binary, Ruler, Layers, Type } from "lucide-react";
import CryptoJS from "crypto-js";
import { format } from "date-fns";

const quickTools = [
  { name: "Base64", href: "#base64", icon: <Layers className="w-5 h-5" />, description: "Encode/decode" },
  { name: "URL Encode", href: "#url", icon: <LinkIcon className="w-5 h-5" />, description: "URL encoder" },
  { name: "Hash", href: "#hash", icon: <Hash className="w-5 h-5" />, description: "Generate hashes" },
  { name: "Color", href: "#color", icon: <Sparkles className="w-5 h-5" />, description: "HEX/RGB/HSL" },
  { name: "Timestamp", href: "#timestamp", icon: <Calendar className="w-5 h-5" />, description: "Date converter" },
  { name: "Number Base", href: "#number", icon: <Binary className="w-5 h-5" />, description: "Base converter" },
  { name: "Unit", href: "#unit", icon: <Ruler className="w-5 h-5" />, description: "Unit converter" },
  { name: "Case", href: "#case", icon: <Type className="w-5 h-5" />, description: "Text case" },
];

export default function ConverterPage() {
  const { copyWithToast } = useCopyToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold">
              Converters
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
            Converters
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
            Format converters, encoders, decoders, and transformers
          </p>
        </div>

        <QuickTools tools={quickTools} title="Quick Access" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="base64" className="scroll-mt-8">
            <Base64Tool copyWithToast={copyWithToast} />
          </div>
          <div id="url" className="scroll-mt-8">
            <URLEncoderTool copyWithToast={copyWithToast} />
          </div>
          <div id="hash" className="scroll-mt-8">
            <HashConverterTool copyWithToast={copyWithToast} />
          </div>
          <div id="color" className="scroll-mt-8">
            <ColorConverterTool copyWithToast={copyWithToast} />
          </div>
          <div id="timestamp" className="scroll-mt-8">
            <TimestampConverterTool copyWithToast={copyWithToast} />
          </div>
          <div id="number" className="scroll-mt-8">
            <NumberBaseConverterTool copyWithToast={copyWithToast} />
          </div>
          <div id="unit" className="scroll-mt-8">
            <UnitConverterTool copyWithToast={copyWithToast} />
          </div>
          <div id="case" className="scroll-mt-8">
            <CaseConverterTool copyWithToast={copyWithToast} />
          </div>
          <TextToBinaryTool copyWithToast={copyWithToast} />
          <BinaryToTextTool copyWithToast={copyWithToast} />
          <RomanNumeralConverterTool copyWithToast={copyWithToast} />
          <MorseCodeTool copyWithToast={copyWithToast} />
        </div>
      </div>
    </div>
  );
}

// Base64 Tool
function Base64Tool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  useEffect(() => {
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
  }, [input, mode]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">Base64 Encoder/Decoder</CardTitle>
        </div>
        <CardDescription className="text-sm">Encode or decode text to/from Base64</CardDescription>
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

// URL Encoder/Decoder
function URLEncoderTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput("Error: Invalid input");
    }
  }, [input, mode]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <LinkIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-xl">URL Encoder/Decoder</CardTitle>
        </div>
        <CardDescription className="text-sm">Encode or decode URL strings</CardDescription>
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
          <Label>{mode === "encode" ? "Text to Encode" : "URL to Decode"}</Label>
          <Textarea
            placeholder={mode === "encode" ? "Enter text..." : "Enter encoded URL..."}
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
            <Button onClick={() => copyWithToast(output, "URL")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Hash Converter
function HashConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
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
      SHA3: CryptoJS.SHA3(input).toString(),
    });
  }, [input]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-xl">Hash Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate multiple hash types</CardDescription>
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

// Color Converter
function ColorConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  useEffect(() => {
    const rgbResult = hexToRgb(hex);
    if (rgbResult) setRgb(rgbResult);
  }, [hex]);

  const handleRgbChange = (key: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [key]: Math.min(255, Math.max(0, value)) };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const hsl = (() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  })();

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <CardTitle className="text-xl">Color Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert between HEX, RGB, and HSL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>HEX Color</Label>
          <div className="flex gap-2">
            <Input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="font-mono"
            />
            <div
              className="w-16 h-10 rounded border"
              style={{ backgroundColor: hex }}
            />
          </div>
        </div>
        <div>
          <Label>RGB Color</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              min="0"
              max="255"
              value={rgb.r}
              onChange={(e) => handleRgbChange("r", Number(e.target.value))}
              placeholder="R"
            />
            <Input
              type="number"
              min="0"
              max="255"
              value={rgb.g}
              onChange={(e) => handleRgbChange("g", Number(e.target.value))}
              placeholder="G"
            />
            <Input
              type="number"
              min="0"
              max="255"
              value={rgb.b}
              onChange={(e) => handleRgbChange("b", Number(e.target.value))}
              placeholder="B"
            />
          </div>
        </div>
        <div>
          <Label>HSL Color</Label>
          <div className="p-3 bg-muted rounded-lg text-sm">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: hex }}>
          <div className="text-white font-semibold">Preview</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => copyWithToast(hex, "HEX color")}>
            Copy HEX
          </Button>
          <Button onClick={() => copyWithToast(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB color")}>
            Copy RGB
          </Button>
          <Button onClick={() => copyWithToast(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL color")}>
            Copy HSL
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Timestamp Converter
function TimestampConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [timestamp, setTimestamp] = useState(Date.now().toString());
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));

  const convertTimestamp = () => {
    const ts = Number(timestamp);
    if (!isNaN(ts)) {
      setDate(format(new Date(ts), "yyyy-MM-dd'T'HH:mm"));
    }
  };

  const convertDate = () => {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      setTimestamp(d.getTime().toString());
    }
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-xl">Timestamp Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert between Unix timestamps and dates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Unix Timestamp (milliseconds)</Label>
          <div className="flex gap-2">
            <Input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1640995200000"
            />
            <Button onClick={convertTimestamp}>Convert</Button>
          </div>
          {timestamp && !isNaN(Number(timestamp)) && (
            <div className="mt-2 p-2 bg-muted rounded text-sm">
              {format(new Date(Number(timestamp)), "PPpp")}
            </div>
          )}
        </div>
        <div>
          <Label>Date & Time</Label>
          <div className="flex gap-2">
            <Input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button onClick={convertDate}>Convert</Button>
          </div>
          {date && (
            <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
              {new Date(date).getTime()}
            </div>
          )}
        </div>
        <Button
          onClick={() => {
            setTimestamp(Date.now().toString());
            setDate(new Date().toISOString().slice(0, 16));
          }}
          variant="outline"
          className="w-full"
        >
          Use Current Time
        </Button>
      </CardContent>
    </Card>
  );
}

// Number Base Converter
function NumberBaseConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");
  const [octal, setOct] = useState("");

  const convertFromDecimal = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setBinary("");
      setHex("");
      setOct("");
      return;
    }
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
    setOct(num.toString(8));
  };

  const convertFromBinary = (value: string) => {
    const num = parseInt(value, 2);
    if (isNaN(num)) {
      setDecimal("");
      setHex("");
      setOct("");
      return;
    }
    setDecimal(num.toString(10));
    setHex(num.toString(16).toUpperCase());
    setOct(num.toString(8));
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Binary className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-xl">Number Base Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert between decimal, binary, hex, and octal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Decimal</Label>
          <Input
            value={decimal}
            onChange={(e) => {
              setDecimal(e.target.value);
              convertFromDecimal(e.target.value);
            }}
            placeholder="255"
          />
        </div>
        <div>
          <Label>Binary</Label>
          <Input
            value={binary}
            onChange={(e) => {
              setBinary(e.target.value);
              convertFromBinary(e.target.value);
            }}
            placeholder="11111111"
            className="font-mono"
          />
        </div>
        <div>
          <Label>Hexadecimal</Label>
          <Input
            value={hex}
            onChange={(e) => {
              const num = parseInt(e.target.value, 16);
              if (!isNaN(num)) {
                setDecimal(num.toString(10));
                setBinary(num.toString(2));
                setOct(num.toString(8));
              }
              setHex(e.target.value.toUpperCase());
            }}
            placeholder="FF"
            className="font-mono"
          />
        </div>
        <div>
          <Label>Octal</Label>
          <Input
            value={octal}
            onChange={(e) => {
              const num = parseInt(e.target.value, 8);
              if (!isNaN(num)) {
                setDecimal(num.toString(10));
                setBinary(num.toString(2));
                setHex(num.toString(16).toUpperCase());
              }
              setOct(e.target.value);
            }}
            placeholder="377"
            className="font-mono"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Unit Converter
function UnitConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [result, setResult] = useState("");

  const conversions: Record<string, Record<string, number>> = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254, mi: 1609.34, yd: 0.9144 },
    weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, ton: 1000 },
    temperature: { c: 1, f: 1, k: 1 },
  };

  useEffect(() => {
    if (!value || isNaN(Number(value))) {
      setResult("");
      return;
    }
    const num = Number(value);
    let converted = 0;
    
    // Temperature conversion
    if (from === "c" && to === "f") converted = (num * 9/5) + 32;
    else if (from === "f" && to === "c") converted = (num - 32) * 5/9;
    else if (from === "c" && to === "k") converted = num + 273.15;
    else if (from === "k" && to === "c") converted = num - 273.15;
    else if (from === "f" && to === "k") converted = ((num - 32) * 5/9) + 273.15;
    else if (from === "k" && to === "f") converted = ((num - 273.15) * 9/5) + 32;
    else {
      // Length or weight conversion
      const lengthUnits = conversions.length;
      const weightUnits = conversions.weight;
      
      if (lengthUnits[from] && lengthUnits[to]) {
        converted = (num * lengthUnits[from]) / lengthUnits[to];
      } else if (weightUnits[from] && weightUnits[to]) {
        converted = (num * weightUnits[from]) / weightUnits[to];
      }
    }
    
    setResult(converted.toFixed(6));
  }, [value, from, to]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <Ruler className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <CardTitle className="text-xl">Unit Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert between different units</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Value</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="100"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">Meter (m)</SelectItem>
                <SelectItem value="km">Kilometer (km)</SelectItem>
                <SelectItem value="cm">Centimeter (cm)</SelectItem>
                <SelectItem value="ft">Foot (ft)</SelectItem>
                <SelectItem value="in">Inch (in)</SelectItem>
                <SelectItem value="mi">Mile (mi)</SelectItem>
                <SelectItem value="kg">Kilogram (kg)</SelectItem>
                <SelectItem value="g">Gram (g)</SelectItem>
                <SelectItem value="lb">Pound (lb)</SelectItem>
                <SelectItem value="oz">Ounce (oz)</SelectItem>
                <SelectItem value="c">Celsius (°C)</SelectItem>
                <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                <SelectItem value="k">Kelvin (K)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>To</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">Meter (m)</SelectItem>
                <SelectItem value="km">Kilometer (km)</SelectItem>
                <SelectItem value="cm">Centimeter (cm)</SelectItem>
                <SelectItem value="ft">Foot (ft)</SelectItem>
                <SelectItem value="in">Inch (in)</SelectItem>
                <SelectItem value="mi">Mile (mi)</SelectItem>
                <SelectItem value="kg">Kilogram (kg)</SelectItem>
                <SelectItem value="g">Gram (g)</SelectItem>
                <SelectItem value="lb">Pound (lb)</SelectItem>
                <SelectItem value="oz">Ounce (oz)</SelectItem>
                <SelectItem value="c">Celsius (°C)</SelectItem>
                <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                <SelectItem value="k">Kelvin (K)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{result}</div>
            <Button
              className="mt-2"
              onClick={() => copyWithToast(result, "Converted value")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
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
    <Card>
      <CardHeader>
        <CardTitle>Case Converter</CardTitle>
        <CardDescription>Convert text between different case styles</CardDescription>
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

// Text to Binary
function TextToBinaryTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");

  useEffect(() => {
    if (!text) {
      setBinary("");
      return;
    }
    const binaryString = text.split("").map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    }).join(" ");
    setBinary(binaryString);
  }, [text]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-100 dark:bg-slate-900/30 rounded-lg">
            <Binary className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <CardTitle className="text-xl">Text to Binary</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert text to binary representation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Text</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="min-h-[100px]"
          />
        </div>
        {binary && (
          <>
            <div>
              <Label>Binary</Label>
              <Textarea
                value={binary}
                readOnly
                className="min-h-[100px] font-mono"
              />
            </div>
            <Button onClick={() => copyWithToast(binary, "Binary")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Binary
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Binary to Text
function BinaryToTextTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [binary, setBinary] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!binary) {
      setText("");
      return;
    }
    try {
      const binaryString = binary.replace(/\s/g, "");
      const textString = binaryString.match(/.{1,8}/g)?.map(byte => {
        return String.fromCharCode(parseInt(byte, 2));
      }).join("") || "";
      setText(textString);
    } catch (e) {
      setText("Invalid binary input");
    }
  }, [binary]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 dark:bg-gray-900/30 rounded-lg">
            <Binary className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <CardTitle className="text-xl">Binary to Text</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert binary to text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Binary</Label>
          <Textarea
            value={binary}
            onChange={(e) => setBinary(e.target.value)}
            placeholder="01001000 01100101 01101100 01101100 01101111"
            className="min-h-[100px] font-mono"
          />
        </div>
        {text && (
          <>
            <div>
              <Label>Text</Label>
              <Textarea
                value={text}
                readOnly
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={() => copyWithToast(text, "Text")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Roman Numeral Converter
function RomanNumeralConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");

  const toRoman = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }
    return result;
  };

  const fromRoman = (roman: string): number => {
    const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      if (i > 0 && map[roman[i]] > map[roman[i - 1]]) {
        result += map[roman[i]] - 2 * map[roman[i - 1]];
      } else {
        result += map[roman[i]];
      }
    }
    return result;
  };

  useEffect(() => {
    if (number && !isNaN(Number(number))) {
      const num = parseInt(number);
      if (num > 0 && num < 4000) {
        setRoman(toRoman(num));
      }
    }
  }, [number]);

  useEffect(() => {
    if (roman) {
      try {
        const num = fromRoman(roman.toUpperCase());
        if (num > 0) {
          setNumber(num.toString());
        }
      } catch (e) {
        // Invalid roman numeral
      }
    }
  }, [roman]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-xl">Roman Numeral Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert between numbers and Roman numerals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Number (1-3999)</Label>
          <Input
            type="number"
            min="1"
            max="3999"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="2024"
          />
        </div>
        <div>
          <Label>Roman Numeral</Label>
          <Input
            value={roman}
            onChange={(e) => setRoman(e.target.value.toUpperCase())}
            placeholder="MMXXIV"
            className="font-mono"
          />
        </div>
        {roman && (
          <Button onClick={() => copyWithToast(roman, "Roman numeral")}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Roman
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Morse Code Converter
function MorseCodeTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const morseCode: Record<string, string> = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
    "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
    ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
    '"': ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/"
  };

  const textToMorse = (input: string): string => {
    return input.toUpperCase().split("").map(char => morseCode[char] || "").join(" ");
  };

  const morseToText = (input: string): string => {
    const reverseCode: Record<string, string> = Object.fromEntries(
      Object.entries(morseCode).map(([k, v]) => [v, k])
    );
    return input.split(" ").map(code => reverseCode[code] || "").join("");
  };

  useEffect(() => {
    if (!text) {
      setMorse("");
      return;
    }
    // Check if input looks like morse code
    if (/^[.\-/\s]+$/.test(text)) {
      setMorse(morseToText(text));
    } else {
      setMorse(textToMorse(text));
    }
  }, [text]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <CardTitle className="text-xl">Morse Code Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert between text and Morse code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Text or Morse Code</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or morse code..."
            className="min-h-[150px] font-mono"
          />
        </div>
        {morse && (
          <>
            <div>
              <Label>Converted</Label>
              <Textarea
                value={morse}
                readOnly
                className="min-h-[150px] font-mono"
              />
            </div>
            <Button onClick={() => copyWithToast(morse, "Morse code")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

