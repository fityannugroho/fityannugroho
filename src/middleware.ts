import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("text/html")) {
    response.headers.set("Cache-Control", "private, no-cache");
  }
  return response;
});
