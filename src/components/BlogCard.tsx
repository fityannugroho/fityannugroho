import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import { ClockIcon } from "lucide-react";
import { getImageSrc } from "@/lib/payload-cms";
import type { Post } from "@/lib/payload-types";
import { Link } from "./Link";
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
    publishedDate?: Date;
  } = { title: data.title };

  const isPayloadCMSPost = "content" in data;

  if (isPayloadCMSPost) {
    post.description = data.meta?.description || "";
    post.href = `/blog/${data.slug || ""}`;
    post.publishedDate = data.publishedAt
      ? new Date(data.publishedAt)
      : new Date(data.createdAt);

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
    post.publishedDate = data.postDate;

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
    <Card className="border-none shadow-none p-2">
      <CardHeader className="p-0">
        {post.image && (
          <div className="rounded-sm mb-4 w-full h-[13rem] overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
              src={post.image.src}
              alt={post.image.alt}
              height={240}
              width={320}
              loading="lazy"
            />
          </div>
        )}

        <CardTitle className="mx-1 leading-5">
          <Link disableButtonStyle href={post.href}>
            {post.title}
          </Link>
        </CardTitle>

        {post.description && (
          <CardDescription className="mx-1 line-clamp-4">
            {post.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="p-0 pt-5 ml-1 flex flex-wrap gap-3 justify-start">
        <div className="flex gap-1 items-center">
          <ClockIcon size={14} />
          <time
            className="flex gap-1 items-center text-xs font-medium text-muted-foreground"
            title="Date published"
            dateTime={post.publishedDate.toISOString()}
          >
            {dayjs(post.publishedDate).format("D MMM YYYY")}
          </time>
        </div>

        <div className="flex gap-2 flex-wrap">
          {post.categories?.map((category) => (
            <span key={category.id} className="text-xs font-medium lowercase">
              #{category.name}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
