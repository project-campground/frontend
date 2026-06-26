<script lang="ts">
	import { getTabContext } from './context.ts';
	import type { ItemProps } from './props.ts';
	const tabContext = getTabContext();

	const { children, id, isActive }: ItemProps = $props();
</script>

<button
	role="tab"
	data-tab-id={id}
	class={['Tabs TabItem', isActive && `active`]}
	onclick={() => tabContext.onTabSelect(id)}
>
	{@render children()}
</button>

<style lang="scss">
	@use '../index.scss' as *;

	.TabItem {
		display: flex;
		align-items: center;
		justify-content: center;

		border: none;
		outline: none;
		background-color: transparent;

		gap: 8px;
		padding: 8px 12px;

		font-size: 0.8rem;
		color: var(--foreground-body);

		transition: color, transform, filter;
		transition-duration: $transition-time-md;
		font-weight: 700;
		cursor: pointer;
		&.active {
			color: var(--foreground-heading);
		}
		&:focus-visible {
			transform: scale(1.2);
			color: var(--primary-400);
		}
	}
</style>
