import { styled } from '@mui/joy';
import { useSlate } from 'slate-react';
import { useTableContext } from './tableHeadContext';
import CampgroundEditor from './CampgroundEditor';

const EditorTableDisplay = styled('table', { name: 'EditorTableDisplay', slot: 'root' })(() => ({
	position: 'relative',
}));
export const EditorTableColumnAdderRow = styled('tr', {
	name: 'EditorTableDisplay',
	slot: 'column-adder-row',
})(() => ({
	position: 'initial !important' as 'initial',
	height: 0,
	'& > td': { padding: 0, height: 0 },
}));

const EditorRowAdderWrapper = styled('div', { name: 'EditorRowAdder', slot: 'root' })(() => ({
	position: 'absolute',
	width: '100%',
	height: 6,
	opacity: 0,
	transition: 'opacity 0.3s',
	cursor: 'pointer',
	zIndex: 10,
	':hover': { opacity: 0.7 },
}));
const EditorRowAdderDisplay = styled('div', { name: 'EditorRowAdder', slot: 'display' })(
	({ theme }) => ({
		position: 'relative',
		height: 3,
		width: '100%',
		borderRadius: '2px',
		backgroundColor: theme.vars.palette.primary[500],
		'&::after': {
			position: 'absolute',
			color: theme.vars.palette.common.black,
			content: "'+'",
			padding: '2px 6px',
			borderRadius: theme.vars.radius.sm,
			top: '-0.9em',
			backgroundColor: theme.vars.palette.primary[500],
			left: '-0.5em',
		},
	}),
);

export function EditorRowAdder({ nth }: { nth: number }) {
	const table = useTableContext();
	const editor = useSlate();
	const onClick = () =>
		CampgroundEditor.insertTableRow(editor, table.columns, table.tablePosition, nth);

	return (
		<EditorRowAdderWrapper onClick={onClick}>
			<EditorRowAdderDisplay />
		</EditorRowAdderWrapper>
	);
}

const EditorColumnAdderWrapper = styled('div', { name: 'EditorColumnAdder', slot: 'root' })(() => ({
	position: 'absolute',
	height: '100%',
	width: 6,
	opacity: 0,
	top: 0,
	bottom: 0,
	transition: 'opacity 0.3s',
	cursor: 'pointer',
	zIndex: 10,
	':hover': { opacity: 0.7 },
}));
const EditorColumnAdderDisplay = styled('div', { name: 'EditorColumnAdder', slot: 'display' })(
	({ theme }) => ({
		position: 'relative',
		width: 3,
		height: '100%',
		borderRadius: '2px',
		backgroundColor: theme.vars.palette.primary[500],
		'&::after': {
			position: 'absolute',
			color: theme.vars.palette.common.black,
			content: "'+'",
			padding: '2px 6px',
			borderRadius: theme.vars.radius.sm,
			left: '-0.6em',
			backgroundColor: theme.vars.palette.primary[500],
			top: '-0.5em',
		},
	}),
);

export function EditorColumnAdder({ nth }: { nth: number }) {
	const table = useTableContext();
	const editor = useSlate();
	const onClick = () =>
		CampgroundEditor.insertTableColumn(editor, table.rows, table.tablePosition, nth);

	return (
		<EditorColumnAdderWrapper onClick={onClick}>
			<EditorColumnAdderDisplay />
		</EditorColumnAdderWrapper>
	);
}

export default EditorTableDisplay;
