<script lang="ts">
	import { getTabsContext } from './context.svelte.ts';
	import type { ItemProps } from './props.ts';
	const tabContext = getTabsContext();

	const key = $props.id();
	let input: HTMLInputElement | null = $state(null);

	const { children }: ItemProps = $props();
</script>

<button
	role="tab"
	class={['Tabs TabItem button', tabContext.activeTab === input && `active`]}
	tabindex={-1}
>
	{@render children()}
	<input
		bind:this={input}
		class="Tabs TabItem input"
		type="radio"
		name="items"
		value={key}
		tabindex={0}
		oninput={(ev) => tabContext.setActiveTab(ev.currentTarget)}
	/>
</button>

<style lang="scss">
	@use '../index.scss' as *;

	.input {
		position: absolute;
		appearance: none;
		margin: 0;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 2;
		outline: none;

		border: solid 1px transparent;
		border-radius: var(--radius-sm);

		transition: border, box-shadow;
		transition-duration: $transition-time-md;

		cursor: pointer;
		&:focus-visible {
			border: solid 1px var(--primary-softGlow);
			box-shadow: var(--template-inset-shadow-md) var(--primary-softGlow);
		}
	}
	.button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		border: none;
		outline: none;
		background-color: transparent;

		gap: 0.5rem;
		padding: 0.5rem 0.75rem;

		font-size: 0.8rem;
		color: var(--foreground-background);

		transition: color, transform, filter;
		transition-duration: $transition-time-md;
		font-weight: 700;
		cursor: pointer;
		flex: 1 1 0;
		&.active {
			color: var(--foreground-heading);
		}
	}
</style>
