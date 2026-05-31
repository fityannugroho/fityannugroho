import { UMAMI_SCRIPT_URL } from "astro:env/client";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("text/html")) {
    response.headers.set("Cache-Control", "private, no-cache");
    response.headers.set("Vary", "Cookie");

    // Security headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );

    // Content Security Policy
    response.headers.set("Content-Security-Policy", buildCSP(UMAMI_SCRIPT_URL));
  }
  return response;
});

function buildCSP(umamiScriptUrl: string | undefined): string {
  const scriptSrc = ["'self'", "'unsafe-inline'"];
  if (umamiScriptUrl) {
    try {
      const url = new URL(umamiScriptUrl);
      scriptSrc.push(url.origin);
    } catch {
      // ignore invalid URL
    }
  }

  const directives = {
    "default-src": ["'self'"],
    "script-src": scriptSrc,
    "style-src": ["'self'", "'unsafe-inline'"],
    "frame-src": ["https://www.youtube.com"],
    "img-src": ["'self'", "data:", "https:"],
    "connect-src": ["'self'", "https://api.github.com"],
  };

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
}
