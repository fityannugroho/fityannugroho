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
    image: {
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
  publishedAt: Date;
  authors: [];
  populatedAuthors: [];
  slug: string;
  slugLock: boolean;
  updatedAt: Date;
  createdAt: Date;
  _status: boolean;
};

const payloadApiUrl = PUBLIC_PAYLOAD_CMS_URL;

export async function getPosts() {
  const res = await fetch(`${payloadApiUrl}/api/posts`);
  const data = (await res.json()) as {
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

  return data.docs;
}

export async function getPost(id: string) {
  const res = await fetch(`${payloadApiUrl}/api/posts/${id}`);
  const data = (await res.json()) as PayloadCMSPost;
  return data;
}

export function getImageSrc(imgUrl: string) {
  return `${payloadApiUrl}/${imgUrl}`;
}
