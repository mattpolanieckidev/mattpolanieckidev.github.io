export function MinimalismFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-muted-foreground">{year}</p>
        <a
          href="https://github.com/mattpolanieckidev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
