import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "portfolio_theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content", theme === "dark" ? "#0d100f" : "#f4f3ee"
    );
    // A blocked storage API must not prevent visitors from changing themes.
    try {
      localStorage.setItem(storageKey, theme);
    } catch { /* Keep the preference for this visit. */ }
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) {
        setTheme(event.newValue === "dark" ? "dark" : "light");
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  return { theme, toggleTheme: () => setTheme(current => current === "light" ? "dark" : "light") };
}
