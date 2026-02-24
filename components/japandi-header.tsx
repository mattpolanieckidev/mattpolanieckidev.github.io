export function JapandiHeader() {
  return (
    <header className="relative overflow-hidden bg-card px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36">
      {/* Subtle enso-inspired circle */}
      <div
        className="absolute -right-16 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full border border-border/40 md:h-[28rem] md:w-[28rem]"
        aria-hidden="true"
      />
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary md:right-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-normal tracking-[0.35em] text-muted-foreground mb-8">
          portfolio
        </p>

        <h1 className="font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance leading-[1.1]">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-10 h-px w-16 bg-border" aria-hidden="true" />

        <p className="mt-8 max-w-md text-sm leading-[1.8] text-muted-foreground">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <span className="block h-1 w-8 bg-primary/40" aria-hidden="true" />
          <span className="block h-1 w-5 bg-secondary/40" aria-hidden="true" />
          <span className="block h-1 w-3 bg-accent/40" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
