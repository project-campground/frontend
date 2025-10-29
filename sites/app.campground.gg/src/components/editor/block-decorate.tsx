import { useCallback } from "react";
import { type DecoratedRange, Element, Node, type NodeEntry, type Range } from "slate";
import type { RichEditorAnyElementType, RichEditorCodeBlock } from "./editor";
import CodeBlock, { linefyTokens } from "../markdown/CodeBlock";

const decorators: Partial<Record<RichEditorAnyElementType, (entry: NodeEntry) => DecoratedRange[]>> = {
    ["code-block"]([node, path]) {
        const content = Node.string(node);

        const { language } = node as unknown as RichEditorCodeBlock;

        if (!language || CodeBlock.nonHighlightedLanguages.includes(language))
            return [];

        const { tokens } = CodeBlock.tokenizeContent(language, content);
        const linefied = linefyTokens(tokens);

        const decors: DecoratedRange[] = linefied
            .flatMap<Range>(
                (line, i) => {
                    // To not need to recalculate with reduce
                    let offset = 0;
                    const tokenPath = [...path, i, 0];

                    return line
                        .map<Range>((x) => {
                            return {
                                anchor: {
                                    path: tokenPath,
                                    offset
                                },
                                focus: {
                                    path: tokenPath,
                                    offset: offset += CodeBlock.getTokenLength(x)
                                },
                                scope: typeof x === "string" ? undefined : x.scope,
                            } satisfies Range;
                        })
                        .filter((x) => x.scope);
                }
            );

        return decors;
    }
};

export default function useBlockDecorate() {
    return useCallback(
        (entry: NodeEntry) => Element.isElement(entry[0]) && decorators[entry[0].type] ? decorators[entry[0].type]!(entry) : [],
        []
    );
}