export default function DraftingPanel({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="relative border border-ink/15 bg-surface px-6 py-5">
      {[["-top-[5px]", "-left-[5px]"], ["-top-[5px]", "-right-[5px]"], ["-bottom-[5px]", "-left-[5px]"], ["-bottom-[5px]", "-right-[5px]"]].map(
        ([v, h], i) => (
          <span key={i} className={`pointer-events-none absolute ${v} ${h} text-line`} aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
        )
      )}
      <span className="absolute -top-3 left-4 bg-bg px-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted">{tag}</span>
      {children}
    </div>
  );
}