"use client"

import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

const projects = [
  {
    title: "Daily Daf",
    description: "Study the daily Daf Yomi with easy access to readings and resources.",
    href: "https://mattpolanieckidev.github.io/dailydaf/",
    tags: ["Torah Study", "Web App"],
  },
  {
    title: "My Siddur App",
    description: "A digital Siddur for daily prayers and blessings.",
    href: "https://mattpolanieckidev.github.io/mysiddurapp/",
    tags: ["Prayer", "Mobile-First"],
  },
  {
    title: "Gemara Cards",
    description: "Flashcards designed to help study Talmudic concepts.",
    href: "https://mattpolanieckidev.github.io/gemaracards/",
    tags: ["Learning", "Interactive"],
  },
  {
    title: "Tehillim",
    description: "Read the Psalms with an easy-to-navigate interface.",
    href: "https://mattpolanieckidev.github.io/tehillim/",
    tags: ["Psalms", "Reading"],
  },
  {
    title: "Shabbos Time",
    description: "Find accurate Shabbat times based on your location.",
    href: "https://mattpolanieckidev.github.io/shabbostime/",
    tags: ["Utility", "Location"],
  },
  {
    title: "Sefira",
    description: "Track the daily Omer count with a simple counter.",
    href: "https://mattpolanieckidev.github.io/sefira/",
    tags: ["Counter", "Seasonal"],
  },
  {
    title: "Eicha",
    description: "Read the Book of Lamentations with a simple online interface.",
    href: "https://mattpolanieckidev.github.io/eicha/",
    tags: ["Text", "Tisha B'Av"],
  },
  {
    title: "Esther",
    description: "Explore the Book of Esther, essential for Purim readings.",
    href: "https://mattpolanieckidev.github.io/esther/",
    tags: ["Megillah", "Purim"],
  },
  {
    title: "Mishna",
    description: "Study the Mishna with structured text and resources.",
    href: "https://mattpolanieckidev.github.io/mishna/",
    tags: ["Torah Study", "Text"],
  },
  {
    title: "Prayers",
    description: "A collection of Jewish prayers for various occasions.",
    href: "https://mattpolanieckidev.github.io/prayers/",
    tags: ["Prayer", "Collection"],
  },
  {
    title: "Hebcal",
    description: "Get Jewish calendar dates and holidays in an easy-to-use format.",
    href: "https://mattpolanieckidev.github.io/hebcal/",
    tags: ["Calendar", "Holidays"],
  },
  {
    title: "Letter Cards",
    description: "Learn and practice Hebrew letters with interactive flashcards.",
    href: "https://mattpolanieckidev.github.io/lettercards/",
    tags: ["Hebrew", "Learning"],
  },
  {
    title: "Pokedex",
    description: "An interactive Pokedex for Pokemon enthusiasts.",
    href: "https://mattpolanieckidev.github.io/pokedex/",
    tags: ["Fun", "API"],
  },
  {
    title: "PokeFlip",
    description: "A Pokemon-themed card matching or flipping game.",
    href: "https://mattpolanieckidev.github.io/pokeflip/",
    tags: ["Game", "Memory"],
  },
  {
    title: "Loop Timer",
    description: "A timer tool for tracking looped activities or tasks.",
    href: "https://mattpolanieckidev.github.io/looptimer/",
    tags: ["Utility", "Timer"],
  },
  {
    title: "QR Share",
    description: "Generate and share QR codes for quick access to links.",
    href: "https://mattpolanieckidev.github.io/qrshare/",
    tags: ["Utility", "Generator"],
  },
  {
    title: "Sports Tracker",
    description: "Log and track sports activities and performance.",
    href: "https://mattpolanieckidev.github.io/sportstracker/",
    tags: ["Fitness", "Tracking"],
  },
  {
    title: "Garage",
    description: "A project related to organizing or managing a garage workspace.",
    href: "https://mattpolanieckidev.github.io/garage/",
    tags: ["Organization", "Utility"],
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl p-6 transition-all duration-300 border"
      style={{ 
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 
            className="text-lg font-semibold transition-colors duration-300 group-hover:text-teal-400"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h3>
          <p 
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-teal-500/10 text-teal-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight 
          className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-teal-400" 
        />
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Subtle gradient overlay */}
      <div 
        className="pointer-events-none fixed inset-0" 
        style={{ background: "radial-gradient(ellipse at top, rgba(45, 212, 191, 0.05), transparent 70%)" }}
      />
      
      <main className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* Header Section */}
        <header className="mb-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h1 
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: "var(--foreground)" }}
              >
                Matt Polaniecki
              </h1>
              <p className="mt-3 text-xl font-medium text-teal-400">
                Developer & Creator
              </p>
              <p 
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                I build accessible, thoughtful digital experiences for the web. 
                My work focuses on creating tools that help people learn, pray, and connect 
                with tradition through modern technology.
              </p>
            </div>
            
            {/* Social Links */}
            <nav className="flex items-center gap-4 lg:mt-2">
              <Link
                href="https://github.com/mattpolanieckidev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 hover:text-teal-400 hover:border-teal-400/30"
                style={{ 
                  backgroundColor: "var(--card)", 
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)"
                }}
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 hover:text-teal-400 hover:border-teal-400/30"
                style={{ 
                  backgroundColor: "var(--card)", 
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)"
                }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@example.com"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 hover:text-teal-400 hover:border-teal-400/30"
                style={{ 
                  backgroundColor: "var(--card)", 
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)"
                }}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </header>

        {/* Projects Section */}
        <section>
          <div className="mb-8 flex items-center gap-4">
            <h2 
              className="text-sm font-medium uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Projects
            </h2>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="mt-24 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Built with Next.js and Tailwind CSS
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {new Date().getFullYear()} Matt Polaniecki
          </p>
        </footer>
      </main>
    </div>
  )
}
