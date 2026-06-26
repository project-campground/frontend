import useBlockDecorate from '~/editor/block-decorate';
import EditorElement from './EditorElement';
import EditorLeaf from './EditorLeaf';
import { editorKeyboardLogic, type KeyboardSettings } from '~/editor/keyboard-logic';
import { styled } from '@mui/joy';
import { Editable, useSlate } from 'slate-react';
import MarkdownWrapper from '../markdown/MarkdownWrapper';
import ErrorBoundary from '../ErrorBoundary';
import type { RichEditor } from '~/editor/editor';
import CampgroundEditor from './CampgroundEditor';

type Props = React.PropsWithChildren & {
	placeholder?: string;
	keyboardSettings?: KeyboardSettings;
};

export const StyledEditor = styled(Editable, { name: 'MarkdownEditor', slot: 'editor' })(() => ({
	':focus': { outline: 'none' },
	'> .tiptap > *:first-of-type': { marginTop: 0 },
	'> .tiptap > *:last-of-type': { marginBottom: 0 },
}));
const StyledWrapper = styled(MarkdownWrapper, { name: 'MarkdownEditor', slot: 'root' })(() => ({
	padding: `6px 12px`,
	position: 'relative',
	overflowY: 'auto',
	overflowX: 'hidden',
	width: '100%',
	height: '100%',
}));

const controlKeybinds: Record<
	string,
	(
		editor: RichEditor,
		event: React.KeyboardEvent<HTMLDivElement>,
		settings: KeyboardSettings,
	) => unknown
> = {
	b: (editor) => {
		CampgroundEditor.toggleTextFormatting(editor, 'bold');
	},
	i: (editor) => {
		CampgroundEditor.toggleTextFormatting(editor, 'italic');
	},
	s: (editor) => {
		CampgroundEditor.toggleTextFormatting(editor, 'strikethrough');
	},
	l: (editor) => {
		CampgroundEditor.toggleTextFormatting(editor, 'underline');
	},
	e: (editor) => {
		CampgroundEditor.toggleTextFormatting(editor, 'code');
	},
};

export default function TextEditor({ keyboardSettings, placeholder }: Props) {
	const editor = useSlate();
	const blockDecorate = useBlockDecorate();
	const keyboardSettingsDefaulted = keyboardSettings ?? {};

	return (
		<StyledWrapper>
			<ErrorBoundary>
				<StyledEditor
					placeholder={placeholder}
					renderLeaf={EditorLeaf}
					renderElement={EditorElement}
					spellCheck
					autoFocus={true}
					decorate={blockDecorate}
					onKeyDown={(event) => {
						const keybind = event.ctrlKey && controlKeybinds[event.key];
						const logic = editorKeyboardLogic[event.key];

						if (!(logic || keybind)) return;

						event.preventDefault();
						(logic ?? keybind)(editor, event, keyboardSettingsDefaulted);
					}}
				/>
			</ErrorBoundary>
		</StyledWrapper>
	);
}
