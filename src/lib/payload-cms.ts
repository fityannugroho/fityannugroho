import { PUBLIC_PAYLOAD_CMS_URL } from "astro:env/client";

export type MimeType =
  | "png"
  | "jpg"
  | "jpeg"
  | "tiff"
  | "webp"
  | "gif"
  | "svg"
  | "avif";

export type PayloadCMSPost = {
  id: number;
  title: string;
  content?: {
    [k: string]: unknown;
  }[];
  relatedPosts: [];
  categories: {
    id: number;
    title: string;
    parent: string | null;
    updatedAt: Date;
    createdAt: Date;
  }[];
  meta: {
    title: string;
    image?: {
      id: string;
      alt: string;
      caption: object;
      url: string;
      thumbnailURL: string;
      filename: string;
      mimeType: string;
      fileSize: number;
      width: number;
      height: number;
    };
    description: string;
  };
  publishedAt: string;
  authors: [];
  populatedAuthors: [];
  slug: string;
  slugLock: boolean;
  updatedAt: string;
  createdAt: string;
  _status: boolean;
};

type PayloadCMSPostsResponse = {
  docs: PayloadCMSPost[];
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
  const data = (await res.json()) as PayloadCMSPost | { errors: [] };

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

export function getImageSrc(imgUrl: string) {
  return `${payloadApiUrl}/${imgUrl}`;
}
