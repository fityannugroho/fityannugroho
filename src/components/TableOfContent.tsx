"use client";

import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { ListTreeIcon } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { extractHeadings, type TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

type Props = {
  data: DefaultTypedEditorState;
  className?: string;
  levels?: number[];
  title?: string;
};

export default function TableOfContents({
  data,
  className,
  levels = [2, 3, 4],
  title,
}: Props) {
  const items: TocItem[] = React.useMemo(
    () => extractHeadings(data, { levels }),
    [data, levels],
  );
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null,
  );
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!items.length) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible.length > 0) {
          const top = visible[0] as IntersectionObserverEntry;
          setActiveId((top.target as HTMLElement).id);
          return;
        }
        // Fallback: pick the last heading above the viewport
        let current: string | null = null;
        for (const h of headings) {
          const rect = h.getBoundingClientRect();
          if (rect.top <= 64) current = h.id; // align with sidebar sticky offset
        }
        if (current) setActiveId(current);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] },
    );

    headings.forEach((h) => {
      observer.observe(h);
    });
    return () => observer.disconnect();
  }, [items]);

  const onAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    // Smooth-scroll with offset handled by scroll-mt on headings
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    const newHash = `#${id}`;
    if (window.location.hash !== newHash) {
      history.pushState(null, "", newHash);
    }
    setOpen(false);
  };

  if (!items.length) return null;

  return (
    <>
      {/* Static sidebar for xl+ only */}
      <nav
        className={cn(
          "hidden lg:block rounded-lg border bg-card/70 p-4 text-sm shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/50",
          className,
        )}
        aria-label="Table of contents"
      >
        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title ?? "Table of contents"}
        </div>
        <ul className="max-h-[70vh] space-y-1 overflow-y-auto pr-1">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn("leading-6", indentClass(item.level))}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => onAnchorClick(e, item.id)}
                data-active={activeId === item.id}
                className={cn(
                  "block rounded px-2 py-1 text-foreground/70 hover:text-foreground",
                  "hover:bg-muted/40 focus-visible:bg-muted/40 outline-hidden",
                  "data-[active=true]:text-foreground data-[active=true]:font-medium data-[active=true]:bg-muted/50",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Floating toggle for small screens rendered via portal */}
      {mounted &&
        createPortal(
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="fixed bottom-6 right-6 z-50 rounded-full shadow-md"
                  aria-label="Open table of contents"
                >
                  <ListTreeIcon className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="xl:hidden">
                <SheetHeader>
                  <SheetTitle>{title ?? "Table of contents"}</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6">
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className={cn("leading-6", indentClass(item.level))}
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => onAnchorClick(e, item.id)}
                          data-active={activeId === item.id}
                          className={cn(
                            "block rounded px-2 py-1 text-foreground/80 hover:text-foreground",
                            "hover:bg-muted/40 focus-visible:bg-muted/40 outline-hidden",
                            "data-[active=true]:text-foreground data-[active=true]:font-medium",
                          )}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>,
          document.body,
        )}
    </>
  );
}

function indentClass(level: number) {
  switch (level) {
    case 3:
      return "pl-4";
    case 4:
      return "pl-7";
    case 5:
      return "pl-9";
    case 6:
      return "pl-12";
    default:
      return "";
  }
}
