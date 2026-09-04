"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(timer);
}

export function LiveTime() {
  const now = useSyncExternalStore(
    subscribe,
    () => Date.now(),
    () => 0,
  );

  const dubai = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        day: "2-digit",
        month: "short",
      }).format(now)
    : "--:--:--";

  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Live Time</p>
      <p className="mt-2 text-2xl font-semibold text-white">{dubai}</p>
      <p className="mt-1 text-sm text-zinc-400">Dubai, UAE</p>
    </section>
  );
}
