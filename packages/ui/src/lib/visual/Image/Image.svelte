<script lang="ts">
	import { em } from '../../util/component.ts';
	import type ImageProps from './props.ts';

	const {
		maxw,
		maxh,
		minw,
		minh,
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
	{src}
	{alt}
/>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './VisualObject.scss' as *;

	img {
		@extend %VisualObject;
	}
</style>
