"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CrawlForm from "./CrawlForm";
import CrawlStatus from "./CrawlStatus";
import DownloadCard from "./DownloadCard";
import DraftingPanel from "./DraftingPanel";
import { startCrawl } from "@/lib/api";

type Stage = "idle" | "starting" | "crawling" | "ready" | "error";

export default function CrawlSection() {
  const [stage, setStage] = useState<Stage>("idle");
  const [jobId, setJobId] = useState<number | null>(null);
  const [siteUrl, setSiteUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleStart(url: string) {
    setStage("starting");
    setSiteUrl(url);
    try {
      const job = await startCrawl(url);
      setJobId(job.jobId);
      setStage("crawling");
    } catch (err) {
      setErrorMessage((err as Error).message);
      setStage("error");
    }
  }

  function handleReset() {
    setStage("idle"); setJobId(null); setErrorMessage("");
  }

  return (
    <section id="crawl" className="mx-auto max-w-2xl px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl leading-tight text-ink md:text-5xl"
      >
        Map a site. Watch it happen. <span className="italic text-accent">Take the file.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 max-w-md text-ink-muted"
      >
        Enter a URL. Pages are discovered and crawled in real time — nothing is saved once you leave.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10">
        <DraftingPanel tag={stage === "ready" ? "fig. 03 — output" : stage === "crawling" ? "fig. 02 — scan" : "fig. 01 — input"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {(stage === "idle" || stage === "starting") && <CrawlForm onSubmit={handleStart} loading={stage === "starting"} />}
              {stage === "crawling" && jobId && (
                <CrawlStatus jobId={jobId} siteUrl={siteUrl} onSuccess={() => setStage("ready")} onFailed={(msg) => { setErrorMessage(msg); setStage("error"); }} />
              )}
              {stage === "ready" && jobId && <DownloadCard jobId={jobId} siteUrl={siteUrl} onReset={handleReset} />}
              {stage === "error" && (
                <div className="space-y-3">
                  <p className="font-mono text-xs text-accent">{errorMessage}</p>
                  <button onClick={handleReset} className="font-mono text-xs text-ink-muted underline hover:text-ink">Try again</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </DraftingPanel>
      </motion.div>
    </section>
  );
}