<script lang="ts">
	import type { ContentProps } from './props.ts';

	const { children }: ContentProps = $props();
</script>

<div class={["Card CardContent"]}>
	{@render children()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.CardContent {
		display: flex;
		flex-direction: column;
	}
</style>
