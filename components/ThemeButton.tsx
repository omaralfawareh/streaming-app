"use client";

import { useTheme } from "@/providers/ThemeProvider";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? "dark" : "light"}
    </button>
  );
};

export default ThemeButton;
