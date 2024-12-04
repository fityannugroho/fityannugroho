import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

// https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV !== "production" &&
  process.env.VERCEL_URL &&
  `https://${process.env.VERCEL_URL}`;

const site = VERCEL_PREVIEW_SITE || "https://fityannugroho.vercel.app";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
