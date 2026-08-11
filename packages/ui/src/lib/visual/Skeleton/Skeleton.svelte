<script lang="ts">
	import type { SkeletonProps } from './props.ts';

	const { children, class: className, radius, ...attributes }: SkeletonProps = $props();
</script>

<div
	class={['container', className]}
	{...attributes}
	data-radius={radius ?? 'md'}
>
	{#if children}
		<span
			class="inner"
			aria-hidden="true"
		>
			{@render children?.()}
		</span>
	{/if}
</div>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;
	@use '../Avatar/Avatar.scss' as *;
	@use './Skeleton.scss' as *;

	.container {
		display: inline-block;
		width: fit-content;
		height: fit-content;

		@extend %Skeleton-pulse;

		@each $size in $size-names-with-none {
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
