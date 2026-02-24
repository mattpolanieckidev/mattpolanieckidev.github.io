export function BrutalFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-foreground text-background px-6 py-10 md:px-10 lg:px-16 border-t-4 border-secondary">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-background/50">
          {year} Matt Polaniecki
        </p>

        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-shadow-sm inline-block border-2 border-background bg-secondary px-4 py-1.5 text-xs font-black uppercase tracking-widest text-foreground transition-all"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
