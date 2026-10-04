<script lang="ts">
	import type { TabProps } from './props.ts';

	let { children, padding, noInlinePadding, element = $bindable() }: TabProps = $props();
</script>

<div
	bind:this={element}
	role="tabpanel"
	data-no-inline-padding={noInlinePadding}
	data-padding={padding ?? 'none'}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	$padding: create-size-map-using(
		(0, 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem),
		$size-names-with-none
	);

	div {
		box-sizing: border-box;
		grid-row-start: 1;
		grid-row-end: 2;
		overflow: auto;
		scroll-snap-align: start;

		&[data-padding][data-no-inline-padding='true'] {
			padding-inline: 0;
		}

		@each $size, $value in $padding {
			&[data-padding='#{$size}'] {
				padding: $value;
			}
		}
	}
</style>
