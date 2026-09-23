import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Language } from "./portfolio";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof copy.ko | typeof copy.en;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function PortfolioLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem("mellowcat-language");
    return saved === "ko" || saved === "en" ? saved : navigator.language.startsWith("ko") ? "ko" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("mellowcat-language", language);
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage, t: copy[language] }}>{children}</LanguageContext.Provider>;
}

export function usePortfolioLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("PortfolioLanguageProvider is missing");
  return context;
}
