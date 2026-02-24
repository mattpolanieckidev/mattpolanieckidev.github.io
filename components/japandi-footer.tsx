export function JapandiFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-card px-6 py-14 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-border/50 mb-10" aria-hidden="true" />

        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-[0.25em] text-muted-foreground">
            {year} Matt Polaniecki
          </p>

          <a
            href="https://github.com/mattpolanieckidev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
