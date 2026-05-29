export const prerender = false;

import type { APIRoute } from "astro";
import type { SupportedLocale } from "@/lib/i18n";

const supportedLocales = ["en", "id"] as const;

export const GET: APIRoute = async ({ cookies }) => {
  const locale = cookies.get("locale")?.value || "en";

  return new Response(JSON.stringify({ locale }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  let body: { locale?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const locale = body.locale;

  if (
    typeof locale !== "string" ||
    !supportedLocales.includes(locale as SupportedLocale)
  ) {
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
