"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
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
    <header className="sticky top-0 z-50 border-b border-cyan-400/20 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-wide text-cyan-300">
          Shahbaz Ahmed
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition hover:text-cyan-300",
                pathname === link.href ? "text-cyan-300" : "text-zinc-300",
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="rounded-full border border-cyan-400/30 p-2 text-cyan-200 hover:bg-cyan-400/10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
        <button
          type="button"
          className="rounded-md p-2 text-cyan-200 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-cyan-400/10 px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm",
                pathname === link.href ? "text-cyan-300" : "text-zinc-300",
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="w-fit rounded-full border border-cyan-400/30 px-3 py-1 text-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle theme
          </button>
        </nav>
      ) : null}
    </header>
  );
}
