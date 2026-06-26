import { Alert, Box } from '@mui/joy';
import { useState } from 'react';
import { IconTrashFilled } from '@tabler/icons-react';
import type { EitherProfilePostView, ProfilePostViewParented } from 'types/campground/user';
import ProfilePost, { appearAnimation, ProfilePostSkeleton } from './ProfilePost';
import { ThreadLineItem, ThreadLineWrapper } from '~/components/ThreadLine';

type Props = {
	appear?: boolean;
	post: ProfilePostViewParented;
	isOwnPost?: boolean;
	onPostDelete: (uri: string) => void | Promise<any>;
	onPostUpdate: (uri: string, content: string) => void | Promise<any>;
};

export default function ProfileFeedPost(props: Props) {
	const { appear, isOwnPost } = props;
	const { parent, parentUri } = props.post as EitherProfilePostView;
	const [parentPost, setParentPost] = useState(parent);

	if (parentUri)
		return (
			<Box sx={{ animation: `${appearAnimation} ${appear ? 0.75 : 0}s` }}>
				<ThreadLineWrapper>
					{parent ?
						<ProfilePost
							showComments
							post={parentPost!}
							onPostUpdate={(_, content) => setParentPost({ ...parentPost!, content })}
							onPostDelete={() => setParentPost(null)}
						/>
					:	<Alert
							variant='soft'
							color='danger'
							startDecorator={<IconTrashFilled />}
						>
							This post has been deleted.
						</Alert>
					}
					<ThreadLineItem>
						<ProfilePost
							showComments
							isOwnPost={isOwnPost}
							onPostUpdate={props.onPostUpdate}
							onPostDelete={props.onPostDelete}
							post={props.post}
							mt={0.5}
						/>
					</ThreadLineItem>
				</ThreadLineWrapper>
			</Box>
		);

	return (
		<Box sx={{ animation: `${appearAnimation} ${appear ? 0.75 : 0}s` }}>
			<ProfilePost
				onPostUpdate={props.onPostUpdate}
				onPostDelete={props.onPostDelete}
				showComments
				post={props.post}
				isOwnPost={isOwnPost}
			/>
		</Box>
	);
}

export function ProfileFeedPostReplySkeleton() {
	return (
		<Box>
			<ThreadLineWrapper>
				<ProfilePostSkeleton />
				<ThreadLineItem>
					<ProfilePostSkeleton mt={0.5} />
				</ThreadLineItem>
			</ThreadLineWrapper>
		</Box>
	);
}
