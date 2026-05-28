"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "size-8 rounded-lg",
          className
        )}
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "group relative size-8 rounded-lg flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:bg-muted/40",
        "focus-visible:ring-2 focus-visible:ring-accent-blue/30 focus-visible:outline-none",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className="size-[15px] rotate-0 scale-100 text-muted-foreground transition-all duration-300 group-hover:text-accent-blue/70 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[15px] rotate-90 scale-0 text-muted-foreground transition-all duration-300 group-hover:text-accent-blue/70 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
