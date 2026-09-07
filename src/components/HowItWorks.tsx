const steps = [
  { title: "Enter your URL", body: "Point it at any site you can already reach." },
  { title: "We crawl and diff", body: "Every indexable page gets fetched, live, in front of you." },
  { title: "Generate & download", body: "One click turns the scan into a sitemap.xml file." },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-ink/15 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl text-ink">How it works</h2>
        <ol className="mt-8 space-y-8">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}