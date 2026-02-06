import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  href: string
}

export function ProjectCard({ title, description, href }: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[var(--radius)] border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
        {title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Visit
        <ExternalLink className="h-4 w-4" />
      </span>
    </a>
  )
}
