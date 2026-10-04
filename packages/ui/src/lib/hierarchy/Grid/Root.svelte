<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import type { RootProps } from './props.ts';

	const { children, gap, columns, columnSizing, breakpointReduce, ...attributes }: RootProps =
		$props();
</script>

<div
	{...attributes}
	aria-colcount={columns ?? 2}
	data-columns={columns ?? 2}
	data-column-sizing={columnSizing ?? 'stretch'}
	style:--Grid-gap={rem(gap)}
	style:--Grid-columnsMax={columns ?? 2}
	style:--Grid-breakpointReduce={breakpointReduce ?? 1}
	role="grid"
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use 'sass:list';

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	@mixin set-columns($i) {
		grid-template-columns: repeat(#{$i}, var(--Grid-columnSizing));
	}

	div {
		display: grid;
		grid-template-columns: repeat(var(--Grid-columns), var(--Grid-columnSizing));
		gap: var(--Grid-gap);
		--Grid-columnSizing: 1fr;
		--Grid-columns: var(--Grid-columnsMax);
		--Grid-breakpointReduce: 1;

		&[data-column-sizing='auto'] {
			--Grid-columnSizing: auto;
		}

		$i: list.length($breakpoint-list-small);
		@each $_, $values in $breakpoint-list-small {
			$min-width: list.nth($values, 1);
			$max-width: list.nth($values, 2);

			@include breakpoint-only($min-width, $max-width) {
				--Grid-columns: calc(var(--Grid-columnsMax) - (var(--Grid-breakpointReduce) * #{$i}));
			}
			$i: $i - 1;
		}
	}
</style>
