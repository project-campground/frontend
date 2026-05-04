<script lang="ts">
	import { getTabContext } from './context.ts';
	import type { ItemProps } from './props.ts';
	const tabContext = getTabContext();

	const { children, id, isActive }: ItemProps = $props();
</script>

<button
	data-tab-id={id}
	class={['TabItem', isActive && `active`]}
	onclick={() => tabContext.onTabSelect(id)}
>
	{@render children()}
</button>

<style lang="scss">
	@use '../index.scss' as *;

	.TabItem {
		display: flex;
		gap: 8px;
		padding: 8px 12px;
		font-size: 0.9rem;
		align-items: center;
		justify-content: center;
		color: var(--palette-foreground-level3);
		transition: color $transition-time-md;
		border: none;
		outline: none;
		background-color: transparent;
		font-weight: 700;
		&.active {
			color: var(--palette-foreground-level1);
		}
	}
</style>
