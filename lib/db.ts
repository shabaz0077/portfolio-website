import type { ChatMessage } from "@/types";

const memoryStore = new Map<string, ChatMessage[]>();

function hasKvConfig() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getKvClient() {
  if (!hasKvConfig()) {
    return null;
  }

  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  const key = `chat:${userId}`;

  try {
    const kv = await getKvClient();
    if (kv) {
      const history = await kv.get<ChatMessage[]>(key);
      return history ?? [];
    }
  } catch {
    // Fall through to in-memory storage when KV is unavailable.
  }

  return memoryStore.get(key) ?? [];
}

export async function saveChatHistory(
  userId: string,
  history: ChatMessage[],
): Promise<void> {
  const key = `chat:${userId}`;
  const trimmed = history.slice(-20);

  try {
    const kv = await getKvClient();
    if (kv) {
      await kv.set(key, trimmed, { ex: 60 * 60 * 24 * 7 });
      return;
    }
  } catch {
    // Fall through to in-memory storage when KV is unavailable.
  }

  memoryStore.set(key, trimmed);
}
