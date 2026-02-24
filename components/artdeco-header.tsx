export function ArtDecoHeader() {
  return (
    <header className="relative overflow-hidden bg-foreground text-primary px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32">
      {/* Deco fan motif */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 right-0 border border-primary/15 rounded-tl-full"
              style={{
                width: `${(i + 1) * 20}%`,
                height: `${(i + 1) * 20}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Gold line */}
      <div className="deco-line absolute top-0 left-0 right-0 h-1" aria-hidden="true" />
      <div className="deco-line absolute bottom-0 left-0 right-0 h-px" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-12 bg-primary/40" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-[0.5em] text-primary/60">
            Portfolio
          </p>
          <div className="h-px flex-1 max-w-12 bg-primary/40" aria-hidden="true" />
        </div>

        <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-primary md:text-6xl lg:text-7xl text-balance leading-[1.05]">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-10 flex items-center gap-2" aria-hidden="true">
          <div className="h-3 w-3 rotate-45 border border-primary/40" />
          <div className="h-px w-16 bg-primary/30" />
          <div className="h-3 w-3 rotate-45 border border-primary/40" />
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-card-foreground/60">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>
      </div>
    </header>
  )
}
