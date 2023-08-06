export type Project = {
  title: string;
  description: string;
  github: string;
  deploy: string;
  download: string;
} & Record<string, {
    title: string;
    description: string;
  } | undefined>;
