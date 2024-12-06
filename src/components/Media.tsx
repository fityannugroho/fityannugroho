import type React from "react";

interface MediaProps {
  media: {
    url: string;
    alt: string;
    mimeType: string;
    filename: string;
    width?: number;
    height?: number;
  };
}

const transformUrl = (url: string): string => {
  if (!url) {
    return "";
  }

  // Check if the URL starts with '/' and is not an absolute URL
  if (url.startsWith("/") && !url.startsWith("//")) {
    return `${import.meta.env.PUBLIC_PAYLOAD_CMS_URL}${url}`;
  }

  return url;
};

const Media: React.FC<MediaProps> = ({ media }) => {
  const { url: _url, alt, mimeType, filename, width, height } = media;
  const url = transformUrl(_url);

  if (mimeType.startsWith("image/")) {
    return (
      <img
        src={url}
        alt={alt || filename}
        loading="lazy"
        width={width}
        height={height}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    );
  }

  if (mimeType.startsWith("video/")) {
    return (
      // biome-ignore lint/a11y/useMediaCaption: <explanation>
      <video
        controls
        preload="metadata"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <source src={url} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <a href={url} download>
      {filename}
    </a>
  );
};

export default Media;
