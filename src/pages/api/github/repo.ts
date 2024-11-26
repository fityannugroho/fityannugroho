import config from "@/lib/config";
import type { APIRoute } from "astro";
import { z } from "astro/zod";

export const prerender = false;

function jsonResponse(body: object, status = 200) {
  return new Response(
    JSON.stringify({
      status,
      ...body,
    }),
    {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
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

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  // Validate the payload
  let payload: Payload;
  try {
    payload = await payloadSchema.parseAsync(
      Object.fromEntries(searchParams.entries()),
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ error: error.flatten().fieldErrors }, 400);
    }

    return jsonResponse({ error: "Error validating payload" }, 500);
  }

  // Fetch the data from GitHub
  const res = await fetch(
    `${GITHUB_API}/repos/${payload.username}/${payload.repo}`,
    {
      mode: "cors",
      headers: {
        Accept: "application/vnd.github+json",
        ...(config.githubToken && {
          Authorization: `Bearer ${config.githubToken}`,
        }),
      },
    },
  );

  const body = await res.json();

  if (!res.ok) {
    return jsonResponse(body, res.status);
  }

  return jsonResponse({
    data: {
      stars: body.stargazers_count,
      forks: body.forks_count,
      language: body.language,
      license: body.license?.name,
      description: body.description,
    },
  });
};
