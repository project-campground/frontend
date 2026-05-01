<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { toSpacingPx } from '../util/component.ts';

	export interface Props {
		src: string;
		alt?: string | null;
		mw?: number;
		mh?: number;
		w?: number;
		h?: number;
		noRadius?: boolean;
		class?: ClassValue;
	}
	const { mw, mh, w, h, src, alt, noRadius, class: className }: Props = $props();
</script>

<img
	style:--Image-maxWidth={mw ? toSpacingPx(mw) : 'none'}
	style:--Image-maxHeight={mh ? toSpacingPx(mh) : 'none'}
	style:--Image-width={w ? toSpacingPx(w) : 'none'}
	style:--Image-height={h ? toSpacingPx(h) : 'none'}
	class={[{ Image: true, noRadius }, className]}
	{src}
	{alt}
/>

<style lang="scss">
	.Image {
		max-width: var(--Image-maxWidth);
		max-height: var(--Image-maxHeight);
		height: var(--Image-height, min-content);
		width: var(--Image-width, min-content);
		border-radius: var(--radius-sm);
		&.noRadius {
			border-radius: none;
		}
	}
</style>
