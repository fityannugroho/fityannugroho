import { PUBLIC_PAYLOAD_CMS_URL } from "astro:env/client";
import type { Post, Project } from "./payload-types";

export type MimeType =
  | "png"
  | "jpg"
  | "jpeg"
  | "tiff"
  | "webp"
  | "gif"
  | "svg"
  | "avif";

type PayloadCMSPostsResponse = {
  docs: Post[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number | null;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

const payloadApiUrl = PUBLIC_PAYLOAD_CMS_URL;

export async function getPosts() {
  const res = await fetch(`${payloadApiUrl}/api/posts`);
  const data = (await res.json()) as PayloadCMSPostsResponse;

  return data.docs;
}

export async function getPost(id: number) {
  const res = await fetch(`${payloadApiUrl}/api/posts/${id}`);
  const data = (await res.json()) as Post | { errors: [] };

  if ("errors" in data) {
    return null;
  }

  return data;
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${payloadApiUrl}/api/posts?where[slug][equals]=${slug}`,
  );

  const data = (await res.json()) as PayloadCMSPostsResponse;

  return data.docs[0] ?? null;
}

export function getImageSrc(imgUrl: string): string {
  return new URL(imgUrl, payloadApiUrl).toString();
}

export async function getProjects() {
  const res = await fetch(`${payloadApiUrl}/api/projects`);
  const data = await res.json();

  return data.docs as Project[];
}
