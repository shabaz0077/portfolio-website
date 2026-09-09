export type ProjectCategory = "All" | "AI/ML" | "Web" | "Hardware";
export type ProjectVariant = "hero" | "text" | "stat" | "timeline";

export type ProjectRecord = {
  id: string;
  title: string;
  teaser: string;
  summary: string;
  description: string;
  tech: string[];
  category: Exclude<ProjectCategory, "All">;
  date: string;
  featured: boolean;
  variant: ProjectVariant;
  accent: "purple" | "cyan" | "pink" | "teal";
  icon: string;
  metric?: { value: string; label: string };
  process: string[];
  demoHref?: string;
};

export const allProjects: ProjectRecord[] = [
  {
    id: "chat",
    title: "AI Chatbot",
    teaser: "A CV-aware assistant that answers in seconds.",
    summary: "Hugging Face chat UI that stays useful even when the office network is blocked.",
    description:
      "This portfolio assistant is trained on Shahbaz's public CV facts and answers questions about stack, internships, and demos. It posts to /api/chat, keeps a short history, and falls back to local replies if Hugging Face is unreachable. The goal was a fast, honest chatbot rather than a generic widget.",
    tech: ["Next.js", "TypeScript", "Hugging Face"],
    category: "AI/ML",
    date: "2024-01-15",
    featured: true,
    variant: "hero",
    accent: "pink",
    icon: "🤖",
    metric: { value: "<8s", label: "failover timeout" },
    process: ["Prompt from CV facts", "Router + inference fallback", "Local answers if TLS is blocked"],
    demoHref: "/projects#chat",
  },
  {
    id: "weather",
    title: "Live Weather",
    teaser: "Dubai-first weather with city search.",
    summary: "OpenWeatherMap widget with caching and a graceful offline sample.",
    description:
      "The weather demo defaults to Dubai, caches results for ten minutes, and lets visitors search any city. If the corporate network blocks OpenWeather, it still shows a realistic sample instead of a failed fetch. It is a small product lesson: live data should degrade, not break.",
    tech: ["Next.js", "OpenWeatherMap"],
    category: "Web",
    date: "2024-01-10",
    featured: true,
    variant: "hero",
    accent: "cyan",
    icon: "🌤️",
    metric: { value: "10 min", label: "cache window" },
    process: ["City query", "Server cache", "Fallback sample on TLS failure"],
    demoHref: "/projects#weather",
  },
  {
    id: "anime",
    title: "Anime Search",
    teaser: "Jikan-powered title lookup with ratings.",
    summary: "Search MyAnimeList titles, episodes, and synopses through the free Jikan API.",
    description:
      "Anime Search talks to Jikan, maps ratings and synopses, and keeps an offline catalog so searches still feel complete on restricted networks. It is a lightweight product demo of search UX, empty states, and API caching.",
    tech: ["React", "Jikan API"],
    category: "Web",
    date: "2023-12-20",
    featured: false,
    variant: "text",
    accent: "purple",
    icon: "🎌",
    process: ["Query Jikan", "Map MAL fields", "Filter local catalog if blocked"],
    demoHref: "/projects#anime",
  },
  {
    id: "jokes",
    title: "Programming Jokes",
    teaser: "One-click setup and punchline.",
    summary: "A tiny Official Joke API widget used as a home-page palate cleanser.",
    description:
      "A small client widget that fetches programming jokes on demand. It is intentionally simple: loading states, a retry button, and no extra chrome. Used on the home page as a light moment, not as a second copy of the projects grid.",
    tech: ["React", "Joke API"],
    category: "Web",
    date: "2023-11-12",
    featured: false,
    variant: "timeline",
    accent: "pink",
    icon: "😄",
    process: ["Hit joke API", "Show setup + punchline", "Retry without page reload"],
    demoHref: "/projects#jokes",
  },
  {
    id: "recommendation",
    title: "Recommendation Engine",
    teaser: "Ranking ideas for pharmacy discovery.",
    summary: "Signal-based ranking sketches for pharmacy and content discovery.",
    description:
      "A design for personalized ranking around user signals: recency, category affinity, and availability. Built as a TypeScript/Python sketch rather than a live storefront, it documents how Shahbaz thinks about ranking before jumping into models.",
    tech: ["Python", "TypeScript", "APIs"],
    category: "AI/ML",
    date: "2023-09-18",
    featured: false,
    variant: "text",
    accent: "teal",
    icon: "🎯",
    process: ["Capture user signals", "Score recency + affinity", "Explain ranked output"],
  },
  {
    id: "ocr",
    title: "Prescription OCR",
    teaser: "Advanced OCR for pharmacy workflows.",
    summary: "AI/ML pipeline that turns prescription images into structured JSON.",
    description:
      "Built during the PureCS/Dawak internship for digital pharmacy workflows. Images go through OCR/VLM extraction, then NestJS services structure patient, doctor, and medicine fields. The live demo on this site uses Tesseract in the browser so visitors can try the idea without uploading to a hospital system.",
    tech: ["Python", "NestJS", "Docker", "OCR/VLM"],
    category: "AI/ML",
    date: "2023-08-01",
    featured: true,
    variant: "stat",
    accent: "purple",
    icon: "💊",
    metric: { value: "JSON", label: "structured output" },
    process: ["Capture image", "Extract text with OCR/VLM", "Map patient, doctor, medicines"],
    demoHref: "/projects#ocr",
  },
  {
    id: "arduino",
    title: "Arduino Project",
    teaser: "Hardware build with a team of three.",
    summary: "Open-source electronics project with 10+ presentations and team delivery.",
    description:
      "University hardware work using Arduino. Shahbaz managed a team of three, planned demos, and delivered more than ten presentations. It sits in the archive as evidence of leadership and physical prototyping, not as a clone of the web demos.",
    tech: ["Arduino", "Electronics", "Project Management"],
    category: "Hardware",
    date: "2022-04-01",
    featured: false,
    variant: "timeline",
    accent: "cyan",
    icon: "⚡",
    metric: { value: "10+", label: "presentations" },
    process: ["Prototype circuit", "Coordinate a team of 3", "Present and iterate"],
  },
];

export const projectCategories: ProjectCategory[] = ["All", "AI/ML", "Web", "Hardware"];

export function sortProjectsByDate(items: ProjectRecord[] = allProjects) {
  return [...items].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getProjectById(id: string) {
  return allProjects.find((item) => item.id === id);
}

export function getFeaturedProjects() {
  return sortProjectsByDate(allProjects.filter((item) => item.featured));
}

export function getRecentProjects() {
  return sortProjectsByDate(allProjects.filter((item) => !item.featured));
}
