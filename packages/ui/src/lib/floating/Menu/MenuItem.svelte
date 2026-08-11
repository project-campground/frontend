<script lang="ts">
	import type { ItemProps } from './props.ts';

	const { children, class: className, ...attributes }: ItemProps = $props();
</script>

<li
	class={['container', className]}
	role="menuitem"
	{...attributes}
>
	{@render children?.()}
</li>

<style lang="scss">
	@use '../../common.scss' as *;

	.container {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		&::marker {
			display: none;
		}
	}
</style>
