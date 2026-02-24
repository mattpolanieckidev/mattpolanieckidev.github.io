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

const projects = [
  {
    title: "Daily Daf",
    description: "Study the daily Daf Yomi with easy access to readings and resources.",
    href: "https://mattpolanieckidev.github.io/dailydaf/",
    category: "study",
  },
  {
    title: "Eicha",
    description: "Read the Book of Lamentations with a simple online interface.",
    href: "https://mattpolanieckidev.github.io/eicha/",
    category: "text",
  },
  {
    title: "Esther",
    description: "Explore the Book of Esther, essential for Purim readings.",
    href: "https://mattpolanieckidev.github.io/esther/",
    category: "text",
  },
  {
    title: "Garage",
    description: "A project for organizing or managing a garage workspace.",
    href: "https://mattpolanieckidev.github.io/garage/",
    category: "utility",
  },
  {
    title: "Gemara Cards",
    description: "Flashcards designed to help study Talmudic concepts.",
    href: "https://mattpolanieckidev.github.io/gemaracards/",
    category: "study",
  },
  {
    title: "Hebcal",
    description: "Get Jewish calendar dates and holidays in an easy-to-use format.",
    href: "https://mattpolanieckidev.github.io/hebcal/",
    category: "utility",
  },
  {
    title: "Letter Cards",
    description: "Learn and practice Hebrew letters with interactive flashcards.",
    href: "https://mattpolanieckidev.github.io/lettercards/",
    category: "study",
  },
  {
    title: "Loop Timer",
    description: "A timer tool for tracking looped activities or tasks.",
    href: "https://mattpolanieckidev.github.io/looptimer/",
    category: "utility",
  },
  {
    title: "Mishna",
    description: "Study the Mishna with structured text and resources.",
    href: "https://mattpolanieckidev.github.io/mishna/",
    category: "study",
  },
  {
    title: "My Siddur App",
    description: "A digital Siddur for daily prayers and blessings.",
    href: "https://mattpolanieckidev.github.io/mysiddurapp/",
    category: "text",
  },
  {
    title: "Pokedex",
    description: "An interactive Pokedex for Pokemon enthusiasts.",
    href: "https://mattpolanieckidev.github.io/pokedex/",
    category: "fun",
  },
  {
    title: "PokeFlip",
    description: "A Pokemon-themed card matching or flipping game.",
    href: "https://mattpolanieckidev.github.io/pokeflip/",
    category: "fun",
  },
  {
    title: "Prayers",
    description: "A collection of Jewish prayers for various occasions.",
    href: "https://mattpolanieckidev.github.io/prayers/",
    category: "text",
  },
  {
    title: "QR Share",
    description: "Generate and share QR codes for quick access to links.",
    href: "https://mattpolanieckidev.github.io/qrshare/",
    category: "utility",
  },
  {
    title: "Sefira",
    description: "Track the daily Omer count with a simple counter.",
    href: "https://mattpolanieckidev.github.io/sefira/",
    category: "utility",
  },
  {
    title: "Shabbos Time",
    description: "Find accurate Shabbat times based on your location.",
    href: "https://mattpolanieckidev.github.io/shabbostime/",
    category: "utility",
  },
  {
    title: "Sports Tracker",
    description: "Log and track sports activities and performance.",
    href: "https://mattpolanieckidev.github.io/sportstracker/",
    category: "fun",
  },
  {
    title: "Tehillim",
    description: "Read the Psalms with an easy-to-navigate interface.",
    href: "https://mattpolanieckidev.github.io/tehillim/",
    category: "text",
  },
]

const categoryLabels: Record<string, string> = {
  study: "Study",
  text: "Texts",
  utility: "Tools",
  fun: "Fun",
}

const themeCategoryColors: Record<string, Record<string, string>> = {
  bauhaus: {
    study: "bg-primary",
    text: "bg-accent",
    utility: "bg-secondary",
    fun: "bg-foreground",
  },
  retro: {
    study: "bg-primary",
    text: "bg-secondary",
    utility: "bg-muted-foreground",
    fun: "bg-primary",
  },
  brutalism: {
    study: "bg-primary",
    text: "bg-accent",
    utility: "bg-secondary",
    fun: "bg-foreground",
  },
  japandi: {
    study: "bg-primary",
    text: "bg-secondary",
    utility: "bg-accent",
    fun: "bg-muted-foreground",
  },
}

const gridClass: Record<string, string> = {
  bauhaus: "grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3",
  retro: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  brutalism: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
  japandi: "grid grid-cols-1 gap-px bg-border/50 sm:grid-cols-2 lg:grid-cols-3",
}

function Header({ theme }: { theme: string }) {
  switch (theme) {
    case "retro":
      return <RetroHeader />
    case "brutalism":
      return <BrutalHeader />
    case "japandi":
      return <JapandiHeader />
    default:
      return <BauhausHeader />
  }
}

function Footer({ theme }: { theme: string }) {
  switch (theme) {
    case "retro":
      return <RetroFooter />
    case "brutalism":
      return <BrutalFooter />
    case "japandi":
      return <JapandiFooter />
    default:
      return <BauhausFooter />
  }
}

export default function Home() {
  const { theme } = useTheme()
  const categoryColors = themeCategoryColors[theme] ?? themeCategoryColors.bauhaus
  const fontClass = theme === "retro" ? "font-mono" : theme === "japandi" ? "font-serif" : "font-sans"

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />

      <Header theme={theme} />

      <main className="flex-1 px-6 pb-20 md:px-10 lg:px-16">
        {/* Legend */}
        <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-6 mb-10 mt-10">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className={`block h-3 w-3 ${
                  theme === "retro" ? "rounded-full" :
                  theme === "japandi" ? "rounded-full h-2 w-2" :
                  ""
                } ${categoryColors[key]}`}
                aria-hidden="true"
              />
              <span className={`text-xs font-medium uppercase tracking-widest text-muted-foreground ${fontClass}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Project Grid */}
        <div className={`mx-auto max-w-6xl ${gridClass[theme] ?? gridClass.bauhaus}`}>
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

      <Footer theme={theme} />
    </div>
  )
}
