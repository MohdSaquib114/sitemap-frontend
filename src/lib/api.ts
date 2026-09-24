const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const version = "api/v1";
const RESOURCE = `${version}/sitemap`;

const API_HEADERS = {
  "ngrok-skip-browser-warning": "true",
};

export async function startCrawl(url: string) {
  const res = await fetch(`${API_URL}/${RESOURCE}/crawl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...API_HEADERS,
    },
    body: JSON.stringify({ url }),
  });

  if (res.status === 429) {
    throw new Error(
      "Too many crawls started — please wait a few minutes."
    );
  }

  if (!res.ok) {
    throw new Error(
      (await res.json()).message || "Could not start the crawl"
    );
  }

  return res.json() as Promise<{ jobId: number }>;
}

export async function getCrawlStatus(jobId: number) {
  const res = await fetch(
    `${API_URL}/${RESOURCE}/crawl/${jobId}/status`,
    {
      headers: API_HEADERS,
    }
  );

  if (!res.ok) {
    throw new Error("Could not check crawl status");
  }

  return res.json() as Promise<{
    status: "running" | "success" | "failed";
    crawled: number;
    found: number;
    queued: number;
  }>;
}

export async function generateSitemap(jobId: number) {
  const res = await fetch(
    `${API_URL}/${RESOURCE}/crawl/${jobId}/generate`,
    {
      method: "POST",
      headers: API_HEADERS,
    }
  );

  if (!res.ok) {
    throw new Error(
      (await res.json()).message || "Could not generate the sitemap"
    );
  }

  return res.blob();
}
