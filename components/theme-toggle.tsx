"use client"

import { useTheme, type Theme } from "@/components/theme-provider"

const THEME_LABELS: Record<Theme, { next: string; label: string }> = {
  bauhaus: { next: "retro", label: "Retro" },
  retro: { next: "brutalism", label: "Brutal" },
  brutalism: { next: "japandi", label: "Japandi" },
  japandi: { next: "bauhaus", label: "Bauhaus" },
}

function ThemeIcon({ theme }: { theme: Theme }) {
  switch (theme) {
    case "bauhaus":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="1" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case "retro":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="2.5" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case "brutalism":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1="4" y1="4.5" x2="12" y2="4.5" stroke="currentColor" strokeWidth="0.8" />
          <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="0.8" />
          <line x1="4" y1="11.5" x2="12" y2="11.5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      )
    case "japandi":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="4" r="3" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="10" width="14" height="5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
  }
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { next, label } = THEME_LABELS[theme]

  const fontClass = theme === "retro" ? "font-mono" : theme === "japandi" ? "font-serif" : "font-sans"

  return (
    <button
      onClick={toggle}
      className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 border border-foreground bg-card px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background ${fontClass}`}
      style={{ borderRadius: "var(--radius)" }}
      aria-label={`Switch to ${label} theme`}
    >
      <ThemeIcon theme={next as Theme} />
      <span>{label}</span>
    </button>
  )
}
