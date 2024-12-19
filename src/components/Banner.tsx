import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  CheckIcon,
  InfoIcon,
  type LucideProps,
} from "lucide-react";
import type {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
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

export const bannerIcon: Record<
  NonNullable<AlertProps["variant"]>,
  ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
> = {
  default: InfoIcon,
  success: CheckIcon,
  warning: AlertCircleIcon,
  destructive: AlertCircleIcon,
};

export default function Banner({
  children,
  style,
  className,
  ...props
}: BannerProps) {
  const variant = variantBannerStyleMapping[style];
  const BannerIcon = variant ? bannerIcon[variant] : bannerIcon.default;

  return (
    <Alert
      {...props}
      variant={variant}
      className={cn("not-prose my-6", className)}
    >
      <BannerIcon className="h-4 w-4" />
      <AlertTitle>{style}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
