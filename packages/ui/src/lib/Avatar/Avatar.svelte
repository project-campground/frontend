<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type AvatarProps from './props.ts';

	const { size, src, alt, children, ...attributes }: AvatarProps = $props();
</script>

<div role="img" aria-label={alt} class={['Avatar container', `size${capitalize(size ?? 'md')}`]}>
	{#if src}
		<img class="Avatar image" {src} {alt} {...attributes} />
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
	@use 'sass:list';
	@use '../index.scss' as *;
	$avatar-sizes:
		2rem 0.5rem,
		2.5rem 0.75rem,
		3.5rem 1rem,
		5rem 1.75rem,
		7rem 2.75rem;
	$avatar-size-map: create-size-map($avatar-sizes);

	.Avatar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		overflow: hidden;

		@include size(var(--Avatar-size));
		background-color: var(--palette-neutral-solidBack);

		font-weight: 900;
		font-family: var(--font-header);

		&.image {
			@include size(var(--Avatar-size));
		}
		@each $size, $value in $avatar-size-map {
			$size-classname: capitalize($size);
			$avatar-size: list.nth($value, 1);
			$font-size: list.nth($value, 2);
			&.size#{$size-classname} {
				font-size: $font-size;
				--Avatar-size: #{$avatar-size};
				border-radius: var(--radius-#{$size});
			}
		}
	}
</style>
