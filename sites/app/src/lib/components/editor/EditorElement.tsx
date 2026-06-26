import { useSelected, useSlate, type RenderElementProps } from 'slate-react';
import type {
	EditorElementType,
	EditorCodeBlock,
	EditorCodeLine,
	EditorHeading,
} from '../../editor/editor';
import React, { ReactNode } from 'react';
import {
	CodeContainer,
	CodeGrid,
	CodeHeader,
	CodeLine,
	CodeLineNumber,
	CodePre,
} from '../markdown/CodeBlock';
import CodeBlockEditorHeader from './CodeBlockEditorHeader';
import { CodeEditorContextProvider, useCodeEditorContext } from './codeEditorContext';
import Link from '../Link';
import {
	TableColumnContextProvider,
	TableContextProvider,
	TableRowContextProvider,
	useTableColumnContext,
	useTableRowContext,
} from './tableHeadContext';
import type { EditorImage, EditorOrderedList, EditorTable } from '~/editor/element';
import Divider from '../markdown/Divider';
import EditorImageDisplay, {
	EditorImageDisplayRoot,
	EditorImageAlt,
	EditorImageWrapperRoot,
	EditorImageHeaderRoot,
} from './EditorImageDisplay';
import EditorTableDisplay, {
	EditorColumnAdder,
	EditorRowAdder,
	EditorTableColumnAdderRow,
} from './EditorTableDisplay';
import { Typography } from '@mui/joy';
import { IconFileFilled } from '@tabler/icons-react';

const typeToRenderer: Record<
	EditorElementType,
	(props: RenderElementProps) => ReactNode[] | ReactNode
> = {
	paragraph({ attributes, children }) {
		return <p {...attributes}>{children}</p>;
	},
	divider({ attributes }) {
		const selected = useSelected();

		return (
			<Divider
				className={selected ? 'selected' : ''}
				{...attributes}
			/>
		);
	},
	heading({ attributes, children, element }) {
		const Tag = `h${(element as EditorHeading).depth ?? 1}` as 'h1';
		return <Tag {...attributes}>{children}</Tag>;
	},
	link({ children, attributes }) {
		return <Link {...attributes}>{children}</Link>;
	},
	image({ element, children }) {
		const selected = useSelected();
		const image = element as EditorImage;

		return (
			<EditorImageDisplayRoot>
				<EditorImageWrapperRoot>
					{image.title && (
						<EditorImageHeaderRoot>
							<IconFileFilled />
							<Typography level='body-md'>{image.title}</Typography>
						</EditorImageHeaderRoot>
					)}
					<EditorImageDisplay
						className={selected ? 'selected' : ''}
						src={image.url}
						mw={200}
					/>
				</EditorImageWrapperRoot>
				<EditorImageAlt>{children}</EditorImageAlt>
			</EditorImageDisplayRoot>
		);
	},
	['block-quote']({ attributes, children }) {
		return <blockquote {...attributes}>{children}</blockquote>;
	},
	['code-block']({ attributes, children, element }) {
		return (
			<CodeContainer {...attributes}>
				<CodeHeader>
					<CodeBlockEditorHeader element={element as EditorCodeBlock} />
				</CodeHeader>
				<CodePre>
					<CodeEditorContextProvider codeLines={element.children as EditorCodeLine[]}>
						<CodeGrid>{children}</CodeGrid>
					</CodeEditorContextProvider>
				</CodePre>
			</CodeContainer>
		);
	},
	['code-line']({ element, attributes, children }) {
		// Since no index is given
		const context = useCodeEditorContext();
		const index = context?.findIndex((x) => x === element) ?? -1;

		return (
			<>
				<CodeLineNumber>{index + 1}</CodeLineNumber>
				<CodeLine {...attributes}>{children}</CodeLine>
			</>
		);
	},
	['unordered-list']({ attributes, children }) {
		return <ul {...attributes}>{children}</ul>;
	},
	['ordered-list']({ element, attributes, children }) {
		const ordered = element as EditorOrderedList;
		return (
			<ol
				start={ordered.start ?? 1}
				{...attributes}
			>
				{children}
			</ol>
		);
	},
	['list-item']({ attributes, children }) {
		return <li {...attributes}>{children}</li>;
	},
	['table']({ attributes, children, element }) {
		const editor = useSlate();
		const table = element as EditorTable;
		const headRow = children[0];
		const thisTable = [...editor.nodes({ match: (node) => node === table })];

		return (
			<TableContextProvider
				rows={table.children.length}
				columns={table.children[0]?.children.length ?? 0}
				tablePosition={thisTable[0]?.[1]}
			>
				<EditorTableDisplay {...attributes}>
					<TableColumnContextProvider value={{ column: 0, allAligns: table.align }}>
						<EditorTableColumnAdderRow>
							<EditorColumnAdder nth={0} />
							{table.children.map((_, i) => (
								<td>
									<EditorColumnAdder nth={i + 1} />
								</td>
							))}
						</EditorTableColumnAdderRow>
						<thead>
							<TableRowContextProvider nth={0}>{headRow}</TableRowContextProvider>
						</thead>
						<tbody>
							{(children as React.ReactElement[]).slice(1).map((x, i) => (
								<TableRowContextProvider
									key={i}
									nth={i + 1}
								>
									{x}
								</TableRowContextProvider>
							))}
						</tbody>
					</TableColumnContextProvider>
				</EditorTableDisplay>
			</TableContextProvider>
		);
	},
	['table-row']({ attributes, children }) {
		const row = useTableRowContext();
		const tableAlign = useTableColumnContext();

		return (
			<>
				<tr {...attributes}>
					{(children as React.ReactElement[]).map((x, i) => (
						<TableColumnContextProvider
							key={i}
							value={{ column: i, allAligns: tableAlign.allAligns }}
						>
							{x}
						</TableColumnContextProvider>
					))}
				</tr>
				<EditorRowAdder nth={row + 1} />
			</>
		);
	},
	['table-cell']({ attributes, children }) {
		const tableRow = useTableRowContext();
		const tableAlign = useTableColumnContext();
		// First row is a head
		const Component = tableRow ? 'td' : 'th';

		return (
			<Component
				{...attributes}
				align={tableAlign.allAligns?.[tableAlign.column] ?? 'left'}
			>
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
};

export default function EditorElement({ attributes, children, element }: RenderElementProps) {
	const nodeType = element.type;
	const Renderer = typeToRenderer[nodeType];

	return (
		<Renderer
			attributes={attributes}
			element={element}
		>
			{children}
		</Renderer>
	);
}
