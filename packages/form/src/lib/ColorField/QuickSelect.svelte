<script lang="ts">
	const { color, name, onClick }: { name: string; color: number; onClick: () => unknown } = $props();
</script>

<button
	type="button"
	onclick={onClick}
	aria-label={name}
	style:--QuickSelect-color={`#${color.toString(16).padStart(6, '0')}`}
>
</button>

<style lang="scss">
	@use '@campground/ui' as *;

	button {
		position: relative;

		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: none;
		outline: none;
		background-color: var(--QuickSelect-color);

		cursor: pointer;

		@include button-transform();
		@extend %Squircle;
	}
</style>
