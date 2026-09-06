import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type LexicalTextNode = {
  type: "text";
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  version: number;
};

type LexicalParagraphNode = {
  type: "paragraph";
  children: LexicalTextNode[];
  direction: "ltr" | null;
  format: string;
  indent: number;
  version: number;
};

type LexicalTableCellNode = {
  type: "tablecell";
  headerState: number;
  colSpan: number;
  rowSpan: number;
  backgroundColor?: string | null;
  colWidths?: number[] | null;
  children: LexicalParagraphNode[];
  direction: string | null;
  format: string;
  indent: number;
  version: number;
};

type LexicalTableRowNode = {
  type: "tablerow";
  children: LexicalTableCellNode[];
  direction: string | null;
  format: string;
  indent: number;
  version: number;
};

type LexicalTableNode = {
  type: "table";
  colWidths: number[];
  children: LexicalTableRowNode[];
  direction: string | null;
  format: string;
  indent: number;
  version: number;
};

function text(value: string): LexicalTextNode {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text: value,
    version: 1,
  };
}

function paragraph(value: string): LexicalParagraphNode {
  return {
    type: "paragraph",
    children: [text(value)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function cell(
  value: string,
  headerState: number,
  opts?: {
    colSpan?: number;
    rowSpan?: number;
    backgroundColor?: string | null;
  },
): LexicalTableCellNode {
  return {
    type: "tablecell",
    headerState,
    colSpan: opts?.colSpan ?? 1,
    rowSpan: opts?.rowSpan ?? 1,
    backgroundColor: opts?.backgroundColor ?? null,
    children: [paragraph(value)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function row(cells: LexicalTableCellNode[]): LexicalTableRowNode {
  return {
    type: "tablerow",
    children: cells,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function table(
  colWidths: number[],
  rows: LexicalTableRowNode[],
): LexicalTableNode {
  return {
    type: "table",
    colWidths,
    children: rows,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function editorState(children: LexicalTableNode[]): SerializedEditorState {
  return {
    root: {
      type: "root",
      children:
        children as unknown as SerializedEditorState["root"]["children"],
      direction: null,
      format: "",
      indent: 0,
      version: 1,
    },
  } as unknown as SerializedEditorState;
}

// 3 columns, 1 header row + 2 body rows — mirrors post-4 first table
export const simpleTable = editorState([
  table(
    [150, 150, 150],
    [
      row([cell("Feature", 1), cell("Plan A", 1), cell("Plan B", 1)]),
      row([cell("Feature A", 0), cell("Yes", 0), cell("No", 0)]),
      row([cell("Feature B", 0), cell("No", 0), cell("Yes", 0)]),
    ],
  ),
]);

// Header + merged colSpan 2 row + normal row — mirrors post-4 second table
export const mergedTable = editorState([
  table(
    [150, 150, 150],
    [
      row([cell("Metric", 1), cell("Q1", 1), cell("Q2", 1)]),
      row([cell("Revenue", 0), cell("Q1 + Q2 (merged)", 0, { colSpan: 2 })]),
      row([cell("Cost", 0), cell("100", 0), cell("200", 0)]),
    ],
  ),
]);

// RowSpan coverage: first body cell spans 2 rows
export const rowSpanTable = editorState([
  table(
    [150, 150, 150],
    [
      row([cell("Metric", 1), cell("Value", 1), cell("Notes", 1)]),
      row([
        cell("Revenue (rowSpan 2)", 0, { rowSpan: 2 }),
        cell("100", 0),
        cell("Q1", 0),
      ]),
      row([cell("200", 0), cell("Q2", 0)]),
    ],
  ),
]);

// Background color preservation
export const backgroundColorTable = editorState([
  table(
    [150, 150, 150],
    [
      row([
        cell("Header", 1, { backgroundColor: "#f0f0f0" }),
        cell("Header 2", 1),
        cell("Header 3", 1),
      ]),
      row([cell("Cell", 0), cell("Cell 2", 0), cell("Cell 3", 0)]),
    ],
  ),
]);
