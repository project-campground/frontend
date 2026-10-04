<script lang="ts">
	import type { TabProps } from './props.ts';

	const { children, padding }: TabProps = $props();
</script>

<div
	role="tabpanel"
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

		@each $size, $value in $padding {
			&[data-padding='#{$size}'] {
				padding: $value;
			}
		}
	}
</style>
