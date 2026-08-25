<script lang="ts">
	import { em } from '$lib/util/component.js';
	import type { SkeletonProps } from './props.ts';

	const {
		children,
		class: className,
		radius,
		h,
		w,
		maxw,
		maxh,
		minw,
		minh,
		aspectRatio,
		mobileAspectRatio,
		...attributes
	}: SkeletonProps = $props();
</script>

<span
	class={['container', className]}
	{...attributes}
	data-radius={radius ?? 'md'}
	style:--Visual-maxWidth={em(maxw)}
	style:--Visual-maxHeight={em(maxh)}
	style:--Visual-minWidth={em(minw)}
	style:--Visual-minHeight={em(minh)}
	style:--Visual-width={em(w) ?? 'fit-content'}
	style:--Visual-height={em(h) ?? 'fit-content'}
	style:--Visual-aspectRatio={aspectRatio}
	style:--Visual-mobileAspectRatio={mobileAspectRatio ?? aspectRatio}
>
	{#if children}
		<span
			class="inner"
			aria-hidden="true"
		>
			{@render children?.()}
		</span>
	{/if}
</span>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;
	@use '../Avatar/Avatar.scss' as *;
	@use '../Image/VisualObject.scss' as *;
	@use './Skeleton.scss' as *;

	.container {
		display: inline-block;

		@extend %VisualObject-sizing;
		@extend %Skeleton-pulse;

		@each $size in $size-names-with-none {
			&[data-radius='#{$size}'] {
				border-radius: var(--radius-#{$size});
			}
		}
		@for $i from 1 to 4 {
			$size: '#{string-repeat('x', $i)}l';
			&[data-radius='#{$size}'] {
				border-radius: var(--radius-#{$size});
			}
		}
		&[data-radius='avatar'] {
			@extend %Squircle;
		}
	}
	.inner {
		visibility: hidden;
		opacity: 0%;
	}
</style>
