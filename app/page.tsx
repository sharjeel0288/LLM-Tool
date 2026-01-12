"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Brain,
  Globe,
  ArrowLeftRight,
  Code,
  Zap,
  TrendingUp,
  Sparkles,
  Search,
  Calculator,
} from "lucide-react";

const categories = [
  {
    name: "Text Tools",
    href: "/text",
    icon: FileText,
    description: "Text analysis, formatting, encoding, and manipulation tools",
    tools: 12,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "LLM Tools",
    href: "/llm",
    icon: Brain,
    description: "Model comparison, cost calculators, prompts, and recommendations",
    tools: 8,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Web & APIs",
    href: "/web",
    icon: Globe,
    description: "Free API integrations: weather, news, currency, IP lookup, and more",
    tools: 10,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Converters",
    href: "/converter",
    icon: ArrowLeftRight,
    description: "Format converters, encoders, decoders, and transformers",
    tools: 8,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Code Tools",
    href: "/code",
    icon: Code,
    description: "Code formatters, minifiers, validators, and generators",
    tools: 6,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Generators",
    href: "/generators",
    icon: Zap,
    description: "Password, UUID, QR code, and data generators",
    tools: 6,
    color: "from-yellow-500 to-orange-500",
  },
];

const featuredTools = [
  {
    name: "LLM Model Comparison",
    category: "LLM Tools",
    description: "Compare GPT-4, Claude 3, Gemini and find the best model for your task",
    href: "/llm",
  },
  {
    name: "Free API Integrations",
    category: "Web & APIs",
    description: "Weather, news, currency conversion, IP geolocation and more",
    href: "/web",
  },
  {
    name: "Cost Calculator",
    category: "LLM Tools",
    description: "Calculate API costs for different LLM models and usage patterns",
    href: "/llm",
  },
  {
    name: "Real-time Data",
    category: "Web & APIs",
    description: "Access latest information from free public APIs",
    href: "/web",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            LLM Toolkit
          </h1>
          <p className="text-2xl lg:text-3xl text-muted-foreground mb-4">
            50+ Powerful Developer Tools
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive collection of text tools, LLM utilities, free API integrations, converters, and code tools.
            All powered by open-source technologies and free APIs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/text">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link href="/llm">Explore LLM Tools</Link>
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Tool Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{category.tools} tools</span>
                      <Button variant="ghost" size="sm">
                        Explore →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{tool.name}</CardTitle>
                        <CardDescription className="mt-1">{tool.category}</CardDescription>
                      </div>
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">50+</div>
              <div className="text-sm text-muted-foreground text-center mt-2">Total Tools</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">6</div>
              <div className="text-sm text-muted-foreground text-center mt-2">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">100%</div>
              <div className="text-sm text-muted-foreground text-center mt-2">Free APIs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">Latest</div>
              <div className="text-sm text-muted-foreground text-center mt-2">2024 Info</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
