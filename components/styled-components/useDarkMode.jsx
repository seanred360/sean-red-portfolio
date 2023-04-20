import { useEffect, useState } from "react";
import * as googleAnalytics from "../../lib/GoogleAnalytics";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const handleToggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
    googleAnalytics.event({
      action: `toggle_theme_${theme}`,
    });
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    setIsMounted(true);
  }, []);
  return [theme, handleToggleTheme, isMounted];
};
