<script lang="ts">
	import { em } from '../../util/component.ts';
	import type GradientProps from './props.ts';

	const {
		maxw,
		maxh,
		minw,
		minh,
		w,
		h,
		radius,
		color,
		aspectRatio,
		mobileAspectRatio,
		fit,
		children,
		...attributes
	}: GradientProps = $props();
</script>

<div
	{...attributes}
	style:--Visual-maxWidth={em(maxw) ?? 'auto'}
	style:--Visual-maxHeight={em(maxh) ?? 'auto'}
	style:--Visual-minWidth={em(minw) ?? 'auto'}
	style:--Visual-minHeight={em(minh) ?? 'auto'}
	style:--Visual-width={em(w) ?? 'auto'}
	style:--Visual-height={em(h) ?? 'auto'}
	style:--Visual-aspectRatio={aspectRatio}
	style:--Visual-mobileAspectRatio={mobileAspectRatio ?? aspectRatio}
	data-fit={fit ?? 'cover'}
	data-radius={radius ?? 'sm'}
	data-color={color ?? 'primary'}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Image/VisualObject.scss' as *;

	div {
		@extend %VisualObject;

		background: linear-gradient(to bottom right, var(--primary-glowFirst), var(--primary-glowSecond));
		color: var(--primary-glowFore);

		@each $color in $generic-color-types {
			&[data-color='#{$color}'] {
				background: linear-gradient(to bottom right, var(--#{$color}), var(--#{$color}-alt));
			}
		}
	}
</style>
