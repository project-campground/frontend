import type { Snippet } from 'svelte';
import type {
	StatusColor,
	PositionHorizontal,
	PositionVertical,
	ComponentSize,
} from '../../types/attributes.ts';
import type { HTMLAttributes } from 'svelte/elements';

type BadgePosition = `${PositionVertical}-${PositionHorizontal}`;

export default interface BadgeProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	color?: StatusColor | 'neutral' | 'skeleton';
	size?: ComponentSize | 'xxl';
	position?: BadgePosition;
	children: Snippet;
	badge?: Snippet;
}
