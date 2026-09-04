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
    <section id="chat" className="card rounded-2xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">AI Chatbot</p>
      <div className="mt-3 max-h-72 space-y-3 overflow-y-auto text-sm">
        {messages.map((item, index) => (
          <p
            key={`${item.role}-${index}`}
            className={item.role === "user" ? "text-accent-2" : "text-muted"}
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
          className="field"
          placeholder="Ask about Shahbaz..."
        />
        <button type="submit" className="rounded-lg bg-accent px-3 py-2 text-sm text-ink">
          {loading ? "..." : "Send"}
        </button>
      </form>
    </section>
  );
}
