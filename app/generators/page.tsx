"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCopyToast } from "@/hooks/useToast";
import { QuickTools } from "@/components/QuickTools";
import { Copy, RefreshCw, Lock, Shuffle, QrCode, FileText, Hash, Sparkles, Calendar, CreditCard, Mail, Palette } from "lucide-react";
import * as QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const quickTools = [
  { name: "Password", href: "#password", icon: <Lock className="w-5 h-5" />, description: "Secure passwords" },
  { name: "UUID", href: "#uuid", icon: <Shuffle className="w-5 h-5" />, description: "Generate UUIDs" },
  { name: "QR Code", href: "#qr", icon: <QrCode className="w-5 h-5" />, description: "QR generator" },
  { name: "Lorem Ipsum", href: "#lorem", icon: <FileText className="w-5 h-5" />, description: "Placeholder text" },
  { name: "Random String", href: "#random", icon: <Hash className="w-5 h-5" />, description: "Random strings" },
  { name: "Fake Data", href: "#fake", icon: <Sparkles className="w-5 h-5" />, description: "Test data" },
  { name: "Email", href: "#email", icon: <Mail className="w-5 h-5" />, description: "Email generator" },
  { name: "Color Palette", href: "#palette", icon: <Palette className="w-5 h-5" />, description: "Color palettes" },
];

