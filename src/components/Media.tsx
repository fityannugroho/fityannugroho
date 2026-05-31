import {
  FileArchiveIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
} from "lucide-react";
import type React from "react";
import { getImageSrc } from "@/lib/payload-cms";
import type { Media as BaseMedia } from "@/lib/payload-types";
import { mimeTypes } from "@/lib/types";
import { cn, humanReadableFileSize } from "@/lib/utils";

export type MediaProps = {
  media: BaseMedia;
  className?: string;
};

const Media: React.FC<MediaProps> = ({ media, className }) => {
  const { url: _url, alt, mimeType, filename, filesize, width, height } = media;

  if (!_url || !mimeType || !filename || !width || !height) {
    return null;
  }

  const url = getImageSrc(_url);

  if (mimeType.startsWith("image/")) {
    return (
      <img
        src={url}
        alt={alt || filename}
        loading="lazy"
        width={width}
        height={height}
        style={{ maxWidth: "100%", height: "auto" }}
        className={className}
      />
    );
  }

  if (mimeType.startsWith("video/")) {
    return (
      <video
        controls
        preload="metadata"
        style={{ maxWidth: "100%", height: "auto" }}
        className={className}
      >
        <source src={url} type={mimeType} />
        <track kind="captions" />
      </video>
    );
  }

  let Icon = FileIcon;
  if (Object.values(mimeTypes.text).includes(mimeType)) {
    Icon = FileTextIcon;
  } else if (Object.values(mimeTypes.code).includes(mimeType)) {
    Icon = FileCodeIcon;
  } else if (Object.values(mimeTypes.archive).includes(mimeType)) {
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
