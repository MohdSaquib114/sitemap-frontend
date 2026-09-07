# Sitemap Scanner — Frontend

The UI for the [sitemap crawler backend](../dynamic-stemap-generator) — enter a URL, watch it get crawled in real time, download the sitemap when it's done. No login, no dashboard, no saved history. You leave, it's gone.

## Why this isn't a spinner

The backend crawl is async — `POST /crawl` returns almost instantly with a `jobId` while the actual crawling happens in the background across a pool of workers. The lazy version of this UI is a spinner that says "loading" for however long that takes.

Instead, `GET /crawl/:jobId/status` returns three live numbers every time it's called — `found`, `crawled`, `queued` — and the frontend polls it every 1.5 seconds (`src/lib/useCrawlJob.ts`) for as long as the crawl is running. So instead of a spinner, you see a page count going up in real time, which is a more honest reflection of what's actually happening on the backend than a generic loading state would be — and it's basically free, since the backend was already tracking those numbers for itself.

```
idle → starting → crawling (polling every 1.5s) → ready → download
```

That state machine lives entirely in `CrawlSection.tsx`, and `AnimatePresence` from Framer Motion cross-fades between each stage instead of hard-swapping components — mostly because a hard cut from "form" to "live counters" reads like the page reloaded, and it didn't.

## Layout

- `CrawlSection.tsx` — owns the state machine (`idle` / `starting` / `crawling` / `ready` / `error`), decides which stage renders.
- `CrawlForm.tsx` — the URL input. Validates with `new URL()` before ever hitting the network — no point round-tripping to the backend for something a `try/catch` catches for free.
- `CrawlStatus.tsx` + `CrawlScanner.tsx` — the live counters and the scan-line visualization. The scan-line only animates while `status: "running"` — it's tied to real state, not looping decoratively regardless of what's happening.
- `DownloadCard.tsx` — appears once the backend reports `success`. Fetches the generated XML as a blob and triggers a browser download via an object URL — the file never touches a server-side disk, and it doesn't touch the client's disk either until this exact click.
- `lib/api.ts` — every backend call in one place. If the API shape changes, this is the only file that should need to.
- `lib/useCrawlJob.ts` — the polling hook. Bails out cleanly on unmount (`cancelled` flag) so navigating away mid-crawl doesn't leave a stray `setTimeout` still hitting the API in the background.

## Design notes

Look is intentionally a "drafting sheet" — hairline borders, corner registration marks, mono `FIG. 0X` tags on each panel, Newsreader (serif) for everything except the technical bits (URL input, live numbers, step labels), which are set in JetBrains Mono. No shadows, no gradients, no rounded-card-with-drop-shadow default look — the one visual flourish is the scan-line + page-marker animation, and it's the only thing on the page that's actually alive, which is deliberate: everything else stays still so that one thing reads as meaningful instead of decorative.

## Running it locally

```bash
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL to your backend
npm run dev
```

Needs the backend running (API + both workers — see its README) with CORS open to whatever origin this runs on locally.

## Stack

Next.js (App Router), Tailwind v4 (theme tokens live in `globals.css` via `@theme`, no `tailwind.config.ts` — that file's config format isn't how v4 reads tokens anymore), Framer Motion for the stage transitions and counter animations.