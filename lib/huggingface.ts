import type { ChatMessage } from "@/types";
import { cvData } from "@/lib/cv-data";

const HF_MODEL = "HuggingFaceH4/zephyr-7b-beta";

export const SHAHBAZ_SYSTEM_PROMPT = `You are Shahbaz's portfolio assistant.
Speak as a helpful, concise guide about Shahbaz Ahmed, an App Developer in Dubai.
Facts you can use:
- Name: ${cvData.name}
- Title: ${cvData.title}
- Location: ${cvData.location}
- Email: ${cvData.email}
- Phone: ${cvData.phone}
- Summary: ${cvData.summary}
- Recent role: App Developer intern at PureCS/Dawak, NestJS/TypeScript, prescription OCR, Docker, PureHealth ecosystem.
- Previous role: Customer Service Associate at PureHealth, Dubai Airport.
- Education: BSc Information Technology, Amity University Dubai.
- Skills: Next.js, React, TypeScript, NestJS, Python, AI/ML, OCR/VLM, Docker, Git.
If you do not know something, say so and invite the visitor to use the contact form.
Keep replies under 120 words.`;

function fallbackReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire")) {
    return `You can reach Shahbaz at ${cvData.email} or ${cvData.phone}. The contact form on this site also sends a message directly.`;
  }
  if (lower.includes("project") || lower.includes("ocr") || lower.includes("work")) {
    return "Shahbaz recently interned at PureCS/Dawak, building NestJS services and an AI/ML prescription OCR pipeline. Explore the Projects page for live demos: chatbot, weather, anime search, jokes, and OCR.";
  }
  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech")) {
    return "Core stack: Next.js, React, TypeScript, NestJS, Python, Docker, and AI/ML pipelines including OCR/VLM. He is based in Dubai and focused on backend and app development.";
  }
  return `${cvData.name} is an App Developer in ${cvData.location}. He builds backend services, AI/ML pipelines, and modern web apps. Ask about his CV, projects, or how to get in touch.`;
}

export async function generateChatReply(
  history: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  if (!apiKey || apiKey.includes("xxxxxxxxxxxxx")) {
    return fallbackReply(userMessage);
  }

  const messages: ChatMessage[] = [
    { role: "system", content: SHAHBAZ_SYSTEM_PROMPT },
    ...history.slice(-8),
    { role: "user", content: userMessage },
  ];

  const response = await fetch(`https://router.huggingface.co/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages,
      max_tokens: 220,
      temperature: 0.6,
    }),
  });

  if (!response.ok) {
    const inference = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `${SHAHBAZ_SYSTEM_PROMPT}\n\nUser: ${userMessage}\nAssistant:`,
          parameters: { max_new_tokens: 180, temperature: 0.6, return_full_text: false },
        }),
      },
    );

    if (!inference.ok) {
      return fallbackReply(userMessage);
    }

    const data: unknown = await inference.json();
    if (Array.isArray(data) && data[0] && typeof data[0] === "object" && "generated_text" in data[0]) {
      const text = String((data[0] as { generated_text: string }).generated_text).trim();
      return text || fallbackReply(userMessage);
    }

    return fallbackReply(userMessage);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const reply = payload.choices?.[0]?.message?.content?.trim();
  return reply || fallbackReply(userMessage);
}
