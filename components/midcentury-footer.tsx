export function MidcenturyFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-card px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-6" aria-hidden="true">
          <div className="h-1 w-6 rounded-full bg-primary/30" />
          <div className="h-1 w-4 rounded-full bg-secondary/30" />
          <div className="h-1 flex-1 bg-border" />
        </div>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
            {year} Matt Polaniecki
          </p>
          <a
            href="https://github.com/mattpolanieckidev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
