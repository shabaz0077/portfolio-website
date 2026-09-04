"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export function ChatBot() {
  const userId = useMemo(() => {
    if (typeof window === "undefined") {
      return "guest";
    }
    const existing = window.localStorage.getItem("portfolio-chat-id");
    if (existing) {
      return existing;
    }
    const created = crypto.randomUUID();
    window.localStorage.setItem("portfolio-chat-id", created);
    return created;
  }, []);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I can tell you about Shahbaz's work, skills, and projects. What would you like to know?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message) {
      return;
    }

    setInput("");
    setMessages((current) => [...current, { role: "user", content: message }]);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, userId }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      setMessages((current) => [
        ...current,
        { role: "assistant", content: payload.reply ?? payload.error ?? "No reply yet." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "The chatbot is unavailable right now. Try the contact page." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">AI Chatbot</p>
      <div className="mt-3 max-h-72 space-y-3 overflow-y-auto text-sm">
        {messages.map((item, index) => (
          <p
            key={`${item.role}-${index}`}
            className={item.role === "user" ? "text-fuchsia-200" : "text-zinc-200"}
          >
            <span className="font-semibold">{item.role === "user" ? "You" : "Shahbaz bot"}:</span>{" "}
            {item.content}
          </p>
        ))}
      </div>
      <form onSubmit={(event) => void onSubmit(event)} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
          placeholder="Ask about Shahbaz..."
        />
        <button type="submit" className="rounded-lg bg-cyan-400 px-3 py-2 text-sm text-black">
          {loading ? "..." : "Send"}
        </button>
      </form>
    </section>
  );
}
