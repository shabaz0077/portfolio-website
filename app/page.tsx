import Link from "next/link";
import { ParticleField } from "@/components/ParticleField";
import { ProjectCard } from "@/components/ProjectCard";
import { cvData } from "@/lib/cv-data";
import { allProjects } from "@/lib/projects";

const facts = [
  { label: "Based in", value: cvData.location },
  { label: "Focus", value: "Backend · AI/ML" },
  { label: "Recent work", value: "NestJS, OCR, live demos" },
];

export default function Home() {
  const featured = allProjects.filter((item) => item.featured).slice(0, 3);

  return (
    <div>
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-black/35" />
        <ParticleField />
        <div className="section-shell relative z-10 py-20 text-white">
          <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Shahbaz Ahmed</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">App Developer in Dubai</h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">{cvData.homeTagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-medium">
              View work
            </Link>
            <Link href="/contact" className="btn-ghost inline-flex rounded-full px-6 py-3 text-sm text-white">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {facts.map((item) => (
            <article key={item.label} className="card rounded-3xl px-5 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-3">{item.label}</p>
              <p className="mt-2 text-lg font-medium">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent-3">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold">Three projects to start with</h2>
          </div>
          <Link href="/projects" className="text-sm text-accent-3">
            All projects →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} variant="text" />
          ))}
        </div>
      </section>
    </div>
  );
}
