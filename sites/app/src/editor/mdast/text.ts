import { Text as SlateText } from "slate";
import type { PhrasingContentMap, RootContentMap } from "mdast";
import type { EditorText, EditorTextFormatting } from "../text";

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

const markTypes: (keyof RootContentMap | "underline")[] = ["strong", "emphasis", "underline", "delete", "inlineCode"];
const markTypesToFormatting: Partial<Record<keyof RootContentMap | "underline", keyof EditorTextFormatting>> = {
    strong: "bold",
    emphasis: "italic",
    underline: "underline",
    delete: "strikethrough",
    inlineCode: "code",
};

export function slatefyText(text: string, nesting: (keyof RootContentMap | "underline")[]): EditorText {
    const marks = nesting
        .filter((x) => markTypes.includes(x))
        .map((x) => [markTypesToFormatting[x]!, true]);

    return Object.assign(Object.fromEntries(marks), { text });
}

function wrapped(toWrap: PhrasingContentMap[keyof PhrasingContentMap], marks: (keyof PhrasingContentMap)[]): PhrasingContentMap[keyof PhrasingContentMap] {
    if (marks.length < 1)
        return toWrap;

    return { type: marks[0] as "strong" | "emphasis" | "delete", children: [wrapped(toWrap, marks.slice(1))] };
}