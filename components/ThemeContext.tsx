"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: "dark" | "light";
    setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");
    const [resolvedTheme, setResolved] = useState<"dark" | "light">("dark");

    // Read from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved && ["dark", "light", "system"].includes(saved)) {
            setThemeState(saved);
        }
    }, []);

    // Resolve system preference and apply
    useEffect(() => {
        const apply = () => {
            let resolved: "dark" | "light" = "dark";
            if (theme === "system") {
                resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            } else {
                resolved = theme;
            }
            setResolved(resolved);

            const root = document.documentElement;
            if (resolved === "dark") {
                root.classList.add("dark");
                root.classList.remove("light");
            } else {
                root.classList.add("light");
                root.classList.remove("dark");
            }
        };

        apply();

        // Listen for system theme changes
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => { if (theme === "system") apply(); };
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, [theme]);

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t);
        localStorage.setItem("theme", t);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
