import { ExternalLinkIcon } from "lucide-react";
import { getImageSrc } from "@/lib/payload-cms";
import type { Project } from "@/lib/payload-types";
import { Link } from "./Link";
import { CodeIcon } from "./Octicons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProjectProps = {
  data: Project;
};

export function ProjectCard({ data }: ProjectProps) {
  return (
    <Card className="overflow-hidden">
      {typeof data.image === "object" && (
        <img
          className="w-full h-[10rem] lg:h-[18rem] object-cover"
          src={getImageSrc(data.image.url as string)}
          alt={data.image.alt ?? ""}
          height={240}
          width={320}
          loading="lazy"
        />
      )}

      <CardHeader className="py-4">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <div className="flex gap-2 w-full flex-wrap">
          {data.projectLink?.url && (
            <Link
              variant="outline"
              href={data.projectLink.url}
              target={data.projectLink.newTab ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              {data.projectLink.label}
            </Link>
          )}
          {data.sourceCode?.repoLink && (
            <Link
              variant="outline"
              href={data.sourceCode.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <CodeIcon className="w-4 h-4" />
              Source code
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
