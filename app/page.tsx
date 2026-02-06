import { ProjectCard } from "@/components/project-card"
import { BauhausHeader } from "@/components/bauhaus-header"
import { BauhausFooter } from "@/components/bauhaus-footer"

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

const categoryColors: Record<string, string> = {
  study: "bg-primary",
  text: "bg-accent",
  utility: "bg-secondary",
  fun: "bg-foreground",
}

const categoryLabels: Record<string, string> = {
  study: "Study",
  text: "Texts",
  utility: "Tools",
  fun: "Fun",
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <BauhausHeader />

      <main className="flex-1 px-6 pb-20 md:px-10 lg:px-16">
        {/* Legend */}
        <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-6 mb-10">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className={`block h-3 w-3 ${categoryColors[key]}`}
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Project Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
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

      <BauhausFooter />
    </div>
  )
}
