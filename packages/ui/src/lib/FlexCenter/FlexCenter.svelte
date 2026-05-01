<script lang="ts">
	import type FlexCenterProps from "./props.ts";

	const { children, class: className }: FlexCenterProps = $props();
</script>

<div class={['FlexCenter', className]}>
	{@render children()}
</div>

<style lang="scss">
	.FlexCenter {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
