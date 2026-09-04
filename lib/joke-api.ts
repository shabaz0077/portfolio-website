import type { JokeData } from "@/types";

const FALLBACK_JOKES: JokeData[] = [
  {
    id: 1,
    type: "programming",
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs.",
  },
  {
    id: 2,
    type: "programming",
    setup: "Why did the developer go broke?",
    punchline: "Because they used up all their cache.",
  },
  {
    id: 3,
    type: "programming",
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None. It is a hardware problem.",
  },
];

function fallbackJoke(): JokeData {
  return FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
}

export async function getRandomJoke(): Promise<JokeData> {
  try {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random", {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackJoke();
    }

    const payload = (await response.json()) as JokeData[] | JokeData;
    const joke = Array.isArray(payload) ? payload[0] : payload;

    if (!joke?.setup || !joke?.punchline) {
      return fallbackJoke();
    }

    return {
      type: joke.type ?? "programming",
      setup: joke.setup,
      punchline: joke.punchline,
      id: joke.id ?? Date.now(),
    };
  } catch {
    return fallbackJoke();
  }
}
