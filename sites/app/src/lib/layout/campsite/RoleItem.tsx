import { Box, Button, Chip, styled } from '@mui/joy';
import { IconGripVertical } from '@tabler/icons-react';
import { GradientTypography } from '@campground/ui';
import type { RoleView } from 'types/campground/roles';
import { useDraggable, useDragging, useDroppable } from '~/draggable';
import { colorToDecimal } from '~/util/color';

export const RoleButton = styled(Button, { name: 'RoleItem', slot: 'root' })<{ colors?: string[] }>(
	({ theme, colors }) => ({
		position: 'relative',
		width: '100%',
		justifyContent: 'start',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		border: 'solid 1px transparent',
		'&.RoleItem-active': {
			border: `solid 1px ${theme.vars.palette.neutral.border}`,
			boxShadow: theme.vars.shadow.sm,
		},
		'&.RoleItem-role > .MuiButton-startDecorator': { opacity: 0, transition: 'opacity 0.3s' },
		'&.RoleItem-role:hover > .MuiButton-startDecorator': { opacity: 1 },
		'::after': {
			content: "''",
			position: 'absolute',
			borderRadius: theme.vars.radius.sm,
			transition: 'opacity 0.3s',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 0,
			opacity: 0,
			background:
				colors?.length ?
					colors.length > 1 ?
						`linear-gradient(to right, ${colors.join(', ')})`
					:	colors[0]
				:	`transparent`,
		},
		'&.RoleItem-active::after': { opacity: 0.1 },
	}),
);

export default function RoleItem({
	onClick,
	active,
	id,
	added,
	flags,
	name,
	colors,
	motion,
	immovable,
}: { active?: boolean; onClick?: () => unknown } & Pick<
	RoleView,
	'id' | 'name' | 'colors' | 'motion' | 'flags'
> & { added?: true; immovable?: boolean }) {
	// const {ref} = useDraggable({
	//     id,
	//     disabled: immovable,
	// });
	const { attributes } = useDraggable({ id, disabled: immovable });
	const badge =
		(flags & 1) === 1 ?
			<Chip
				color='primary'
				variant='soft'
			>
				Default
			</Chip>
		: added ?
			<Chip
				color='danger'
				variant='soft'
			>
				NEW
			</Chip>
		:	null;
	const colorsHex = colorToDecimal(colors);

	return (
		<RoleButton
			{...attributes}
			onClick={onClick}
			colors={colorsHex}
			className={`RoleItem-role${active ? ' RoleItem-active' : ''}`}
			endDecorator={badge}
			variant={active ? 'soft' : 'plain'}
			color='neutral'
		>
			<GradientTypography
				colors={colorsHex}
				sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
			>
				{name}
			</GradientTypography>
		</RoleButton>
	);
}
const RoleItemGapDivider = styled(`div`)(({ theme }) => ({
	width: '100%',
	height: 2,
	transitionDuration: '0.3s',
	transitionProperty: 'height, opacity',
	border: `dashed 1px ${theme.vars.palette.neutral[400]}`,
	borderRadius: theme.vars.radius.md,
	position: 'relative',
	opacity: 0,
	zIndex: 2,
	'&.over': { height: 36, opacity: 1 },
	// To give more space to drag
	'&.dragging::after': {
		content: "''",
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: -36,
		backgroundColor: 'transparent',
	},
}));
export function RoleItemGap({ id }: { id: string }) {
	const { attributes, isOver, draggableOver } = useDroppable({ id });
	const dragging = useDragging();

	return (
		<RoleItemGapDivider
			{...attributes}
			className={`${dragging ? 'dragging ' : ''}${isOver && draggableOver !== id ? 'over' : ''}`}
		/>
	);
}
