export function RetroHeader() {
  return (
    <header className="scanlines relative overflow-hidden bg-muted px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32">
      {/* Orbital rings */}
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full border border-primary/20 md:h-96 md:w-96"
        aria-hidden="true"
      />
      <div
        className="absolute -right-10 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full border border-primary/10 md:h-64 md:w-64"
        aria-hidden="true"
      />
      <div
        className="absolute right-16 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-secondary md:right-24"
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div className="h-full w-full" style={{
          backgroundImage: "linear-gradient(hsl(175 85% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(175 85% 45%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="block h-2 w-2 rounded-full bg-primary cursor-blink" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">
            System Online
          </p>
        </div>

        <h1 className="text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
          Matt
          <br />
          <span className="text-primary">Polaniecki</span>
        </h1>

        <div className="mt-8 h-px w-32 bg-primary/40" aria-hidden="true" />

        <p className="mt-8 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
          {'>'} A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="block h-1.5 w-8 rounded-full bg-primary" aria-hidden="true" />
          <span className="block h-1.5 w-5 rounded-full bg-secondary" aria-hidden="true" />
          <span className="block h-1.5 w-3 rounded-full bg-muted-foreground" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
