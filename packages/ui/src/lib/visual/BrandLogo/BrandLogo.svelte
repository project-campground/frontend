<script lang="ts">
	import SvgUse from '../svg/SvgUse.svelte';
	import type BrandLogoProps from './props.ts';

	const { size, hideWordmark }: BrandLogoProps = $props();
</script>

<div
	class={['container', { hideWordmark }]}
	role="banner"
	data-size={size ?? 'md'}
>
	<span class="BrandLogo icon">
		<SvgUse
			id="logo"
			size={0}
		/>
	</span>
	<span class="BrandLogo wordmark">
		<SvgUse
			id="wordmark"
			size={0}
		/>
	</span>
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	$sizes: 2.5rem 3rem 3.5rem 4.5rem 7.5rem;
	$size-map: create-size-map($sizes);

	@mixin brand-logo-size($icon-size) {
		$word-height: $icon-size * 0.75;
		--BrandLogo-word-width: #{calc($word-height * 448 / 128)};
		& > .wordmark {
			margin-top: #{calc($icon-size / 16)};
		}
		& > .icon > :global(svg) {
			--SvgUse-width: #{$icon-size};
			--SvgUse-height: #{$icon-size};
		}
		& > .wordmark > :global(svg) {
			--SvgUse-width: #{calc($word-height * 448 / 128)};
			--SvgUse-height: #{$word-height};
		}
	}
	.wordmark {
		overflow: hidden;
		transform: translateX(0);
		opacity: 100%;
		transition:
			transform 0.5s,
			width 0.5s,
			opacity 0.4s;
		width: var(--BrandLogo-word-width);

		@include tablet-down {
			transform: translateX(calc(-0.5 * var(--BrandLogo-word-width) - 8px));
			opacity: 0%;
			width: 0;
		}
		.hideWordmark & {
			transform: translateX(calc(-0.5 * var(--BrandLogo-word-width) - 8px));
			opacity: 0%;
			width: 0;
		}
	}
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;

		color: var(--primary-plainFore);
		font-weight: 700;
		font-family: var(--font-brand);
		gap: 8px;

		@each $size-name, $size in $size-map {
			&[data-size='#{$size-name}'] {
				@include brand-logo-size($size);
			}
		}
	}
</style>
