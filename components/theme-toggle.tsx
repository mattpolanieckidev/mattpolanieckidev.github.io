"use client"

import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="fixed top-5 right-5 z-50 flex items-center gap-2.5 border border-foreground bg-card px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
      aria-label={`Switch to ${theme === "bauhaus" ? "retro-futuristic" : "Bauhaus"} theme`}
    >
      {theme === "bauhaus" ? (
        <>
          {/* Radar / retro icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="1" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>Retro</span>
        </>
      ) : (
        <>
          {/* Geometric Bauhaus icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="4" r="3" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="10" width="14" height="5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>Bauhaus</span>
        </>
      )}
    </button>
  )
}
