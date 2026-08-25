<script lang="ts">
	import type GridProps from './props.ts';

	const {
		children,
		gap,
		columns,
		columnSizing,
		class: className,
		noBreakpoint,
		...attributes
	}: GridProps = $props();
</script>

<div
	{...attributes}
	class={[{ noBreakpoint }, className]}
	aria-colcount={columns ?? 2}
	data-columns={columns ?? 2}
	data-column-sizing={columnSizing ?? 'stretch'}
	style:--Grid-gap={gap}
	role="grid"
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use 'sass:list';

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));
	$min-columns: 2;
	$max-columns: 6;

	@mixin set-columns($i) {
		grid-template-columns: repeat(#{$i}, var(--Grid-columnSizing));
	}

	@function get-breakpoint-broken-columns($min, $max) {
		$list: ();
		@for $i from $min to $max {
			$list: list.append($list, "&:not(.noBreakpoint)[data-columns='#{$i}']", $separator: comma);
		}
		@return $list;
	}

	div {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--Group-gap);
		--Grid-columnSizing: 1fr;

		&[data-column-sizing='auto'] {
			--Grid-columnSizing: auto;
		}

		@for $i from $min-columns to $max-columns {
			&[data-columns='#{$i}'] {
				@include set-columns($i);
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
					@include set-columns($columns-available);
				}
			}
		}
	}
</style>
