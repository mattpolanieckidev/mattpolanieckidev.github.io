export function DestijlFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-background px-6 py-10 md:px-10 lg:px-16 border-t-4 border-foreground">
      <div className="mx-auto max-w-6xl flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground">
          {year} Matt Polaniecki
        </p>
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
