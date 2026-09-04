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
    <section id="anime" className="rounded-2xl border border-fuchsia-400/20 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-300">Anime Search</p>
      <form onSubmit={(event) => void onSubmit(event)} className="mt-3 flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-fuchsia-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-fuchsia-300"
          placeholder="Search anime"
        />
        <button type="submit" className="rounded-lg bg-fuchsia-400 px-3 py-2 text-sm text-black">
          {loading ? "..." : "Search"}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      <div className="mt-4 grid gap-3">
        {results.map((item) => (
          <article key={item.id} className="rounded-xl border border-white/10 p-3">
            <h3 className="font-medium text-cyan-200">{item.title}</h3>
            <p className="text-xs text-zinc-400">
              {item.status} · {item.episodes ?? "?"} eps · {item.rating ?? "N/A"}
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-300">{item.synopsis}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
