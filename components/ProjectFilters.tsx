"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import {
  projectCategories,
  sortProjectsByDate,
  type ProjectCategory,
  type ProjectRecord,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectFilters({ projects }: { projects: ProjectRecord[] }) {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const filtered = useMemo(
    () =>
      sortProjectsByDate(
        filter === "All" ? projects : projects.filter((item) => item.category === filter),
      ),
    [filter, projects],
  );
  const featured = filtered.filter((item) => item.featured);
  const recent = filtered.filter((item) => !item.featured);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {projectCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full px-4 py-2 text-sm",
              filter === item ? "btn-primary" : "btn-ghost",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {featured.length ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} variant="hero" />
            ))}
          </div>
        </section>
      ) : null}

      {recent.length ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Recent</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recent.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
