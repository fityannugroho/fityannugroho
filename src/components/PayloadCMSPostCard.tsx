import {
  type MimeType,
  type PayloadCMSPost,
  getImageSrc,
} from "@/lib/payload-cms";
import { BlogCard } from "./BlogCard";

type Props = {
  data: PayloadCMSPost;
};

export function PayloadCMSPostCard({ data: post }: Props) {
  return (
    <BlogCard
      data={{
        title: post.title,
        summary: post.meta.description,
        postDate: new Date(post.createdAt),
        tags: post.categories.map((tag) => tag.title),
        ...(post.meta.image && {
          cover: {
            file: {
              src: getImageSrc(post.meta.image.url),
              width: post.meta.image.width,
              height: post.meta.image.height,
              format: post.meta.image.mimeType.split("/").pop() as MimeType,
            },
            alt: post.meta.image.alt,
          },
        }),
      }}
    />
  );
}
