import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV !== "production" &&
  process.env.VERCEL_URL &&
  `https://${process.env.VERCEL_URL}`;

const site = VERCEL_PREVIEW_SITE || "https://fityannugroho.vercel.app";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react(), mdx()],

  adapter: vercel(),

  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        optional: true,
        context: "server",
        access: "secret",
      }),
      PUBLIC_PAYLOAD_CMS_URL: envField.string({
        optional: true,
        context: "client",
        access: "public",
        default: "https://fityannugroho-cms.vercel.app",
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
