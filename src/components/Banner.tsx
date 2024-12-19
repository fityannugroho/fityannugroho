import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type AlertProps = ComponentProps<typeof Alert>;

export type BannerProps = Omit<AlertProps, "variant"> & {
  style: string;
};

const variantBannerStyleMapping: Readonly<
  Record<string, NonNullable<AlertProps["variant"]>>
> = {
  info: "default",
  success: "success",
  warning: "warning",
  error: "destructive",
} as const;

export default function Banner({
  children,
  style,
  className,
  ...props
}: BannerProps) {
  return (
    <Alert
      {...props}
      variant={variantBannerStyleMapping[style]}
      className={cn("not-prose my-6", className)}
    >
      <AlertTitle>{style}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
