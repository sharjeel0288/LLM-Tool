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
import { Copy, Brain, DollarSign, Calculator, Target, Info, MessageSquare, TrendingUp, Zap, Sparkles } from "lucide-react";

const quickTools = [
  { name: "Model Comparison", href: "#model-comparison", icon: <Brain className="w-5 h-5" />, description: "Compare LLM models" },
  { name: "Cost Calculator", href: "#cost-calculator", icon: <DollarSign className="w-5 h-5" />, description: "Calculate API costs" },
  { name: "Token Counter", href: "#token-counter", icon: <Calculator className="w-5 h-5" />, description: "Count tokens" },
  { name: "Use Cases", href: "#use-cases", icon: <Target className="w-5 h-5" />, description: "Explore use cases" },
  { name: "Model Info", href: "#model-info", icon: <Info className="w-5 h-5" />, description: "Model details" },
  { name: "Prompt Builder", href: "#prompt-builder", icon: <MessageSquare className="w-5 h-5" />, description: "Build prompts" },
  { name: "API Calculator", href: "#api-calculator", icon: <TrendingUp className="w-5 h-5" />, description: "Usage calculator" },
  { name: "Recommender", href: "#recommender", icon: <Zap className="w-5 h-5" />, description: "Get recommendations" },
];

export default function LLMToolsPage() {
  const { copyWithToast } = useCopyToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
              LLM Tools
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            LLM Tools
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
            Model comparison, cost calculators, prompts, recommendations, and token analysis
          </p>
        </div>

        <QuickTools tools={quickTools} title="Quick Access" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="model-comparison" className="scroll-mt-8">
            <LLMComparisonTool />
          </div>
          <div id="cost-calculator" className="scroll-mt-8">
            <LLMCostCalculator copyWithToast={copyWithToast} />
          </div>
          <div id="token-counter" className="scroll-mt-8">
            <TokenCounterTool copyWithToast={copyWithToast} />
          </div>
          <div id="use-cases" className="scroll-mt-8">
            <LLMUseCasesTool />
          </div>
          <div id="model-info" className="scroll-mt-8">
            <ModelInfoTool />
          </div>
          <div id="prompt-builder" className="scroll-mt-8">
            <PromptBuilderTool copyWithToast={copyWithToast} />
          </div>
          <div id="api-calculator" className="scroll-mt-8">
            <APIUsageCalculator copyWithToast={copyWithToast} />
          </div>
          <div id="recommender" className="scroll-mt-8">
            <ModelRecommenderTool />
          </div>
        </div>
      </div>
    </div>
  );
}

