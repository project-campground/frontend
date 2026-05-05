<script lang="ts">
	import { capitalize } from "../../util/component.ts";
	import type { RootProps } from "./props.ts";

	const { size, children }: RootProps = $props();
</script>

<section class={["Card CardRoot container", `size${capitalize(size ?? "md")}`]}>
	{@render children()}
</section>

<style lang="scss">
	@use "sass:list";
	@use '../index.scss' as *;

	$card-padding: create-size-map((4px 6px, 8px 12px, 12px 16px, 16px 20px, 20px 32px));

	.Card {
		position: relative;
		overflow: hidden;

		background-color: var(--palette-background-level2);
		border: solid 1px var(--palette-neutral-border);
		border-radius: var(--Card-radius);


		@each $size, $values in $card-padding {
			&.size#{capitalize($size)} {
				padding: $values;
				box-shadow: var(--shadow-#{$size});
				--Card-paddingY: #{list.nth($values, 1)};
				--Card-paddingX: #{list.nth($values, 2)};
				--Card-radius: var(--radius-#{$size});
			}
		}
	}
</style>
