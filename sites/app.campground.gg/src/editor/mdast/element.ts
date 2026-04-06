import { Element, Node } from "slate";
import type { EditorBlockElement, EditorCodeBlock, EditorElementType, EditorHeading, EditorLink, EditorListItem, EditorOrderedList, EditorText } from "../editor";
import type { BlockContent, DefinitionContent, ListItem, PhrasingContent, RootContentMap, Node as MdastNode, Paragraph, Parent, Blockquote, Code, List, Heading, Link, Html, Text, InlineCode, FootnoteDefinition, FootnoteReference, Definition, Image, ImageReference, Yaml, Table, TableRow, TableCell, LinkReference } from "mdast";
import { mdastifyNode } from "./nodes";
import { slatefyText } from "./text";
import type { BlockAlignment, EditorImage, EditorParagraph, EditorTable, EditorTableCell, EditorTableRow } from "../element";

const nodeSerializers: Record<EditorElementType, (element: Element) => RootContentMap[keyof RootContentMap] | TableRow | TableCell> = {
    paragraph(element) {
        return { type: "paragraph", children: element.children.map(mdastifyNode) as PhrasingContent[] };
    },
    ["block-quote"](element) {
        return { type: "blockquote", children: element.children.map(mdastifyNode) as (BlockContent | DefinitionContent)[] };
    },
    ["code-block"](element) {
        const codeBlock = element as EditorCodeBlock;
        
        return { ...codeBlock, type: "code", value: element.children.map(Node.string).join("\n"), };
    },
    table(element) {
        const table = element as EditorTable;
        
        return {
            type: "table",
            align: table.align,
            children:
            table.children.map(mdastifyNode) as TableRow[],
        };
    },
    image(element) {
        const { url, title, children } = element as EditorImage;

        return {
            type: "image",
            url,
            title,
            alt: children.map((node) => Node.string(node)).join(""),
        };
    },
    ["table-row"](element) {
        return {
            type: "tableRow",
            children: element.children.map(mdastifyNode) as TableCell[],
        } satisfies TableRow;
    },
    ["table-cell"](element) {
        return {
            type: "tableCell",
            children: element.children.map(mdastifyNode) as PhrasingContent[],
        } satisfies TableCell;
    },
    ["unordered-list"](element) {
        return { type: "list", spread: true, children: element.children.map(mdastifyNode) as ListItem[] };
    },
    ["ordered-list"](element) {
        const orderedList = element as EditorOrderedList;
        
        return { ...orderedList, type: "list", ordered: true, spread: true, children: element.children.map(mdastifyNode) as ListItem[] };
    },
    ["list-item"](element) {
        return { type: "listItem", spread: true, children: element.children.map(mdastifyNode) as (BlockContent | DefinitionContent)[] };
    },
    ["code-line"](element) {
        return { type: "paragraph", children: element.children.map(mdastifyNode) as PhrasingContent[] };
    },
    divider() {
        return { type: "thematicBreak" };
    },
    heading(element) {
        const heading = element as EditorHeading;
        return { type: "heading", depth: (heading.depth ?? 1) as (1 | 2 | 3 | 4 | 5 | 6), children: element.children.map(mdastifyNode) as PhrasingContent[] };
    },
    link(element) {
        const link = element as EditorLink;
        
        return { ...link, children: element.children.map(mdastifyNode) as PhrasingContent[] };
    }
};

type ContentWithUnderline = keyof RootContentMap | "underline";

