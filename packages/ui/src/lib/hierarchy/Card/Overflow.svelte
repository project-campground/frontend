<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import { cardLayoutItemProps } from './layout.ts';
	import type { OverflowProps } from './props.ts';

	const { children, mt, mb, pt, pb, pl, pr, flex, ...props }: OverflowProps = $props();
</script>

<div
	style:--CardLayoutItem-marginTop={rem(mt)}
	style:--CardLayoutItem-marginBottom={rem(mb)}
	style:--CardLayoutItem-paddingTop={rem(pt)}
	style:--CardLayoutItem-paddingBottom={rem(pb)}
	style:--CardLayoutItem-paddingLeft={rem(pl)}
	style:--CardLayoutItem-paddingRight={rem(pr)}
	style:--Layout-flex={flex}
	{...cardLayoutItemProps(props)}
>
	{@render children()}
</div>

<style lang="scss">
	@use './LayoutItem.scss' as *;

	div {
		@extend %CardLayoutItem;

		margin-inline: calc(-1 * var(--Card-paddingX));

		&:first-of-type {
			margin-block-start: var(--CardLayoutItem-marginTop, calc(-1 * var(--Card-paddingY)));
		}
		&:last-of-type {
			margin-block-end: var(--CardLayoutItem-marginBottom, calc(-1 * var(--Card-paddingY)));
		}
	}
</style>
