import { connection } from "next/server";
import { db } from "@/lib/db";

export async function LinkList() {
  await connection();

  const links = await db.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { _count: { select: { clicks: true } } },
  });

  if (links.length === 0) {
    return <p className="text-sm opacity-70">Noch keine Links.</p>;
  }

  return (
    <ul className="divide-y rounded-md border">
      {links.map((link) => (
        <li
          key={link.id}
          className="flex items-center justify-between gap-4 p-3"
        >
          <div className="min-w-0">
            <p className="font-mono text-sm">/{link.code}</p>
            <p className="truncate text-xs opacity-70">{link.url}</p>
          </div>
          <span className="shrink-0 text-sm">{link._count.clicks} Klicks</span>
        </li>
      ))}
    </ul>
  );
}

export function LinkListSkeleton() {
  return (
    <ul className="divide-y rounded-md border" aria-hidden="true">
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i} className="flex items-center justify-between gap-4 p-3">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-current opacity-10" />
            <div className="h-3 w-48 animate-pulse rounded bg-current opacity-10" />
          </div>
          <div className="h-4 w-16 animate-pulse rounded bg-current opacity-10" />
        </li>
      ))}
    </ul>
  );
}
