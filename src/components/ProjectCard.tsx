import type { Project } from "@/data/projects";
import { useFetch } from "@/hooks/useFetch";
import type { GetGitHubRepoResponse } from "@/pages/api/github/repo";
import {
  DownloadIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  StarIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Link } from "./Link";
import { CodeIcon, LawIcon, RepoForkedIcon } from "./Octicons";
import GithubIcon from "./icons/GithubIcon";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type ProjectProps = {
  data: Project;
};

const gitHubRepoRegex =
  /^http(?:s)?:\/{2}(?:www.)?github\.com\/([\w.-]+)\/([\w.-]+)\/?$/;

export function ProjectCard({ data }: ProjectProps) {
  const [, ghUsername, ghRepo] = data.links.code?.match(gitHubRepoRegex) ?? [];

  const {
    data: ghData,
    loading,
    error,
  } = useFetch<GetGitHubRepoResponse>(
    ghUsername && ghRepo
      ? `/api/github/repo?username=${ghUsername}&repo=${ghRepo}`
      : undefined,
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-24" />
          </CardTitle>
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-60 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-5 w-24 mt-2" />
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <p className="text-red-500 dark:text-red-400 flex items-center gap-1">
          <TriangleAlertIcon className="w-6 h-6 inline-block ml-2" />
          Failed to fetch repository data
        </p>

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="flex items-center gap-1"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh Page
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {ghData.description ?? data.description}
        </CardDescription>
      </CardHeader>

      {ghData && (
        <CardContent>
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <div className="flex gap-1 items-center mr-3" title="Stargazers">
              <StarIcon className="w-4 h-4" />

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
                {ghData ? "GitHub" : "Source Code"}
              </span>
              {ghData ? (
                <GithubIcon className="w-5 h-5" />
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
