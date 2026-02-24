"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Theme =
  | "bauhaus"
  | "retro"
  | "brutalism"
  | "japandi"
  | "international"
  | "scandinavian"
  | "artdeco"
  | "minimalism"
  | "midcentury"
  | "destijl"
  | "postmodern"

export const THEMES: Theme[] = [
  "bauhaus",
  "retro",
  "brutalism",
  "japandi",
  "international",
  "scandinavian",
  "artdeco",
  "minimalism",
  "midcentury",
  "destijl",
  "postmodern",
]

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "bauhaus",
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, _setTheme] = useState<Theme>("bauhaus")

  const setTheme = useCallback((t: Theme) => {
    _setTheme(t)
    document.documentElement.setAttribute("data-theme", t)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
