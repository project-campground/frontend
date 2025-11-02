import { Text } from "slate";
import type { EditorBlockElementBase } from "./editor"

export const getNeighborPath = (path: number[], distance: number = 1) =>
    [...getParentPath(path), negativeFloor(path[path.length - 1] + distance)];

export const getNewlineIndexes = (str: string) =>
    str
        .split("\n")
        .map((x) => x.length)
        .slice(0, -1);

const negativeFloor = (a: number) =>
    a < 0 ? 0 : a;

export const getParentPath = (path: number[]) =>
    path.slice(0, path.length - 1);

export const paragraph: () => EditorBlockElementBase<"paragraph", Text> = () => ({
    type: "paragraph",
    children: [
        {
            text: "",
        },
    ],
});