import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { allProjects, getProjectById } from "@/lib/projects";

export function generateStaticParams() {
  return allProjects.map((project) => ({ id: project.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    notFound();
  }

  const related = allProjects.filter((item) => item.id !== project.id && item.category === project.category).slice(0, 2);

  return (
    <div className="section-shell section-space">
      <Link href="/projects" className="text-sm text-accent-3">
        ← All projects
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <article>
          <p className="text-5xl">{project.icon}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-accent-3">{project.category}</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>
          <p className="mt-6 max-w-3xl leading-7 text-muted">{project.description}</p>
          {project.demoHref ? (
            <a href={project.demoHref} className="btn-primary mt-8 inline-flex rounded-full px-5 py-2 text-sm">
              Live Demo
            </a>
          ) : null}
        </article>
        <aside className="space-y-5">
          {project.metric ? (
            <div className="card rounded-3xl p-6">
              <p className="text-4xl font-semibold gradient-text">{project.metric.value}</p>
              <p className="mt-2 text-sm text-muted">{project.metric.label}</p>
            </div>
          ) : null}
          <div className="card rounded-3xl p-6">
            <h2 className="font-semibold">Tech</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="rounded-full border border-line px-3 py-1 text-xs text-accent">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="card rounded-3xl p-6">
            <h2 className="font-semibold">Process</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
              {project.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
      {related.length ? (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Related</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <ProjectCard key={item.id} project={item} variant="text" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
