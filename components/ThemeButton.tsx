"use client";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
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
      {theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
    </button>
  );
};

export default ThemeButton;
