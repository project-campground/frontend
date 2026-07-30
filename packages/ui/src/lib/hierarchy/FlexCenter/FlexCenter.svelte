<script lang="ts">
	import type FlexCenterProps from './props.ts';

	const { children, ...props }: FlexCenterProps = $props();
</script>

<div {...props}>
	{@render children()}
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
