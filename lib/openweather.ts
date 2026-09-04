import type { WeatherData } from "@/types";

const CACHE_MS = 10 * 60 * 1000;
const cache = new Map<string, { expires: number; data: WeatherData }>();

const SAMPLE_WEATHER: WeatherData = {
  city: "Dubai",
  temperature: 34,
  condition: "Clear sky",
  humidity: 42,
  windSpeed: 4.1,
  icon: "01d",
};

export async function getWeather(city = "Dubai"): Promise<WeatherData> {
  const key = city.trim().toLowerCase() || "dubai";
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const fallback = { ...SAMPLE_WEATHER, city: city || "Dubai" };
  const apiKey = process.env.OPENWEATHER_API_KEY?.replace(/^API/i, "").trim();
  if (!apiKey || apiKey.includes("abc123")) {
    cache.set(key, { expires: Date.now() + CACHE_MS, data: fallback });
    return fallback;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url, { next: { revalidate: 600 }, signal: AbortSignal.timeout(8000) });

    if (!response.ok) {
      cache.set(key, { expires: Date.now() + CACHE_MS, data: fallback });
      return fallback;
    }

    const payload = (await response.json()) as {
      name: string;
      main: { temp: number; humidity: number };
      weather: Array<{ description: string; icon: string }>;
      wind: { speed: number };
    };

    const data: WeatherData = {
      city: payload.name,
      temperature: Math.round(payload.main.temp),
      condition: payload.weather[0]?.description ?? "Unknown",
      humidity: payload.main.humidity,
      windSpeed: payload.wind.speed,
      icon: payload.weather[0]?.icon ?? "01d",
    };

    cache.set(key, { expires: Date.now() + CACHE_MS, data });
    return data;
  } catch {
    cache.set(key, { expires: Date.now() + CACHE_MS, data: fallback });
    return fallback;
  }
}
