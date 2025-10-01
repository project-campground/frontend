import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";
import type { Element, Text } from "hast";
import InlineCode from "./InlineCode";

type Props = {
    children: string;
};

const languagePrefix = "language-";

function getLanguageFromClassName(className: string[] | undefined) {
    return className
        ?.find((x) => x.startsWith(languagePrefix))
        ?.substring(languagePrefix.length);
}

function parseMeta(raw: string) {
    try {
        return JSON.parse(raw);
    } catch(err: unknown) {
        return null;
    }
}

const markdownComponents: Components = {
    pre({ node }) {
        if (!node)
            return <CodeBlock>{""}</CodeBlock>;

        // To get all of the info, because pre has none
        const { children: codeElems } = node;
        const codeNode = codeElems[0] as Element;

        // raw content to be parsed
        const text = (codeNode.children[0] as Text).value;

        // language can only be found in classes
        const lang = getLanguageFromClassName(codeNode.properties.className as string[] | undefined);

        // Additional metadata after language names in codeblocks
        const metaRaw = codeNode.data?.meta;
        const metaParsed = metaRaw ? parseMeta(metaRaw) : null;

        console.log("Parsed meta", metaParsed);

        return (
            <CodeBlock language={lang}>
                {text}
            </CodeBlock>
        );
    },
    code({ node, children: text }) {
        if (!node)
            return <div></div>;

        const { properties } = node;
        const className = properties.className as string[] | undefined;
        const lang = getLanguageFromClassName(className);

        return (
            <InlineCode language={lang}>
                {String(text)}
            </InlineCode>
        );
    }
};

export function LargeContentMarkdown({ children }: Props) {
    return (
        <Markdown remarkPlugins={[ remarkGfm ]} components={markdownComponents}>
            { children }
        </Markdown>
    )
}