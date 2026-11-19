import { GithubIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LinkIcon } from "lucide-react";

const navLink =
  "hidden rounded-md px-3 py-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:block dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <LinkIcon className="size-4" />
          </span>
          {SITE.name}
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link href="/#features" className={navLink}>
            Funktionen
          </Link>
          <Link href="/#how" className={navLink}>
            So funktioniert’s
          </Link>
          <Link href="/#faq" className={navLink}>
            FAQ
          </Link>
          <Link
            href={SITE.githubRepo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">GitHub</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
