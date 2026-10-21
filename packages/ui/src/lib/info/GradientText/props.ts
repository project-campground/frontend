import type { InFlexLayout } from '#lib/hierarchy/layout.js';
import type { Snippet } from 'svelte';
import type { BaseTextProps } from '../props.ts';

export type GradientMotion = 'none' | 'wave' | 'linear' | 'radial';

export default interface GradientTextProps extends InFlexLayout, BaseTextProps {
	children: Snippet;
	colors?: string[] | undefined | null;
	motion?: GradientMotion;
}
