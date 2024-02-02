import { defineCollection, z } from "astro:content";

export const blogSchema = z.object({
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
});

const blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});

export const collections = {
  blog: blogCollection,
};
