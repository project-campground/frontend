import { Group, loremIpsum } from '@campground/ui';
import type { MessageViewBasic } from 'types/campground/content';
import UserDisplay, { UserDisplaySkeleton } from '../UserDisplay';
import { Skeleton, styled, Typography } from '@mui/joy';
import type { RoleView } from 'types/campground/roles';
import { colorToDecimal } from '~/util/color';

type Props = { message: MessageViewBasic; colorRoles?: RoleView[] };

const TentMessageReplyWrapper = styled(Group, { name: 'TentMessageReply', slot: 'root' })(() => ({
	gap: 4,
	padding: 2,
	paddingLeft: 24.25,
	alignItems: 'center',
}));

export default function TentMessageReply({ message, colorRoles }: Props) {
	const colorRole = colorRoles?.find((x) => message.createdBy.roles.includes(x.id));
	const displayColors = colorToDecimal(colorRole?.colors);

	return (
		<TentMessageReplyWrapper>
			<UserDisplay
				size='sm'
				user={message.createdBy.user}
				colors={displayColors}
			/>
			<Typography
				level='body-sm'
				textColor='text.secondary'
			>
				{message.type === 'system' ?
					<Typography level='code'>[System message]</Typography>
				:	''}
				{message.content.split('\n').join(' ').substring(0, 50)}
				{message.content.length > 50 ? '...' : ''}
			</Typography>
		</TentMessageReplyWrapper>
	);
}

export function TentMessageReplySkeleton() {
	return (
		<TentMessageReplyWrapper>
			<UserDisplaySkeleton size='sm' />
			<Typography
				level='body-sm'
				textColor='text.secondary'
			>
				<Skeleton>{loremIpsum.sm}</Skeleton>
			</Typography>
		</TentMessageReplyWrapper>
	);
}
