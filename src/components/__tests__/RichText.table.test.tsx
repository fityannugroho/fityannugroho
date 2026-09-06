import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RichText from "@/components/RichText";

import {
  backgroundColorTable,
  mergedTable,
  rowSpanTable,
  simpleTable,
} from "./fixtures";

describe("RichText tables", () => {
  it("renders simple table with wrapper and table classes", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const wrapper = container.querySelector(".lexical-table-container");
    expect(wrapper).not.toBeNull();

    const tableEl = container.querySelector("table.lexical-table");
    expect(tableEl).not.toBeNull();
  });

  it("renders header cells as <th> with header class", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const headerCells = container.querySelectorAll(
      ".lexical-table-cell-header-1",
    );
    expect(headerCells.length).toBeGreaterThanOrEqual(3);

    for (const cell of headerCells) {
      expect(cell.tagName.toLowerCase()).toBe("th");
    }

    expect(container.textContent).toContain("Feature");
    expect(container.textContent).toContain("Plan A");
    expect(container.textContent).toContain("Plan B");
  });

  it("renders body cells as <td>", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const bodyCells = container.querySelectorAll(
      ".lexical-table-cell-header-0",
    );
    expect(bodyCells.length).toBeGreaterThanOrEqual(3);

    for (const cell of bodyCells) {
      expect(cell.tagName.toLowerCase()).toBe("td");
    }

    expect(container.textContent).toContain("Feature A");
    expect(container.textContent).toContain("Feature B");
  });

  it("renders header row inside <thead> when headerState grouping is implemented", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const thead = container.querySelector("thead");
    expect(thead).not.toBeNull();
    expect(thead?.querySelectorAll("th").length).toBeGreaterThanOrEqual(3);
  });

  it("renders body rows in <tbody>", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const tbody = container.querySelector("tbody");
    expect(tbody).not.toBeNull();
    expect(tbody?.querySelectorAll("tr").length).toBeGreaterThanOrEqual(2);
    expect(tbody?.textContent).toContain("Feature A");
  });

  it("applies table row class to rows", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const rows = container.querySelectorAll(".lexical-table-row");
    expect(rows.length).toBeGreaterThanOrEqual(3);
  });

  it("renders merged cell with colspan=2", () => {
    const { container } = render(<RichText data={mergedTable} />);

    expect(container.textContent).toContain("Q1 + Q2 (merged)");

    const mergedCell = Array.from(container.querySelectorAll("td, th")).find(
      (el) => el.textContent?.includes("Q1 + Q2 (merged)"),
    );
    expect(mergedCell).toBeDefined();
    expect(
      mergedCell?.getAttribute("colspan") ??
        mergedCell?.getAttribute("colSpan"),
    ).toBe("2");
  });

  it("renders rowSpan attribute when present", () => {
    const { container } = render(<RichText data={rowSpanTable} />);

    const rowSpanCell = Array.from(container.querySelectorAll("td, th")).find(
      (el) => el.textContent?.includes("Revenue (rowSpan 2)"),
    );
    expect(rowSpanCell).toBeDefined();
    expect(
      rowSpanCell?.getAttribute("rowspan") ??
        rowSpanCell?.getAttribute("rowSpan"),
    ).toBe("2");
  });

  it("has overflow wrapper with overflow-x-auto behavior via class", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const wrapper = container.querySelector(".lexical-table-container");
    expect(wrapper).not.toBeNull();
    // Class presence is the contract; CSS gives overflow-x:auto
    expect(wrapper?.classList.contains("lexical-table-container")).toBe(true);

    const tableEl = container.querySelector(".lexical-table");
    expect(tableEl).not.toBeNull();
  });

  it("renders paragraph text inside cells", () => {
    const { container } = render(<RichText data={mergedTable} />);

    expect(container.textContent).toContain("Metric");
    expect(container.textContent).toContain("Revenue");
    expect(container.textContent).toContain("Cost");

    // Paragraphs inside cells should exist
    const cells = container.querySelectorAll(".lexical-table-cell");
    expect(cells.length).toBeGreaterThan(0);
    // Each cell should contain text (rendered via paragraph)
    for (const c of cells) {
      expect(c.textContent?.trim().length).toBeGreaterThan(0);
    }
  });

  it("preserves backgroundColor style when provided", () => {
    const { container } = render(<RichText data={backgroundColorTable} />);

    const coloredCell = Array.from(container.querySelectorAll("td, th")).find(
      (el) =>
        el.textContent?.includes("Header") &&
        el.textContent?.trim() === "Header",
    );

    expect(coloredCell).toBeDefined();
    const styleAttr =
      coloredCell?.getAttribute("style") ??
      (coloredCell as HTMLElement).style.cssText;
    expect(styleAttr).toMatch(/#f0f0f0|rgb\(240,?\s*240,?\s*240\)/);
  });

  it("applies lexical-table-cell class to all cells", () => {
    const { container } = render(<RichText data={simpleTable} />);

    const cells = container.querySelectorAll(".lexical-table-cell");
    // 3x3 = 9 cells
    expect(cells.length).toBe(9);
  });
});
