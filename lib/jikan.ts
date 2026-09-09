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
    image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    synopsis: "Naruto Uzumaki, a young ninja, searches for recognition and dreams of becoming Hokage.",
    year: 2002,
    type: "TV",
    url: "https://myanimelist.net/anime/20",
  },
  {
    id: 1735,
    title: "Naruto: Shippuuden",
    status: "Finished Airing",
    episodes: 500,
    rating: 8.3,
    image: "https://cdn.myanimelist.net/images/anime/5/17407.jpg",
    synopsis: "Naruto returns after training with Jiraiya to face the Akatsuki and protect his friends.",
    year: 2007,
    type: "TV",
    url: "https://myanimelist.net/anime/1735",
  },
  {
    id: 21,
    title: "One Piece",
    status: "Currently Airing",
    episodes: null,
    rating: 8.7,
    image: "https://cdn.myanimelist.net/images/anime/1244/138742.jpg",
    synopsis: "Monkey D. Luffy sets out to become King of the Pirates with his crew.",
    year: 1999,
    type: "TV",
    url: "https://myanimelist.net/anime/21",
  },
  {
    id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    status: "Finished Airing",
    episodes: 64,
    rating: 9.1,
    image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
    synopsis: "Two brothers use alchemy in a quest to restore their bodies after a forbidden transmutation.",
    year: 2009,
    type: "TV",
    url: "https://myanimelist.net/anime/5114",
  },
  {
    id: 16498,
    title: "Attack on Titan",
    status: "Finished Airing",
    episodes: 25,
    rating: 8.5,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    synopsis: "Humanity fights for survival against giant Titans behind massive walls.",
    year: 2013,
    type: "TV",
    url: "https://myanimelist.net/anime/16498",
  },
  {
    id: 38000,
    title: "Demon Slayer: Kimetsu no Yaiba",
    status: "Finished Airing",
    episodes: 26,
    rating: 8.5,
    image: "https://cdn.myanimelist.net/images/anime/1286/99847.jpg",
    synopsis: "Tanjiro becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.",
    year: 2019,
    type: "TV",
    url: "https://myanimelist.net/anime/38000",
  },
  {
    id: 1535,
    title: "Death Note",
    status: "Finished Airing",
    episodes: 37,
    rating: 8.6,
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    synopsis: "A high school student finds a notebook that can kill anyone whose name is written in it.",
    year: 2006,
    type: "TV",
    url: "https://myanimelist.net/anime/1535",
  },
  {
    id: 40748,
    title: "Jujutsu Kaisen",
    status: "Finished Airing",
    episodes: 24,
    rating: 8.6,
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    synopsis: "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna.",
    year: 2020,
    type: "TV",
    url: "https://myanimelist.net/anime/40748",
  },
];

type JikanAnime = {
  mal_id: number;
  title: string;
  status: string | null;
  episodes: number | null;
  score: number | null;
  synopsis: string | null;
  year: number | null;
  type: string | null;
  url: string | null;
  images?: { jpg?: { image_url?: string; large_image_url?: string } };
};

type AniListMedia = {
  id: number;
  title?: { romaji?: string | null; english?: string | null };
  status?: string | null;
  episodes?: number | null;
  averageScore?: number | null;
  coverImage?: { large?: string | null };
  description?: string | null;
  seasonYear?: number | null;
  format?: string | null;
  siteUrl?: string | null;
};

type KitsuAnime = {
  id: string;
  attributes?: {
    canonicalTitle?: string | null;
    titles?: { en?: string | null; en_jp?: string | null };
    status?: string | null;
    episodeCount?: number | null;
    averageRating?: string | null;
    synopsis?: string | null;
    startDate?: string | null;
    subtype?: string | null;
    slug?: string | null;
    posterImage?: { large?: string | null; medium?: string | null };
  };
};

function fallbackResults(query: string): AnimeResult[] {
  const key = query.trim().toLowerCase();
  return FALLBACK_ANIME.filter(
    (item) =>
      item.title.toLowerCase().includes(key) ||
      item.synopsis.toLowerCase().includes(key),
  );
}

function stripHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

