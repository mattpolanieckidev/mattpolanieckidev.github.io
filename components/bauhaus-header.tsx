export function BauhausHeader() {
  return (
    <header className="relative overflow-hidden bg-foreground text-background px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32">
      {/* Geometric shapes */}
      <div className="absolute top-0 right-0 h-32 w-32 bg-primary md:h-48 md:w-48" aria-hidden="true" />
      <div className="absolute bottom-0 right-32 h-20 w-20 rounded-full bg-secondary md:right-48 md:h-28 md:w-28" aria-hidden="true" />
      <div className="absolute top-16 right-36 h-16 w-16 bg-accent md:right-52 md:h-24 md:w-24" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/60 mb-6">
          Portfolio
        </p>

        <h1 className="text-4xl font-bold uppercase tracking-tight md:text-6xl lg:text-7xl text-balance">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-8 h-px w-24 bg-background/30" aria-hidden="true" />

        <p className="mt-8 max-w-md text-sm leading-relaxed text-background/70 md:text-base">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <span className="block h-3 w-3 bg-primary" aria-hidden="true" />
          <span className="block h-3 w-3 bg-secondary" aria-hidden="true" />
          <span className="block h-3 w-3 bg-accent" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
