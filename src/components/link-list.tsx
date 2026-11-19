import { connection } from "next/server";
import { CopyButton } from "@/components/copy-button";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

const dateFormat = new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" });

function hostnameOf(url: string) {
  return URL.canParse(url) ? new URL(url).hostname : url;
}

export async function LinkList() {
  await connection();

  const links = await db.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { _count: { select: { clicks: true } } },
  });

  if (links.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
        Noch keine Links. Kürze oben deinen ersten.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
      {links.map((link) => {
        const count = link._count.clicks;
        return (
          <li key={link.id} className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-sm font-medium">/{link.code}</p>
              <p className="truncate text-xs text-zinc-500">
                {hostnameOf(link.url)} · {dateFormat.format(link.createdAt)}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">
              {count} {count === 1 ? "Klick" : "Klicks"}
            </span>
            <CopyButton text={`${env.BASE_URL}/${link.code}`} />
          </li>
        );
      })}
    </ul>
  );
}

export function LinkListSkeleton() {
  return (
    <ul
      className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
      aria-hidden="true"
    >
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i} className="flex items-center gap-3 p-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-current opacity-10" />
            <div className="h-3 w-40 animate-pulse rounded bg-current opacity-10" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-current opacity-10" />
        </li>
      ))}
    </ul>
  );
}
