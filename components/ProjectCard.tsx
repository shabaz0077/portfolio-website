import Link from "next/link";
import type { ProjectRecord } from "@/lib/projects";
import { cn } from "@/lib/utils";

const accentBar: Record<ProjectRecord["accent"], string> = {
  purple: "from-[#002366] to-[#4169e1]",
  cyan: "from-[#1e3a8a] to-[#6b8cff]",
  pink: "from-[#121212] to-[#002366]",
  teal: "from-[#0b1220] to-[#3b5bb8]",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

type ProjectCardProps = {
  project: ProjectRecord;
  variant?: ProjectRecord["variant"];
};

export function ProjectCard({ project, variant = project.variant }: ProjectCardProps) {
  const href = `/projects/${project.id}`;

  if (variant === "hero") {
    return (
      <Link href={href} className="group block h-full">
        <article className="card relative flex h-full min-h-72 overflow-hidden rounded-3xl">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", accentBar[project.accent])} />
          <div className="absolute inset-0 bg-slate-950/35" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <p className="text-4xl">{project.icon}</p>
            <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
            <p className="mt-2 max-w-md text-sm text-white/85">{project.teaser}</p>
            <p className="mt-4 text-sm font-medium">View details →</p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "stat" && project.metric) {
    return (
      <Link href={href} className="block h-full">
        <article className="card flex h-full flex-col justify-between rounded-3xl p-6">
          <p className="text-4xl font-semibold gradient-text">{project.metric.value}</p>
          <div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">{project.metric.label}</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 text-sm text-muted">{project.teaser}</p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "timeline") {
    return (
      <Link href={href} className="block h-full">
        <article className="card h-full rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-3">{formatDate(project.date)}</p>
          <h3 className="mt-3 text-lg font-semibold text-foreground">
            {project.icon} {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
        </article>
      </Link>
    );
  }

  return (
    <Link href={href} className="block h-full">
      <article className="card h-full rounded-3xl p-6">
        <p className="text-3xl">{project.icon}</p>
        <h3 className="mt-3 text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full border border-line px-2 py-1 text-xs text-accent">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-5 text-sm text-accent-3">Learn more →</p>
      </article>
    </Link>
  );
}
