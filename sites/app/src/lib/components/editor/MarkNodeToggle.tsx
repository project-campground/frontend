import { IconButton } from '@mui/joy';
import { ReactNode } from 'react';
import { useSlate } from 'slate-react';
import type { EditorTextFormatting } from '../../editor/editor';
import CampgroundEditor from './CampgroundEditor';

type Props = { format: keyof EditorTextFormatting; children: ReactNode[] | ReactNode };

export default function MarkNodeToggle({ children, format: formatting }: Props) {
	const editor = useSlate();

	const active = CampgroundEditor.isTextFormatted(editor, formatting);

	const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		ev.preventDefault();
		CampgroundEditor.toggleTextFormatting(editor, formatting);
	};

	return (
		<IconButton
			variant={active ? 'solid' : undefined}
			onClick={toggleFormatting}
		>
			{children}
		</IconButton>
	);
}
