import type { ProfileViewBasic } from '$lib/types/campground/user.ts';
import type { ComponentSize, StackProps } from '@campground/ui';

export interface UserDisplayProps extends Pick<StackProps, 'align'> {
	user: ProfileViewBasic;
	size?: ComponentSize;
	displayHandle?: boolean;
}
