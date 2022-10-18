import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import { useEffect, useState } from "react";

function useDarkMode() {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const [mode, setMode] = useState(() => {
    const lsVal = localStorage.getItem("colorMode");
    if (lsVal) {
      return lsVal === "dark" ? "dark" : "light";
    } else {
      return matchMedia(preferDarkQuery).matches ? "dark" : "light";
    }
  });

  useEffect(() => {
    const mediaQuery = matchMedia(preferDarkQuery);
    const handleChange = () => {
      setMode(mediaQuery.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  // we're doing it this way instead of as an effect so we only
  // set the localStorage value if they explicitly change the default
  return [mode, setMode] as const;
}

export default useDarkMode;
