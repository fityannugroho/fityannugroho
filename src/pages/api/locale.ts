export const prerender = false;

import type { APIRoute } from "astro";

const supportedLocales = ["en", "id"] as const;

export const GET: APIRoute = async ({ cookies }) => {
  const locale = cookies.get("locale")?.value || "en";

  return new Response(JSON.stringify({ locale }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const locale = body.locale;

  if (!supportedLocales.includes(locale)) {
    return new Response(JSON.stringify({ error: "Invalid locale" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "strict",
    secure: import.meta.env.PROD,
  });

  return new Response(JSON.stringify({ locale }), {
    headers: { "Content-Type": "application/json" },
  });
};
