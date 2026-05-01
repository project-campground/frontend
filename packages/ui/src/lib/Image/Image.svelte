<script lang="ts">
	import { toSpacingPx } from '../../util/component.ts';
	import type ImageProps from "./props.ts";

	const { mw, mh, w, h, src, alt, noRadius, class: className }: ImageProps = $props();
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
