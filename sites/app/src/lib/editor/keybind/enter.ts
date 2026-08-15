import { chainCommands, createParagraphNear } from 'prosekit/pm/commands';
import { splitSplittableBlock } from 'prosemirror-splittable';

export function editorEnter() {
	return chainCommands(createParagraphNear, splitSplittableBlock);
}
