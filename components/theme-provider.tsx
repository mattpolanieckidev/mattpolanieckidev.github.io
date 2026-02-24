"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Theme = "bauhaus" | "retro" | "brutalism" | "japandi"

const THEMES: Theme[] = ["bauhaus", "retro", "brutalism", "japandi"]

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "bauhaus",
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("bauhaus")

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const idx = THEMES.indexOf(prev)
      const next = THEMES[(idx + 1) % THEMES.length]
      document.documentElement.setAttribute("data-theme", next)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
