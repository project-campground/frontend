import type { ProfileViewBasic } from 'types/campground/user';
import { Card, Stack, Typography, Box } from '@mui/joy';
import { UserDisplayNoModal } from '~/components/UserDisplay';
import { FormattedMessageGlobal } from '~/i18n';

type Props = { author: ProfileViewBasic };

export default function ProfilePostViewAuthorInfo({ author }: Props) {
	return (
		<Card
			variant='soft'
			sx={(theme) => ({ border: `solid 1px ${theme.vars.palette.neutral.border}` })}
		>
			<Stack gap={2}>
				<UserDisplayNoModal
					showHandle
					user={author}
					size='md'
				/>
				{author.tagline && <Typography level='body-md'>{author.tagline}</Typography>}
				{author.description && (
					<Box>
						<Typography level='title-lg'>
							<FormattedMessageGlobal id='app.profiles.aboutMe' />
						</Typography>
						<Typography level='body-md'>{author.description}</Typography>
					</Box>
				)}
			</Stack>
		</Card>
	);
}
