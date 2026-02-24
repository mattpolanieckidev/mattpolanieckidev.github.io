export function ScandinavianHeader() {
  return (
    <header className="relative overflow-hidden bg-card px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36">
      {/* Organic shape */}
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/5 md:h-[30rem] md:w-[30rem]"
        aria-hidden="true"
      />
      <div
        className="absolute right-20 top-20 h-16 w-16 rounded-full bg-secondary/20 md:right-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.4em] text-muted-foreground mb-8">
          portfolio
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance leading-[1.1]">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-10 h-px w-12 bg-primary/40" aria-hidden="true" />

        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>
      </div>
    </header>
  )
}
