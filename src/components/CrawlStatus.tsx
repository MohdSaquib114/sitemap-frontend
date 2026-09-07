"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCrawlJob } from "@/lib/useCrawlJob";
import CrawlScanner from "./CrawlScanner";

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{label}</dt>
      <motion.dd key={value} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }} className="mt-1 font-mono text-2xl text-ink">
        {value}
      </motion.dd>
    </div>
  );
}

export default function CrawlStatus({
  jobId, siteUrl, onSuccess, onFailed,
}: { jobId: number; siteUrl: string; onSuccess: () => void; onFailed: (msg: string) => void }) {
  const { state, found, crawled, queued, error } = useCrawlJob(jobId);

  useEffect(() => {
    if (state === "success") onSuccess();
    if (state === "failed") onFailed(error || "Crawl failed");
  }, [state, error, onSuccess, onFailed]);

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">Scanning {new URL(siteUrl).hostname}</p>
      <CrawlScanner active={state === "polling"} found={found} />
      <dl className="grid grid-cols-3 gap-4">
        <Metric label="Found" value={found} />
        <Metric label="Crawled" value={crawled} />
        <Metric label="Queued" value={queued} />
      </dl>
    </div>
  );
}