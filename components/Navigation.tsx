"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  Brain,
  Globe,
  ArrowLeftRight,
  Code,
  Zap,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Text Tools", href: "/text", icon: FileText },
  { name: "LLM Tools", href: "/llm", icon: Brain },
  { name: "Web & APIs", href: "/web", icon: Globe },
  { name: "Converters", href: "/converter", icon: ArrowLeftRight },
  { name: "Code Tools", href: "/code", icon: Code },
  { name: "Generators", href: "/generators", icon: Zap },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-4 overflow-y-auto">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg">LLM Toolkit</div>
            <div className="text-xs text-muted-foreground">50+ Tools</div>
          </div>
        </Link>
      </div>
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

