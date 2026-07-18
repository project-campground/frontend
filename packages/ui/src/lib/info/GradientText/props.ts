import type { Snippet } from 'svelte';

export type GradientMotion = 'none' | 'wave' | 'linear' | 'radial';

export default interface GradientTextProps {
	children: Snippet;
	colors?: string[] | undefined | null;
	motion?: GradientMotion;
}
