<script lang="ts">
	import { capitalize, toSpacingPx } from '../util/component.ts';
	import type ImageProps from './props.ts';

	const {
		mw,
		mh,
		w,
		h,
		src,
		alt,
		radius,
		aspectRatio,
		mobileAspectRatio,
		class: className,
		fit,
		...attributes
	}: ImageProps = $props();
</script>

<img
	{...attributes}
	style:--Image-maxWidth={mw ? toSpacingPx(mw) : 'auto'}
	style:--Image-maxHeight={mh ? toSpacingPx(mh) : 'auto'}
	style:--Image-width={w ? toSpacingPx(w) : 'auto'}
	style:--Image-height={h ? toSpacingPx(h) : 'auto'}
	style:--Image-aspectRatio={aspectRatio}
	style:--Image-mobileAspectRatio={mobileAspectRatio ?? aspectRatio}
	class={[
		'Image',
		`radius${capitalize(radius ?? 'sm')}`,
		`fit${capitalize(fit ?? 'cover')}`,
		className,
	]}
	{src}
	{alt}
/>

<style lang="scss">
	@use '../index.scss' as *;

	$fits: 'fill', 'contain', 'cover';

	.Image {
		max-width: var(--Image-maxWidth);
		max-height: var(--Image-maxHeight);
		height: var(--Image-height, min-content);
		width: var(--Image-width, min-content);
		border-radius: var(--radius-sm);

		aspect-ratio: var(--Image-aspectRatio);

		@include tablet-down {
			aspect-ratio: var(--Image-mobileAspectRatio, var(--Image-aspectRatio));
		}

		@each $size in $size-names-with-xl {
			&.radius#{capitalize($size)} {
				border-radius: var(--radius-#{$size});
			}
		}
		@each $fit in $fits {
			&.fit#{capitalize($fit)} {
				object-fit: #{$fit};
			}
		}
		&.radiusNone {
			border-radius: 0;
		}
	}
</style>
