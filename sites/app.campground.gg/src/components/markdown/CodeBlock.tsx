import { Chip, IconButton, Stack, styled, Typography } from "@mui/joy";
import hljs, { type Language } from "highlight.js";
import React from "react";
import { IconCopy } from "@tabler/icons-react";
import type { HighlightNode, HighlightToken } from "types/highlight";

type Props = {
    children: string;
    language?: string | undefined | null;
    startingLine?: number | undefined | null;
    languageName?: string | undefined | null;
    description?: string | undefined | null;
    highlightLines?: number[] | undefined | null;
}

// Code wrapping
export const CodeContainer = styled("div", {
    name: "CodeContainer",
    slot: "container",
})(({ theme }) => ({
    position: "relative",
    backgroundColor: theme.vars.palette.background.body,
    color: theme.vars.palette.text.tertiary,
    borderRadius: theme.vars.radius.md,
    display: "flex",
    flexDirection: "column",
    margin: "8px 0",
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
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-string"],
        }
    },
    "*.token.comment": {
        color: theme.vars.palette.neutral[400],
    },
    "*.token.title.function": {
        color: theme.vars.palette.text["code-function"],
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-function"],
        }
    },
    "*.token.title.class": {
        color: theme.vars.palette.text["code-class"],
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-class"],
        }
    },
    "*.token.number": {
        color: theme.vars.palette.text["code-number"],
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-number"],
        }
    },
    "*.token.attr": {
        color: theme.vars.palette.text["code-attribute"],
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-attribute"],
        }
    },
    "*.token.subst": {
        color: theme.vars.palette.text["code-template"],
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-template"],
        }
    },
    "*.token.keyword, *.token.built_in, *.token.tag, *.token.name, *.token.variable.language": {
        color: theme.vars.palette.text["code-keyword"],
        "::selection": {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.text["code-keyword"],
        }
    },
    "*.token.addition": {
        color: theme.vars.palette.success[500],
        "::selection": {
            color: theme.vars.palette.success[950],
            backgroundColor: theme.vars.palette.success[500],
        }
    },
    "*.token.deletion": {
        color: theme.vars.palette.danger[500],
        "::selection": {
            color: theme.vars.palette.danger[950],
            backgroundColor: theme.vars.palette.danger[500],
        }
    },
}));
export const CodePre = styled("pre", {
    name: "CodePre",
    slot: "pre",
})(() => ({
    margin: 0,
}));
export const CodeGrid = styled("code", {
    name: "CodeGrid",
    slot: "grid",
})(() => ({
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    overflowX: "auto",
}));

// Code additional content
export const CodeHeader = styled("header", {
    name: "CodeHeader",
    slot: "header",
})(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
    gap: 4,
    borderBottom: `solid 1px ${theme.vars.palette.neutral[800]}`,
    padding: "8px 10px",
}));
export const CodeLanguage = styled(Chip, {
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
export const CodeLineNumber = styled("div", {
    name: "CodeLineNumber",
})(({ theme }) => ({
    color: theme.vars.palette.neutral[400],
    userSelect: "none",
    textAlign: "center",
    padding: `0 12px`,
    borderRight: `solid 1px ${theme.vars.palette.neutral[800]}`,
    borderLeft: `solid 2px transparent`,
    "&.highlighted": {
        color: theme.vars.palette.info[100],
        borderLeft: `solid 2px ${theme.vars.palette.info[500]}`,
        backgroundColor: theme.vars.palette.info[900],
    },
}));
export const CodeLine = styled("div", {
    name: "CodeLine",
})(({ theme }) => ({
    paddingLeft: 16,
    paddingRight: 16,
    "&.highlighted": {
        backgroundColor: theme.vars.palette.info[900],
    },
}));

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

export function linefyTokens<T>(arr: (0 | T)[]): T[][] {
    // It's basically .split(0), but for the arrays and their elements
    // [a, b, 0, c, d, e, 0, f, 0] => [[a, b], [c, d, e], [f], []]
    return arr
        .reduce((a: T[][], b: 0 | T) =>
            typeof b === "number"
            ? [...a, []]
            : [...a.slice(0, a.length - 1), [...a[a.length - 1], b]]
        , [[]])
}


export default class CodeBlock extends React.Component<Props> {
    public static nonHighlightedLanguages = ["none", "plain", "plaintext", "txt", "text"];

    constructor(props: Props) {
        super(props)
    }
    get trimmedText() {
        const { children: text } = this.props;
        return text.substring(Number(text.startsWith("\n")), text.length - Number(text.endsWith("\n")));
    }
    static tokenizeContent(language: string | null | undefined, content: string) {
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
        };
    }
    get tokenizedContent() {
        const { language } = this.props;
        const content = this.trimmedText;

        return CodeBlock.tokenizeContent(language, content);
    }
    static getTokenLength(token: string | { scope: string; text: string; }) {
        return ((token as { scope: string; text: string; }).text ?? token).length;
    }
    static splitByCodeLines(tokenizedContent: { language: undefined, tokens: (string | 0)[] } | { language: { language: string; name: string | undefined; }, tokens: (string | 0 | { scope: string; text: string; })[] }) {
        return { language: tokenizedContent.language, tokens: linefyTokens(tokenizedContent.tokens.map(componentifyToken)) };
    }
    get tokenizedCodeLines() {
        return CodeBlock.splitByCodeLines(this.tokenizedContent);
    }
    copyCode() {
        navigator.clipboard.writeText(this.trimmedText);
    }
    render() {
        const linefied = this.tokenizedCodeLines;
        const startingLine = this.props.startingLine ?? 1;
        
        // Additional metadata
        const { description, highlightLines, languageName: overrideLanguageDisplayName } = this.props;

        // Language
        const languageDisplayName = linefied.language?.name ?? "none";
        const noLanguage = CodeBlock.nonHighlightedLanguages.includes(languageDisplayName) && !overrideLanguageDisplayName;

        // Styling
        const iconButtonMargin = Number(!noLanguage) * 5 + 3;

        return (
            <CodeContainer>
                <IconButton className={noLanguage ? `code-icon-button no-language` : `code-icon-button with-language`} sx={{ position: "absolute", right: iconButtonMargin, top: iconButtonMargin, }} size="sm" onClick={this.copyCode.bind(this)}>
                    <IconCopy />
                </IconButton>
                {
                    (!noLanguage || description) && <CodeHeader>
                        {!noLanguage && <Stack flex={1}>
                            <CodeLanguage>{overrideLanguageDisplayName?.substring(0, 64) ?? languageDisplayName}</CodeLanguage>
                        </Stack>}
                        {description &&
                            <Stack>
                                <Typography level="title-md" textColor="text.tertiary">
                                    {description}
                                </Typography>
                            </Stack>
                        }
                    </CodeHeader>
                }
                <CodePre>
                    <CodeGrid>
                        {linefied.tokens.map((x, i) => {
                            const commonClassNames = highlightLines?.includes(i) ? `highlighted` : ``;
                            return (
                                <>
                                    <CodeLineNumber className={commonClassNames} key={`num-${i}`}>
                                        {i + startingLine}
                                    </CodeLineNumber>
                                    <CodeLine className={commonClassNames} key={i}>
                                        {x}
                                    </CodeLine>
                                </>
                            );
                        })}
                    </CodeGrid>
                </CodePre>
            </CodeContainer>
        );
    }
}