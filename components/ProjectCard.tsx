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
      className="card h-full rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-accent"
    >
      <h3 className="text-lg font-semibold text-accent">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-accent-2/30 bg-accent-2/10 px-2 py-1 text-xs text-accent-2"
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
