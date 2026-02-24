export function RetroFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-muted px-6 py-12 md:px-10 lg:px-16">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/30" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="block h-2 w-2 rounded-full bg-primary/60" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {year} Matt Polaniecki
          </p>
        </div>

        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-primary underline-offset-4 hover:underline"
        >
          {'>'} GitHub
        </a>
      </div>
    </footer>
  )
}
