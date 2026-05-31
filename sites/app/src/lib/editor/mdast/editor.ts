import { Editor, Element } from "slate";
import { mdastifyNode } from "./nodes";
import type { Root, RootContent } from "mdast";
import { slatefyElement } from "./element";

export function mdastifyEditor(editor: Editor): Root {
    return {
        type: "root",
        children: editor.children.map(mdastifyNode) as RootContent[],
    };
}
export function slatefyRoot(root: Root): Element[] {
    return root.children.flatMap((x) => slatefyElement(x, [])) as Element[];
}