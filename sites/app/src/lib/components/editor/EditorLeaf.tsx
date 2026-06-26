import { styled, Typography } from '@mui/joy';
import type { RenderLeafProps } from 'slate-react';

const Leaf = styled(Typography, { name: 'Leaf' })<{ component: string }>(({ theme }) => ({
	display: 'inline',
	fontSize: 'inherit',
	'h1, h2, h3, h4, h5, h6 &': { fontSize: 'inherit', fontWeight: 'bolder' },
	'&.bold, &.strong': { fontWeight: 'bolder' },
	'&.italic, &.emphasis': { fontStyle: 'italic' },
	'&.strikethrough': { textDecorationLine: 'line-through' },
	'&.underline': { textDecorationLine: 'underline' },
	'&.underline.strikethrough': { textDecorationLine: 'line-through underline' },
	'&.keyword, &.built_in': { color: theme.vars.palette.text['code-keyword'] },
	'&.function': { color: theme.vars.palette.text['code-function'] },
	'&.class': { color: theme.vars.palette.text['code-class'] },
	'&.attribute': { color: theme.vars.palette.text['code-attribute'] },
	'&.string': { color: theme.vars.palette.text['code-string'] },
	'&.number': { color: theme.vars.palette.text['code-number'] },
	'&.template': { color: theme.vars.palette.text['code-template'] },
}));

export default function EditorLeaf({ children, leaf, attributes }: RenderLeafProps) {
	const { text: _, scope, ...rest } = leaf;
	const classes = Object.keys(rest);
	const { code } = rest;

	if (scope) classes.push(scope);

	return (
		<Leaf
			component='span'
			level={code ? 'code' : undefined}
			className={classes.join(' ')}
			textColor={scope && `text.code-${scope}`}
			{...attributes}
		>
			{children}
		</Leaf>
	);
}
