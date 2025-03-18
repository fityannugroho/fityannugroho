import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  CodeBlock as CodeBlockProps,
  MediaBlock as MediaBlockProps,
  SocialMediaBlock as SocialMediaBlockProps,
} from "@/lib/payload-types";
import { cn } from "@/lib/utils";
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

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
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
    const hasNestedList = node.children.some((child) => child.type === "list");
    return hasNestedList ? (
      serializedChildren
    ) : (
      <li value={node.value}>{serializedChildren}</li>
    );
  },
});

export type Props = {
  data: SerializedEditorState<SerializedLexicalNode>;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
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
