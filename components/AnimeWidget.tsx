"use client";

import { FormEvent, useState } from "react";
import type { AnimeResult } from "@/types";

export function AnimeWidget() {
  const [query, setQuery] = useState("Naruto");
  const [results, setResults] = useState<AnimeResult[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to search anime.");
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="anime" className="card rounded-3xl p-6">
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
      {results.length ? (
        <p className="mt-3 text-xs text-muted">{results.length} titles</p>
      ) : searched && !loading ? (
        <p className="mt-3 text-xs text-muted">No matching titles. Try another search.</p>
      ) : !loading ? (
        <p className="mt-3 text-xs text-muted">Search any title. Live results come from Kitsu.</p>
      ) : null}
      <div className="mt-4 grid max-h-[36rem] gap-3 overflow-y-auto">
        {results.map((item) => (
          <article key={item.id} className="flex gap-3 rounded-xl border border-line p-3">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt=""
                className="h-24 w-16 shrink-0 rounded-md object-cover"
              />
            ) : null}
            <div className="min-w-0">
              <h3 className="font-medium text-accent">{item.title}</h3>
              <p className="text-xs text-muted">
                {item.type}
                {item.year ? ` · ${item.year}` : ""} · {item.status} · {item.episodes ?? "?"} eps · {item.rating ?? "N/A"}
              </p>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{item.synopsis}</p>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-accent-3">
                  Details →
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
