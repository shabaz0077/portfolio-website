import { skillShowcase } from "@/lib/cv-data";
import { cn } from "@/lib/utils";

const glow: Record<string, string> = {
  Frontend: "hover:border-accent-3 hover:shadow-[0_0_20px_rgba(65,105,225,0.28)]",
  Backend: "hover:border-accent hover:shadow-[0_0_20px_rgba(0,35,102,0.28)]",
  "AI/ML": "hover:border-accent-2 hover:shadow-[0_0_20px_rgba(201,162,39,0.22)]",
  DevOps: "hover:border-accent-3 hover:shadow-[0_0_20px_rgba(65,105,225,0.22)]",
  Data: "hover:border-accent hover:shadow-[0_0_20px_rgba(0,35,102,0.22)]",
};

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {skillShowcase.map((skill) => (
        <article
          key={skill.name}
          className={cn(
            "card rounded-2xl px-4 py-5 text-center transition hover:-translate-y-1",
            glow[skill.group],
          )}
        >
          <p className="text-sm font-semibold text-foreground">{skill.name}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted">{skill.group}</p>
        </article>
      ))}
    </div>
  );
}
