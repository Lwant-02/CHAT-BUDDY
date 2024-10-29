import React from "react";
import { useThemeContext } from "@/context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Theme() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      className="flex items-center cursor-pointer transition-all duration-300"
      onClick={toggleTheme}
    >
      {theme === "light-mode" ? (
        <span className="flex gap-[0.30rem] items-center justify-center">
          <LightModeIcon className="text-yellow-700" />
          <span className="text-grey-800">Light</span>
        </span>
      ) : (
        <span className="flex gap-[0.38rem] items-center justify-center">
          <DarkModeIcon className="text-grey-700" />
          <span className="text-grey-800">Dark</span>
        </span>
      )}
    </button>
  );
}
