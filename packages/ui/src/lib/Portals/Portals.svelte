<script lang="ts">
	import type PortalsProps from './props.ts';

	const { children, ...attributes }: PortalsProps = $props();
</script>

<div class="Portals root" {...attributes}>
	{@render children()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.root {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: end;
		pointer-events: none;
	}
</style>
