import { getWeather } from "@/lib/openweather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Dubai";

  try {
    const weather = await getWeather(city);
    return Response.json(weather);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch weather.";
    return Response.json({ error: message }, { status: 502 });
  }
}
