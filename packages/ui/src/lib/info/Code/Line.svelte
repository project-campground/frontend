<script lang="ts">
	import type { LineProps } from './props.ts';

	let { index, element = $bindable(), children }: LineProps = $props();
</script>

<p class="line">
	<span class="num">{index}</span>
	<span
		class="text"
		bind:this={element}>{@render children?.()}</span
	>
</p>

<style lang="scss">
	.line {
		display: contents;
	}
	.num {
		color: var(--foreground-background);
		padding-right: 1rem;
		text-align: end;
		user-select: none;
	}
	.text {
		color: var(--foreground-body);
		font-family: var(--font-monospace);
		white-space: pre;
	}
</style>
