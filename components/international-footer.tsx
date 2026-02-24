export function InternationalFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-foreground text-background px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-background/50">
          {year} Matt Polaniecki
        </p>
        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-widest text-background/70 hover:text-background transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
