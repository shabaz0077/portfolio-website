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
    <header className="sticky top-0 z-50 border-b border-line bg-header/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="shrink-0 font-semibold tracking-wide text-accent">
            Shahbaz Ahmed
          </Link>
          <HeaderClock className="hidden sm:block" />
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition hover:text-accent",
                pathname === link.href ? "text-accent" : "text-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="rounded-full border border-line p-2 text-accent hover:bg-accent/10"
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
