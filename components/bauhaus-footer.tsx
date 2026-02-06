export function BauhausFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-foreground text-background px-6 py-12 md:px-10 lg:px-16">
      {/* Geometric accent */}
      <div className="absolute bottom-0 left-0 h-20 w-20 bg-primary" aria-hidden="true" />
      <div className="absolute bottom-0 left-20 h-12 w-12 bg-secondary" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-background/60">
          {year} Matt Polaniecki
        </p>

        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold uppercase tracking-widest text-background/80 underline-offset-4 hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
