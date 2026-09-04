import { AnimeWidget } from "@/components/AnimeWidget";
import { ChatBot } from "@/components/ChatBot";
import { JokeWidget } from "@/components/JokeWidget";
import { OcrTool } from "@/components/OcrTool";
import { ProjectCard } from "@/components/ProjectCard";
import { WeatherWidget } from "@/components/WeatherWidget";
import { allProjects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-semibold text-foreground">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Seven featured builds plus live demos: OCR, chatbot, weather, anime search, and jokes.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} {...project} href={`#${project.id}`} />
        ))}
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Interactive demos</h2>
        <div className="grid gap-4 lg:grid-cols-2">
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
