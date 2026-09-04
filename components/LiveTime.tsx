"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(timer);
}

function useDubaiClock() {
  const now = useSyncExternalStore(
    subscribe,
    () => Date.now(),
    () => 0,
  );

  if (!now) {
    return { time: "--:--:--", date: "Dubai" };
  }

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(now);

  return { time, date };
}

export function HeaderClock({ className }: { className?: string }) {
  const { time, date } = useDubaiClock();

  return (
    <div className={cn("leading-tight", className)}>
      <p className="font-mono text-sm font-semibold text-accent">{time}</p>
      <p className="text-[11px] text-muted">{date} · Dubai</p>
    </div>
  );
}

export function LiveTime() {
  const { time, date } = useDubaiClock();

  return (
    <section className="card rounded-2xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Live Time</p>
      <p className="mt-2 font-mono text-2xl font-semibold text-foreground">{time}</p>
      <p className="mt-1 text-sm text-muted">{date} · Dubai, UAE</p>
    </section>
  );
}
