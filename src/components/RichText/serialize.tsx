import { Fragment, type JSX } from "react";
import { EmbeddedSocialMedia } from "../EmbeddedSocialMedia";
import { Link } from "../Link";
import MediaBlock from "../MediaBlock";
import RelationshipCard from "../RelationshipCard";
import { Checkbox } from "../ui/checkbox";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./nodeFormat";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NodeTypes = Record<string, any> & {
  type: string;
};

type Props = {
  nodes: NodeTypes[];
};

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null;
        }

        const key = `${node.type}-${index}`;

        if (node.type === "text") {
          let text: JSX.Element | string = node.text;
          if (node.format & IS_BOLD) {
            text = <strong key={key}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={key}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={key} className="line-through">
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={key} className="underline">
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={key}>{node.text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={key}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={key}>{text}</sup>;
          }

          return <Fragment key={key}>{text}</Fragment>;
        }

        if (node.type === "relationship") {
          // @ts-ignore
          return <RelationshipCard key={key} relation={node} />;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null;
          }
          if (node?.type === "list" && node?.listType === "check") {
            for (const item of node.children) {
              if ("checked" in item) {
                if (!item?.checked) {
                  item.checked = false;
                }
              }
            }
          }
          return serializeLexical({ nodes: node.children as NodeTypes[] });
        };

        const serializedChildren =
          "children" in node ? serializedChildrenFn(node) : "";

        if (node.type === "block") {
          const block = node.fields;
          const blockType = block?.blockType;

          if (!block || !blockType) {
            return null;
          }

          switch (blockType) {
            case "mediaBlock":
              return <MediaBlock key={key} media={block.media} />;
            case "banner":
              return (
                <div key={key} className="banner">
                  {serializeLexical(block.content.root)}
                </div>
              );
            case "code":
              return (
                <pre key={key}>
                  <code>{block.code}</code>
                </pre>
              );
            case "embeddedSocialMedia":
              return <EmbeddedSocialMedia key={key} link={block.link} />;
            default:
              return null;
          }
        }

        switch (node.type) {
          case "linebreak": {
            return <br key={key} />;
          }
          case "paragraph": {
            return <p key={key}>{serializedChildren}</p>;
          }
          case "heading": {
            const Tag = node?.tag;
            return <Tag key={key}>{serializedChildren}</Tag>;
          }
          case "list": {
            const Tag = node?.tag;
            return (
              <Tag className="my-2" key={key}>
                {serializedChildren}
              </Tag>
            );
          }
          case "listitem": {
            if (node?.checked != null) {
              return (
                <li
                  key={key}
                  className="flex items-center space-x-2 my-1"
                  value={node?.value}
                >
                  <Checkbox
                    tabIndex={-1}
                    checked={node.checked}
                    className="cursor-default"
                  />
                  <span>{serializedChildren}</span>
                </li>
              );
            }

            const hasNestedList = node.children?.some(
              (child: NodeTypes) => child.type === "list",
            );
            return hasNestedList ? (
              <Fragment key={key}>{serializedChildren}</Fragment>
            ) : (
              <li key={key} value={node?.value}>
                {serializedChildren}
              </li>
            );
          }
          case "quote": {
            return <blockquote key={key}>{serializedChildren}</blockquote>;
          }
          case "link": {
            return (
              <Link
                href={node.fields.url}
                target={node.fields.newTab ? "_blank" : "_self"}
                disableButtonStyle
                key={key}
              >
                {serializeLexical({ nodes: node.children })}
              </Link>
            );
          }
          case "horizontalrule": {
            return <hr key={key} />;
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
