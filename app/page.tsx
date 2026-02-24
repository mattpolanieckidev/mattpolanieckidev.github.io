"use client"

import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"

import { BauhausHeader } from "@/components/bauhaus-header"
import { BauhausFooter } from "@/components/bauhaus-footer"
import { RetroHeader } from "@/components/retro-header"
import { RetroFooter } from "@/components/retro-footer"
import { BrutalHeader } from "@/components/brutal-header"
import { BrutalFooter } from "@/components/brutal-footer"
import { JapandiHeader } from "@/components/japandi-header"
import { JapandiFooter } from "@/components/japandi-footer"
import { InternationalHeader } from "@/components/international-header"
import { InternationalFooter } from "@/components/international-footer"
import { ScandinavianHeader } from "@/components/scandinavian-header"
import { ScandinavianFooter } from "@/components/scandinavian-footer"
import { ArtDecoHeader } from "@/components/artdeco-header"
import { ArtDecoFooter } from "@/components/artdeco-footer"
import { MinimalismHeader } from "@/components/minimalism-header"
import { MinimalismFooter } from "@/components/minimalism-footer"
import { MidcenturyHeader } from "@/components/midcentury-header"
import { MidcenturyFooter } from "@/components/midcentury-footer"
import { DestijlHeader } from "@/components/destijl-header"
import { DestijlFooter } from "@/components/destijl-footer"
import { PostmodernHeader } from "@/components/postmodern-header"
import { PostmodernFooter } from "@/components/postmodern-footer"

const projects = [
  { title: "Daily Daf", description: "Study the daily Daf Yomi with easy access to readings and resources.", href: "https://mattpolanieckidev.github.io/dailydaf/", category: "study" },
  { title: "Eicha", description: "Read the Book of Lamentations with a simple online interface.", href: "https://mattpolanieckidev.github.io/eicha/", category: "text" },
  { title: "Esther", description: "Explore the Book of Esther, essential for Purim readings.", href: "https://mattpolanieckidev.github.io/esther/", category: "text" },
  { title: "Garage", description: "A project for organizing or managing a garage workspace.", href: "https://mattpolanieckidev.github.io/garage/", category: "utility" },
  { title: "Gemara Cards", description: "Flashcards designed to help study Talmudic concepts.", href: "https://mattpolanieckidev.github.io/gemaracards/", category: "study" },
  { title: "Hebcal", description: "Get Jewish calendar dates and holidays in an easy-to-use format.", href: "https://mattpolanieckidev.github.io/hebcal/", category: "utility" },
  { title: "Letter Cards", description: "Learn and practice Hebrew letters with interactive flashcards.", href: "https://mattpolanieckidev.github.io/lettercards/", category: "study" },
  { title: "Loop Timer", description: "A timer tool for tracking looped activities or tasks.", href: "https://mattpolanieckidev.github.io/looptimer/", category: "utility" },
  { title: "Mishna", description: "Study the Mishna with structured text and resources.", href: "https://mattpolanieckidev.github.io/mishna/", category: "study" },
  { title: "My Siddur App", description: "A digital Siddur for daily prayers and blessings.", href: "https://mattpolanieckidev.github.io/mysiddurapp/", category: "text" },
  { title: "Pokedex", description: "An interactive Pokedex for Pokemon enthusiasts.", href: "https://mattpolanieckidev.github.io/pokedex/", category: "fun" },
  { title: "PokeFlip", description: "A Pokemon-themed card matching or flipping game.", href: "https://mattpolanieckidev.github.io/pokeflip/", category: "fun" },
  { title: "Prayers", description: "A collection of Jewish prayers for various occasions.", href: "https://mattpolanieckidev.github.io/prayers/", category: "text" },
  { title: "QR Share", description: "Generate and share QR codes for quick access to links.", href: "https://mattpolanieckidev.github.io/qrshare/", category: "utility" },
  { title: "Sefira", description: "Track the daily Omer count with a simple counter.", href: "https://mattpolanieckidev.github.io/sefira/", category: "utility" },
  { title: "Shabbos Time", description: "Find accurate Shabbat times based on your location.", href: "https://mattpolanieckidev.github.io/shabbostime/", category: "utility" },
  { title: "Sports Tracker", description: "Log and track sports activities and performance.", href: "https://mattpolanieckidev.github.io/sportstracker/", category: "fun" },
  { title: "Tehillim", description: "Read the Psalms with an easy-to-navigate interface.", href: "https://mattpolanieckidev.github.io/tehillim/", category: "text" },
]

const categoryLabels: Record<string, string> = {
  study: "Study",
  text: "Texts",
  utility: "Tools",
  fun: "Fun",
}

