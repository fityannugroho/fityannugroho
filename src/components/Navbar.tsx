import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavMenuItemProps = {
  title: string;
  href: string;
};

type NavbarProps = {
  items: NavMenuItemProps[];
  /**
   * Current page path
   */
  current?: string;
};

export function Navbar({ items, current }: NavbarProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav
      className={
        "sticky top-0 z-50 py-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }
    >
      <div className="container container-wrapper flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-4 order-first">
          <a href="/" className="flex items-center gap-1">
            <img src="/favicon.svg" alt="Logo" className="h-6" />
            <span className="text-primary md:inline-block hidden">
              fityannugroho
            </span>
          </a>
        </div>

        {/* Menus */}
        <ul
          className={cn(
            "md:flex flex-col md:flex-row w-full md:w-fit py-4 md:p-0 items-center gap-6 md:ml-8 grow order-last",
            open ? "flex" : "hidden",
          )}
        >
          {items.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/90 text-foreground/60",
                  item.href === current && "text-foreground font-semibold",
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Icon group */}
        <div className="flex gap-1 md:order-last">
          <ThemeToggle variant="ghost" />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            <HamburgerMenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
