export function PostmodernFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-card px-6 py-10 md:px-10 lg:px-16">
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20" aria-hidden="true" />
      <div className="mx-auto max-w-6xl flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-primary/40" aria-hidden="true" />
          <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground">
            {year} Matt Polaniecki
          </p>
        </div>
        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
