import { useCallback } from 'react';
import { type DecoratedRange, Element, type NodeEntry, type Range } from 'slate';
import type { EditorElementType, EditorCodeBlock } from './editor';
import CodeBlock, { linefyTokens } from '../components/markdown/CodeBlock';

const decorators: Partial<Record<EditorElementType, (entry: NodeEntry) => DecoratedRange[]>> = {
	['code-block']([node, path]) {
		const content = (node as EditorCodeBlock).children
			.map((x) => x.children.map((y) => y.text).join(''))
			.join('\n');

		const { lang: language } = node as unknown as EditorCodeBlock;

		if (!language || CodeBlock.nonHighlightedLanguages.includes(language)) return [];

		const { tokens } = CodeBlock.tokenizeContent(language, content);
		const linefied = linefyTokens(tokens);

		const decors: DecoratedRange[] = linefied.flatMap<Range>((line, i) => {
			// To not need to recalculate with reduce
			let offset = 0;
			const tokenPath = [...path, i, 0];

			return line
				.map<Range>((x) => {
					return {
						anchor: { path: tokenPath, offset },
						focus: { path: tokenPath, offset: (offset += CodeBlock.getTokenLength(x)) },
						scope: typeof x === 'string' ? undefined : x.scope,
					} satisfies Range;
				})
				.filter((x) => x.scope);
		});
		console.log({ decors });

		return decors;
	},
};

export default function useBlockDecorate() {
	return useCallback(
		(entry: NodeEntry) =>
			Element.isElement(entry[0]) && decorators[entry[0].type] ?
				decorators[entry[0].type]!(entry)
			:	[],
		[],
	);
}
