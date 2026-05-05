<script lang="ts">
	import type { OverflowProps } from "./props.ts";

	const { children }: OverflowProps = $props();
</script>

<div class={['Card CardOverflow']}>
	{@render children()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.CardOverflow {
		:global(.CardRoot) > & {
			margin-right: calc(-1 * var(--Card-paddingX));
			margin-left: calc(-1 * var(--Card-paddingX));
			
			&:first-of-type {
				margin-top: calc(-1 * var(--Card-paddingY));
			}
			&:last-of-type {
				margin-bottom: calc(-1 * var(--Card-paddingY));
			}
		}
	}
</style>
