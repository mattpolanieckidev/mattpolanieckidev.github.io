export function ArtDecoFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-foreground text-primary px-6 py-10 md:px-10 lg:px-16">
      <div className="deco-line absolute top-0 left-0 right-0 h-px" aria-hidden="true" />
      <div className="mx-auto max-w-6xl flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/50">
          {year} Matt Polaniecki
        </p>
        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70 hover:text-primary transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