const nodeDeserializers: Record<keyof RootContentMap, (node: MdastNode, nesting: (ContentWithUnderline)[]) => Node | Node[]> = {
    paragraph(element, nesting) {
        return { type: "paragraph", children: (element as Paragraph).children.flatMap((x) => slatefyElement(x, nesting)) as unknown as EditorText[] };
    },
    definition(element, nesting) {
        const definition = element as Definition;
        return [
            { type: "paragraph", children: [slatefyText(definition.title ?? definition.label ?? definition.identifier, nesting)] },
            { type: "paragraph", children: (element as Paragraph).children.flatMap((x) => slatefyElement(x, nesting)) as unknown as EditorText[] }
        ];
    },
    blockquote(element, nesting) {
        return { type: "block-quote", children: (element as Blockquote).children.flatMap((x) => slatefyElement(x, nesting)) as EditorBlockElement[] };
    },
    code(element) {
        const codeBlock = element as Code;
    
        return {
            ...codeBlock,
            type: "code-block",
            children: codeBlock
                .value
                .split("\n")
                .map((x) => ({
                    type: "code-line",
                    children: [
                        {
                            text: x,
                        },
                    ],
                })),
        };
    },
    list(element, nesting) {
        const list = element as List;

        return { type: list.ordered ? "ordered-list" : "unordered-list", children: list.children.flatMap((x) => slatefyElement(x, nesting)) as EditorListItem[] };
    },
    table(element, nesting) {
        const table = element as Table;

        return { type: "table", align: table.align as (BlockAlignment[] | null | undefined), children: table.children.flatMap((x) => slatefyElement(x, nesting)) as EditorTableRow[] };
    },
    tableRow(element, nesting) {
        const tableRow = element as TableRow;

        return { type: "table-row", children: tableRow.children.flatMap((x) => slatefyElement(x, nesting)) as EditorTableCell[] };
    },
    tableCell(element, nesting) {
        const tableCell = element as TableCell;

        return { type: "table-cell", children: tableCell.children.flatMap((x) => slatefyElement(x, nesting)) as EditorText[] };
    },
    listItem(element, nesting) {
        const listItem = element as ListItem;
        
        return { type: "list-item", children: listItem.children.flatMap((x) => slatefyElement(x, nesting)) as (EditorBlockElement | EditorText)[] };
    },
    thematicBreak() {
        return { type: "divider", children: [{ text: "" }] };
    },
    heading(element, nesting) {
        const heading = element as Heading;
        
        return { type: "heading", depth: heading.depth, children: heading.children.flatMap((x) => slatefyElement(x, nesting)) as EditorText[] };
    },
    footnoteDefinition(element, nesting) {
        const footnoteDef = element as FootnoteDefinition;

        return {
            type: "paragraph",
            children: [
                slatefyText(`[^${footnoteDef.label}]: `, nesting),
                ...footnoteDef.children.flatMap((x) => slatefyElement(x, nesting)) as EditorText[],
            ]
        } satisfies EditorParagraph;
    },
    image(element, nesting) {
        const image = element as Image;

        return [
            slatefyText("!", nesting),
            { type: "link", url: image.url, title: image.title, children: [slatefyText(image.alt ?? "", nesting)] }
        ];
    },
    imageReference(element, nesting) {
        const image = element as ImageReference;
        
        return [
            slatefyText("!", nesting),
            { type: "link", url: image.identifier, title: image.label, children: [slatefyText(image.alt ?? "", nesting)] }
        ];
    },
    linkReference(element, nesting) {
        const link = element as LinkReference;
        
        return { type: "link", url: link.identifier, title: link.label, children: link.children.flatMap((x) => slatefyElement(x, nesting)) as EditorText[] } satisfies EditorLink;
    },
    link(element, nesting) {
        const link = element as Link;
        
        return { ...link, children: link.children.flatMap((x) => slatefyElement(x, nesting)) as EditorText[] };
    },
    yaml(element, nesting) {
        const yaml = element as Yaml;

        return [
            {
                type: "divider",
                children: [
                    { text: " "}
                ]
            },
            {
                type: "paragraph",
                children: [
                    slatefyText(yaml.value, nesting),
                ]
            },
            {
                type: "divider",
                children: [
                    { text: " "}
                ]
            }
        ];
    },
    break() {
        return { text: "\n" };
    },
    emphasis(element, nesting) {
        // Since emphasis doesn't exist in mdast, we need to detect __
        if (nesting.slice(-2)[0] === "emphasis") {
            nesting.splice(-2);
            nesting.push("underline");
        }

        return (element as Parent).children.flatMap((x) => slatefyElement(x, nesting));
    },
    delete(element, nesting) {
        return (element as Parent).children.flatMap((x) => slatefyElement(x, nesting));
    },
    strong(element, nesting) {
        return (element as Parent).children.flatMap((x) => slatefyElement(x, nesting));
    },
    footnoteReference(element, nesting) {
        const ref = element as FootnoteReference;
        return slatefyText(`[^${ref.label ?? ref.identifier}]`, nesting);
    },
    html(element, nesting) {
        const html = element as Html;

        return slatefyText(html.value, nesting);
    },
    inlineCode(element, nesting) {
        const text = element as InlineCode;
        return slatefyText(text.value, nesting);
    },
    text(element, nesting) {
        const text = element as Text;
        return slatefyText(text.value, nesting);
    },
};

export function mdastifyElement(element: Element) {
    return nodeSerializers[element.type](element);
}
export function slatefyElement(node: MdastNode, nesting: ContentWithUnderline[]) {
    nesting.push(node.type as ContentWithUnderline);
    return nodeDeserializers[node.type as keyof RootContentMap](node, nesting);
}