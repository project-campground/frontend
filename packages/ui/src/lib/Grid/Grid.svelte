<script lang="ts">
	import type GridProps from './props.ts';

	const {
		children,
		gap,
		columns,
		class: className,
		noBreakpoint,
		...attributes
	}: GridProps = $props();
</script>

<grid
	{...attributes}
	class={['Grid', { noBreakpoint }, className]}
	aria-colcount={columns ?? 2}
	role="grid"
>
	{@render children?.()}
</grid>

<style lang="scss">
	@use '../index.scss' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	.Grid {
		display: grid;
		grid-template-columns: repeat(#{i}, 1fr);
		gap: var(--Group-gap);

		@for $i from 2 to 5 {
			&.col#{i} {
				grid-template-columns: repeat(#{i}, 1fr);
			}
		}

		@include mobile-only() {
			&.col3:not(.noBreakpoint),
			&.col4:not(.noBreakpoint),
			&.col5:not(.noBreakpoint) {
				grid-template-columns: repeat(2, 1fr);
			}
		}
		@include tablet-only {
			&.col4:not(.noBreakpoint),
			&.col5:not(.noBreakpoint) {
				grid-template-columns: repeat(3, 1fr);
			}
		}
		@include desktop-sm-only {
			&.col5:not(.noBreakpoint) {
				grid-template-columns: repeat(4, 1fr);
			}
		}
	}
</style>
