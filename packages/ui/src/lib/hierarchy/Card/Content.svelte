<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import { stackedProps } from '../layout.ts';
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
	data-gap={gap}
	{...stackedProps(props)}
>
	{@render children()}
</div>

<style lang="scss">
	@use './LayoutItem.scss' as *;

	div {
		@extend %CardLayoutItem;
	}
</style>
