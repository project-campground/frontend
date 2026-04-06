import { Editor, Node as SlateNode, Element, Text } from "slate";
import type { Node as MdastNode } from "mdast";
import { mdastifyEditor } from "./editor";
import { mdastifyText } from "./text";
import { mdastifyElement } from "./element";

export function mdastifyNode(node: SlateNode): MdastNode {
    if (Editor.isEditor(node))
        return mdastifyEditor(node);
    else if (Text.isText(node))
        return mdastifyText(node);

    return mdastifyElement(node as Element);
}