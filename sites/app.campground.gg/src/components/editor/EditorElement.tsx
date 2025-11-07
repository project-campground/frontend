import { type RenderElementProps } from "slate-react";
import type { EditorElementType, EditorCodeBlock, EditorCodeLine, EditorHeading, EditorLink } from "../../editor/editor";
import React, { ReactNode } from "react";
import { CodeContainer, CodeGrid, CodeHeader, CodeLine, CodeLineNumber, CodePre } from "../markdown/CodeBlock";
import CodeBlockEditorHeader from "./CodeBlockEditorHeader";
import { CodeEditorContextProvider, useCodeEditorContext } from "./codeEditorContext";
import Link from "../Link";
import { TableAlignContextProvider, TableHeadContextProvider, useTableAlignContext, useTableHeadContext } from "./tableHeadContext";
import type { EditorTable } from "~/editor/element";

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
    ["table"]({ attributes, children, element }) {
        const table = element as EditorTable;
        const headRow = children[0];

        return (
            <table {...attributes}>
                <TableAlignContextProvider value={{ align: "left", allAligns: table.align }}>
                    <thead>
                        <TableHeadContextProvider isHead>
                            {headRow}
                        </TableHeadContextProvider>
                    </thead>
                    <tbody>
                        <TableHeadContextProvider>
                            {children.slice(1)}
                        </TableHeadContextProvider>
                    </tbody>
                </TableAlignContextProvider>
            </table>
        );
    },
    ["table-row"]({ attributes, children }) {
        const tableAlign = useTableAlignContext();

        return (
            <tr {...attributes}>
                {(children as React.ReactElement[]).map((x, i) =>
                    <TableAlignContextProvider value={{ align: tableAlign.allAligns?.[i] ?? "left", allAligns: tableAlign.allAligns }}>
                        {x}
                    </TableAlignContextProvider>
                )}
            </tr>
        );
    },
    ["table-cell"]({ attributes, children }) {
        const tableHead = useTableHeadContext();
        const tableAlign = useTableAlignContext();
        const Component = tableHead ? "th" : "td";

        return (
            <Component {...attributes} align={tableAlign.align}>
                {children}
            </Component>
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