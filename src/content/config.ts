import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    postDate: z.coerce.date(),
    tags: z.array(z.string()),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        title: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
