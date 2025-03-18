import { cn } from "@/lib/utils";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  type LucideProps,
  XCircleIcon,
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
  info: "info",
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
  info: InfoIcon,
  success: CheckCircle2Icon,
  warning: AlertTriangleIcon,
  destructive: XCircleIcon,
};

export default function Banner({
  children,
  style,
  className,
  ...props
}: BannerProps) {
  const variant = variantBannerStyleMapping[style];
  const BannerIcon = variant ? bannerIcon[variant] : bannerIcon.info;

  return (
    <Alert {...props} variant={variant} className={cn("my-6", className)}>
      <BannerIcon className="h-5 w-5" />
      <AlertTitle className="capitalize font-bold text-base">
        {style}
      </AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
