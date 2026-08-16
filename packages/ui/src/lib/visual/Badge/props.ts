import type { Snippet } from 'svelte';
import type {
	StatusColor,
	PositionHorizontal,
	PositionVertical,
	ComponentSize,
} from '../../types/attributes.ts';
import type { HTMLAttributes } from 'svelte/elements';
import type AvatarProps from '../Avatar/props.ts';

type BadgePosition = `${PositionVertical}-${PositionHorizontal}`;

export default interface BadgeProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	color?: StatusColor | 'neutral' | 'skeleton';
	size?: AvatarProps['size'];
	position?: BadgePosition;
	children: Snippet;
	badge?: Snippet;
}
