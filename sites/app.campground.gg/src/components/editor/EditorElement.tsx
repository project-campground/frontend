import { type RenderElementProps } from "slate-react";
import type { EditorElementType, EditorCodeBlock, EditorCodeLine, EditorHeading, EditorLink } from "../../editor/editor";
import { ReactNode } from "react";
import { CodeContainer, CodeGrid, CodeHeader, CodeLine, CodeLineNumber, CodePre } from "../markdown/CodeBlock";
import CodeBlockEditorHeader from "./CodeBlockEditorHeader";
import { CodeEditorContextProvider, useCodeEditorContext } from "./codeEditorContext";
import Link from "../Link";

const typeToRenderer: Record<EditorElementType, (props: RenderElementProps) => (ReactNode[] | ReactNode)> = {
    paragraph({ attributes, children }) {
        return <p {...attributes}>{children}</p>
    },
    divider({ attributes }) {
        return <hr {...attributes} />;
    },
    heading({ attributes, children, element }) {
        const Tag = `h${(element as EditorHeading).depth ?? 1}` as "h1";
        return (
            <Tag {...attributes}>
                {children}
            </Tag>
        );
    },
    link({ children, element }) {
        const link = element as EditorLink;

        return (
            <Link href={link.url}>
                {children}
            </Link>
        );
    },
    ["block-quote"]({ attributes, children }) {
        return <blockquote {...attributes}>{children}</blockquote>
    },
    ["code-block"]({ attributes, children, element }) {
        return (
            <CodeContainer {...attributes}>
                <CodeHeader>
                    <CodeBlockEditorHeader element={element as EditorCodeBlock} />
                </CodeHeader>
                <CodePre>
                    <CodeEditorContextProvider codeLines={element.children as EditorCodeLine[]}>
                        <CodeGrid>
                            {children}
                        </CodeGrid>
                    </CodeEditorContextProvider>
                </CodePre>
            </CodeContainer>
        );
    },
    ["code-line"]({ element, attributes, children }) {
        // Since no index is given
        const context = useCodeEditorContext();
        const index = context?.findIndex((x) => x === element) ?? -1;

        return (
            <>
                <CodeLineNumber>
                    {index + 1}
                </CodeLineNumber>
                <CodeLine {...attributes}>
                    {children}
                </CodeLine>
            </>
        );
    },
    ["unordered-list"]({ attributes, children }) {
        return (
            <ul {...attributes}>
                {children}
            </ul>
        );
    },
    ["ordered-list"]({ attributes, children }) {
        return (
            <ol {...attributes}>
                {children}
            </ol>
        );
    },
    ["list-item"]({ attributes, children }) {
        return (
            <li {...attributes}>
                {children}
            </li>
        );
    },
    // ["inline-quote"]({ attributes, children }) {
    //     return (
    //         <q {...attributes}>
    //             {children}
    //         </q>
    //     );
    // },
}

export default function EditorElement({ attributes, children, element }: RenderElementProps) {
    const nodeType = element.type;
    const Renderer = typeToRenderer[nodeType];

    return (
        <Renderer attributes={attributes} element={element}>
            {children}
        </Renderer>
    );
}