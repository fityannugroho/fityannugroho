import { badgeVariants } from "@/components/ui/badge";
import { getImageSrc } from "@/lib/payload-cms";
import type { Post } from "@/lib/payload-types";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ClockIcon, UserIcon, UsersIcon } from "lucide-react";

type Props = {
  post: Post;
};

export default function BlogHero({ post }: Props) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date(post.createdAt);
  const isManyAuthors = (post.populatedAuthors?.length || 0) > 1;

  const heroImage =
    post.heroImage && typeof post.heroImage === "object"
      ? post.heroImage
      : null;

  return (
    <div className="relative h-[76vh] w-full overflow-hidden">
      {/* Background with gradient overlay */}
      {heroImage && (
        <div className="absolute inset-0">
          <img
            src={getImageSrc(heroImage?.url || "")}
            alt="Blog post hero background"
            style={{ objectFit: "cover" }}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground dark:from-background to-transparent backdrop-blur-[2px]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-[76vh] max-w-5xl flex-col justify-end px-4 pb-6 pt-24 text-white">
        {/* Categories */}
        <div className="flex gap-1 mb-6">
          {post.categories?.map(
            (category) =>
              typeof category === "object" && (
                <span
                  key={category.id}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "border-white/50 text-sm tracking-wide text-white",
                  )}
                >
                  {category.title}
                </span>
              ),
          )}
        </div>

        {/* Title */}
        <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="mb-8 flex flex-col gap-2 text-sm text-gray-300 sm:flex-row sm:gap-8">
          <time
            className="flex gap-1 items-center text-sm font-medium"
            title="Date published"
            dateTime={publishedDate.toISOString()}
          >
            <ClockIcon size={16} />
            {dayjs(publishedDate).format("D MMMM YYYY")}
          </time>

          <span
            title={isManyAuthors ? "Authors" : "Author"}
            className="flex gap-2 items-center mr-1 text-sm"
          >
            {isManyAuthors ? <UsersIcon size={16} /> : <UserIcon size={16} />}
            {post.populatedAuthors?.map((author) => author.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
