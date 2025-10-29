import type { RichEditorBlockElement, RichEditorText } from "./editor"

export const getNeighborPath = (path: number[], distance: number = 1) =>
    [...getParentPath(path), path[path.length - 1] + distance];

export const getParentPath = (path: number[]) =>
    path.slice(0, path.length - 1);

export const paragraph: () => RichEditorBlockElement<"paragraph", RichEditorText> = () => ({
    type: "paragraph",
    children: [
        {
            text: "",
        },
    ],
});