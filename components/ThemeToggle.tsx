"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("theme");
            if (stored) {
                setTheme(stored);
                document.documentElement.classList.toggle("dark", stored === "dark");
            } else {
                // follow system preference
                const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
                setTheme(prefersDark ? "dark" : "light");
                document.documentElement.classList.toggle("dark", prefersDark);
            }
        } catch (e) {
            // ignore in SSR safety
        }
    }, []);

    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        try {
            localStorage.setItem("theme", next);
        } catch (e) { }
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    return (
        <button
            aria-label="Toggle color theme"
            title="Toggle color theme"
            onClick={toggle}
            className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 text-sm shadow-lg ring-1 ring-gray-900/5 dark:ring-white/5 backdrop-blur transition-colors"
        >
            {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="M4.93 4.93l1.41 1.41"></path>
                    <path d="M17.66 17.66l1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="M4.93 19.07l1.41-1.41"></path>
                    <path d="M17.66 6.34l1.41-1.41"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            )}
        </button>
    );
}
