<script lang="ts">
	import { getPickContext } from './context.svelte.js';
	import type { ItemProps } from './props.js';

	const pickContext = getPickContext();

	const key = $props.id();
	let input: HTMLInputElement | null = $state(null);

	const { children, class: className, ...attr }: ItemProps = $props();
</script>

<button
	role="tab"
	class={['button', className]}
	tabindex={-1}
	data-active={pickContext.activeTab === input}
	{...attr}
>
	{@render children()}
	<input
		bind:this={input}
		class="input"
		type="radio"
		name="items"
		value={key}
		tabindex={0}
		oninput={(ev) => pickContext.setActiveItem(ev.currentTarget)}
	/>
</button>

<style lang="scss">
	@use '../../common.scss' as *;

	$pick-sizes: create-size-map((0rem, 0.25rem, 0.5rem, 1rem, 1.5rem));

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
		// padding: 0.5rem 0.75rem;
		padding: 0;
		margin: 0;

		font-size: 0.8rem;
		color: var(--foreground-background);

		transition: color, transform, filter;
		transition-duration: $transition-time-md;
		font-weight: 700;
		cursor: pointer;
		flex: 1 1 0;
		&[data-active='true'] {
			color: var(--foreground-heading);
		}
	}
</style>
