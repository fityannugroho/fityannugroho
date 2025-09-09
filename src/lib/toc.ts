import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedTextNode,
} from "@payloadcms/richtext-lexical";
import { slugifyWithCounter } from "@sindresorhus/slugify";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

type BlockWithOptionalContent = SerializedBlockNode<{
  // Some custom blocks contain nested rich text content
  content?: DefaultTypedEditorState;
}>;

type RichTextNode = DefaultNodeTypes | BlockWithOptionalContent;

const isTextNode = (node: RichTextNode): node is SerializedTextNode =>
  node.type === "text";
const isHeadingNode = (node: RichTextNode): node is SerializedHeadingNode =>
  node.type === "heading";
const hasChildren = (
  node: RichTextNode,
): node is RichTextNode & { children: RichTextNode[] } => {
  return (
    "children" in node &&
    Array.isArray((node as { children?: unknown }).children)
  );
};
const isBlockWithContent = (
  node: RichTextNode,
): node is BlockWithOptionalContent => {
  return (
    node.type === "block" &&
    !!(node as { fields?: { content?: { root?: { children?: unknown } } } })
      .fields?.content?.root
  );
};

export const getTextFromLexicalNode = (node: RichTextNode): string => {
  if (!node) return "";
  if (isTextNode(node)) return node.text;

  let text = "";
  if (hasChildren(node)) {
    for (const child of node.children) text += getTextFromLexicalNode(child);
  }
  if (isBlockWithContent(node)) {
    const nestedChildren = node.fields.content?.root?.children as
      | undefined
      | RichTextNode[];
    if (Array.isArray(nestedChildren)) {
      for (const child of nestedChildren) text += getTextFromLexicalNode(child);
    }
  }
  return text;
};

export const extractHeadings = (
  data: DefaultTypedEditorState,
  opts?: { levels?: number[] },
): TocItem[] => {
  const levels = opts?.levels ?? [1, 2, 3, 4, 5, 6];
  const result: TocItem[] = [];

  const walk = (nodes: RichTextNode[]) => {
    for (const node of nodes ?? []) {
      if (!node || typeof node !== "object") continue;
      if (isHeadingNode(node)) {
        const tag = String(node.tag || "");
        const level = Number(tag.replace("h", ""));
        if (levels.includes(level)) {
          const text = getTextFromLexicalNode(node);
          const slugify = slugifyWithCounter();
          const id = slugify(text || "");
          result.push({ id, text, level });
        }
      }

      // Recurse into regular children
      if (hasChildren(node)) walk(node.children);

      // Recurse into nested rich text within blocks
      if (isBlockWithContent(node)) {
        const nestedChildren = node.fields.content?.root?.children as
          | undefined
          | RichTextNode[];
        if (Array.isArray(nestedChildren)) walk(nestedChildren);
      }
    }
  };

  const rootChildren = data?.root?.children as unknown as
    | RichTextNode[]
    | undefined;
  if (Array.isArray(rootChildren)) walk(rootChildren);
  return result;
};
