import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";
import { buttonVariants } from "./ui/button";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    disableButtonStyle?: boolean;
  };

export function Link({
  disableButtonStyle,
  size,
  variant = "link",
  children,
  className,
  ...props
}: LinkProps) {
  return (
    <a
      className={cn(
        disableButtonStyle
          ? "text-primary underline-offset-4 hover:underline"
          : buttonVariants({ variant, size }),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export type IconLinkProps = Omit<LinkProps, "size"> & {
  label: string;
};

export function IconLink({
  children,
  label,
  variant = "ghost",
  ...props
}: IconLinkProps) {
  return (
    <Link variant={variant} size="icon" {...props}>
      <span className="sr-only">{label}</span>
      {children}
    </Link>
  );
}
