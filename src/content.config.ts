import { type SchemaContext, defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 3. Define your collection(s)
export const blogSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    summary: z.string(),
    postDate: z.coerce.date(),
    tags: z.array(z.string()),
    cover: z
      .object({
        file: ctx.image(),
        alt: z.string(),
        title: z.string().optional(),
      })
      .optional(),
  });

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.(md|mdx)", base: "./src/data/blog" }),
  schema: (ctx) => blogSchema(ctx),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog };
