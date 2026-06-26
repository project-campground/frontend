import { Text } from 'slate';
import type { EditorBlockElementBase } from './editor';

export const getNeighborPath = (path: number[], distance: number = 1) => [
	...getParentPath(path),
	negativeFloor(path[path.length - 1] + distance),
];

export const getNewlineOffsets = (str: string) =>
	str
		.split('\n')
		.slice(0, -1)
		.map((x) => x.length)
		.reduce((arr, x) => [...arr, x + (arr.slice(-1)[0] ?? 0) + 1], [] as number[]);

const negativeFloor = (a: number) => (a < 0 ? 0 : a);

export const getParentPath = (path: number[]) => path.slice(0, path.length - 1);

export const paragraph: () => EditorBlockElementBase<'paragraph', Text> = () => ({
	type: 'paragraph',
	children: [{ text: '' }],
});

export const listItem: () => EditorBlockElementBase<'list-item', Text> = () => ({
	type: 'list-item',
	children: [{ text: '' }],
});
