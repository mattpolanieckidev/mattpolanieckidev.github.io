import Link from "next/link"

const projects = [
  {
    title: "Daily Daf",
    description: "Study the daily Daf Yomi with easy access to readings and resources.",
    href: "https://mattpolanieckidev.github.io/dailydaf/",
  },
  {
    title: "Eicha",
    description: "Read the Book of Lamentations with a simple online interface.",
    href: "https://mattpolanieckidev.github.io/eicha/",
  },
  {
    title: "Esther",
    description: "Explore the Book of Esther, essential for Purim readings.",
    href: "https://mattpolanieckidev.github.io/esther/",
  },
  {
    title: "Garage",
    description: "A project related to organizing or managing a garage workspace.",
    href: "https://mattpolanieckidev.github.io/garage/",
  },
  {
    title: "Gemara Cards",
    description: "Flashcards designed to help study Talmudic concepts.",
    href: "https://mattpolanieckidev.github.io/gemaracards/",
  },
  {
    title: "Hebcal",
    description: "Get Jewish calendar dates and holidays in an easy-to-use format.",
    href: "https://mattpolanieckidev.github.io/hebcal/",
  },
  {
    title: "Letter Cards",
    description: "Learn and practice Hebrew letters with interactive flashcards.",
    href: "https://mattpolanieckidev.github.io/lettercards/",
  },
  {
    title: "Loop Timer",
    description: "A timer tool for tracking looped activities or tasks.",
    href: "https://mattpolanieckidev.github.io/looptimer/",
  },
  {
    title: "Mishna",
    description: "Study the Mishna with structured text and resources.",
    href: "https://mattpolanieckidev.github.io/mishna/",
  },
  {
    title: "My Siddur App",
    description: "A digital Siddur for daily prayers and blessings.",
    href: "https://mattpolanieckidev.github.io/mysiddurapp/",
  },
  {
    title: "Pokedex",
    description: "An interactive Pokédex for Pokémon enthusiasts.",
    href: "https://mattpolanieckidev.github.io/pokedex/",
  },
  {
    title: "PokeFlip",
    description: "A Pokémon-themed card matching or flipping game.",
    href: "https://mattpolanieckidev.github.io/pokeflip/",
  },
  {
    title: "Prayers",
    description: "A collection of Jewish prayers for various occasions.",
    href: "https://mattpolanieckidev.github.io/prayers/",
  },
  {
    title: "QR Share",
    description: "Generate and share QR codes for quick access to links.",
    href: "https://mattpolanieckidev.github.io/qrshare/",
  },
  {
    title: "Sefira",
    description: "Track the daily Omer count with a simple counter.",
    href: "https://mattpolanieckidev.github.io/sefira/",
  },
  {
    title: "Shabbos Time",
    description: "Find accurate Shabbat times based on your location.",
    href: "https://mattpolanieckidev.github.io/shabbostime/",
  },
  {
    title: "Sports Tracker",
    description: "Log and track sports activities and performance.",
    href: "https://mattpolanieckidev.github.io/sportstracker/",
  },
  {
    title: "Tehillim",
    description: "Read the Psalms with an easy-to-navigate interface.",
    href: "https://mattpolanieckidev.github.io/tehillim/",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/50 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-foreground mb-8">Matt Polaniecki&apos;s Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-card text-card-foreground rounded-lg shadow-md p-6 text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline"
            >
              Visit
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