function mapAniListStatus(status: string | null | undefined) {
  switch (status) {
    case "FINISHED":
      return "Finished Airing";
    case "RELEASING":
      return "Currently Airing";
    case "NOT_YET_RELEASED":
      return "Not yet aired";
    case "CANCELLED":
      return "Cancelled";
    case "HIATUS":
      return "Hiatus";
    default:
      return status ?? "Unknown";
  }
}

function mapKitsuStatus(status: string | null | undefined) {
  switch (status) {
    case "finished":
      return "Finished Airing";
    case "current":
      return "Currently Airing";
    case "upcoming":
      return "Not yet aired";
    case "tba":
      return "TBA";
    default:
      return status ?? "Unknown";
  }
}

async function searchKitsu(query: string): Promise<AnimeResult[] | null> {
  try {
    const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=20`;
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.api+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: KitsuAnime[] };
    const results = (payload.data ?? []).map((item) => {
      const attrs = item.attributes ?? {};
      const rating = attrs.averageRating ? Number.parseFloat(attrs.averageRating) / 10 : null;
      const year = attrs.startDate ? Number.parseInt(attrs.startDate.slice(0, 4), 10) : null;
      return {
        id: Number.parseInt(item.id, 10),
        title: attrs.titles?.en || attrs.canonicalTitle || attrs.titles?.en_jp || "Untitled",
        status: mapKitsuStatus(attrs.status),
        episodes: attrs.episodeCount ?? null,
        rating: Number.isFinite(rating) ? Number(rating?.toFixed(1)) : null,
        image: attrs.posterImage?.large ?? attrs.posterImage?.medium ?? "",
        synopsis: attrs.synopsis ? stripHtml(attrs.synopsis) : "No synopsis available.",
        year: Number.isFinite(year) ? year : null,
        type: attrs.subtype ? attrs.subtype.toUpperCase() : "Anime",
        url: attrs.slug ? `https://kitsu.app/anime/${attrs.slug}` : `https://kitsu.app/anime/${item.id}`,
      };
    });
    return results.length ? results : null;
  } catch {
    return null;
  }
}

async function searchJikan(query: string): Promise<AnimeResult[] | null> {
  try {
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=25`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: JikanAnime[] };
    const results = (payload.data ?? []).map((item) => ({
      id: item.mal_id,
      title: item.title,
      status: item.status ?? "Unknown",
      episodes: item.episodes,
      rating: item.score,
      image: item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url ?? "",
      synopsis: item.synopsis ?? "No synopsis available.",
      year: item.year,
      type: item.type ?? "Anime",
      url: item.url ?? `https://myanimelist.net/anime/${item.mal_id}`,
    }));
    return results.length ? results : null;
  } catch {
    return null;
  }
}

async function searchAniList(query: string): Promise<AnimeResult[] | null> {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ($search: String) {
          Page(page: 1, perPage: 25) {
            media(search: $search, type: ANIME) {
              id
              title { romaji english }
              status
              episodes
              averageScore
              coverImage { large }
              description(asHtml: false)
              seasonYear
              format
              siteUrl
            }
          }
        }`,
        variables: { search: query },
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: { Page?: { media?: AniListMedia[] } } };
    const results = (payload.data?.Page?.media ?? []).map((item) => ({
      id: item.id,
      title: item.title?.english || item.title?.romaji || "Untitled",
      status: mapAniListStatus(item.status),
      episodes: item.episodes ?? null,
      rating: item.averageScore ? item.averageScore / 10 : null,
      image: item.coverImage?.large ?? "",
      synopsis: item.description ? stripHtml(item.description) : "No synopsis available.",
      year: item.seasonYear ?? null,
      type: item.format ?? "Anime",
      url: item.siteUrl ?? `https://anilist.co/anime/${item.id}`,
    }));
    return results.length ? results : null;
  } catch {
    return null;
  }
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

  const live =
    (await searchKitsu(query)) ?? (await searchAniList(query)) ?? (await searchJikan(query));
  if (live?.length) {
    cache.set(key, { expires: Date.now() + CACHE_MS, data: live });
    return live;
  }

  return fallbackResults(query);
}
