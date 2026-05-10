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
	<span class="BrandLogo wordmark"> Campground </span>
</div>

<style lang="scss">
	@use '../index.scss' as *;

	@mixin brand-logo-size($icon-size, $font-size) {
		& > .icon > :global(svg) {
			--SvgUse-width: #{$icon-size};
			--SvgUse-height: #{$icon-size};
		}
		& > .wordmark {
			font-size: $font-size;
		}
	}

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;

		color: var(--palette-primary-500);
		font-weight: 700;
		font-family: var(--font-header);

		&.sizeXs {
			@include brand-logo-size(2.5rem, 1rem);
		}
		&.sizeSm {
			@include brand-logo-size(3rem, 1.25rem);
		}
		&.sizeMd {
			@include brand-logo-size(3.5rem, 1.5rem);
		}
		&.sizeLg {
			@include brand-logo-size(4.5rem, 2rem);
		}
		&.sizeXl {
			@include brand-logo-size(7.5rem, 4rem);
		}
	}
</style>
