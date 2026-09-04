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
    <section className="card rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-2">Random Joke</p>
        <button
          type="button"
          onClick={() => void loadJoke()}
          className="rounded-full border border-accent-2/40 px-3 py-1 text-xs text-accent-2 hover:bg-accent-2/10"
        >
          {loading ? "Loading..." : "New joke"}
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}
      {joke ? (
        <div className="mt-3 space-y-2 text-sm text-muted">
          <p>{joke.setup}</p>
          <p className="font-medium text-accent">{joke.punchline}</p>
        </div>
      ) : null}
    </section>
  );
}
