import type { Project } from "@/data/projects";
import type { GetGitHubRepoResponse } from "@/pages/api/github/repo";
import {
  DownloadIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link } from "./Link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CodeIcon, LawIcon, RepoForkedIcon } from "./Octicons";

type ProjectProps = {
  data: Project;
};

const gitHubRepoRegex =
  /^http(?:s)?:\/{2}(?:www.)?github\.com\/([\w.-]+)\/([\w.-]+)\/?$/;

export function ProjectCard({ data }: ProjectProps) {
  const [gitHubRepoUrl, ghUsername, ghRepo] =
    data.links.code?.match(gitHubRepoRegex) ?? [];

  const [ghData, setGhData] = useState<GetGitHubRepoResponse>();

  useEffect(() => {
    fetch(`/api/github/repo?username=${ghUsername}&repo=${ghRepo}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((body) => setGhData(body.data))
      .catch((err) => console.error(err));
  }, [ghUsername, ghRepo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      {ghData && (
        <CardContent>
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <div className="flex gap-1 items-center mr-3" title="Stargazers">
              <StarFilledIcon className="w-4 h-4" />
              <span className="text-sm">{ghData.stars}</span>
            </div>

            <div className="flex gap-1 items-center mr-3" title="Forks">
              <RepoForkedIcon />
              <span className="text-sm">{ghData.forks}</span>
            </div>

            <div
              className="flex gap-2 items-center"
              title="Main Programming Language"
            >
              <CodeIcon />
              <span className="text-sm">{ghData.language}</span>
            </div>
          </div>

          {ghData.license && (
            <div className="flex gap-2 items-center" title="License">
              <LawIcon />
              <span className="text-sm">{ghData.license}</span>
            </div>
          )}
        </CardContent>
      )}
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
