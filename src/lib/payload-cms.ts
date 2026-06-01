import { PUBLIC_PAYLOAD_CMS_URL } from "astro:env/client";
import type { SupportedLocale } from "./i18n";
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

export type SortOptions<T extends string | object = string> = T extends object
  ? { [key in keyof T]?: "asc" | "desc" }
  : { [key: string]: "asc" | "desc" };

/**
 * Converts a sort object to a string for the Payload CMS API.
 *
 * `-` in front of the key means descending order, e.g. `-updatedAt`
 * for `sort: { updatedAt: "desc" }`
 *
 * @see {@link https://payloadcms.com/docs/queries/sort}
 */
export function stringifySortOptions<T extends string | object = string>(
  sort: SortOptions<T>,
): string {
  return Object.entries(sort)
    .map(([key, value]) =>
      typeof value === "string" ? `${value === "desc" ? "-" : ""}${key}` : "",
    )
    .filter(Boolean)
    .join(",");
}

export async function getPosts(options?: {
  sort?: SortOptions<Post>;
  locale?: SupportedLocale;
}) {
  try {
    const url = new URL(`${payloadApiUrl}/api/posts?depth=2`);

    if (options?.locale) {
      url.searchParams.append("locale", options.locale);
    }

    if (options?.sort) {
      url.searchParams.append("sort", stringifySortOptions(options.sort));
    }

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[getPosts] API returned ${res.status}: ${res.statusText}`);
      return [];
    }
    const data = (await res.json()) as PayloadCMSPostsResponse;

    return data?.docs ?? [];
  } catch (error) {
    console.error("[getPosts] Failed to fetch posts:", error);
    return [];
  }
}

export async function getPost(id: number, locale?: SupportedLocale) {
  try {
    const url = new URL(`${payloadApiUrl}/api/posts/${id}?depth=2`);
    if (locale) {
      url.searchParams.set("locale", locale);
    }
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[getPost] API returned ${res.status}: ${res.statusText}`);
      return null;
    }
    const data = (await res.json()) as
      | Post
      | { errors: Array<{ message: string }> };

    if ("errors" in data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("[getPost] Failed to fetch post:", error);
    return null;
  }
}

export async function getPostBySlug(slug: string, locale?: SupportedLocale) {
  try {
    const url = new URL(`${payloadApiUrl}/api/posts?depth=2`);
    url.searchParams.set("where[slug][equals]", slug);
    if (locale) {
      url.searchParams.set("locale", locale);
    }
    const res = await fetch(url);
    if (!res.ok) {
      console.error(
        `[getPostBySlug] API returned ${res.status}: ${res.statusText}`,
      );
      return null;
    }

    const data = (await res.json()) as PayloadCMSPostsResponse;

    return data.docs[0] ?? null;
  } catch (error) {
    console.error("[getPostBySlug] Failed to fetch post by slug:", error);
    return null;
  }
}

export function getImageSrc(imgUrl: string): string {
  if (!imgUrl || imgUrl.startsWith("//")) {
    return "";
  }

  return new URL(imgUrl, payloadApiUrl).toString();
}

export async function getProjects(options?: {
  sort?: SortOptions<Project>;
  locale?: SupportedLocale;
}) {
  try {
    const url = new URL(`${payloadApiUrl}/api/projects?depth=2`);

    if (options?.locale) {
      url.searchParams.append("locale", options.locale);
    }

    if (options?.sort) {
      url.searchParams.append("sort", stringifySortOptions(options.sort));
    }

    const res = await fetch(url);
    if (!res.ok) {
      console.error(
        `[getProjects] API returned ${res.status}: ${res.statusText}`,
      );
      return [];
    }
    const data = await res.json();

    return data.docs as Project[];
  } catch (error) {
    console.error("[getProjects] Failed to fetch projects:", error);
    return [];
  }
}
