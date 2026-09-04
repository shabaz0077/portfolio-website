"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { WeatherData } from "@/types";

export function WeatherWidget() {
  const [city, setCity] = useState("Dubai");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadWeather = useCallback(async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(query)}`);
      const payload = (await response.json()) as WeatherData & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load weather.");
      }
      setWeather(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load weather.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadWeather("Dubai");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadWeather]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadWeather(city);
  }

  return (
    <section id="weather" className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Live Weather</p>
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
          placeholder="Search a city"
        />
        <button
          type="submit"
          className="rounded-lg bg-cyan-400 px-3 py-2 text-sm font-medium text-black"
        >
          {loading ? "..." : "Go"}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      {weather ? (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <p className="col-span-2 text-2xl font-semibold">
            {weather.city} · {weather.temperature}°C
          </p>
          <p className="capitalize text-zinc-300">{weather.condition}</p>
          <p className="text-zinc-300">Humidity {weather.humidity}%</p>
          <p className="text-zinc-300">Wind {weather.windSpeed} m/s</p>
        </div>
      ) : null}
    </section>
  );
}
