<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import { stackableProps } from '../layout.ts';
	import type { OverflowProps } from './props.ts';

	const { children, mt, mb, flex, ...props }: OverflowProps = $props();
</script>

<div
	style:--CardOverflow-marginTop={rem(mt)}
	style:--CardOverflow-marginBottom={rem(mb)}
	style:--Layout-flex={flex}
	{...stackableProps(props)}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Layout.scss' as *;

	div {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		margin-inline: calc(-1 * var(--Card-paddingX));
		margin-block-start: var(--CardOverflow-marginTop);
		margin-block-end: var(--CardOverflow-marginBottom);

		@extend %Stackable;
		@extend %InLayout;

		&:first-of-type {
			margin-block-start: var(--CardOverflow-marginTop, calc(-1 * var(--Card-paddingY)));
		}
		&:last-of-type {
			margin-block-end: var(--CardOverflow-marginBottom, calc(-1 * var(--Card-paddingY)));
		}
	}
</style>
