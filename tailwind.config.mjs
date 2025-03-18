/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              "code::before": {
                display: "none",
              },
              "code::after": {
                display: "none",
              },
              code: {
                backgroundColor: "hsl(var(--secondary))",
                padding: "0.125em 0.5em",
                borderRadius: "calc(var(--radius) - 4px)",
              },
            },
            {
              blockquote: {
                fontStyle: "normal",
                quotes: "none",
              },
              "blockquote p:first-of-type::before": {
                display: "none",
              },
              "blockquote p:last-of-type::after": {
                display: "none",
              },
            },
          ],
        },
      },
    },
  },
};
