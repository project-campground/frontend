<script lang="ts">
	import type { RootProps } from './props.ts';

	const { class: className, size, level, overflow, children }: RootProps = $props();
</script>

<section
	class={['Card CardRoot', className]}
	data-level={level}
	data-overflow={overflow}
	data-size={size ?? 'md'}
>
	{@render children()}
</section>

<style lang="scss">
	@use 'sass:list';
	@use '../index.scss' as *;

	$card-padding: create-size-map(
		(0.25rem 0.375rem, 0.5px 0.75rem, 0.75rem 1rem, 1rem 1.25rem, 1.25rem 2rem, 2rem 3rem)
	);

	.CardRoot {
		position: relative;
		overflow: hidden;

		background-color: var(--background-content);
		border: solid 1px var(--neutral-border);
		border-radius: var(--card-radius);
		box-shadow: var(--shadow-md);
		&[data-overflow='auto'] {
			overflow: auto;
		}
		&[data-overflow='visible'] {
			overflow: visible;
		}
		@each $size, $values in $card-padding {
			&[data-size='#{$size}'] {
				padding: $values;
				--card-paddingY: #{list.nth($values, 1)};
				--card-paddingX: #{list.nth($values, 2)};
				--card-radius: var(--radius-#{$size});
			}
		}
	}
	.levelSubtle {
		background-color: var(--background-subtle);
	}
</style>
