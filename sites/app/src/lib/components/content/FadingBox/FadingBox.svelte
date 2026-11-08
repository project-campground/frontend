<script
	lang="ts"
	module
>
	interface Props {
		direction?: 'to-bottom' | 'to-top' | 'to-left' | 'to-right';
		children: Snippet;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	const { direction, children }: Props = $props();
</script>

<div data-direction={direction ?? 'to-bottom'}>
	{@render children()}
</div>

<style lang="scss">
	$directions: bottom, top, left, right;

	div {
		@each $direction in $directions {
			&[data-direction='to-#{$direction}'] {
				mask-image: linear-gradient(to $direction, white, transparent);
			}
		}
		mask-repeat: no-repeat;
	}
</style>
