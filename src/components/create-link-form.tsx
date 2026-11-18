"use client";

import { createLinkAction, CreateLinkState } from "@/lib/actions";
import { useActionState, useState } from "react";

export function CreateLinkForm() {
  const [state, action, pending] = useActionState<CreateLinkState, FormData>(
    createLinkAction,
    null,
  );
  const [copied, setCopied] = useState(false);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      <form action={action} className="flex gap-2">
        <input
          name="url"
          type="text"
          inputMode="url"
          placeholder="https://example.com/ein/langer/link"
          aria-label="Lange URL"
          className="flex-1 rounded-md border px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "Kürze…" : "Kürzen"}
        </button>
      </form>

      {state?.ok === false && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      {state?.ok === true && (
        <div className="flex items-center justify-between rounded-md border p-3">
          <a
            href={state.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {state.shortUrl}
          </a>
          <button
            type="button"
            onClick={() => copy(state.shortUrl)}
            className="text-sm underline"
          >
            {copied ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      )}
    </div>
  );
}
