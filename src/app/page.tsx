import { Suspense } from "react";
import { CreateLinkForm } from "@/components/create-link-form";
import { LinkList, LinkListSkeleton } from "@/components/link-list";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-10 px-4 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Link-Kürzer</h1>
        <p className="text-sm opacity-70">Kurze Links mit Klick-Statistik.</p>
      </div>

      <CreateLinkForm />

      <section className="w-full max-w-xl">
        <h2 className="mb-3 font-semibold">Zuletzt erstellt</h2>
        <Suspense fallback={<LinkListSkeleton />}>
          <LinkList />
        </Suspense>
      </section>
    </main>
  );
}
