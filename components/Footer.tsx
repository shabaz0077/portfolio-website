import Link from "next/link";
import { cvData } from "@/lib/cv-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-header">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {cvData.name}. Built in {cvData.location}.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-accent">
            CV
          </Link>
          <Link href="/projects" className="hover:text-accent">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
          <a href={`mailto:${cvData.email}`} className="hover:text-accent">
            {cvData.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
