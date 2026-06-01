<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type { RootProps } from './props.ts';

	const { class: className, size, level, children }: RootProps = $props();
</script>

<section
	class={[
		'Card CardRoot',
		`size${capitalize(size ?? 'md')}`,
		level && `level${capitalize(level)}`,
		className
	]}
>
	{@render children()}
</section>

<style lang="scss">
	@use 'sass:list';
	@use '../index.scss' as *;

	$card-padding: create-size-map((0.25rem 0.375rem, 0.5px 0.75rem, 0.75rem 1rem, 1rem 1.25rem, 1.25rem 2rem, 2rem 3rem));

	.CardRoot {
		position: relative;
		overflow: hidden;

		background-color: var(--palette-background-level2);
		border: solid 1px var(--palette-neutral-border);
		border-radius: var(--Card-radius);
	}
	@each $size, $values in $card-padding {
		.size#{capitalize($size)} {
			padding: $values;
			box-shadow: var(--shadow-#{$size});
			--Card-paddingY: #{list.nth($values, 1)};
			--Card-paddingX: #{list.nth($values, 2)};
			--Card-radius: var(--radius-#{$size});
		}
	}
	.levelSubtle {
		background-color: var(--palette-background-level1);
	}
</style>
