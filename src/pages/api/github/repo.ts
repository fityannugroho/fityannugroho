import { GITHUB_TOKEN } from "astro:env/server";
import type { APIRoute } from "astro";
import { z } from "astro/zod";

export const prerender = false;

// ── In-memory rate limiter ─────────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 100;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // No record or window expired → reset
  if (!record || now >= record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX - 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  record.count++;

  if (record.count > RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - record.count,
    resetTime: record.resetTime,
  };
}

// ── Helpers ────────────────────────────────────────
function jsonResponse(
  body: object,
  status = 200,
  extraHeaders: Record<string, string> = {},
) {
  return new Response(
    JSON.stringify({
      status,
      ...body,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...extraHeaders,
      },
    },
  );
}

const payloadSchema = z.object({
  username: z
    .string()
    .min(1)
    .regex(/^[\w.-]+$/),
  repo: z
    .string()
    .min(1)
    .regex(/^[\w.-]+$/),
});

type Payload = z.infer<typeof payloadSchema>;

const GITHUB_API = "https://api.github.com";

export type GetGitHubRepoResponse = {
  stars: number;
  forks: number;
  language: string;
  license?: string;
  description?: string;
};

export const GET: APIRoute = async ({ request, clientAddress }) => {
  // ── Rate limiting ────────────────────────────────
  const ip = clientAddress ?? "unknown";
  const { allowed, remaining, resetTime } = checkRateLimit(ip);
  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetTime / 1000)),
  };

  if (!allowed) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429,
      rateLimitHeaders,
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    // Validate the payload
    let payload: Payload;
    try {
      payload = await payloadSchema.parseAsync(
        Object.fromEntries(searchParams.entries()),
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        return jsonResponse(
          { error: z.flattenError(error).fieldErrors },
          400,
          rateLimitHeaders,
        );
      }

      return jsonResponse(
        { error: "Error validating payload" },
        500,
        rateLimitHeaders,
      );
    }

    // Fetch the data from GitHub
    const res = await fetch(
      `${GITHUB_API}/repos/${payload.username}/${payload.repo}`,
      {
        mode: "cors",
        headers: {
          Accept: "application/vnd.github+json",
          ...(GITHUB_TOKEN && {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          }),
        },
      },
    );

    const body = await res.json();

    if (!res.ok) {
      console.error("GitHub API error:", body);
      return jsonResponse(
        { error: "Failed to fetch repository data" },
        res.status,
        rateLimitHeaders,
      );
    }

    return jsonResponse(
      {
        data: {
          stars: body.stargazers_count,
          forks: body.forks_count,
          language: body.language,
          license: body.license?.name,
          description: body.description,
        },
      },
      200,
      rateLimitHeaders,
    );
  } catch (error) {
    console.error("Unexpected error in GitHub API proxy:", error);
    return jsonResponse(
      { error: "Failed to fetch repository data" },
      500,
      rateLimitHeaders,
    );
  }
};
