import Link from "next/link";
import { JokeWidget } from "@/components/JokeWidget";
import { LiveTime } from "@/components/LiveTime";
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
      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/30 px-6 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-400/20" />
        <div className="relative max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Hi, I&apos;m Shahbaz</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{cvData.name}</h1>
          <p className="mt-3 text-lg text-fuchsia-200">
            App Developer | Backend Engineer | AI/ML Enthusiast
          </p>
          <p className="mt-5 max-w-xl text-zinc-300">{cvData.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-medium text-black">
              View CV
            </Link>
            <Link href="/projects" className="rounded-full border border-cyan-300 px-5 py-2 text-sm">
              Projects
            </Link>
            <Link href="/projects#chat" className="rounded-full border border-fuchsia-300 px-5 py-2 text-sm">
              Chat
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{item.label}</p>
            <p className="mt-2 text-xl font-semibold">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <LiveTime />
        <JokeWidget />
      </section>
    </div>
  );
}
