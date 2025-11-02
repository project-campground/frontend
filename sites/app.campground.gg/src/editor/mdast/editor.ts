import { Editor } from "slate";
import { mdastifyNode } from "./nodes";
import type { Root, RootContent } from "mdast";

export function mdastifyEditor(editor: Editor): Root {
    return {
        type: "root",
        children: editor.children.map(mdastifyNode) as RootContent[],
    };
}