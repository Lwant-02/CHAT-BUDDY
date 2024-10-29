"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light-mode");

  // Safely access localStorage only on the client side
  useEffect(() => {
    const storedTheme = localStorage?.getItem("theme") || "light-mode";
    setTheme(storedTheme);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light-mode" ? "dark-mode" : "light-mode";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Context should not be use outside of the ThemeProvider!");
  return context;
}
export { useThemeContext };
