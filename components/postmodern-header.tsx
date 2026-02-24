export function PostmodernHeader() {
  return (
    <header className="relative overflow-hidden bg-card px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
      {/* Playful shapes */}
      <div className="absolute top-8 right-8 md:right-16" aria-hidden="true">
        <div className="relative h-48 w-48 md:h-64 md:w-64">
          <div className="absolute top-0 right-0 h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary/20 -rotate-12" />
          <div className="absolute bottom-4 right-8 h-20 w-20 md:h-28 md:w-28 bg-secondary/20 rotate-6" />
          <div className="absolute top-16 left-0 h-16 w-8 md:h-20 md:w-10 rounded-full bg-accent/25 rotate-45" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-6">
          Portfolio
        </p>

        <h1 className="text-4xl font-black text-foreground md:text-6xl lg:text-7xl text-balance leading-[0.95]">
          <span className="inline-block -rotate-1">Matt</span>
          <br />
          <span className="inline-block rotate-1 text-primary">Polaniecki</span>
        </h1>

        <div className="mt-8 flex items-center gap-3" aria-hidden="true">
          <div className="h-4 w-4 rounded-full bg-primary" />
          <div className="h-4 w-4 bg-secondary" />
          <div className="h-4 w-8 rounded-full bg-accent" />
        </div>

        <p className="mt-8 max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>
      </div>
    </header>
  )
}
