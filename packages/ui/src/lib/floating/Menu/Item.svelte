<script lang="ts">
	import type { ItemProps } from './props.ts';

	const { size, padding, children, ...attributes }: ItemProps = $props();
</script>

<li
	role="menuitem"
	data-size={size ?? 'none'}
	data-padding={padding ?? 'default'}
	{...attributes}
>
	{@render children?.()}
</li>

<style lang="scss">
	@use '../../common.scss' as *;

	$margins: 0 0.125 0.25 0.5 1 1.5 2.5 3.5;
	$margin-size-map: create-size-map-using($margins, $size-names-with-none);

	li {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		&::marker {
			display: none;
		}
		@each $size, $value in $margin-size-map {
			&[data-size='#{$size}'] {
				padding: calc($value * 1rem) calc($value * sqrt($value) * 2.5rem);
			}
		}
		&[data-padding='no-inline'] {
			padding-inline: 0;
		}
	}
</style>
