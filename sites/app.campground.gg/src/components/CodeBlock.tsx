import { Box, Chip, IconButton, styled } from "@mui/joy";
import hljs, { type Language } from "highlight.js";
import React from "react";
import { IconCopy } from "@tabler/icons-react";
import type { HighlightNode, HighlightToken } from "types/highlight";

type Props = {
    children: string;
    language?: string | undefined | null;
}

// Code wrapping
const CodeContainer = styled("div", {
    name: "CodeContainer",
    slot: "container",
})(({ theme }) => ({
    position: "relative",
    backgroundColor: theme.vars.palette.background.body,
    color: theme.vars.palette.text.tertiary,
    padding: `6px 12px`,
    borderRadius: theme.vars.radius.md,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: "4px 0",
    "> .code-icon-button": {
        opacity: 0,
        transition: "opacity 0.5s",
    },
    ":hover > .code-icon-button": {
        opacity: 1,
    },
    "*.token.operator": {
        color: theme.vars.palette.text["code-keyword"],
    },
    "*.token.string": {
        color: theme.vars.palette.text["code-string"],
    },
    "*.token.comment": {
        color: theme.vars.palette.neutral[400]
    },
    "*.token.title.function": {
        color: theme.vars.palette.text["code-function"]
    },
    "*.token.title.class": {
        color: theme.vars.palette.text["code-class"]
    },
    "*.token.number": {
        color: theme.vars.palette.text["code-number"]
    },
    "*.token.attr": {
        color: theme.vars.palette.text["code-attribute"]
    },
    "*.token.subst": {
        color: theme.vars.palette.text["code-template"]
    },
    "*.token.keyword, *.token.built_in, *.token.tag, *.token.name, *.token.variable.language": {
        color: theme.vars.palette.text["code-keyword"]
    },
}));
const CodePre = styled("pre", {
    name: "CodePre",
    slot: "pre",
})(() => ({
    margin: 0,
}));
const CodeGrid = styled("code", {
    name: "CodeGrid",
    slot: "grid",
})(() => ({
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "0px 16px",
}));

// Code additional content
const CodeHeader = styled("header", {
    name: "CodeHeader",
    slot: "header",
})(() => ({
    display: "flex",
    flexDirection: "row",
    userSelect: "none",
}));
const CodeLanguage = styled(Chip, {
    name: "CodeLanguage",
    slot: "language"
})(({ theme }) => ({
    backgroundColor: theme.vars.palette.neutral[500],
    borderRadius: theme.vars.radius.md,
    fontWeight: 700,
    fontFamily: theme.fontFamily.code,
    color: theme.vars.palette.neutral[100]
}));

// Code lines
const CodeLineNumber = styled("div", {
    name: "CodeLineNumber",
})(({ theme }) => ({
    color: theme.vars.palette.neutral[400],
    userSelect: "none",
}));
const CodeLine = styled("div", {
    name: "CodeLine",
})();

const splitTokensWithScope = (value: string | HighlightToken, scope: string): Array<0 | { scope: string; text: string; }> => 
    typeof value === "string"
    // Since scope is given (there is a parent token), all the strings become tokens same type as the parent token
    ? insertLineBetween(value.split("\n"))
        .filter((x) => x || typeof x === "number")
        .flatMap((x) => typeof x === "string" ? { scope, text: x } : 0)
    // Flattens scopped items inside
    : value
        .children
        .flatMap((x) => splitTokensWithScope(x, value.scope));

const splitTokens = (value: string | HighlightToken): Array<0 | string | { scope: string; text: string; }> => 
    typeof value === "string"
    ? insertLineBetween(value.split("\n")).filter((x) => x || x === 0)
    // To flatten scoped items inside
    : value
        .children
        .flatMap((x) => splitTokensWithScope(x, value.scope));

// If there's a highlight token, just turn it into React
const componentifyToken = (value: 0 | string | { scope: string; text: string; }) =>
    typeof value === "string"
    ? value
    : typeof value === "number"
    ? value
    : <span className={`token ${value.scope.split(".").join(" ")}`}>{value.text}</span>;

function insertLineBetween<T>(arr: T[] | string[]): Array<string | 0 | T> {
    // If there's 1 or 0 elements, that means there's no newlines
    if (arr.length < 2)
        return arr;

    // To put 0 in between
    const firstElem = arr[0];

    const withElemsAfter = arr
        .slice(1)
        .flatMap((x) => [0, x]) as (string | T | 0)[];

    return [firstElem, ...withElemsAfter];
}

function linefyTokens<T>(arr: (0 | T)[]) {
    // It's basically .split(0), but for the arrays and their elements
    // [a, b, 0, c, d, e, 0, f, 0] => [[a, b], [c, d, e], [f], []]
    return arr
        .reduce((a: (number | T)[][], b: 0 | T) =>
            typeof b === "number"
            ? [...a, []]
            : [...a.slice(0, a.length - 1), [...a[a.length - 1], b]]
        , [[]])
}


export default class CodeBlock extends React.Component<Props> {
    static nonHighlightedLanguages = ["none", "plain", "plaintext", "txt", "text"];

    constructor(props: Props) {
        super(props)
    }
    get trimmedText() {
        const { children: text } = this.props;
        return text.substring(Number(text.startsWith("\n")), text.length - Number(text.endsWith("\n")));
    }
    get tokenizedContent() {
        const { language } = this.props;
        const content = this.trimmedText;

        // Nothing to highlight
        if (!language || CodeBlock.nonHighlightedLanguages.includes(language))
            return {
                tokens: insertLineBetween(content.split("\n"))
            };

        const highlighted = hljs.highlight(content, { language });
        const { name } = highlighted._top as Language;
        const _emitter = highlighted._emitter as unknown as { stack: [HighlightNode] };
        const nodes = _emitter.stack[0].children;

        return {
            language: {
                language,
                name
            },
            tokens: nodes
                .flatMap(splitTokens)
                .map(componentifyToken)
        };
    }
    get tokenizedCodeLines() {
        const tokenizedContent = this.tokenizedContent;

        return { language: tokenizedContent.language, tokens: linefyTokens(tokenizedContent.tokens) };
    }
    copyCode() {
        navigator.clipboard.writeText(this.trimmedText);
    }
    render() {
        const linefied = this.tokenizedCodeLines;
        const languageDisplayName = linefied.language?.name ?? "none";
        const noLanguage = CodeBlock.nonHighlightedLanguages.includes(languageDisplayName);
        const iconButtonMargin = Number(!noLanguage) * 5 + 3;

        return (
            <CodeContainer>
                <IconButton className={noLanguage ? `code-icon-button no-language` : `code-icon-button with-language`} sx={{ position: "absolute", right: iconButtonMargin, top: iconButtonMargin, }} size="sm" onClick={this.copyCode.bind(this)}>
                    <IconCopy />
                </IconButton>
                {
                    noLanguage
                    ? null
                    : <CodeHeader>
                        <Box flex={1}>
                            <CodeLanguage>{languageDisplayName}</CodeLanguage>
                        </Box>
                    </CodeHeader>
                }
                <CodePre>
                    <CodeGrid>
                        {linefied.tokens.map((x, i) =>
                            <>
                                <CodeLineNumber key={`num-${i}`}>
                                    {i + 1}
                                </CodeLineNumber>
                                <CodeLine key={i}>
                                    {x}
                                </CodeLine>
                            </>
                        )}
                    </CodeGrid>
                </CodePre>
            </CodeContainer>
        );
    }
}