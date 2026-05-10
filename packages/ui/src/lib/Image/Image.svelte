<script lang="ts">
	import { capitalize, toSpacingPx } from '../util/component.ts';
	import type ImageProps from './props.ts';

	const { mw, mh, w, h, src, alt, radius, class: className, ...attributes }: ImageProps = $props();
</script>

<img
	{...attributes}
	style:--Image-maxWidth={mw ? toSpacingPx(mw) : 'none'}
	style:--Image-maxHeight={mh ? toSpacingPx(mh) : 'none'}
	style:--Image-width={w ? toSpacingPx(w) : 'none'}
	style:--Image-height={h ? toSpacingPx(h) : 'none'}
	class={[{ Image: true }, `radius${capitalize(radius ?? 'sm')}`, className]}
	{src}
	{alt}
/>

<style lang="scss">
	@use '../index.scss' as *;

	.Image {
		max-width: var(--Image-maxWidth);
		max-height: var(--Image-maxHeight);
		height: var(--Image-height, min-content);
		width: var(--Image-width, min-content);
		border-radius: var(--radius-sm);
		@each $size in $size-names-with-xl {
			&.radius#{capitalize($size)} {
				border-radius: var(--radius-#{$size});
			}
		}
		&.radiusNone {
			border-radius: none;
		}
	}
</style>
