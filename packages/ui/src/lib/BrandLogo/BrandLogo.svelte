<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import SvgUse from '../svg/SvgUse.svelte';
	import type BrandLogoProps from './props.ts';

	const { size }: BrandLogoProps = $props();
</script>

<div class={['BrandLogo container', `size${capitalize(size ?? 'md')}`]}>
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
		& > .wordmark {
			margin-top: #{calc($icon-size / 16)};
		}
		& > .icon > :global(svg) {
			--SvgUse-width: #{$icon-size};
			--SvgUse-height: #{$icon-size};
		}
		& > .wordmark > :global(svg) {
			--SvgUse-width: #{calc($icon-size * 448 / 128)};
			--SvgUse-height: #{$icon-size};
		}
	}
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;

		color: var(--palette-primary-500);
		font-weight: 700;
		font-family: var(--font-brand);

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
