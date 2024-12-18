import { PUBLIC_PAYLOAD_CMS_URL } from "astro:env/client";
import { mimeTypes } from "@/lib/types";
import { cn, humanReadableFileSize } from "@/lib/utils";
import {
  FileArchiveIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
} from "lucide-react";
import type React from "react";
import RichText from "./RichText";
import type { NodeTypes } from "./RichText/serialize";

interface MediaProps {
  media: {
    url: string;
    alt: string;
    mimeType: string;
    filename: string;
    filesize: number;
    width?: number;
    height?: number;
    caption?: NodeTypes;
  };
  className?: string;
}

const transformUrl = (url: string): string => {
  if (!url) {
    return "";
  }

  // Check if the URL starts with '/' and is not an absolute URL
  if (url.startsWith("/") && !url.startsWith("//")) {
    return `${PUBLIC_PAYLOAD_CMS_URL}${url}`;
  }

  return url;
};

const Media: React.FC<MediaProps> = ({ media, className }) => {
  const {
    url: _url,
    alt,
    mimeType,
    filename,
    filesize,
    width,
    height,
    caption,
  } = media;
  const url = transformUrl(_url);

  const Caption = caption ? (
    <div className="not-prose text-center mb-6">
      <RichText content={caption} />
    </div>
  ) : (
    <></>
  );

  if (mimeType.startsWith("image/")) {
    return (
      <>
        <img
          src={url}
          alt={alt || filename}
          loading="lazy"
          width={width}
          height={height}
          style={{ maxWidth: "100%", height: "auto" }}
          className={cn({ "!mb-2": caption }, className)}
        />
        {Caption}
      </>
    );
  }

  if (mimeType.startsWith("video/")) {
    return (
      <>
        <video
          controls
          preload="metadata"
          style={{ maxWidth: "100%", height: "auto" }}
          className={cn({ "!mb-2": caption }, className)}
        >
          <source src={url} type={mimeType} />
          <track kind="captions" />
        </video>
        {Caption}
      </>
    );
  }

  let Icon = FileIcon;
  if (Object.values(mimeTypes.text).includes(mimeType)) {
    Icon = FileTextIcon;
  }
  if (Object.values(mimeTypes.code).includes(mimeType)) {
    Icon = FileCodeIcon;
  }
  if (Object.values(mimeTypes.archieve).includes(mimeType)) {
    Icon = FileArchiveIcon;
  }

  return (
    <a
      href={url}
      download
      className={cn(
        "flex items-center gap-4 border bg-card rounded-md px-4 py-2 not-prose",
        className,
      )}
    >
      <Icon className="w-5 h-5" />
      <div className="flex flex-col gap-0">
        <span className="">{filename}</span>
        <span className="text-sm mb-1">
          {humanReadableFileSize(filesize ?? 0)} ({mimeType})
        </span>
      </div>
    </a>
  );
};

export default Media;
