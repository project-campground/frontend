import { Text as SlateText } from "slate";
import type { PhrasingContentMap } from "mdast";

export function mdastifyText(node: SlateText): PhrasingContentMap[keyof PhrasingContentMap] {
    const marks = [
        node.bold ? "strong" : null,
        node.italic ? "emphasis" : null,
        node.strikethrough ? "delete" : null,
        node.underline ? "emphasis" : null,
        node.underline ? "emphasis" : null,
    ].filter((x) => x) as (keyof PhrasingContentMap)[];

    return wrapped(
        { type: node.code ? "inlineCode" : "text", value: node.text },
        marks
    );
}

function wrapped(toWrap: PhrasingContentMap[keyof PhrasingContentMap], marks: (keyof PhrasingContentMap)[]): PhrasingContentMap[keyof PhrasingContentMap] {
    if (marks.length < 1)
        return toWrap;

    return { type: marks[0] as "strong" | "emphasis" | "delete", children: [wrapped(toWrap, marks.slice(1))] };
}