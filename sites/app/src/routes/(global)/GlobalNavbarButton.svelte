<script lang="ts">
	import type { Snippet } from 'svelte';

	const { selected, children }: { selected: boolean; children: Snippet } = $props();
</script>

<button class={['GlobalNavbarButton', { selected }]}>
	{@render children()}
</button>

<style lang="scss">
	@use '@campground/ui' as *;

	.GlobalNavbarButton {
		@include button-transform();

		display: flex;
		flex-direction: row;
		gap: 1.25ch;

		font-size: 1rem;
		font-family: var(--font-body);
		outline: none;

		background-color: var(--background-subtle);
		border: solid 1px var(--neutral-border);
		padding: 0.5rem;
		border-radius: var(--radius-lg);
		cursor: pointer;
		color: var(--foreground-body);
		box-shadow: var(--shadow-sm);
		position: relative;

		&:hover {
			color: var(--foreground-subheading);
			background-color: var(--background-content);
		}
		&:active {
			color: var(--foreground-background);
			background-color: var(--background-body);
			box-shadow: 0 0 0 transparent;
		}
		&.selected:active {
			color: var(--foreground-subtle);
			background-color: var(--background-body);
			box-shadow: 0 0 0 transparent;
		}
		&.selected {
			color: var(--foreground-subheading);
			background-color: var(--background-content);
		}
	}
</style>
