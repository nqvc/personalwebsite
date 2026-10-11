import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString as hastToString } from "hast-util-to-string";
import type { Root as MdRoot, Blockquote, Paragraph, Text } from "mdast";
import type { Root as HastRoot, Element } from "hast";

export type Heading = { id: string; text: string; depth: 2 | 3 };

/**
 * Callouts: write a blockquote whose first line is a marker, e.g.
 *
 *   > [!RESULT]
 *   > Measured output was …
 *
 * Supported markers make the status of a statement explicit:
 * PROPOSED, PROTOTYPE, RESULT, FUTURE, PLACEHOLDER, NOTE.
 */
const CALLOUTS: Record<string, string> = {
  PROPOSED: "Proposed idea",
  PROTOTYPE: "Working prototype",
  RESULT: "Experimental result",
  FUTURE: "Future possibility",
  PLACEHOLDER: "Placeholder — to be completed",
  NOTE: "Note",
};

function remarkCallouts() {
  return (tree: MdRoot) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      const first = node.children[0] as Paragraph | undefined;
      if (!first || first.type !== "paragraph") return;
      const text = first.children[0] as Text | undefined;
      if (!text || text.type !== "text") return;
      const match = text.value.match(/^\[!([A-Z]+)\]\s*/);
      if (!match || !CALLOUTS[match[1]]) return;
      const kind = match[1];
      text.value = text.value.slice(match[0].length);
      if (!text.value.trim() && first.children.length === 1) node.children.shift();
      node.data = {
        hName: "aside",
        hProperties: { className: ["callout", `callout--${kind.toLowerCase()}`] },
      };
      node.children.unshift({
        type: "paragraph",
        data: { hProperties: { className: ["callout__label"] } },
        children: [{ type: "text", value: CALLOUTS[kind] }],
      });
    });
  };
}

/** Collect h2/h3 headings for a table of contents, lazy-load images, and turn lone images into figures. */
function rehypeEnhance(headings: Heading[]) {
  return () => (tree: HastRoot) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        headings.push({
          id: String(node.properties.id),
          text: hastToString(node),
          depth: node.tagName === "h2" ? 2 : 3,
        });
      }
      if (node.tagName === "img") {
        node.properties = { ...node.properties, loading: "lazy", decoding: "async" };
      }
      if (node.tagName === "table" && parent && index !== undefined) {
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrap"] },
          children: [node],
        };
      }
      if (node.tagName === "p" && parent && index !== undefined) {
        const kids = node.children.filter((c) => !(c.type === "text" && !c.value.trim()));
        if (kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img") {
          const img = kids[0];
          const caption = img.properties?.title ? String(img.properties.title) : "";
          if (img.properties) delete img.properties.title;
          parent.children[index] = {
            type: "element",
            tagName: "figure",
            properties: {},
            children: caption
              ? [img, { type: "element", tagName: "figcaption", properties: {}, children: [{ type: "text", value: caption }] }]
              : [img],
          };
        }
      }
    });
  };
}

export async function renderMarkdown(source: string) {
  const headings: Heading[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCallouts)
    .use(remarkRehype, {
      footnoteLabel: "Notes and references",
      footnoteLabelTagName: "h2",
      footnoteLabelProperties: { className: ["footnotes-title"] },
    })
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: false })
    .use(rehypeEnhance(headings))
    .use(rehypeStringify)
    .process(source);
  return { html: String(file), headings: headings.filter((h) => h.id !== "footnote-label") };
}

/** Plain text version of markdown, used for search and reading-time estimates. */
export function markdownToPlainText(source: string) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[\^[^\]]+\]:?/g, " ")
    .replace(/^>\s?\[![A-Z]+\]/gm, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingTime(source: string) {
  const words = source.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
