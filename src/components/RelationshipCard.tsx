import { PUBLIC_PAYLOAD_CMS_URL } from "astro:env/client";
import { LinkIcon } from "lucide-react";

type Relation = {
  format: string;
  relationTo: string;
  version: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: Record<string, any> & {
    id: string;
    title: string;
  };
};

export default function RelationshipCard({ relation }: { relation: Relation }) {
  const href =
    relation.relationTo === "posts"
      ? `/blog/${relation.value.slug}`
      : `${PUBLIC_PAYLOAD_CMS_URL}/${relation.relationTo}/${relation.value.id}`;

  return (
    <a
      href={href}
      className="flex items-center gap-4 border bg-card rounded px-4 py-2 not-prose"
    >
      <LinkIcon className="w-5 h-5" />
      <div className="">
        <p className="text-sm">Related {relation.relationTo}</p>
        <p className="font-bold">{relation.value.title}</p>
      </div>
    </a>
  );
}
