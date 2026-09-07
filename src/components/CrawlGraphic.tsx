export default function CrawlGraphic({ active }: { active: boolean }) {
  const nodes = [
    { cx: 200, cy: 40 },
    { cx: 80, cy: 140 }, { cx: 200, cy: 140 }, { cx: 320, cy: 140 },
    { cx: 40, cy: 240 }, { cx: 140, cy: 240 }, { cx: 260, cy: 240 }, { cx: 360, cy: 240 },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [3, 6], [3, 7]];

  return (
    <svg viewBox="0 0 400 280" className="mx-auto w-full max-w-md" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} className="stroke-line" strokeWidth="1.5" />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={i === 0 ? 8 : 6}
          className={active ? "fill-accent animate-pulse" : "fill-ink/20 transition-colors duration-700"}
          style={active ? { animationDelay: `${i * 0.15}s` } : undefined}
        />
      ))}
    </svg>
  );
}