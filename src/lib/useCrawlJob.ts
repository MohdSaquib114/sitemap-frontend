import { useEffect, useState } from "react";
import { getCrawlStatus } from "./api";

type JobState = "idle" | "polling" | "success" | "failed";

export function useCrawlJob(jobId: number | null) {
  const [state, setState] = useState<JobState>("idle");
  const [found, setFound] = useState(0);
  const [crawled, setCrawled] = useState(0);
  const [queued, setQueued] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;
    setState("polling");
    let cancelled = false;

    async function poll() {
      try {
        const job = await getCrawlStatus(jobId!);
        if (cancelled) return;
        setFound(job.found);
        setCrawled(job.crawled);
        setQueued(job.queued);
        if (job.status === "success") setState("success");
        else if (job.status === "failed") { setError("Crawl failed"); setState("failed"); }
        else setTimeout(poll, 1500);
      } catch (err) {
        if (!cancelled) { setError((err as Error).message); setState("failed"); }
      }
    }
    poll();
    return () => { cancelled = true; };
  }, [jobId]);

  return { state, found, crawled, queued, error };
}