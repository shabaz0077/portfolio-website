"use client";

import { useCallback, useEffect, useState } from "react";
import type { JokeData } from "@/types";

export function JokeWidget() {
  const [joke, setJoke] = useState<JokeData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadJoke = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/joke");
      if (!response.ok) {
        throw new Error("Could not load a joke.");
      }
      setJoke((await response.json()) as JokeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load a joke.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadJoke();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadJoke]);

  return (
    <section className="rounded-2xl border border-fuchsia-400/20 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-300">Random Joke</p>
        <button
          type="button"
          onClick={() => void loadJoke()}
          className="rounded-full border border-fuchsia-300/40 px-3 py-1 text-xs text-fuchsia-100 hover:bg-fuchsia-400/10"
        >
          {loading ? "Loading..." : "New joke"}
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      {joke ? (
        <div className="mt-3 space-y-2 text-sm text-zinc-200">
          <p>{joke.setup}</p>
          <p className="font-medium text-cyan-200">{joke.punchline}</p>
        </div>
      ) : null}
    </section>
  );
}
