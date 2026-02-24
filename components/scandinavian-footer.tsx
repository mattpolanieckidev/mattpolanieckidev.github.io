export function ScandinavianFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-card px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-border mb-8" aria-hidden="true" />
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-[0.2em] text-muted-foreground">
            {year} Matt Polaniecki
          </p>
          <a
            href="https://github.com/mattpolanieckidev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
