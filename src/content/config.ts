import { type SchemaContext, defineCollection, z } from "astro:content";

export const blogSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    summary: z.string(),
    postDate: z.coerce.date(),
    tags: z.array(z.string()),
    cover: z
      .object({
        file: ctx
          .image()
          .refine(({ width, height }) => width / height === 16 / 9, {
            message: "Cover image must be in 16:9 ratio",
          }),
        alt: z.string(),
        title: z.string().optional(),
      })
      .optional(),
  });

const blogCollection = defineCollection({
  type: "content",
  schema: (ctx) => blogSchema(ctx),
});

export const collections = {
  blog: blogCollection,
};
