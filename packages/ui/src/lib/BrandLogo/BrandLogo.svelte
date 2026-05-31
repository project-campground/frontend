<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import SvgUse from '../svg/SvgUse.svelte';
	import type BrandLogoProps from './props.ts';

	const { size, hideWordmark }: BrandLogoProps = $props();
</script>

<div class={['BrandLogo container', { hideWordmark }, `size${capitalize(size ?? 'md')}`]}>
	<span class="BrandLogo icon">
		<SvgUse id="logo" size={0} />
	</span>
	<span class="BrandLogo wordmark">
		<SvgUse id="wordmark" size={0} />
	</span>
</div>

<style lang="scss">
	@use '../index.scss' as *;

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
		transition: transform 0.5s, width 0.5s, opacity 0.4s;
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

		color: var(--palette-primary-500);
		font-weight: 700;
		font-family: var(--font-brand);
		gap: 8px;

		&.sizeXs {
			@include brand-logo-size(2.5rem);
		}
		&.sizeSm {
			@include brand-logo-size(3rem);
		}
		&.sizeMd {
			@include brand-logo-size(3.5rem);
		}
		&.sizeLg {
			@include brand-logo-size(4.5rem);
		}
		&.sizeXl {
			@include brand-logo-size(7.5rem);
		}
	}
</style>