export default function GeneratorsPage() {
  const { copyWithToast } = useCopyToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-semibold">
              Generators
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
            Generators
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
            Password, UUID, QR code, and data generators
          </p>
        </div>

        <QuickTools tools={quickTools} title="Quick Access" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="password" className="scroll-mt-8">
            <PasswordGeneratorTool copyWithToast={copyWithToast} />
          </div>
          <div id="uuid" className="scroll-mt-8">
            <UUIDGeneratorTool copyWithToast={copyWithToast} />
          </div>
          <div id="qr" className="scroll-mt-8">
            <QRCodeTool copyWithToast={copyWithToast} />
          </div>
          <div id="lorem" className="scroll-mt-8">
            <LoremIpsumTool copyWithToast={copyWithToast} />
          </div>
          <div id="random" className="scroll-mt-8">
            <RandomStringTool copyWithToast={copyWithToast} />
          </div>
          <SlugGeneratorTool copyWithToast={copyWithToast} />
          <div id="fake" className="scroll-mt-8">
            <FakeDataGeneratorTool copyWithToast={copyWithToast} />
          </div>
          <CreditCardGeneratorTool copyWithToast={copyWithToast} />
          <HashGeneratorTool copyWithToast={copyWithToast} />
          <RandomNumberTool copyWithToast={copyWithToast} />
          <div id="email" className="scroll-mt-8">
            <EmailGeneratorTool copyWithToast={copyWithToast} />
          </div>
          <div id="palette" className="scroll-mt-8">
            <ColorPaletteGeneratorTool copyWithToast={copyWithToast} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Password Generator
function PasswordGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("Please select at least one character type");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl">Password Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate secure random passwords</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Length: {length}</Label>
          <input
            type="range"
            min="8"
            max="128"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Uppercase Letters</Label>
            <Switch checked={includeUpper} onCheckedChange={setIncludeUpper} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Lowercase Letters</Label>
            <Switch checked={includeLower} onCheckedChange={setIncludeLower} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Numbers</Label>
            <Switch checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Symbols</Label>
            <Switch checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
          </div>
        </div>
        <Button onClick={generatePassword} className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Password
        </Button>
        {password && (
          <>
            <div className="p-4 bg-muted rounded-lg font-mono text-center">
              {password}
            </div>
            <Button onClick={() => copyWithToast(password, "Password")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Password
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// UUID Generator
function UUIDGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => uuidv4());
    setUuids(newUuids);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Shuffle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-xl">UUID Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate UUIDs (v4)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Count</Label>
          <Input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <Button onClick={generate} className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate UUIDs
        </Button>
        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <code className="text-sm">{uuid}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyWithToast(uuid, "UUID")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// QR Code Tool
function QRCodeTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    if (text) {
      QRCode.toDataURL(text, { width: 300 }, (err, url) => {
        if (!err) setQrDataUrl(url);
      });
    } else {
      setQrDataUrl("");
    }
  }, [text]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">QR Code Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate QR codes from text or URLs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text or URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px]"
        />
        {qrDataUrl && (
          <div className="flex flex-col items-center space-y-4">
            <img src={qrDataUrl} alt="QR Code" className="border rounded-lg" />
            <Button onClick={() => copyWithToast(qrDataUrl, "QR Code")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Image URL
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Lorem Ipsum
function LoremIpsumTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<"words" | "sentences" | "paragraphs">("paragraphs");
  const [text, setText] = useState("");

  const loremWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");

  const generate = () => {
    if (type === "words") {
      const words = Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]);
      setText(words.join(" "));
    } else if (type === "sentences") {
      const sentences = Array.from({ length: count }, () => {
        const words = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => 
          loremWords[Math.floor(Math.random() * loremWords.length)]
        );
        return words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + ".";
      });
      setText(sentences.join(" "));
    } else {
      const paragraphs = Array.from({ length: count }, () => {
        const sentences = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => {
          const words = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => 
            loremWords[Math.floor(Math.random() * loremWords.length)]
          );
          return words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + ".";
        });
        return sentences.join(" ");
      });
      setText(paragraphs.join("\n\n"));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Lorem Ipsum Generator
        </CardTitle>
        <CardDescription>Generate placeholder text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label>Count</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v: any) => setType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="words">Words</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        {text && (
          <>
            <Textarea value={text} readOnly className="min-h-[200px]" />
            <Button onClick={() => copyWithToast(text, "Lorem Ipsum")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Random String Generator
function RandomStringTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [length, setLength] = useState(16);
  const [charset, setCharset] = useState("alphanumeric");
  const [result, setResult] = useState("");

  const charsets: Record<string, string> = {
    alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    alphabetic: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
    hexadecimal: "0123456789ABCDEF",
    base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  };

  const generate = () => {
    const chars = charsets[charset];
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setResult(str);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-xl">Random String Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate random strings with different character sets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Length: {length}</Label>
          <input
            type="range"
            min="1"
            max="256"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <Label>Character Set</Label>
          <Select value={charset} onValueChange={setCharset}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(charsets).map((cs) => (
                <SelectItem key={cs} value={cs}>
                  {cs.charAt(0).toUpperCase() + cs.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        {result && (
          <>
            <div className="p-4 bg-muted rounded-lg font-mono text-center break-all">
              {result}
            </div>
            <Button onClick={() => copyWithToast(result, "Random string")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Slug Generator
function SlugGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const generated = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  }, [input]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-xl">Slug Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Convert text to URL-friendly slugs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert to slug..."
        />
        {slug && (
          <>
            <div className="p-4 bg-muted rounded-lg font-mono">
              {slug}
            </div>
            <Button onClick={() => copyWithToast(slug, "Slug")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Slug
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Fake Data Generator
function FakeDataGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [type, setType] = useState("name");
  const [count, setCount] = useState(5);
  const [data, setData] = useState<string[]>([]);

  const generators: Record<string, () => string> = {
    name: () => {
      const first = ["John", "Jane", "Mike", "Sarah", "David", "Emily", "Chris", "Amy"];
      const last = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
      return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
    },
    email: () => {
      const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
      return `user${Math.floor(Math.random() * 10000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    },
    phone: () => {
      return `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    },
    address: () => {
      const streets = ["Main St", "Oak Ave", "Park Rd", "Elm St", "Cedar Ln"];
      return `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`;
    },
    company: () => {
      const companies = ["Tech Corp", "Global Solutions", "Innovative Systems", "Digital Ventures", "Smart Technologies"];
      return companies[Math.floor(Math.random() * companies.length)];
    },
  };

  const generate = () => {
    const generator = generators[type];
    if (generator) {
      const results = Array.from({ length: count }, () => generator());
      setData(results);
    }
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <CardTitle className="text-xl">Fake Data Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate fake data for testing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(generators).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Count</Label>
            <Input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
        </div>
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        {data.length > 0 && (
          <>
            <div className="space-y-2">
              {data.map((item, i) => (
                <div key={i} className="p-2 bg-muted rounded text-sm">
                  {item}
                </div>
              ))}
            </div>
            <Button onClick={() => copyWithToast(data.join("\n"), "Fake data")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Credit Card Generator (for testing only)
function CreditCardGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [type, setType] = useState("visa");
  const [card, setCard] = useState("");

  const generate = () => {
    let prefix = "";
    let length = 16;
    if (type === "visa") {
      prefix = "4";
      length = 16;
    } else if (type === "mastercard") {
      prefix = "5";
      length = 16;
    } else if (type === "amex") {
      prefix = "37";
      length = 15;
    }
    
    let number = prefix;
    while (number.length < length - 1) {
      number += Math.floor(Math.random() * 10);
    }
    
    // Luhn algorithm check digit
    let sum = 0;
    let isEven = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    number += checkDigit;
    
    // Format
    if (type === "amex") {
      number = number.match(/.{1,4}/g)?.join(" ") || number;
    } else {
      number = number.match(/.{1,4}/g)?.join(" ") || number;
    }
    
    setCard(number);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-xl">Credit Card Generator (Test Only)</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate test credit card numbers (Luhn valid)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Card Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visa">Visa</SelectItem>
              <SelectItem value="mastercard">Mastercard</SelectItem>
              <SelectItem value="amex">American Express</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        {card && (
          <>
            <div className="p-4 bg-muted rounded-lg font-mono text-center text-lg">
              {card}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              ⚠️ For testing purposes only. Not valid for real transactions.
            </div>
            <Button onClick={() => copyWithToast(card.replace(/\s/g, ""), "Card number")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Hash Generator
function HashGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
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
    });
  }, [input]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <CardTitle className="text-xl">Hash Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate hash values</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
        />
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="p-3 bg-muted rounded-lg">
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
      </CardContent>
    </Card>
  );
}

// Random Number Generator
function RandomNumberTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const nums = Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    setNumbers(nums);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <CardTitle className="text-xl">Random Number Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate random numbers within a range</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Min</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Max</Label>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Count</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
        </div>
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        {numbers.length > 0 && (
          <>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-mono text-center">
                {numbers.join(", ")}
              </div>
            </div>
            <Button onClick={() => copyWithToast(numbers.join(", "), "Numbers")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Email Generator
function EmailGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [domain, setDomain] = useState("example.com");
  const [count, setCount] = useState(5);
  const [emails, setEmails] = useState<string[]>([]);

  const generate = () => {
    const results = Array.from({ length: count }, (_, i) => {
      const username = `user${Math.floor(Math.random() * 100000)}${i}`;
      return `${username}@${domain}`;
    });
    setEmails(results);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">Email Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate random email addresses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Domain</Label>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
            />
          </div>
          <div>
            <Label>Count</Label>
            <Input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
        </div>
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        {emails.length > 0 && (
          <>
            <div className="space-y-2">
              {emails.map((email, i) => (
                <div key={i} className="p-2 bg-muted rounded text-sm font-mono">
                  {email}
                </div>
              ))}
            </div>
            <Button onClick={() => copyWithToast(emails.join("\n"), "Emails")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Color Palette Generator
function ColorPaletteGeneratorTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [count, setCount] = useState(5);
  const [colors, setColors] = useState<string[]>([]);

  const generate = () => {
    const newColors = Array.from({ length: count }, () => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    });
    setColors(newColors);
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <CardTitle className="text-xl">Color Palette Generator</CardTitle>
        </div>
        <CardDescription className="text-sm">Generate random color palettes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Number of Colors: {count}</Label>
          <input
            type="range"
            min="2"
            max="20"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <Button onClick={generate} className="w-full">
          Generate Palette
        </Button>
        {colors.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colors.map((color, i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-xs font-mono text-center">{color}</div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => copyWithToast(color, "Color")}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => copyWithToast(colors.join(", "), "Palette")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy All Colors
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

