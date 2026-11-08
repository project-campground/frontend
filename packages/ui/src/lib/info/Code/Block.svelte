<script lang="ts">
	import type { BlockProps } from './props.ts';

	let {
		verticalOverflow,
		meta,
		codeElement: thisCode = $bindable(),
		containerElement: thisContainer = $bindable(),
		children,
	}: BlockProps = $props();
</script>

<div
	class="container"
	data-vertical-overflow={verticalOverflow}
	bind:this={thisContainer}
>
	{#if meta}
		<div class="meta">
			{@render meta()}
		</div>
	{/if}
	<code
		class="content"
		bind:this={thisCode}
	>
		{@render children?.()}
	</code>
</div>

<style lang="scss">
	.meta {
		padding-block-end: 1rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		box-sizing: border-box;
		max-width: 100%;
		width: 100%;
		overflow: hidden;
		padding: 1rem 1rem;
		border-radius: var(--radius-md);

		box-shadow: var(--inset-shadow-md);
		background-color: var(--background-body);
	}
	.content {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: auto 1fr;
		width: 100%;
		flex: 1;
		overflow-x: auto;
		overflow-y: hidden;
		font-family: var(--font-monospace);
		[data-vertical-overflow='true'] & {
			overflow-y: auto;
		}
	}
</style>
