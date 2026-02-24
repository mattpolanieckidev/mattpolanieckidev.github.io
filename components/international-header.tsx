export function InternationalHeader() {
  return (
    <header className="relative overflow-hidden bg-foreground text-background px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32">
      {/* Swiss grid lines */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <div className="h-full w-full" style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>

      <div className="absolute top-0 left-0 h-2 w-full bg-primary" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.5em] text-background/50 mb-8">
          Portfolio
        </p>

        <h1 className="text-5xl font-bold uppercase tracking-tight text-background md:text-7xl lg:text-8xl leading-[0.95] text-balance">
          Matt
          <br />
          Polaniecki
        </h1>

        <div className="mt-10 flex items-start gap-12">
          <div className="h-px w-32 bg-background/20 mt-3" aria-hidden="true" />
          <p className="max-w-sm text-sm leading-relaxed text-background/60">
            A collection of web projects spanning Jewish learning tools,
            interactive games, and everyday utilities.
          </p>
        </div>
      </div>
    </header>
  )
}
