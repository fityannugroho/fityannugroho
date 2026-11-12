import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://me.fityan.tech",
  integrations: [react(), mdx()],

  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),

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
        default: "https://cms-me.fityan.tech",
      }),
      UMAMI_SCRIPT_URL: envField.string({
        optional: true,
        context: "client",
        access: "public",
      }),
      UMAMI_WEBSITE_ID: envField.string({
        optional: true,
        context: "client",
        access: "public",
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
