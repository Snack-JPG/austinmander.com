"use client";

import * as React from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const accentThemes = [
  { name: "Emerald", value: "theme-emerald", color: "bg-emerald-500" },
  { name: "Navy", value: "theme-navy", color: "bg-blue-500" },
  { name: "Pink", value: "theme-pink", color: "bg-pink-500" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [, setAccentTheme] = React.useState("theme-emerald");

  React.useEffect(() => {
    const stored = localStorage.getItem("accent-theme") || "theme-emerald";
    setAccentTheme(stored);
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, "")
      .concat(` ${stored}`);
  }, []);

  const handleAccentChange = (accent: string) => {
    setAccentTheme(accent);
    localStorage.setItem("accent-theme", accent);
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, "")
      .concat(` ${accent}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Change accent color</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {accentThemes.map((accent) => (
            <DropdownMenuItem
              key={accent.value}
              onClick={() => handleAccentChange(accent.value)}
              className="flex items-center gap-2"
            >
              <div className={`h-3 w-3 rounded-full ${accent.color}`} />
              {accent.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
