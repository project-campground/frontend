<script lang="ts">
	import { toSpacingPx } from '../../util/component.ts';
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
	data-fit={fit ?? 'cover'}
	data-radius={radius ?? 'sm'}
	{src}
	{alt}
/>

<style lang="scss">
	@use '../../index.scss' as *;

	$fits: 'fill', 'contain', 'cover';

	img {
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
			&[data-radius='#{$size}'] {
				border-radius: var(--radius-#{$size});
			}
		}
		@each $fit in $fits {
			&[data-fit='#{$fit}'] {
				object-fit: #{$fit};
			}
		}
		&[data-radius='none'] {
			border-radius: 0;
		}
	}
</style>
