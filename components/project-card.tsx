"use client"

import { useTheme } from "@/components/theme-provider"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  href: string
  accentColor: string
  index: number
}

export function ProjectCard({
  title,
  description,
  href,
  accentColor,
  index,
}: ProjectCardProps) {
  const { theme } = useTheme()

  /* ── Brutalism ── */
  if (theme === "brutalism") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="brutal-shadow group relative flex flex-col justify-between border-3 border-foreground bg-card p-5 md:p-6 transition-all"
        style={{ borderWidth: "3px" }}
      >
        <div
          className={`absolute top-0 left-0 h-full w-2 ${accentColor}`}
          aria-hidden="true"
        />

        <div className="pl-3">
          <span className="block text-xs font-black tracking-widest text-muted-foreground mb-2">
            #{String(index + 1).padStart(2, "0")}
          </span>

          <h2 className="text-lg font-black uppercase tracking-wide text-foreground">
            {title}
          </h2>

          <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-4 pl-3 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Open
          </span>
          <span
            className="flex h-8 w-8 items-center justify-center border-2 border-foreground text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </a>
    )
  }

  /* ── Japandi ── */
  if (theme === "japandi") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="japandi-card group relative flex flex-col justify-between bg-card p-7 md:p-8 transition-all"
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`block h-px w-6 ${accentColor}`}
              aria-hidden="true"
            />
          </div>

          <h2 className="font-serif text-lg font-light text-foreground">
            {title}
          </h2>

          <p className="mt-3 text-xs leading-[1.8] text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.25em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
            open
          </span>
          <span className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    )
  }

  /* ── Retro-Futuristic ── */
  if (theme === "retro") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="glow-hover group relative flex flex-col justify-between bg-card p-6 md:p-8 border border-border transition-all hover:border-primary/40"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs tracking-widest text-primary/60">
              [{String(index + 1).padStart(2, "0")}]
            </span>
            <span className={`block h-1 w-6 rounded-full ${accentColor}`} aria-hidden="true" />
          </div>

          <h2 className="font-mono text-base font-bold uppercase tracking-wide text-foreground">
            {title}
          </h2>

          <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
            {'>'} open
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-primary/30 text-primary transition-colors group-hover:bg-primary group-hover:text-background">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    )
  }

  /* ── Bauhaus (default) ── */
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between bg-card p-6 md:p-8 transition-colors hover:bg-muted"
    >
      <div className={`absolute top-0 left-0 h-1.5 w-12 ${accentColor}`} />

      <div>
        <span className="block text-xs font-medium tracking-widest text-muted-foreground mb-4">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h2 className="text-lg font-bold uppercase tracking-wide text-foreground">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          Open
        </span>
        <span className="flex h-8 w-8 items-center justify-center border border-foreground text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  )
}
