"use client";
import { useState } from "react";
import { generateSitemap } from "@/lib/api";

export default function DownloadCard({ jobId, siteUrl, onReset }: { jobId: number; siteUrl: string; onReset: () => void }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setGenerating(true);
    setError("");
    try {
      const blob = await generateSitemap(jobId);
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "sitemap.xml";
      link.click();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div>
      <p className="font-mono text-sm text-ink">Scan complete for {new URL(siteUrl).hostname}</p>
      {error && <p className="mt-2 font-mono text-xs text-accent">{error}</p>}
      <div className="mt-4 flex items-center gap-5">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="border border-accent bg-accent px-5 py-2.5 font-mono text-sm uppercase tracking-wide text-surface hover:bg-accent-hover disabled:opacity-60"
        >
          {generating ? "Generating…" : "Download sitemap.xml"}
        </button>
        <button onClick={onReset} className="font-mono text-xs text-ink-muted underline hover:text-ink">Scan another</button>
      </div>
    </div>
  );
}