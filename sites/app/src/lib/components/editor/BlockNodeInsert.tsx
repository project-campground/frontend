import { IconButton } from '@mui/joy';
import { ReactNode } from 'react';
import { useSlate } from 'slate-react';
import type { EditorBlockElementType, EditorItemElementType } from '../../editor/editor';

type Props = {
	format: EditorBlockElementType | EditorItemElementType;
	children: ReactNode[] | ReactNode;
};

export default function BlockNodeInsert({ children, format: formatting }: Props) {
	const editor = useSlate();

	const addFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		ev.preventDefault();

		editor.insertNode(
			{ type: formatting, children: [] },
			{ at: editor.selection?.focus ?? [editor.children.length] },
		);
	};
	return <IconButton onClick={addFormatting}>{children}</IconButton>;
}
