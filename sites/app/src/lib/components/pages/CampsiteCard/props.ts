import type { CampsiteViewBasic } from '#lib/types/campground/campsites.js';
import type { ComponentSize } from '@campground/ui';

export interface BaseProps {
	size?: ComponentSize | 'xxl';
	hideDescription?: boolean;
	hideName?: boolean;
}
export interface RootProps extends BaseProps {
	campsite: CampsiteViewBasic;
}
