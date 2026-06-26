import {
	Avatar,
	ListItemContent,
	ListItemDecorator,
	MenuItem,
	Stack,
	Typography,
	styled,
} from '@mui/joy';
import type { BonfireViewBasic } from 'types/campground/bonfires';
import { useDraggable, useDroppable } from '~/draggable';

type Props = { bonfire: BonfireViewBasic; onBonfireOpen: (bonfire: BonfireViewBasic) => unknown };

const BonfireMenuItem = styled(MenuItem, { name: 'BonfireItem', slot: 'root' })(({ theme }) => ({
	'&::after': {
		content: "''",
		position: 'absolute',
		top: -2,
		left: 0,
		right: 0,
		height: 2,
		borderRadius: theme.vars.radius.md,
		backgroundColor: 'transparent',
		transition: 'background 0.3s',
	},
	'&.BonfireItem-over::after': { backgroundColor: theme.vars.palette.primary[500] },
}));

export default function BonfireItem({ bonfire, onBonfireOpen }: Props) {
	const { attributes: droppableAttributes, isOver } = useDroppable({
		id: bonfire.id,
		group: 'bonfire',
		allowAnyGroup: true,
	});
	const { attributes: draggableAttributes } = useDraggable({
		id: bonfire.id,
		group: 'bonfire',
		disabled: bonfire.home,
	});

	return (
		<BonfireMenuItem
			className={isOver ? 'BonfireItem-over' : ''}
			{...draggableAttributes}
			{...droppableAttributes}
			key={bonfire.id}
			onClick={() => onBonfireOpen(bonfire)}
		>
			<ListItemDecorator sx={{ mr: 0.5 }}>
				<Avatar
					src={bonfire.avatarUri ?? undefined}
					size='md'
					color='primary'
					variant='solid'
					sx={{ borderRadius: 'md', fontWeight: 'bolder' }}
				>
					{bonfire.name[0]}
				</Avatar>
			</ListItemDecorator>
			<ListItemContent>
				<Stack>
					<Typography
						level='title-md'
						fontWeight='bolder'
						sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
					>
						{bonfire.name}
					</Typography>
					<Typography
						level='body-md'
						sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
					>
						{bonfire.description}
					</Typography>
				</Stack>
			</ListItemContent>
		</BonfireMenuItem>
	);
}
