import type { FC } from "react";

export const YouTubeEmbed: FC<{ videoid: string; params?: string }> = ({
  videoid,
}) => (
  <div data-testid="youtube-mock" data-videoid={videoid}>
    YouTube {videoid}
  </div>
);
