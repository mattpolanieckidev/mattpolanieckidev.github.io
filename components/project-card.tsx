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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between bg-card p-6 md:p-8 transition-colors hover:bg-muted"
    >
      {/* Geometric accent bar */}
      <div className={`absolute top-0 left-0 h-1.5 w-12 ${accentColor}`} />

      <div>
        {/* Index number -- Bauhaus numbering style */}
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

      {/* Arrow link */}
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
