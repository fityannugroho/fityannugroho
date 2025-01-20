import { PUBLIC_PAYLOAD_CMS_URL } from "astro:env/client";
import type { SerializedRelationshipNode } from "@payloadcms/richtext-lexical";
import { LinkIcon } from "lucide-react";

type Props = {
  relation: SerializedRelationshipNode;
};

export default function RelationshipCard({ relation }: Props) {
  if (typeof relation.value !== "object") {
    return null;
  }

  let href: string;
  switch (relation.relationTo) {
    case "posts":
      href = `/blog/${relation.value.slug}`;
      break;
    case "pages":
      href = `/${relation.value.slug}`;
      break;
    default:
      href = `${PUBLIC_PAYLOAD_CMS_URL}/${relation.relationTo}/${relation.value.id}`;
      break;
  }

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
