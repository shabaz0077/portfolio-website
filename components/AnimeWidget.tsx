"use client";

import { FormEvent, useState } from "react";
import type { AnimeResult } from "@/types";

export function AnimeWidget() {
  const [query, setQuery] = useState("Naruto");
  const [results, setResults] = useState<AnimeResult[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/anime?search=${encodeURIComponent(query)}`);
      const payload = (await response.json()) as { results?: AnimeResult[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to search anime.");
      }
      setResults(payload.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to search anime.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="anime" className="card rounded-2xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent-2">Anime Search</p>
      <form onSubmit={(event) => void onSubmit(event)} className="mt-3 flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="field"
          placeholder="Search anime"
        />
        <button type="submit" className="rounded-lg bg-accent-2 px-3 py-2 text-sm text-ink">
          {loading ? "..." : "Search"}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}
      <div className="mt-4 grid gap-3">
        {results.map((item) => (
          <article key={item.id} className="rounded-xl border border-line p-3">
            <h3 className="font-medium text-accent">{item.title}</h3>
            <p className="text-xs text-muted">
              {item.status} · {item.episodes ?? "?"} eps · {item.rating ?? "N/A"}
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{item.synopsis}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
