import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import { LinkIcon } from "lucide-react";
import type {
  BannerBlock as BannerBlockProps,
  CodeBlock as CodeBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  SocialMediaBlock as SocialMediaBlockProps,
} from "@/lib/payload-types";
import { getTextFromLexicalNode } from "@/lib/toc";
import { cn } from "@/lib/utils";
import Banner from "./Banner";
import { EmbeddedSocialMedia } from "./EmbeddedSocialMedia";
import MediaBlock from "./MediaBlock";
import RelationshipCard from "./RelationshipCard";
import { Checkbox } from "./ui/checkbox";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | SocialMediaBlockProps
    >;

export const createJsxConverters =
  (options?: {
    enableHeadingAnchors?: boolean;
    headingAnchorLevels?: number[] | undefined;
  }): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => {
    const showAnchors = !!options?.enableHeadingAnchors;
    const anchorLevels = options?.headingAnchorLevels ?? [2, 3, 4];
    const slugify = slugifyWithCounter();

    return {
      ...defaultConverters,
      blocks: {
        banner: ({ node }) => (
          <Banner className="mb-4" style={node.fields.style}>
            <RichText
              data={node.fields.content}
              enableGutter={false}
              enableProse={true}
              className="text-inherit **:text-inherit prose-p:my-3 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0"
            />
          </Banner>
        ),
        mediaBlock: ({ node }) => {
          const media = node.fields.media;
          if (!media || typeof media !== "object") {
            return null;
          }
          return (
            <MediaBlock
              media={media}
              mediaClassName="mx-auto lg:w-auto lg:max-h-[72vh]"
            />
          );
        },
        code: ({ node }) => (
          <pre>
            <code>{node.fields.code}</code>
          </pre>
        ),
        // cta: ({ node }) => <CallToActionBlock {...node.fields} />,
        socialMedia: ({ node }) => (
          <EmbeddedSocialMedia
            link={node.fields.link}
            className="flex justify-center"
          />
        ),
      },
      relationship: ({ node }) => <RelationshipCard relation={node} />,
      listitem: ({ node, nodesToJSX }) => {
        const serializedChildren = nodesToJSX({ nodes: node.children });

        // If the list item has a checked property, it's a checkbox
        if (node.checked != null) {
          return (
            <li className="flex items-center gap-2 my-1" value={node?.value}>
              <Checkbox
                tabIndex={-1}
                checked={node.checked}
                className="cursor-default"
              />
              {serializedChildren}
            </li>
          );
        }

        // If this list item is another list, don't wrap it in an <li> tag
        const hasNestedList = node.children.some(
          (child) => child.type === "list",
        );
        return hasNestedList ? (
          serializedChildren
        ) : (
          <li value={node.value}>{serializedChildren}</li>
        );
      },
      heading: ({ node, nodesToJSX }) => {
        const Tag = (node.tag || "h2") as
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6";
        const text = getTextFromLexicalNode(node);
        const id = slugify(text || "");
        const level = Number(String(node.tag || "h2").replace("h", ""));

        if (!showAnchors || !anchorLevels.includes(level)) {
          return <Tag>{nodesToJSX({ nodes: node.children })}</Tag>;
        }

        return (
          <Tag id={id} className="group scroll-mt-16">
            {nodesToJSX({ nodes: node.children })}
            <a
              href={`#${id}`}
              className={cn(
                "ml-2 inline-flex items-center align-middle no-underline text-inherit",
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-sm",
              )}
              aria-label={`Anchor link to ${text}`}
            >
              <LinkIcon
                className={cn(
                  "size-4 opacity-0 transition-opacity text-muted-foreground/80",
                  "group-hover:opacity-100",
                )}
                aria-hidden
              />
            </a>
          </Tag>
        );
      },
    };
  };

export type Props = {
  data: SerializedEditorState<SerializedLexicalNode>;
  enableGutter?: boolean;
  enableProse?: boolean;
  /** Show anchor link on headings (for pages with TOC) */
  enableHeadingAnchors?: boolean;
  /** Which heading levels show anchors (defaults to [2,3,4]) */
  headingAnchorLevels?: number[] | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText({
  className,
  enableProse = true,
  enableGutter = true,
  enableHeadingAnchors = false,
  headingAnchorLevels,
  ...rest
}: Props) {
  return (
    <RichTextWithoutBlocks
      converters={createJsxConverters({
        enableHeadingAnchors,
        headingAnchorLevels,
      })}
      className={cn(
        {
          "container ": enableGutter,
          "max-w-none ": !enableGutter,
          "mx-auto prose dark:prose-invert ": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
