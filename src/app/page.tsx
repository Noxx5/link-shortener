import { Suspense } from "react";
import { CreateLinkForm } from "@/components/create-link-form";
import { LinkList, LinkListSkeleton } from "@/components/link-list";

const features = [
  {
    icon: "⚡",
    title: "Schnelle Weiterleitung",
    text: "Der Klick wird erst nach der Weiterleitung gespeichert. Besucher warten nie auf die Datenbank.",
  },
  {
    icon: "📊",
    title: "Klicks im Blick",
    text: "Jeder Aufruf deines Kurzlinks wird gezählt und in der Liste angezeigt.",
  },
  {
    icon: "🔒",
    title: "Sicher geprüft",
    text: "Nur http- und https-Links sind erlaubt. Links auf diese Seite selbst werden abgelehnt.",
  },
];

const steps = [
  { title: "Link einfügen", text: "Kopiere die lange URL in das Eingabefeld." },
  {
    title: "Kurzlink erhalten",
    text: "Mit einem Klick auf „Kürzen“ bekommst du einen Kurzlink mit 7 Zeichen.",
  },
  {
    title: "Teilen und zählen",
    text: "Teile den Link. Jeder Aufruf erscheint als Klick in der Liste.",
  },
];

const faqs = [
  {
    q: "Wie lange bleibt ein Link gültig?",
    a: "Aktuell unbegrenzt. Ein Ablaufdatum ist im Datenmodell vorgesehen, lässt sich aber noch nicht über die Oberfläche einstellen.",
  },
  {
    q: "Welche Daten werden gespeichert?",
    a: "Die Ziel-URL und der Erstellungszeitpunkt, bei jedem Klick außerdem der Zeitpunkt und die Herkunftsseite (Referrer). Die App speichert keine IP-Adressen und setzt keine Cookies. Hosting (Vercel) und Datenbank (Neon) verarbeiten technisch bedingt trotzdem Verbindungsdaten.",
  },
  {
    q: "Welche Links sind erlaubt?",
    a: "Nur Adressen mit http oder https, maximal 2048 Zeichen. Links, die wieder auf diese Seite zeigen, werden abgelehnt, damit keine Weiterleitungsschleifen entstehen.",
  },
  {
    q: "Ist das Projekt Open Source?",
    a: "Ja. Den kompletten Quellcode samt Tests findest du auf GitHub, über den Button oben rechts oder im Footer.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-96 bg-linear-to-b from-indigo-500/15 via-violet-500/10 to-transparent blur-2xl"
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 pb-16 pt-16 text-center sm:pt-24">
          <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            Open Source · Next.js · PostgreSQL
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Lange Links.
            <br />
            <span className="bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Kurz gemacht.
            </span>
          </h1>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
            Kürze URLs in Sekunden und sieh, wie oft dein Link geöffnet wird.
            Kostenlos und ohne Registrierung.
          </p>
          <CreateLinkForm />
        </div>
      </section>

      <section
        id="recent"
        className="mx-auto max-w-2xl scroll-mt-20 px-4 pb-20"
      >
        <h2 className="mb-3 text-lg font-semibold">Zuletzt erstellt</h2>
        <Suspense fallback={<LinkListSkeleton />}>
          <LinkList />
        </Suspense>
      </section>

      <section
        id="features"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-20"
      >
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
          Funktionen
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-indigo-950/50">
                {feature.icon}
              </div>
              <h3 className="mb-1 font-semibold">{feature.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
          So funktioniert’s
        </h2>
        <ol className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="mx-auto max-w-2xl scroll-mt-20 px-4 pb-24">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          Häufige Fragen
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <summary className="cursor-pointer font-medium">{faq.q}</summary>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
