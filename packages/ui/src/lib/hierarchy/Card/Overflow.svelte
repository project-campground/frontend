<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import type { OverflowProps } from './props.ts';

	const { children, mt, mb, ...props }: OverflowProps = $props();
</script>

<div
	style:--CardOverflow-marginTop={rem(mt)}
	style:--CardOverflow-marginBottom={rem(mb)}
	{...props}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	div {
		margin-right: calc(-1 * var(--Card-paddingX));
		margin-left: calc(-1 * var(--Card-paddingX));
		margin-top: var(--CardOverflow-marginTop);
		margin-bottom: var(--CardOverflow-marginBottom);

		&:first-of-type {
			margin-top: var(--CardOverflow-marginTop, calc(-1 * var(--Card-paddingY)));
		}
		&:last-of-type {
			margin-bottom: var(--CardOverflow-marginBottom, calc(-1 * var(--Card-paddingY)));
		}
	}
</style>
