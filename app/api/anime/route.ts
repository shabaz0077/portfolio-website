import { searchAnime } from "@/lib/jikan";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "Naruto";

  try {
    const results = await searchAnime(search);
    return Response.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to search anime.";
    return Response.json({ error: message }, { status: 502 });
  }
}
