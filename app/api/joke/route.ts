import { getRandomJoke } from "@/lib/joke-api";

export async function GET() {
  try {
    const joke = await getRandomJoke();
    return Response.json(joke);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch a joke.";
    return Response.json({ error: message }, { status: 502 });
  }
}
