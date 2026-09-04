import type { AnimeResult } from "@/types";

const CACHE_MS = 60 * 60 * 1000;
const cache = new Map<string, { expires: number; data: AnimeResult[] }>();

const FALLBACK_ANIME: AnimeResult[] = [
  {
    id: 20,
    title: "Naruto",
    status: "Finished Airing",
    episodes: 220,
    rating: 8.0,
    image: "",
    synopsis: "Naruto Uzumaki, a young ninja, searches for recognition and dreams of becoming Hokage.",
  },
  {
    id: 1735,
    title: "Naruto: Shippuuden",
    status: "Finished Airing",
    episodes: 500,
    rating: 8.3,
    image: "",
    synopsis: "Naruto returns after training with Jiraiya to face the Akatsuki and protect his friends.",
  },
  {
    id: 21,
    title: "One Piece",
    status: "Currently Airing",
    episodes: null,
    rating: 8.7,
    image: "",
    synopsis: "Monkey D. Luffy sets out to become King of the Pirates with his crew.",
  },
  {
    id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    status: "Finished Airing",
    episodes: 64,
    rating: 9.1,
    image: "",
    synopsis: "Two brothers use alchemy in a quest to restore their bodies after a forbidden transmutation.",
  },
  {
    id: 16498,
    title: "Attack on Titan",
    status: "Finished Airing",
    episodes: 25,
    rating: 8.5,
    image: "",
    synopsis: "Humanity fights for survival against giant Titans behind massive walls.",
  },
  {
    id: 38000,
    title: "Demon Slayer: Kimetsu no Yaiba",
    status: "Finished Airing",
    episodes: 26,
    rating: 8.5,
    image: "",
    synopsis: "Tanjiro becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.",
  },
  {
    id: 1535,
    title: "Death Note",
    status: "Finished Airing",
    episodes: 37,
    rating: 8.6,
    image: "",
    synopsis: "A high school student finds a notebook that can kill anyone whose name is written in it.",
  },
  {
    id: 40748,
    title: "Jujutsu Kaisen",
    status: "Finished Airing",
    episodes: 24,
    rating: 8.6,
    image: "",
    synopsis: "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna.",
  },
];

type JikanAnime = {
  mal_id: number;
  title: string;
  status: string | null;
  episodes: number | null;
  score: number | null;
  synopsis: string | null;
  images?: { jpg?: { image_url?: string } };
};

function fallbackResults(query: string): AnimeResult[] {
  const key = query.trim().toLowerCase();
  const matches = FALLBACK_ANIME.filter(
    (item) =>
      item.title.toLowerCase().includes(key) ||
      item.synopsis.toLowerCase().includes(key),
  );
  return matches.length > 0 ? matches : FALLBACK_ANIME;
}

export async function searchAnime(query: string): Promise<AnimeResult[]> {
  const key = query.trim().toLowerCase();
  if (!key) {
    return [];
  }

  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  try {
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=8`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const fallback = fallbackResults(query);
      cache.set(key, { expires: Date.now() + CACHE_MS, data: fallback });
      return fallback;
    }

    const payload = (await response.json()) as { data?: JikanAnime[] };
    const results: AnimeResult[] = (payload.data ?? []).map((item) => ({
      id: item.mal_id,
      title: item.title,
      status: item.status ?? "Unknown",
      episodes: item.episodes,
      rating: item.score,
      image: item.images?.jpg?.image_url ?? "",
      synopsis: item.synopsis ?? "No synopsis available.",
    }));

    cache.set(key, { expires: Date.now() + CACHE_MS, data: results });
    return results;
  } catch {
    const fallback = fallbackResults(query);
    cache.set(key, { expires: Date.now() + CACHE_MS, data: fallback });
    return fallback;
  }
}
