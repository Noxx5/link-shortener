"use client";

import { createLinkAction, CreateLinkState } from "@/lib/actions";
import { useActionState } from "react";
import { CopyButton } from "@/components/copy-button";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function CreateLinkForm() {
  const [state, action, pending] = useActionState<CreateLinkState, FormData>(
    createLinkAction,
    null,
  );

  return (
    <div className="w-full max-w-2xl space-y-4 text-left">
      <form
        action={action}
        className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/40 sm:flex-row dark:border-zinc-800 dark:bg-zinc-900"
      >
        <Input
          name="url"
          type="text"
          inputMode="url"
          autoComplete="off"
          placeholder="https://example.com/ein/langer/link"
          aria-label="Lange URL"
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 outline-none placeholder:text-zinc-400"
          required
        />
        <Button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {pending ? "Kürze…" : "Kürzen"}
        </Button>
      </form>

      {state?.ok === false && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {state.error}
        </p>
      )}

      {state?.ok === true && (
        <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900 dark:bg-emerald-950/30">
          <div className="min-w-0">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Dein Kurzlink
            </p>
            <a
              href={state.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate font-mono text-lg font-semibold underline-offset-4 hover:underline"
            >
              {state.shortUrl}
            </a>
          </div>
          <CopyButton text={state.shortUrl} />
        </div>
      )}

      {!state && (
        <p className="text-center text-xs text-zinc-500">
          Nur http- und https-Links · keine Registrierung nötig
        </p>
      )}
    </div>
  );
}
