"use client";

import { FormEvent, useState } from "react";
import { cvData } from "@/lib/cv-data";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const payload = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Could not send message.");
      }
      setStatus(payload.message ?? "Message sent.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not send message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2">
      <section>
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-3 text-zinc-300">
          Send a note about roles, collaborations, or questions about the demos.
        </p>
        <div className="mt-6 space-y-2 text-sm text-zinc-300">
          <p>{cvData.email}</p>
          <p>{cvData.phone}</p>
          <p>{cvData.location}</p>
        </div>
      </section>
      <form onSubmit={(event) => void onSubmit(event)} className="space-y-4 rounded-2xl border border-cyan-400/20 p-6">
        <label className="block text-sm">
          Name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Message
          <textarea
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2"
          />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-medium text-black"
        >
          {sending ? "Sending..." : "Send message"}
        </button>
        {status ? <p className="text-sm text-cyan-200">{status}</p> : null}
      </form>
    </div>
  );
}
