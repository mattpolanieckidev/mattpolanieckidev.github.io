export function DestijlHeader() {
  return (
    <header className="relative overflow-hidden bg-background px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
      {/* Mondrian composition */}
      <div className="absolute top-0 right-0 h-full w-1/3 max-w-xs" aria-hidden="true">
        <div className="absolute top-0 right-0 h-2/5 w-full bg-primary border-l-4 border-b-4 border-foreground" />
        <div className="absolute bottom-0 right-0 h-1/4 w-3/5 bg-accent border-l-4 border-t-4 border-foreground" />
        <div className="absolute bottom-0 left-0 h-1/4 w-2/5 bg-secondary border-r-4 border-t-4 border-foreground" />
        <div className="absolute top-2/5 right-0 h-[35%] w-full border-l-4 border-foreground" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.5em] text-foreground mb-6">
          Portfolio
        </p>

        <h1 className="text-5xl font-black uppercase tracking-tight text-foreground md:text-7xl lg:text-8xl leading-[0.9] text-balance">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-8 h-1 w-20 bg-foreground" aria-hidden="true" />

        <p className="mt-8 max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
          A collection of web projects spanning Jewish learning tools,
          interactive games, and everyday utilities.
        </p>

        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          <span className="block h-4 w-4 bg-primary" />
          <span className="block h-4 w-4 bg-secondary" />
          <span className="block h-4 w-4 bg-accent" />
          <span className="block h-4 w-4 bg-foreground" />
        </div>
      </div>
    </header>
  )
}
