<script lang="ts">
	import { notInherited, rem } from '$lib/util/component.js';
	import { stackedProps } from '../layout.ts';
	import type { RootProps } from './props.ts';

	const {
		size,
		padding,
		level,
		overflow,
		children,
		flex,
		gap,
		gridColumn,
		gridRow,
		...props
	}: RootProps = $props();
</script>

<section
	data-level={level}
	data-overflow={overflow}
	data-size={size ?? 'md'}
	data-padding={padding ?? size ?? 'md'}
	style:--Card-gap={rem(gap)}
	style:--Layout-flex={notInherited(flex)}
	style:--Layout-gridColumn={notInherited(gridColumn)}
	style:--Layout-gridRow={notInherited(gridRow)}
	{...stackedProps(props)}
>
	{@render children()}
</section>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;
	@use '../Layout.scss' as *;
	@use './Card.scss' as *;

	$card-padding: create-size-map(
		(0.25rem 0.375rem, 0.5rem 0.75rem, 0.75rem 1rem, 1rem 1.25rem, 1.25rem 2rem, 2rem 3rem)
	);

	section {
		@extend %Card;

		@extend %InLayout;
		@extend %Stacked;

		&[data-overflow='auto'] {
			overflow: auto;
		}
		&[data-overflow='visible'] {
			overflow: visible;
		}
		&[data-level='subtle'] {
			@extend %Card-subtle;
		}
		@each $size, $values in $card-padding {
			&[data-size='#{$size}'] {
				--Card-radius: var(--radius-#{$size});
			}
			&[data-padding='#{$size}'] {
				padding: $values;
				--Card-paddingY: #{list.nth($values, 1)};
				--Card-paddingX: #{list.nth($values, 2)};
			}
		}
	}
</style>
