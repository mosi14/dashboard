import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(localStorage.getItem("theme") as "light" | "dark" || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};