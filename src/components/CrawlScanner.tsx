"use client";
import { motion } from "framer-motion";

export default function CrawlScanner({ active, found }: { active: boolean; found: number }) {
  const dots = Array.from({ length: Math.min(found, 36) });

  return (
    <div className="relative h-40 w-full overflow-hidden border border-ink/15 bg-surface">
      <div className="absolute inset-x-0 bottom-6 flex justify-between px-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={`w-px bg-line ${i % 5 === 0 ? "h-3" : "h-1.5"}`} />
        ))}
      </div>

      {dots.map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent"
          style={{ left: `${(i * 53) % 92 + 4}%`, bottom: `${28 + (i % 2) * 18}px` }}
        />
      ))}

      {active && (
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-accent/70"
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      )}

      <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {active ? "scanning" : "idle"}
      </span>
    </div>
  );
}