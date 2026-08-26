<script lang="ts">
	import { rem } from '$lib/util/component.ts';
	import type { RootProps } from './props.ts';

	const {
		children,
		gap,
		columns,
		columnSizing,
		class: className,
		noBreakpoint,
		...attributes
	}: RootProps = $props();
</script>

<div
	{...attributes}
	class={[{ noBreakpoint }, className]}
	aria-colcount={columns ?? 2}
	data-columns={columns ?? 2}
	data-column-sizing={columnSizing ?? 'stretch'}
	style:--Grid-gap={rem(gap)}
	role="grid"
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './Grid.scss' as *;
	@use 'sass:list';

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	@mixin set-columns($i) {
		grid-template-columns: repeat(#{$i}, var(--Grid-columnSizing));
	}

	@function get-breakpoint-broken-columns($min, $max) {
		@return get-breakpoint-broken("&:not(.noBreakpoint)[data-columns='", "']", $min, $max);
	}

	div {
		display: grid;
		grid-template-columns: repeat(var(--Grid-columns), var(--Grid-columnSizing));
		gap: var(--Grid-gap);
		--Grid-columnSizing: 1fr;
		--Grid-columns: 2;

		&[data-column-sizing='auto'] {
			--Grid-columnSizing: auto;
		}

		@for $i from $min-columns through $max-columns {
			&[data-columns='#{$i}'] {
				--Grid-columns: #{$i};
			}
		}

		$columns-available: $min-columns - 1;
		@each $_, $values in $breakpoint-list-small {
			$columns-available: $columns-available + 1;
			$min-width: list.nth($values, 1);
			$max-width: list.nth($values, 2);
			$min-columns-local: calc($columns-available + 1);

			@include breakpoint-only($min-width, $max-width) {
				#{get-breakpoint-broken-columns($min-columns-local, $max-columns)} {
					--Grid-columns: #{$columns-available};
				}
			}
		}
	}
</style>
