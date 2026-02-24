export function MidcenturyHeader() {
  return (
    <header className="relative overflow-hidden bg-card px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32">
      {/* Atomic starburst */}
      <div className="absolute right-8 top-8 md:right-16 md:top-12" aria-hidden="true">
        <div className="relative h-40 w-40 md:h-56 md:w-56">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary" />
          </div>
          {[0, 45, 90, 135].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-primary/20"
              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
            />
          ))}
          <div className="absolute inset-6 rounded-full border border-primary/15" />
          <div className="absolute inset-12 rounded-full border border-primary/10" />
        </div>
      </div>

      {/* Boomerang shape accent */}
      <div className="absolute bottom-0 left-0 w-48 h-24 md:w-64 md:h-32" aria-hidden="true">
        <svg viewBox="0 0 200 80" className="w-full h-full text-secondary/20">
          <path d="M0 80 Q 100 0 200 40" stroke="currentColor" fill="none" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-6">
          Portfolio
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance leading-[1.1]">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-8 flex items-center gap-3" aria-hidden="true">
          <div className="h-3 w-8 rounded-full bg-primary" />
          <div className="h-3 w-5 rounded-full bg-secondary" />
          <div className="h-3 w-3 rounded-full bg-accent" />
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>
      </div>
    </header>
  )
}
