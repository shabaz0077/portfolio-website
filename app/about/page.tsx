import { cvData } from "@/lib/cv-data";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 print:max-w-none print:px-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">{cvData.name}</h1>
          <p className="mt-2 text-accent">
            {cvData.title} · {cvData.location}
          </p>
          <p className="mt-1 text-sm text-muted">
            {cvData.email} · {cvData.phone}
          </p>
        </div>
        <a
          href="/resume.pdf"
          className="no-print rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink"
        >
          Download Resume
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-accent-2">Summary</h2>
        <p className="mt-3 text-muted">{cvData.summary}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-accent-2">Work Experience</h2>
        <div className="mt-4 space-y-6">
          {cvData.workExperience.map((job) => (
            <article key={job.company} className="card rounded-2xl p-5">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-accent">
                {job.company} · {job.location} · {job.duration}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-accent-2">Education</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {cvData.education.map((item) => (
            <article key={item.school} className="card rounded-2xl p-5">
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="text-sm text-accent">
                {item.school} · {item.location}
              </p>
              <p className="text-sm text-muted">{item.year}</p>
              <p className="mt-2 text-sm text-muted">{item.courses.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-accent-2">Skills</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {Object.entries(cvData.skills).map(([group, items]) => (
            <article key={group} className="card rounded-2xl p-5">
              <h3 className="font-semibold text-accent">{group}</h3>
              <p className="mt-2 text-sm text-muted">{items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-accent-2">Languages</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {cvData.languages.map((item) => (
              <li key={item.language}>
                {item.language}: {item.proficiency}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-accent-2">Interests</h2>
          <p className="mt-3 text-sm text-muted">{cvData.interests.join(" · ")}</p>
        </div>
      </section>
    </div>
  );
}
