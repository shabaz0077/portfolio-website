import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  id?: string;
};

export function ProjectCard({ title, description, tech, href, id }: ProjectCardProps) {
  const content = (
    <article
      id={id}
      className="h-full rounded-2xl border border-cyan-400/20 bg-white/5 p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] transition hover:border-cyan-300/50"
    >
      <h3 className="text-lg font-semibold text-cyan-200">{title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-1 text-xs text-fuchsia-200"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
