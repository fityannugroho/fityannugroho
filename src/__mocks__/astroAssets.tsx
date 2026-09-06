import type { ComponentProps, FC } from "react";

type ImgProps = ComponentProps<"img"> & {
  // Allow Astro Image extra props without strict typing
  inferSize?: boolean;
};

export const Image: FC<ImgProps> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  return <img {...props} alt={props.alt ?? ""} />;
};

export default Image;
