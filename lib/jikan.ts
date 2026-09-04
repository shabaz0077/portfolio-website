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
    id: 21,
    title: "One Piece",
    status: "Currently Airing",
    episodes: null,
    rating: 8.7,
    image: "",
    synopsis: "Monkey D. Luffy sets out to become King of the Pirates with his crew.",
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
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      cache.set(key, { expires: Date.now() + CACHE_MS, data: FALLBACK_ANIME });
      return FALLBACK_ANIME;
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
    cache.set(key, { expires: Date.now() + CACHE_MS, data: FALLBACK_ANIME });
    return FALLBACK_ANIME;
  }
}
