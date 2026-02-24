export function BrutalHeader() {
  return (
    <header className="relative overflow-hidden bg-foreground text-background px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
      {/* Tilted colour blocks */}
      <div
        className="absolute -top-8 -right-8 h-40 w-40 bg-primary md:h-56 md:w-56 rotate-6"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-6 -right-4 h-28 w-28 bg-secondary md:h-36 md:w-36 -rotate-3"
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-28 h-16 w-24 bg-accent md:right-44 md:h-20 md:w-32 rotate-2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-background/50 mb-4">
          Portfolio
        </p>

        <h1 className="text-5xl font-black uppercase md:text-7xl lg:text-8xl leading-[0.9] text-balance">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-6 h-2 w-20 bg-secondary" aria-hidden="true" />

        <p className="mt-6 max-w-lg text-sm font-bold leading-relaxed text-background/70 md:text-base">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="block h-5 w-5 bg-primary border-2 border-background" aria-hidden="true" />
          <span className="block h-5 w-5 bg-secondary border-2 border-background" aria-hidden="true" />
          <span className="block h-5 w-5 bg-accent border-2 border-background" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
