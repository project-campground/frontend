<script lang="ts">
	import { rem } from '$lib/util/component.ts';
	import { stackedProps } from '../layout.ts';
	import type { RootProps } from './props.ts';

	const { size, level, overflow, children, flex, gap, gridColumn, gridRow, ...props }: RootProps =
		$props();
</script>

<section
	data-level={level}
	data-overflow={overflow}
	data-size={size ?? 'md'}
	style:--Card-gap={rem(gap)}
	style:--Layout-flex={flex}
	style:--Layout-gridColumn={gridColumn}
	style:--Layout-gridRow={gridRow}
	{...stackedProps(props)}
>
	{@render children()}
</section>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;
	@use '../Layout.scss' as *;

	$card-padding: create-size-map(
		(0.25rem 0.375rem, 0.5rem 0.75rem, 0.75rem 1rem, 1rem 1.25rem, 1.25rem 2rem, 2rem 3rem)
	);

	section {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		position: relative;
		overflow: hidden;

		background-color: var(--background-content);
		border: solid 1px var(--neutral-border);
		border-radius: var(--Card-radius);
		box-shadow: var(--shadow-md);
		gap: var(--Card-gap);

		@extend %InLayout;
		@extend %Stacked;

		&[data-overflow='auto'] {
			overflow: auto;
		}
		&[data-overflow='visible'] {
			overflow: visible;
		}
		&[data-level='subtle'] {
			background-color: var(--background-subtle);
		}
		@each $size, $values in $card-padding {
			&[data-size='#{$size}'] {
				padding: $values;
				--Card-paddingY: #{list.nth($values, 1)};
				--Card-paddingX: #{list.nth($values, 2)};
				--Card-radius: var(--radius-#{$size});
			}
		}
	}
</style>
