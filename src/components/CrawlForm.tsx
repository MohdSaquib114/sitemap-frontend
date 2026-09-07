"use client";
import { useState } from "react";

export default function CrawlForm({ onSubmit, loading }: { onSubmit: (url: string) => void; loading: boolean }) {
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);
  const isValid = (() => { try { new URL(url); return true; } catch { return false; } })();

  return (
    <form onSubmit={(e) => { e.preventDefault(); setTouched(true); if (isValid) onSubmit(url); }}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          placeholder="https://yoursite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="Website URL"
          aria-invalid={touched && !isValid}
          className="flex-1 border border-ink/20 bg-bg px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-accent bg-accent px-6 py-3 font-mono text-sm uppercase tracking-wide text-surface transition hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "Starting…" : "Scan site"}
        </button>
      </div>
      {touched && !isValid && <p className="mt-2 font-mono text-xs text-accent">Enter a full URL, including https://</p>}
    </form>
  );
}