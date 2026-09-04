import Link from "next/link";
import { JokeWidget } from "@/components/JokeWidget";
import { ProjectCard } from "@/components/ProjectCard";
import { cvData, featuredProjects } from "@/lib/cv-data";

const stats = [
  { label: "Focus", value: "App + Backend" },
  { label: "Location", value: "Dubai, UAE" },
  { label: "Recent role", value: "PureCS/Dawak" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="card relative overflow-hidden rounded-3xl px-6 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-2/15 via-transparent to-accent/15" />
        <div className="relative max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Hi, I&apos;m Shahbaz</p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground md:text-6xl">{cvData.name}</h1>
          <p className="mt-3 text-lg text-accent-2">
            App Developer | Backend Engineer | AI/ML Enthusiast
          </p>
          <p className="mt-5 max-w-xl text-muted">{cvData.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink">
              View CV
            </Link>
            <Link href="/projects" className="rounded-full border border-accent px-5 py-2 text-sm text-foreground">
              Projects
            </Link>
            <Link href="/projects#chat" className="rounded-full border border-accent-2 px-5 py-2 text-sm text-foreground">
              Chat
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.label}</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground">Featured Projects</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <JokeWidget />
      </section>
    </div>
  );
}
