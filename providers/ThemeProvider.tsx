"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";

export type Theme = "dark" | "light" | null;

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
  userTheme = "dark",
}: PropsWithChildren & { userTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(userTheme);

  useEffect(() => {
    const defaultTheme = theme || "dark";
    Cookies.remove("theme");
    Cookies.set("theme", defaultTheme);

    const htmlDoc = document.getElementsByTagName("html")[0];
    if (defaultTheme === "dark") {
      htmlDoc.classList.add("dark");
      htmlDoc.classList.remove("light");
    } else {
      htmlDoc.classList.remove("dark");
      htmlDoc.classList.add("light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
