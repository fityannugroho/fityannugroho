import { cn } from "@/lib/utils";
import type { MediaProps } from "./Media";
import Media from "./Media";
import RichText from "./RichText";

type MediaBlockProps = MediaProps & { mediaClassName?: string };

export default function MediaBlock({
  media,
  className,
  mediaClassName,
}: MediaBlockProps) {
  const { caption } = media;

  const Caption = caption ? (
    <div className="not-prose text-center mb-6">
      <RichText data={caption} />
    </div>
  ) : null;

  return (
    <div className={className}>
      <Media
        media={media}
        className={cn({ "mb-2!": caption }, mediaClassName)}
      />
      {Caption}
    </div>
  );
}
