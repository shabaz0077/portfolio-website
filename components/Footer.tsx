import Link from "next/link";
import { cvData } from "@/lib/cv-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cyan-400/20 bg-ink/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {cvData.name}. Built in {cvData.location}.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-cyan-300">
            CV
          </Link>
          <Link href="/projects" className="hover:text-cyan-300">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-cyan-300">
            Contact
          </Link>
          <a href={`mailto:${cvData.email}`} className="hover:text-cyan-300">
            {cvData.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
