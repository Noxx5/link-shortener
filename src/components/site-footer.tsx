import { SITE } from "@/lib/site";
import Link from "next/link";

const footerLink =
  "underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-100";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>
          © 2026 {SITE.name} · Gebaut von{" "}
          <Link
            href={SITE.githubProfile}
            target="_blank"
            rel="noreferrer"
            className={footerLink}
          >
            Noxx5
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={SITE.githubRepo}
            target="_blank"
            rel="noreferrer"
            className={footerLink}
          >
            Quellcode
          </Link>
          <Link
            href={`${SITE.githubRepo}/issues`}
            target="_blank"
            rel="noreferrer"
            className={footerLink}
          >
            Fehler melden
          </Link>
        </div>
      </div>
    </footer>
  );
}
