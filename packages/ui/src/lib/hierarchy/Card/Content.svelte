<script lang="ts">
	import { rem } from '$lib/util/component.js';
	import type { ContentProps } from './props.ts';

	const { gap, direction, children, pt, pl, pr, pb, ...props }: ContentProps = $props();
</script>

<div
	style:--CardContent-paddingTop={rem(pt)}
	style:--CardContent-paddingBottom={rem(pb)}
	style:--CardContent-paddingLeft={rem(pl)}
	style:--CardContent-paddingRight={rem(pr)}
	data-gap={gap}
	data-direction={direction}
	{...props}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Stack/Stackable.scss' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	div {
		display: flex;
		flex-direction: column;

		@extend %Stackable-direction;

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
