"use client"

import { useTheme, THEMES, type Theme } from "@/components/theme-provider"
import { useState } from "react"

const THEME_META: Record<Theme, { label: string; short: string }> = {
  bauhaus: { label: "Bauhaus", short: "BAU" },
  retro: { label: "Retro-Futuristic", short: "RET" },
  brutalism: { label: "Brutalism", short: "BRT" },
  japandi: { label: "Japandi", short: "JPN" },
  international: { label: "International", short: "INT" },
  scandinavian: { label: "Scandinavian", short: "SCN" },
  artdeco: { label: "Art Deco", short: "DEC" },
  minimalism: { label: "Minimalism", short: "MIN" },
  midcentury: { label: "Mid-Century", short: "MCM" },
  destijl: { label: "De Stijl", short: "DST" },
  postmodern: { label: "Postmodernism", short: "PMO" },
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const fontClass =
    theme === "retro" ? "font-mono" :
    theme === "japandi" || theme === "scandinavian" ? "font-serif" :
    "font-sans"

  return (
    <div className="fixed top-5 right-5 z-50">
      {/* Current theme button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2.5 border border-foreground bg-card px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background ${fontClass}`}
        style={{ borderRadius: "var(--radius)" }}
        aria-label="Select design theme"
        aria-expanded={open}
      >
        <span className="text-primary">{THEME_META[theme].short}</span>
        <span className="hidden sm:inline">{THEME_META[theme].label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="mt-1 flex flex-col border border-foreground bg-card overflow-hidden max-h-[70vh] overflow-y-auto"
          style={{ borderRadius: "var(--radius)" }}
        >
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t)
                setOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest transition-colors ${
                t === theme
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span className={`w-8 ${t === theme ? "text-primary-foreground" : "text-primary"}`}>
                {THEME_META[t].short}
              </span>
              <span>{THEME_META[t].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
