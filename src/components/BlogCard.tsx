import type { CollectionEntry } from "astro:content";
import { getImageSrc } from "@/lib/payload-cms";
import type { Post } from "@/lib/payload-types";
import { Link } from "./Link";
import { Badge } from "./ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type BlogCardProps = {
  data: (CollectionEntry<"blog">["data"] & { slug: string }) | Post;
};

export function BlogCard({ data }: BlogCardProps) {
  const post: {
    title: string;
    description?: string;
    href?: string;
    image?: { src: string; alt: string };
    categories?: { id: string | number; name: string }[];
  } = { title: data.title };

  const isPayloadCMSPost = "content" in data;

  if (isPayloadCMSPost) {
    post.description = data.meta?.description || "";
    post.href = `/blog/${data.slug || ""}`;

    if (data.heroImage && typeof data.heroImage === "object") {
      post.image = {
        src: getImageSrc(data.heroImage.url || ""),
        alt: data.heroImage.alt || "",
      };
    }

    if (data.categories) {
      post.categories = data.categories
        .filter((category) => typeof category === "object")
        .map((category) => ({
          id: category.id,
          name: category.title,
        }));
    }
  } else {
    post.description = data.summary;
    post.href = `/blog/static/${data.slug}`;

    if (data.cover) {
      post.image = {
        src: data.cover.file.src,
        alt: data.cover.alt,
      };
    }

    post.categories = data.tags.map((tag) => ({
      id: tag,
      name: tag,
    }));
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        {post.image && (
          <img
            className="rounded-sm mb-4 h-40 w-full object-cover"
            src={post.image.src}
            alt={post.image.alt}
            height={160}
            width={320}
          />
        )}

        <CardTitle className="leading-5">
          <Link disableButtonStyle href={post.href}>
            {post.title}
          </Link>
        </CardTitle>

        {post.description && (
          <CardDescription className="line-clamp-4">
            {post.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {post.categories?.map(
            (category) =>
              typeof category === "object" && (
                <Badge key={category.id}>{category.name}</Badge>
              ),
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
