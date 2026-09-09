"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { HeaderClock } from "@/components/LiveTime";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-header/70 backdrop-blur-2xl">
      <div className="section-shell flex items-center justify-between gap-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="shrink-0 font-semibold tracking-wide text-foreground">
            Shahbaz Ahmed
          </Link>
          <HeaderClock className="hidden sm:block" />
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm transition hover:text-accent-3",
                  active ? "text-accent-3" : "text-muted",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-accent-3 shadow-[0_0_12px_rgba(65,105,225,0.7)]" />
                ) : null}
              </Link>
            );
          })}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="rounded-full border border-line p-2 text-accent-3 hover:shadow-[0_0_16px_rgba(65,105,225,0.35)]"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
        <button
          type="button"
          className="rounded-md p-2 text-accent md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-line px-4 py-4 md:hidden">
          <HeaderClock />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm",
                pathname === link.href ? "text-accent" : "text-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="w-fit rounded-full border border-line px-3 py-1 text-sm text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle theme
          </button>
        </nav>
      ) : null}
    </header>
  );
}
