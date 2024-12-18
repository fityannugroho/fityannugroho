import { cn } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import type { ComponentProps } from "react";
import { Tweet } from "react-tweet";

export const socialMedia = {
  x: "X (Twitter)",
  youtube: "YouTube",
};

type SocialMedia = keyof typeof socialMedia;

export const linkValidation: Record<
  SocialMedia,
  { regex: RegExp; message?: string }
> = {
  x: {
    regex:
      /^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[a-zA-Z0-9_]{1,15}\/status\/([0-9]+)\/?(?:\?s=[0-9]+)?$/,
    message: "Invalid tweet link",
  },
  youtube: {
    regex:
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
    message: "Invalid YouTube link",
  },
};

export type EmbeddedSocialMediaProps = ComponentProps<"div"> & {
  link: string;
};

export const EmbeddedSocialMedia: React.FC<EmbeddedSocialMediaProps> = ({
  link,
  ...props
}) => {
  // X (Twitter) post
  if (linkValidation.x.regex.test(link)) {
    const [, tweetId = ""] = link.match(linkValidation.x.regex) ?? [];
    return (
      <div {...props} className={cn("not-prose my-4", props.className)}>
        <Tweet
          id={tweetId}
          components={{
            AvatarImg: (props) => (
              <img {...props} alt={props.alt} className="rounded-full" />
            ),
            MediaImg: (props) => <img {...props} alt={props.alt} />,
          }}
        />
      </div>
    );
  }

  // YouTube video
  if (linkValidation.youtube.regex.test(link)) {
    const [, videoId = ""] = link.match(linkValidation.youtube.regex) ?? [];
    return (
      <div
        {...props}
        className={cn("aspect-video not-prose my-4", props.className)}
      >
        <YouTubeEmbed videoid={videoId} params="controls=1" />
      </div>
    );
  }

  return null;
};
