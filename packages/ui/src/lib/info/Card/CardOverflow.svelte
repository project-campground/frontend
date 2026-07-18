<script lang="ts">
	import type { OverflowProps } from './props.ts';

	const { children, ...props }: OverflowProps = $props();
</script>

<div {...props}>
	{@render children()}
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	div {
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
