import {
	ButtonGroup,
	Divider,
	Dropdown,
	IconButton,
	ListItemContent,
	ListItemDecorator,
	Menu,
	MenuButton,
	MenuItem,
	styled,
} from '@mui/joy';
import {
	IconArrowForwardUp,
	IconDots,
	IconMoodPlus,
	IconPencil,
	IconTrash,
	IconX,
} from '@tabler/icons-react';
import { FormattedMessage } from 'react-intl';
import { useKeyContext } from '~/context/key';

type Props = {
	// message: TentMessageViewWithReplies;
	addReply?: () => unknown;
	onEdit?: () => unknown;
	onDelete?: (prompt: boolean) => unknown;
	beingRepliedTo?: boolean;
	onlyAllowDeletion?: boolean;
};

const ToolbarWrapper = styled(ButtonGroup, { name: 'TentMessage', slot: 'toolbar' })(
	({ theme }) => ({
		position: 'absolute',
		top: 5,
		right: 7.5,
		opacity: 0,
		transition: 'opacity 0.3s',
		border: `solid 1px ${theme.vars.palette.neutral.border}`,
		boxShadow: theme.vars.shadow.md,
		overflow: 'hidden',
		'--ButtonGroup-separatorSize': '0',
		'.TentMessage-wrapper:hover &': { opacity: 1 },
	}),
);

export default function MessageToolbar({
	onlyAllowDeletion,
	onEdit,
	addReply,
	onDelete,
	beingRepliedTo,
}: Props) {
	const keys = useKeyContext();

	return (
		<>
			<ToolbarWrapper variant='soft'>
				{!onlyAllowDeletion && !keys.shift ?
					<>
						<IconButton>
							<IconMoodPlus />
						</IconButton>
						<Divider />
						{onEdit && (
							<IconButton onClick={onEdit}>
								<IconPencil />
							</IconButton>
						)}
						{addReply && (
							<IconButton onClick={addReply}>
								<IconArrowForwardUp />
								{beingRepliedTo && <IconX size={12} />}
							</IconButton>
						)}
						{onDelete && (
							<Dropdown>
								<MenuButton slots={{ root: IconButton }}>
									<IconDots />
								</MenuButton>
								<Menu>
									<MenuItem
										color='danger'
										onClick={() => onDelete(true)}
									>
										<ListItemDecorator>
											<IconTrash />
										</ListItemDecorator>
										<ListItemContent>
											<FormattedMessage
												id='app.messages.delete'
												defaultMessage='Delete message'
												description='Message deletion button'
											/>
										</ListItemContent>
									</MenuItem>
								</Menu>
							</Dropdown>
						)}
					</>
				:	<>
						<IconButton
							variant='plain'
							color='danger'
							onClick={() => onDelete?.(false)}
						>
							<IconTrash />
						</IconButton>
					</>
				}
			</ToolbarWrapper>
		</>
	);
}
