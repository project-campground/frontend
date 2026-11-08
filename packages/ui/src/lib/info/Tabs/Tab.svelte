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
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 100%;
		max-width: 100%;
		min-width: 100%;

		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;

		scroll-snap-align: start;
		scroll-snap-stop: always;

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
