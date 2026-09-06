<script lang="ts">
	import type { LineProps } from './props.ts';

	const { index, children }: LineProps = $props();
</script>

<p class="line">
	<span class="num">{index}</span>
	<code class="text">{@render children()}</code>
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
