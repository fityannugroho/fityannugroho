import type { Project } from "@/data/projects";
import {
  ExternalLinkIcon,
  DownloadIcon,
  GitHubLogoIcon,
  CodeIcon,
} from "@radix-ui/react-icons";
import { Link } from "./Link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

type ProjectProps = {
  data: Project;
};

const gitHubRepoRegex =
  /^http(?:s)?:\/{2}(?:www.)?github\.com\/([\w.-]+)\/([\w.-]+)\/?$/;

export function ProjectCard({ data }: ProjectProps) {
  const [gitHubRepoUrl] = data.links.code?.match(gitHubRepoRegex) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex gap-2 w-full">
          {data.links.site && (
            <Link
              variant="outline"
              href={data.links.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ExternalLinkIcon className="w-5 h-5" />
              Visit Site
            </Link>
          )}
          {data.links.download && (
            <Link
              variant="outline"
              href={data.links.download}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <DownloadIcon className="w-5 h-5" />
              Download
            </Link>
          )}
          {data.links.code && (
            <Link
              variant="outline"
              size="icon"
              href={data.links.code}
              target="_blank"
            >
              <span className="sr-only">
                {gitHubRepoUrl ? "GitHub" : "Source Code"}
              </span>
              {gitHubRepoUrl ? (
                <GitHubLogoIcon className="w-5 h-5" />
              ) : (
                <CodeIcon className="w-5 h-5" />
              )}
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
