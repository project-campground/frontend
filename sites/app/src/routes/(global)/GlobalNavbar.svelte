<script lang="ts">
	import { Alert, Svg } from '@campground/ui';
	import GlobalNavbarButton from './GlobalNavbarButton.svelte';
	import CampsiteButton from './CampsiteButton.svelte';
	import GlobalNavbarProfile from './GlobalNavbarProfile.svelte';
</script>

<div class="GlobalNavbar container">
	<div class="GlobalNavbar stack">
		<GlobalNavbarButton selected={false}>
			<Svg.Logo size={2.5} />
		</GlobalNavbarButton>
	</div>
	{#if false}
		<Alert color="danger">
			{#snippet icon()}
				a
			{/snippet}
			abc
		</Alert>
	{:else}
		<div class="GlobalNavbar divider"></div>
		<div class="GlobalNavbar campsites stack">
			<CampsiteButton
				name="Example"
				isSelected={false}
				id="a"
				domain="b"
				memberCount={2}
			/>
		</div>
	{/if}
	<div class="GlobalNavbar stack">
		<GlobalNavbarProfile />
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.divider {
		width: 2px;
		height: calc(100% - 1rem);
		background-color: var(--neutral-border);
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		scroll-snap-align: start;

		flex: 1;
		grid-row: 1;
		grid-column: 1;
		gap: 1rem;

		@include tablet-up {
			padding: 0 0.5rem;
			width: calc(100vw - 1rem);
			align-items: center;
			flex-direction: row;
			grid-column: 1 / 4;
		}
	}
	.campsites {
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
		@include tablet-up {
			overflow-y: hidden;
			overflow-x: auto;
			align-items: center;
			flex-direction: row;
		}
	}
	.stack {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
		@include tablet-up {
			align-items: center;
			flex-direction: row;
		}
	}
</style>