const themeCategoryColors: Record<string, Record<string, string>> = {
  bauhaus:        { study: "bg-primary", text: "bg-accent", utility: "bg-secondary", fun: "bg-foreground" },
  retro:          { study: "bg-primary", text: "bg-secondary", utility: "bg-muted-foreground", fun: "bg-primary" },
  brutalism:      { study: "bg-primary", text: "bg-accent", utility: "bg-secondary", fun: "bg-foreground" },
  japandi:        { study: "bg-primary", text: "bg-secondary", utility: "bg-accent", fun: "bg-muted-foreground" },
  international:  { study: "bg-primary", text: "bg-secondary", utility: "bg-accent", fun: "bg-foreground" },
  scandinavian:   { study: "bg-primary", text: "bg-secondary", utility: "bg-accent", fun: "bg-muted-foreground" },
  artdeco:        { study: "bg-primary", text: "bg-secondary", utility: "bg-primary", fun: "bg-muted-foreground" },
  minimalism:     { study: "bg-foreground", text: "bg-foreground", utility: "bg-foreground", fun: "bg-foreground" },
  midcentury:     { study: "bg-primary", text: "bg-secondary", utility: "bg-accent", fun: "bg-muted-foreground" },
  destijl:        { study: "bg-primary", text: "bg-accent", utility: "bg-secondary", fun: "bg-foreground" },
  postmodern:     { study: "bg-primary", text: "bg-secondary", utility: "bg-accent", fun: "bg-muted-foreground" },
}

const gridClass: Record<string, string> = {
  bauhaus:        "grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3",
  retro:          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  brutalism:      "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
  japandi:        "grid grid-cols-1 gap-px bg-border/50 sm:grid-cols-2 lg:grid-cols-3",
  international:  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  scandinavian:   "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  artdeco:        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
  minimalism:     "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  midcentury:     "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  destijl:        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
  postmodern:     "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
}

const HEADERS: Record<string, () => JSX.Element> = {
  bauhaus: BauhausHeader,
  retro: RetroHeader,
  brutalism: BrutalHeader,
  japandi: JapandiHeader,
  international: InternationalHeader,
  scandinavian: ScandinavianHeader,
  artdeco: ArtDecoHeader,
  minimalism: MinimalismHeader,
  midcentury: MidcenturyHeader,
  destijl: DestijlHeader,
  postmodern: PostmodernHeader,
}

const FOOTERS: Record<string, () => JSX.Element> = {
  bauhaus: BauhausFooter,
  retro: RetroFooter,
  brutalism: BrutalFooter,
  japandi: JapandiFooter,
  international: InternationalFooter,
  scandinavian: ScandinavianFooter,
  artdeco: ArtDecoFooter,
  minimalism: MinimalismFooter,
  midcentury: MidcenturyFooter,
  destijl: DestijlFooter,
  postmodern: PostmodernFooter,
}

const FONT_CLASS: Record<string, string> = {
  retro: "font-mono",
  japandi: "font-serif",
  scandinavian: "font-serif",
  artdeco: "font-sans",
  minimalism: "font-sans",
  midcentury: "font-sans",
  destijl: "font-sans",
  postmodern: "font-sans",
}

export default function Home() {
  const { theme } = useTheme()
  const categoryColors = themeCategoryColors[theme] ?? themeCategoryColors.bauhaus
  const fontClass = FONT_CLASS[theme] ?? "font-sans"

  const HeaderComponent = HEADERS[theme] ?? BauhausHeader
  const FooterComponent = FOOTERS[theme] ?? BauhausFooter

  const showLegend = theme !== "minimalism"

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />

      <HeaderComponent />

      <main className="flex-1 px-6 pb-20 md:px-10 lg:px-16">
        {/* Legend */}
        {showLegend && (
          <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-6 mb-10 mt-10">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className={`block h-3 w-3 ${
                    theme === "retro" || theme === "scandinavian" || theme === "midcentury" || theme === "postmodern"
                      ? "rounded-full"
                      : theme === "japandi"
                        ? "rounded-full h-2 w-2"
                        : theme === "artdeco"
                          ? "rotate-45 h-2.5 w-2.5"
                          : ""
                  } ${categoryColors[key]}`}
                  aria-hidden="true"
                />
                <span className={`text-xs font-medium uppercase tracking-widest text-muted-foreground ${fontClass}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Project Grid */}
        <div className={`mx-auto max-w-6xl ${!showLegend ? "mt-10" : ""} ${gridClass[theme] ?? gridClass.bauhaus}`}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              href={project.href}
              accentColor={categoryColors[project.category]}
              index={i}
            />
          ))}
        </div>
      </main>

      <FooterComponent />
    </div>
  )
}
