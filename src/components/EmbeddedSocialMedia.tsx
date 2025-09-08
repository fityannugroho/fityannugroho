import { YouTubeEmbed } from "@next/third-parties/google";
import type { ComponentProps } from "react";
import { Tweet, type TwitterComponents } from "react-tweet";
import { cn } from "@/lib/utils";

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

type AvatarImgProps = Parameters<
  NonNullable<TwitterComponents["AvatarImg"]>
>[0];

function AvatarImg(props: AvatarImgProps) {
  return (
    <img {...props} alt={props.alt} className="rounded-full" loading="lazy" />
  );
}

type MediaImgProps = Parameters<NonNullable<TwitterComponents["MediaImg"]>>[0];

function MediaImg(props: MediaImgProps) {
  return <img {...props} alt={props.alt} />;
}

export const EmbeddedSocialMedia: React.FC<EmbeddedSocialMediaProps> = ({
  link,
  ...props
}) => {
  // X (Twitter) post
  if (linkValidation.x.regex.test(link)) {
    const [, tweetId = ""] = link.match(linkValidation.x.regex) ?? [];
    return (
      <div {...props} className={cn("not-prose my-4", props.className)}>
        <Tweet id={tweetId} components={{ AvatarImg, MediaImg }} />
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
