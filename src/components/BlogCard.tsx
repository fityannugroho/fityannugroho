import type { z } from "astro:content";
import type { blogSchema } from "@/content/config";
import { Badge } from "./ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Blog = z.infer<ReturnType<typeof blogSchema>>;

type BlogCardProps = {
  data: Blog;
};

export function BlogCard({ data }: BlogCardProps) {
  return (
    <Card>
      <CardHeader>
        {data.cover && (
          <img
            className="rounded-sm mb-4 h-40 w-full object-cover"
            src={data.cover.file.src}
            alt={data.cover.alt}
            title={data.cover.title}
            height={160}
            width={320}
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
