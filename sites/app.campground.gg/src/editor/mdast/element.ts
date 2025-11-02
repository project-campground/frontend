import { Element, Node } from "slate";
import type { EditorCodeBlock, EditorElementType, EditorHeading, EditorLink, EditorOrderedList } from "../editor";
import type { BlockContent, DefinitionContent, ListItem, PhrasingContent, RootContentMap } from "mdast";
import { mdastifyNode } from "./nodes";

const nodeSerializers: Record<EditorElementType, (element: Element) => RootContentMap[keyof RootContentMap]> = {
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
    ["unordered-list"](element) {
        return { type: "list", spread: false, children: element.children.map(mdastifyNode) as ListItem[] };
    },
    ["ordered-list"](element) {
        const orderedList = element as EditorOrderedList;
        
        return { ...orderedList, type: "list", ordered: true, spread: false, children: element.children.map(mdastifyNode) as ListItem[] };
    },
    ["list-item"](element) {
        return { type: "listItem", spread: false, children: element.children.map(mdastifyNode) as (BlockContent | DefinitionContent)[] };
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

export function mdastifyElement(element: Element) {
    return nodeSerializers[element.type](element);
}