import type { FC } from "react";

export const Tweet: FC<{
  id: string;
}> = ({ id }) => (
  <div data-testid="tweet-mock" data-tweet-id={id}>
    Tweet {id}
  </div>
);

export default Tweet;
