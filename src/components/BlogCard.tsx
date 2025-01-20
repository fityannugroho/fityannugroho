import type { CollectionEntry } from "astro:content";
import { getImageSrc } from "@/lib/payload-cms";
import type { Post } from "@/lib/payload-types";
import { Badge } from "./ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type BlogCardProps = {
  data: CollectionEntry<"blog">["data"] | Post;
};

export function BlogCard({ data }: BlogCardProps) {
  const isPayloadCMSPost = "content" in data;

  if (isPayloadCMSPost) {
    return (
      <Card>
        <CardHeader>
          {data.heroImage && typeof data.heroImage === "object" && (
            <img
              className="rounded-sm mb-4 h-40 w-full object-cover"
              src={getImageSrc(data.heroImage.url || "")}
              alt={data.heroImage.alt || ""}
              height={160}
              width={320}
            />
          )}
          <CardTitle>{data.title}</CardTitle>
          {data.meta?.description && (
            <CardDescription>{data.meta.description}</CardDescription>
          )}
        </CardHeader>
        <CardFooter>
          <div className="flex gap-2 flex-wrap">
            {data.categories?.map(
              (category) =>
                typeof category === "object" && (
                  <Badge key={category.id}>{category.title}</Badge>
                ),
            )}
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        {data.cover && (
          <img
            className="rounded-sm mb-4 h-40 w-full object-cover"
            src={data.cover.file.src}
            alt={data.cover.alt}
            title={data.cover.title}
            height={data.cover.file.height}
            width={data.cover.file.width}
          />
        )}
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.summary}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {data.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
