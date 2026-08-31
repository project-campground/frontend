<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import { cardLayoutItemProps } from './layout.ts';
	import type { ContentProps } from './props.ts';

	const { children, pt, pl, pr, pb, mt, mb, gap, flex, ...props }: ContentProps = $props();
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

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	div {
		@extend %CardLayoutItem;

		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}
	}
</style>
