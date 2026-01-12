"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Sparkles } from "lucide-react";

interface QuickTool {
  name: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

interface QuickToolsProps {
  tools: QuickTool[];
  title?: string;
}

export function QuickTools({ tools, title = "Quick Tools" }: QuickToolsProps) {
  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 via-primary/10/50 to-primary/5 rounded-2xl border border-primary/20 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">Jump to any tool instantly</p>
          </div>
        </div>
        <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary">
          {tools.length} tools
        </div>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} scroll={true}>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-start gap-2 p-4 min-w-[160px] hover:bg-primary/10 hover:border-primary/30 hover:shadow-md transition-all group hover:scale-105"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {tool.icon}
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-primary" />
                </div>
                <div className="text-left w-full">
                  <div className="font-semibold text-sm group-hover:text-primary transition-colors">{tool.name}</div>
                  {tool.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{tool.description}</div>
                  )}
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

