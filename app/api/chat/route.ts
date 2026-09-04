import { getChatHistory, saveChatHistory } from "@/lib/db";
import { generateChatReply } from "@/lib/huggingface";
import { sanitizeText } from "@/lib/utils";
import type { ChatRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const message = sanitizeText(body.message ?? "", 500);
    const userId = sanitizeText(body.userId ?? "guest", 80) || "guest";

    if (!message) {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const history = await getChatHistory(userId);
    const reply = await generateChatReply(history, message);
    const nextHistory = [
      ...history,
      { role: "user" as const, content: message },
      { role: "assistant" as const, content: reply },
    ];
    await saveChatHistory(userId, nextHistory);

    return Response.json({
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return Response.json({ error: "Chat is unavailable right now." }, { status: 500 });
  }
}
