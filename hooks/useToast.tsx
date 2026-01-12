"use client";

import { useToast as useToastHook } from "@/components/ui/use-toast";

export function useCopyToast() {
  const { toast } = useToastHook();

  const copyWithToast = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return { copyWithToast, toast };
}

