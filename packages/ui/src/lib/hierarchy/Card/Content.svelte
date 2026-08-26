<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import { stackableProps } from '../layout.ts';
	import type { ContentProps } from './props.ts';

	const { children, pt, pl, pr, pb, flex, ...props }: ContentProps = $props();
</script>

<div
	style:--CardContent-paddingTop={rem(pt)}
	style:--CardContent-paddingBottom={rem(pb)}
	style:--CardContent-paddingLeft={rem(pl)}
	style:--CardContent-paddingRight={rem(pr)}
	style:--Layout-flex={flex}
	{...stackableProps(props)}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Layout.scss' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	div {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		@extend %Stackable;
		@extend %InLayout;

		@each $position in $positions {
			padding-#{$position}: var(--CardContent-padding#{capitalize($position)});
		}

		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}

		&[data-orientation='horizontal'] {
			flex-direction: row;
		}
	}
</style>
