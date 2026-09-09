import { AnimeWidget } from "@/components/AnimeWidget";
import { ChatBot } from "@/components/ChatBot";
import { JokeWidget } from "@/components/JokeWidget";
import { OcrTool } from "@/components/OcrTool";
import { ProjectFilters } from "@/components/ProjectFilters";
import { WeatherWidget } from "@/components/WeatherWidget";
import { allProjects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="section-shell section-space">
      <p className="text-sm uppercase tracking-[0.25em] text-accent-3">Work</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Projects, newest first</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Featured builds up top, then recent work. Each card opens a dedicated page. Live demos sit below.
      </p>

      <div className="mt-10">
        <ProjectFilters projects={allProjects} />
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold">Try the demos</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          These are the interactive pieces, not copies of the cards above.
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <OcrTool />
          <ChatBot />
          <WeatherWidget />
          <AnimeWidget />
          <JokeWidget />
        </div>
      </section>
    </div>
  );
}
