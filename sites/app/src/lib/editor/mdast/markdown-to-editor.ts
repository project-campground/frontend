import type { Nodes, Parent, Root, RootContentMap } from 'mdast';
import type { NodeJSON } from 'prosekit/core';

type TransformerMap = { [T in keyof RootContentMap]: (node: RootContentMap[T]) => NodeJSON[] };

const specialNodes: Partial<TransformerMap> = {
	text: (node) =>
		// Could be done with generator function, but this is easier to understand the code
		// Each line except last one gets 'hardBreak' at the end
		node.value
			.split('\n')
			.flatMap((x) => [{ type: 'text', text: x }, { type: 'hardBreak' }])
			.slice(0, -1),
};

function transformRegularNode({ type, ...node }: Nodes): NodeJSON {
	const { children, ...rest } = node as Parent;
	// Deleting value is unnecessary, because text already has special transform
	delete rest['position'];

	return {
		type,
		content: children?.flatMap(mdastNodeToEditor),
		attrs: { ...rest, ...node.data },
	} as unknown as Nodes;
}

export function mdastNodeToEditor(editorNode: Nodes): NodeJSON[] {
	const specialCase = specialNodes[editorNode.type as keyof RootContentMap] as
		| ((node: Nodes) => NodeJSON[])
		| undefined;

	return specialCase?.(editorNode) ?? [transformRegularNode(editorNode)];
}
export function mdastRootToEditor(editorNode: Root): NodeJSON {
	return { type: 'root', content: editorNode.children.flatMap(mdastNodeToEditor) };
}