// LLM Comparison Tool
function LLMComparisonTool() {
  const [selectedTask, setSelectedTask] = useState("");

  const taskModels: Record<string, Array<{ model: string; rating: number; reason: string; cost: string }>> = {
    "Text Generation": [
      { model: "GPT-4 Turbo", rating: 95, reason: "Best for creative writing, long-form content, and complex narratives", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Opus", rating: 93, reason: "Excellent for detailed analysis and nuanced writing", cost: "$15 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 85, reason: "Good balance of quality and cost for general text generation", cost: "$0.50-1.50 per 1M tokens" },
      { model: "Claude 3 Haiku", rating: 80, reason: "Fast and affordable for simple text generation", cost: "$0.25 per 1M tokens" },
    ],
    "Code Generation": [
      { model: "GPT-4 Turbo", rating: 96, reason: "Superior code understanding, best for complex projects", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Opus", rating: 94, reason: "Excellent code quality and documentation", cost: "$15 per 1M tokens" },
      { model: "CodeLlama 70B", rating: 88, reason: "Specialized for code, open-source", cost: "Free (self-hosted)" },
      { model: "GPT-3.5 Turbo", rating: 82, reason: "Good for simple scripts and boilerplate", cost: "$0.50-1.50 per 1M tokens" },
    ],
    "Data Analysis": [
      { model: "GPT-4 Turbo", rating: 95, reason: "Best for complex data interpretation and insights", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Opus", rating: 93, reason: "Excellent reasoning and structured analysis", cost: "$15 per 1M tokens" },
      { model: "Claude 3 Sonnet", rating: 87, reason: "Good balance for data analysis tasks", cost: "$3 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 75, reason: "Basic analysis only, limited reasoning", cost: "$0.50-1.50 per 1M tokens" },
    ],
    "Translation": [
      { model: "GPT-4 Turbo", rating: 92, reason: "High accuracy, context-aware translations", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Opus", rating: 90, reason: "Excellent nuance preservation", cost: "$15 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 85, reason: "Cost-effective for common languages", cost: "$0.50-1.50 per 1M tokens" },
      { model: "Google Translate API", rating: 80, reason: "Specialized translation service", cost: "$20 per 1M tokens" },
    ],
    "Summarization": [
      { model: "Claude 3 Opus", rating: 94, reason: "Best for extracting key points and themes", cost: "$15 per 1M tokens" },
      { model: "GPT-4 Turbo", rating: 92, reason: "Excellent summarization quality", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Haiku", rating: 85, reason: "Fast and cost-effective for summaries", cost: "$0.25 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 80, reason: "Basic summarization at low cost", cost: "$0.50-1.50 per 1M tokens" },
    ],
    "Chat/Conversation": [
      { model: "Claude 3 Opus", rating: 96, reason: "Best conversation quality and understanding", cost: "$15 per 1M tokens" },
      { model: "GPT-4 Turbo", rating: 95, reason: "Excellent conversational AI", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Sonnet", rating: 88, reason: "Great conversational balance", cost: "$3 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 82, reason: "Good for casual conversations", cost: "$0.50-1.50 per 1M tokens" },
    ],
    "Question Answering": [
      { model: "GPT-4 Turbo", rating: 94, reason: "Best accuracy and fact-checking", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Opus", rating: 93, reason: "Excellent detailed answers", cost: "$15 per 1M tokens" },
      { model: "Claude 3 Sonnet", rating: 86, reason: "Good Q&A performance", cost: "$3 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 78, reason: "Basic answers at low cost", cost: "$0.50-1.50 per 1M tokens" },
    ],
    "Classification": [
      { model: "GPT-4 Turbo", rating: 92, reason: "Best for complex categorization", cost: "$10-30 per 1M tokens" },
      { model: "Claude 3 Sonnet", rating: 88, reason: "Good classification accuracy", cost: "$3 per 1M tokens" },
      { model: "GPT-3.5 Turbo", rating: 85, reason: "Cost-effective for simple classification", cost: "$0.50-1.50 per 1M tokens" },
      { model: "Claude 3 Haiku", rating: 80, reason: "Fast classification", cost: "$0.25 per 1M tokens" },
    ],
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-xl">LLM Model Comparison</CardTitle>
        </div>
        <CardDescription className="text-sm">Find the best LLM model for your specific task</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Task Type</Label>
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a task..." />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(taskModels).map((task) => (
                <SelectItem key={task} value={task}>
                  {task}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedTask && taskModels[selectedTask] && (
          <div className="space-y-3">
            <div className="font-semibold text-lg mb-4">Recommended Models for {selectedTask}</div>
            {taskModels[selectedTask]
              .sort((a, b) => b.rating - a.rating)
              .map((item, index) => (
                <div key={item.model} className="p-4 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          #{index + 1} {item.model}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                          {item.rating}/100
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{item.reason}</div>
                      <div className="text-sm font-semibold mt-2 text-green-600">{item.cost}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Rest of the components remain the same as before, but with updated Card styling
function LLMCostCalculator({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [model, setModel] = useState("gpt-4-turbo");
  const [inputTokens, setInputTokens] = useState("");
  const [outputTokens, setOutputTokens] = useState("");
  const [requests, setRequests] = useState("1000");

  const pricing: Record<string, { input: number; output: number }> = {
    "gpt-4-turbo": { input: 10, output: 30 },
    "gpt-4": { input: 30, output: 60 },
    "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
    "claude-3-opus": { input: 15, output: 75 },
    "claude-3-sonnet": { input: 3, output: 15 },
    "claude-3-haiku": { input: 0.25, output: 1.25 },
    "gemini-pro": { input: 0.5, output: 1.5 },
    "llama-2-70b": { input: 0.7, output: 0.9 },
  };

  const calculate = () => {
    const price = pricing[model];
    if (!price || !inputTokens || !outputTokens) return null;
    const inputCost = (Number(inputTokens) / 1000000) * price.input;
    const outputCost = (Number(outputTokens) / 1000000) * price.output;
    const totalPerRequest = inputCost + outputCost;
    const totalCost = totalPerRequest * Number(requests);
    return { inputCost, outputCost, totalPerRequest, totalCost };
  };

  const result = calculate();

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-xl">LLM Cost Calculator</CardTitle>
        </div>
        <CardDescription className="text-sm">Calculate API costs for different LLM models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(pricing).map((m) => (
                <SelectItem key={m} value={m}>
                  {m} (${pricing[m].input}/1M input, ${pricing[m].output}/1M output)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Input Tokens</Label>
            <Input
              type="number"
              value={inputTokens}
              onChange={(e) => setInputTokens(e.target.value)}
              placeholder="1000"
            />
          </div>
          <div>
            <Label>Output Tokens</Label>
            <Input
              type="number"
              value={outputTokens}
              onChange={(e) => setOutputTokens(e.target.value)}
              placeholder="500"
            />
          </div>
        </div>
        <div>
          <Label>Number of Requests</Label>
          <Input
            type="number"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="1000"
          />
        </div>
        {result && (
          <div className="space-y-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
            <div className="flex justify-between">
              <span>Input Cost:</span>
              <span className="font-semibold">${result.inputCost.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Output Cost:</span>
              <span className="font-semibold">${result.outputCost.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Request:</span>
              <span className="font-semibold">${result.totalPerRequest.toFixed(6)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-green-200 dark:border-green-800">
              <span>Total Cost:</span>
              <span className="text-green-600 dark:text-green-400">${result.totalCost.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Token Counter Tool
function TokenCounterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [text, setText] = useState("");

  const estimateTokens = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(w => w).length;
    const charCount = text.length;
    const tokenEstimate1 = Math.ceil(wordCount / 0.75);
    const tokenEstimate2 = Math.ceil(charCount / 4);
    return {
      words: wordCount,
      characters: charCount,
      estimateAvg: Math.ceil((tokenEstimate1 + tokenEstimate2) / 2),
      estimateMin: Math.min(tokenEstimate1, tokenEstimate2),
      estimateMax: Math.max(tokenEstimate1, tokenEstimate2),
    };
  };

  const tokens = text ? estimateTokens(text) : null;

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">Token Counter</CardTitle>
        </div>
        <CardDescription className="text-sm">Estimate token count for your text (approximate)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to count tokens..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
        {tokens && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50 text-center">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{tokens.estimateAvg}</div>
                <div className="text-sm text-muted-foreground mt-1">Estimated Tokens</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50 text-center">
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">{tokens.words}</div>
                <div className="text-sm text-muted-foreground mt-1">Words</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 text-center">
                <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{tokens.characters}</div>
                <div className="text-sm text-muted-foreground mt-1">Characters</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl border border-amber-200/50 dark:border-amber-800/50 text-center">
                <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">{tokens.estimateMin} - {tokens.estimateMax}</div>
                <div className="text-xs text-muted-foreground mt-1">Token Range</div>
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm border border-blue-200 dark:border-blue-800">
              <strong>Note:</strong> This is an approximation. Actual token counts vary by model. GPT models typically use ~4 characters per token, while some models may differ.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// LLM Use Cases Tool
function LLMUseCasesTool() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const useCases: Record<string, Array<{ title: string; description: string; bestModel: string; example: string }>> = {
    "Content Creation": [
      {
        title: "Blog Post Writing",
        description: "Generate blog posts on any topic with proper structure and SEO optimization",
        bestModel: "GPT-4 Turbo / Claude 3 Opus",
        example: "Write a 1000-word blog post about sustainable energy solutions"
      },
      {
        title: "Social Media Content",
        description: "Create engaging social media posts, captions, and hashtags",
        bestModel: "GPT-3.5 Turbo / Claude 3 Haiku",
        example: "Create 5 Instagram captions for a coffee shop"
      },
      {
        title: "Email Writing",
        description: "Compose professional emails, newsletters, and marketing campaigns",
        bestModel: "Claude 3 Sonnet / GPT-4 Turbo",
        example: "Write a professional follow-up email after a job interview"
      },
    ],
    "Development": [
      {
        title: "Code Generation",
        description: "Generate code snippets, functions, and complete applications",
        bestModel: "GPT-4 Turbo / Claude 3 Opus",
        example: "Create a React component for a user profile card with TypeScript"
      },
      {
        title: "Code Review",
        description: "Review code for bugs, security issues, and best practices",
        bestModel: "GPT-4 Turbo / Claude 3 Opus",
        example: "Review this Python function for security vulnerabilities"
      },
      {
        title: "Documentation",
        description: "Generate code documentation, README files, and API docs",
        bestModel: "Claude 3 Opus / GPT-4 Turbo",
        example: "Generate documentation for this REST API endpoint"
      },
    ],
    "Business": [
      {
        title: "Data Analysis",
        description: "Analyze data, create insights, and generate reports",
        bestModel: "GPT-4 Turbo / Claude 3 Opus",
        example: "Analyze this sales data and provide insights"
      },
      {
        title: "Market Research",
        description: "Research markets, competitors, and industry trends",
        bestModel: "Claude 3 Opus / GPT-4 Turbo",
        example: "Analyze the competitive landscape for electric vehicles"
      },
      {
        title: "Customer Support",
        description: "Automate customer service, FAQs, and support tickets",
        bestModel: "GPT-3.5 Turbo / Claude 3 Haiku",
        example: "Respond to customer inquiry about refund policy"
      },
    ],
    "Education": [
      {
        title: "Tutoring",
        description: "Explain concepts, answer questions, and provide learning materials",
        bestModel: "GPT-4 Turbo / Claude 3 Opus",
        example: "Explain quantum physics in simple terms"
      },
      {
        title: "Study Notes",
        description: "Create study notes, summaries, and flashcards",
        bestModel: "Claude 3 Opus / GPT-4 Turbo",
        example: "Create study notes from this lecture transcript"
      },
      {
        title: "Language Learning",
        description: "Practice conversations, translations, and grammar",
        bestModel: "GPT-3.5 Turbo / Claude 3 Sonnet",
        example: "Help me practice Spanish conversation about daily routines"
      },
    ],
    "Creative": [
      {
        title: "Story Writing",
        description: "Write stories, scripts, poetry, and creative content",
        bestModel: "GPT-4 Turbo / Claude 3 Opus",
        example: "Write a short story about time travel"
      },
      {
        title: "Brainstorming",
        description: "Generate ideas, concepts, and creative solutions",
        bestModel: "GPT-4 Turbo / Claude 3 Sonnet",
        example: "Brainstorm 10 startup ideas in the healthcare sector"
      },
    ],
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-xl">LLM Use Cases Library</CardTitle>
        </div>
        <CardDescription className="text-sm">Explore practical use cases and examples for LLMs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a category..." />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(useCases).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedCategory && useCases[selectedCategory] && (
          <div className="space-y-3">
            {useCases[selectedCategory].map((useCase, index) => (
              <div key={index} className="p-4 border rounded-xl hover:bg-muted/50 transition-colors space-y-2">
                <div className="font-bold text-lg">{useCase.title}</div>
                <div className="text-sm text-muted-foreground">{useCase.description}</div>
                <div className="text-sm">
                  <span className="font-semibold">Best Model: </span>
                  <span className="text-primary">{useCase.bestModel}</span>
                </div>
                <div className="p-3 bg-muted rounded-lg text-sm border">
                  <span className="font-semibold">Example: </span>
                  <span className="italic">{useCase.example}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Model Info Tool - Simplified version
function ModelInfoTool() {
  const [selectedModel, setSelectedModel] = useState("");

  const modelInfo: Record<string, {
    provider: string;
    contextWindow: string;
    parameters: string;
    bestFor: string[];
    pricing: string;
    strengths: string[];
    weaknesses: string[];
  }> = {
    "gpt-4-turbo": {
      provider: "OpenAI",
      contextWindow: "128K tokens",
      parameters: "Unknown (rumored ~1T)",
      bestFor: ["Complex reasoning", "Code generation", "Long-form content", "Analysis"],
      pricing: "$10/1M input, $30/1M output",
      strengths: ["Best reasoning", "Large context", "Code understanding", "Accuracy"],
      weaknesses: ["Expensive", "Slower than GPT-3.5", "Rate limits"],
    },
    "gpt-3.5-turbo": {
      provider: "OpenAI",
      contextWindow: "16K tokens",
      parameters: "Unknown",
      bestFor: ["General tasks", "Conversations", "Simple code", "Quick responses"],
      pricing: "$0.50/1M input, $1.50/1M output",
      strengths: ["Fast", "Cost-effective", "Widely available", "Good for most tasks"],
      weaknesses: ["Limited reasoning", "Smaller context", "Less accurate than GPT-4"],
    },
    "claude-3-opus": {
      provider: "Anthropic",
      contextWindow: "200K tokens",
      parameters: "Unknown (rumored ~1T)",
      bestFor: ["Long documents", "Analysis", "Writing", "Conversations"],
      pricing: "$15/1M input, $75/1M output",
      strengths: ["Largest context", "Excellent writing", "Detailed responses", "Safe"],
      weaknesses: ["Most expensive", "Slower", "Limited availability"],
    },
    "claude-3-sonnet": {
      provider: "Anthropic",
      contextWindow: "200K tokens",
      parameters: "Unknown",
      bestFor: ["Balanced tasks", "General use", "Analysis"],
      pricing: "$3/1M input, $15/1M output",
      strengths: ["Good balance", "Large context", "Reliable"],
      weaknesses: ["More expensive than GPT-3.5", "Less capable than Opus"],
    },
    "claude-3-haiku": {
      provider: "Anthropic",
      contextWindow: "200K tokens",
      parameters: "Unknown",
      bestFor: ["Fast tasks", "Simple queries", "High volume"],
      pricing: "$0.25/1M input, $1.25/1M output",
      strengths: ["Fastest", "Cheapest Claude", "Large context"],
      weaknesses: ["Less capable", "Simpler responses"],
    },
    "gemini-pro": {
      provider: "Google",
      contextWindow: "32K tokens",
      parameters: "Unknown",
      bestFor: ["General tasks", "Multimodal", "Search"],
      pricing: "$0.50/1M input, $1.50/1M output",
      strengths: ["Multimodal", "Fast", "Google integration"],
      weaknesses: ["Less capable than GPT-4", "Smaller context"],
    },
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-xl">LLM Model Information</CardTitle>
        </div>
        <CardDescription className="text-sm">Detailed information about popular LLM models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a model..." />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(modelInfo).map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedModel && modelInfo[selectedModel] && (
          <div className="space-y-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Provider</div>
                <div>{modelInfo[selectedModel].provider}</div>
              </div>
              <div>
                <div className="font-semibold">Context Window</div>
                <div>{modelInfo[selectedModel].contextWindow}</div>
              </div>
              <div>
                <div className="font-semibold">Parameters</div>
                <div>{modelInfo[selectedModel].parameters}</div>
              </div>
              <div>
                <div className="font-semibold">Pricing</div>
                <div>{modelInfo[selectedModel].pricing}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2">Best For</div>
              <div className="flex flex-wrap gap-2">
                {modelInfo[selectedModel].bestFor.map((use, i) => (
                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    {use}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2 text-green-600">Strengths</div>
              <ul className="list-disc list-inside space-y-1">
                {modelInfo[selectedModel].strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2 text-orange-600">Weaknesses</div>
              <ul className="list-disc list-inside space-y-1">
                {modelInfo[selectedModel].weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Prompt Builder Tool
function PromptBuilderTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [role, setRole] = useState("");
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const buildPrompt = () => {
    let prompt = "";
    if (role) prompt += `You are ${role}.\n\n`;
    if (task) prompt += `Task: ${task}\n\n`;
    if (context) prompt += `Context: ${context}\n\n`;
    if (constraints) prompt += `Constraints: ${constraints}\n\n`;
    if (outputFormat) prompt += `Output Format: ${outputFormat}\n\n`;
    setGeneratedPrompt(prompt.trim());
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <MessageSquare className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <CardTitle className="text-xl">Prompt Builder</CardTitle>
        </div>
        <CardDescription className="text-sm">Build effective prompts for LLMs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Role/Persona</Label>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Expert software engineer, Professional writer"
          />
        </div>
        <div>
          <Label>Task</Label>
          <Textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What should the LLM do?"
            className="min-h-[100px]"
          />
        </div>
        <div>
          <Label>Context (Optional)</Label>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Additional context or background information"
            className="min-h-[100px]"
          />
        </div>
        <div>
          <Label>Output Format (Optional)</Label>
          <Input
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            placeholder="e.g., JSON, Markdown, List, Paragraph"
          />
        </div>
        <div>
          <Label>Constraints (Optional)</Label>
          <Textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="e.g., Maximum 500 words, Use simple language"
            className="min-h-[80px]"
          />
        </div>
        <Button onClick={buildPrompt} className="w-full">
          Build Prompt
        </Button>
        {generatedPrompt && (
          <>
            <div>
              <Label>Generated Prompt</Label>
              <Textarea
                value={generatedPrompt}
                readOnly
                className="min-h-[200px] font-mono"
              />
            </div>
            <Button onClick={() => copyWithToast(generatedPrompt, "Prompt")} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Prompt
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// API Usage Calculator
function APIUsageCalculator({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [dailyRequests, setDailyRequests] = useState("1000");
  const [avgInputTokens, setAvgInputTokens] = useState("500");
  const [avgOutputTokens, setAvgOutputTokens] = useState("200");

  const pricing: Record<string, { input: number; output: number }> = {
    "gpt-4-turbo": { input: 10, output: 30 },
    "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
    "claude-3-opus": { input: 15, output: 75 },
    "claude-3-sonnet": { input: 3, output: 15 },
    "claude-3-haiku": { input: 0.25, output: 1.25 },
  };

  const calculate = () => {
    const price = pricing[model];
    if (!price) return null;
    const dailyInputCost = (Number(avgInputTokens) / 1000000) * price.input * Number(dailyRequests);
    const dailyOutputCost = (Number(avgOutputTokens) / 1000000) * price.output * Number(dailyRequests);
    const dailyTotal = dailyInputCost + dailyOutputCost;
    const monthlyTotal = dailyTotal * 30;
    const yearlyTotal = dailyTotal * 365;
    return { dailyTotal, monthlyTotal, yearlyTotal, dailyInputCost, dailyOutputCost };
  };

  const result = calculate();

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <CardTitle className="text-xl">API Usage Cost Calculator</CardTitle>
        </div>
        <CardDescription className="text-sm">Calculate costs based on your expected API usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(pricing).map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Daily Requests</Label>
          <Input
            type="number"
            value={dailyRequests}
            onChange={(e) => setDailyRequests(e.target.value)}
            placeholder="1000"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Avg Input Tokens per Request</Label>
            <Input
              type="number"
              value={avgInputTokens}
              onChange={(e) => setAvgInputTokens(e.target.value)}
              placeholder="500"
            />
          </div>
          <div>
            <Label>Avg Output Tokens per Request</Label>
            <Input
              type="number"
              value={avgOutputTokens}
              onChange={(e) => setAvgOutputTokens(e.target.value)}
              placeholder="200"
            />
          </div>
        </div>
        {result && (
          <div className="space-y-3 p-4 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 rounded-xl border border-teal-200/50 dark:border-teal-800/50">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-2xl font-bold text-primary">${result.dailyTotal.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Daily</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-2xl font-bold text-primary">${result.monthlyTotal.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Monthly</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-2xl font-bold text-primary">${result.yearlyTotal.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Yearly</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Model Recommender Tool
function ModelRecommenderTool() {
  const [budget, setBudget] = useState("");
  const [taskType, setTaskType] = useState("");
  const [speed, setSpeed] = useState("");
  const [quality, setQuality] = useState("");
  const [recommendations, setRecommendations] = useState<Array<{ model: string; score: number; reason: string }>>([]);

  const recommend = () => {
    const models = [
      { model: "gpt-4-turbo", budget: "high", speed: "medium", quality: "high" },
      { model: "gpt-3.5-turbo", budget: "low", speed: "high", quality: "medium" },
      { model: "claude-3-opus", budget: "high", speed: "low", quality: "high" },
      { model: "claude-3-sonnet", budget: "medium", speed: "medium", quality: "high" },
      { model: "claude-3-haiku", budget: "low", speed: "high", quality: "medium" },
    ];

    const scores = models.map(m => {
      let score = 0;
      if (budget && m.budget === budget) score += 3;
      if (speed && m.speed === speed) score += 2;
      if (quality && m.quality === quality) score += 3;
      
      let reason = "";
      if (m.budget === budget) reason += "Matches budget requirement. ";
      if (m.speed === speed) reason += "Meets speed requirement. ";
      if (m.quality === quality) reason += "Meets quality requirement.";
      
      return { model: m.model, score, reason: reason || "General purpose model." };
    });

    setRecommendations(scores.sort((a, b) => b.score - a.score).filter(r => r.score > 0));
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <CardTitle className="text-xl">LLM Model Recommender</CardTitle>
        </div>
        <CardDescription className="text-sm">Get personalized model recommendations based on your needs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Budget</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low ($0.25-1.50 per 1M tokens)</SelectItem>
              <SelectItem value="medium">Medium ($3-15 per 1M tokens)</SelectItem>
              <SelectItem value="high">High ($15+ per 1M tokens)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Speed Requirement</Label>
          <Select value={speed} onValueChange={setSpeed}>
            <SelectTrigger>
              <SelectValue placeholder="Select speed..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High (Fast responses needed)</SelectItem>
              <SelectItem value="medium">Medium (Moderate speed)</SelectItem>
              <SelectItem value="low">Low (Speed not critical)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Quality Requirement</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger>
              <SelectValue placeholder="Select quality..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High (Best quality needed)</SelectItem>
              <SelectItem value="medium">Medium (Good quality)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={recommend} className="w-full">
          Get Recommendations
        </Button>
        {recommendations.length > 0 && (
          <div className="space-y-3">
            <div className="font-semibold text-lg">Recommended Models</div>
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={rec.model} className="p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-lg">#{index + 1} {rec.model}</div>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                    Match: {rec.score}/8
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{rec.reason}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
