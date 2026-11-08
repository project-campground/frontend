<script lang="ts">
	import type { ListProps } from './props.ts';

	const { children, ...attributes }: ListProps = $props();
</script>

<div {...attributes}>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: end;
		pointer-events: none;
		overflow: hidden;

		z-index: 1000;
	}
</style>
