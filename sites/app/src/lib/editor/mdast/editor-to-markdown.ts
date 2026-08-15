import type { Nodes, Root } from 'mdast';
import type { NodeJSON } from 'prosekit/core';

const specialNodes: Record<string, (node: NodeJSON) => Nodes> = {
	hardBreak: () => ({ type: 'text', value: '\n' }),
};

function transformRegularNode({ type, content, text, attrs }: NodeJSON): Nodes {
	return {
		type,
		children: content?.map((x) => editorNodeToMdast(x)),
		value: text,
		...attrs,
	} as unknown as Nodes;
}

export function editorNodeToMdast(editorNode: NodeJSON): Nodes {
	const specialCase = specialNodes[editorNode.type];

	return specialCase?.(editorNode) ?? transformRegularNode(editorNode);
}
export function editorRootToMdast(editorNode: NodeJSON): Root {
	return editorNodeToMdast(editorNode) as Root;
}
