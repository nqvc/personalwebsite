"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "light");
  }, []);

  function toggle() {
    const next: Theme = (document.documentElement.dataset.theme as Theme) === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 350);
    }
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — preference lasts for this page view only */
    }
    setTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className="icon-button" onClick={toggle} aria-label={label} title={label}>
      <Sun className="theme-icon theme-icon--sun" size={17} strokeWidth={1.5} aria-hidden />
      <Moon className="theme-icon theme-icon--moon" size={17} strokeWidth={1.5} aria-hidden />
    </button>
  );
}
