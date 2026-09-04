import { cvData } from "@/lib/cv-data";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 print:max-w-none print:px-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">{cvData.name}</h1>
          <p className="mt-2 text-cyan-300">
            {cvData.title} · {cvData.location}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            {cvData.email} · {cvData.phone}
          </p>
        </div>
        <a
          href="/resume.pdf"
          className="no-print rounded-full bg-cyan-400 px-5 py-2 text-sm font-medium text-black"
        >
          Download Resume
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-fuchsia-200">Summary</h2>
        <p className="mt-3 text-zinc-300">{cvData.summary}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-fuchsia-200">Work Experience</h2>
        <div className="mt-4 space-y-6">
          {cvData.workExperience.map((job) => (
            <article key={job.company} className="rounded-2xl border border-cyan-400/20 p-5">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-cyan-300">
                {job.company} · {job.location} · {job.duration}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-fuchsia-200">Education</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {cvData.education.map((item) => (
            <article key={item.school} className="rounded-2xl border border-cyan-400/20 p-5">
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="text-sm text-cyan-300">
                {item.school} · {item.location}
              </p>
              <p className="text-sm text-zinc-400">{item.year}</p>
              <p className="mt-2 text-sm text-zinc-300">{item.courses.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-fuchsia-200">Skills</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {Object.entries(cvData.skills).map(([group, items]) => (
            <article key={group} className="rounded-2xl border border-cyan-400/20 p-5">
              <h3 className="font-semibold text-cyan-200">{group}</h3>
              <p className="mt-2 text-sm text-zinc-300">{items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-fuchsia-200">Languages</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {cvData.languages.map((item) => (
              <li key={item.language}>
                {item.language}: {item.proficiency}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-fuchsia-200">Interests</h2>
          <p className="mt-3 text-sm text-zinc-300">{cvData.interests.join(" · ")}</p>
        </div>
      </section>
    </div>
  );
}
