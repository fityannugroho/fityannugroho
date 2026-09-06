import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      "astro:env/client": path.resolve(
        process.cwd(),
        "src/__mocks__/astroEnvClient.ts",
      ),
      "astro:env/server": path.resolve(
        process.cwd(),
        "src/__mocks__/astroEnvServer.ts",
      ),
      "astro:middleware": path.resolve(
        process.cwd(),
        "src/__mocks__/astroMiddleware.ts",
      ),
      "astro:transitions/client": path.resolve(
        process.cwd(),
        "src/__mocks__/astroTransitions.ts",
      ),
      "astro:transitions": path.resolve(
        process.cwd(),
        "src/__mocks__/astroTransitions.ts",
      ),
      "astro:content": path.resolve(
        process.cwd(),
        "src/__mocks__/astroContent.ts",
      ),
      "astro:assets": path.resolve(
        process.cwd(),
        "src/__mocks__/astroAssets.tsx",
      ),
      "@next/third-parties/google": path.resolve(
        process.cwd(),
        "src/__mocks__/nextGoogle.tsx",
      ),
      "react-tweet": path.resolve(
        process.cwd(),
        "src/__mocks__/reactTweet.tsx",
      ),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    server: {
      deps: {
        inline: [/react-tweet/, /@next\/third-parties/],
      },
    },
  },
});
