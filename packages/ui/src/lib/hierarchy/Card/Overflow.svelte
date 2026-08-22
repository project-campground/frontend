<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import type { OverflowProps } from './props.ts';

	const { children, mt, mb, direction, ...props }: OverflowProps = $props();
</script>

<div
	style:--CardOverflow-marginTop={rem(mt)}
	style:--CardOverflow-marginBottom={rem(mb)}
	data-direction={direction}
	{...props}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Stack/Stackable.scss' as *;

	div {
		margin-inline: calc(-1 * var(--Card-paddingX));
		margin-block-start: var(--CardOverflow-marginTop);
		margin-block-end: var(--CardOverflow-marginBottom);

		@extend %Stackable-direction;

		&:first-of-type {
			margin-block-start: var(--CardOverflow-marginTop, calc(-1 * var(--Card-paddingY)));
		}
		&:last-of-type {
			margin-block-end: var(--CardOverflow-marginBottom, calc(-1 * var(--Card-paddingY)));
		}
	}
</style>
