export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  message: string;
  userId?: string;
};

export type ChatResponse = {
  reply: string;
  timestamp: string;
};

export type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
};

export type AnimeResult = {
  id: number;
  title: string;
  status: string;
  episodes: number | null;
  rating: number | null;
  image: string;
  synopsis: string;
};

export type JokeData = {
  type: string;
  setup: string;
  punchline: string;
  id: number;
};

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  id?: string;
};
