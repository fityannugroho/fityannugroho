import type { blogSchema } from "@/content/config";
import type { z } from "astro:content";
import { Badge } from "./ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Blog = z.infer<typeof blogSchema>;

type BlogCardProps = {
  data: Blog;
};

export function BlogCard({ data }: BlogCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.summary}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex gap-1">
          {data.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
