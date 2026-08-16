<script lang="ts">
	import { Para } from '@campground/ui';
	import type { Snippet } from 'svelte';

	interface Props {
		banner: Snippet;
		avatar: Snippet;
		displayName: Snippet;
		handle: Snippet;
		tagline: Snippet;
	}

	const { banner, avatar, displayName, handle, tagline }: Props = $props();
</script>

<header>
	{@render banner()}
	<div class="avatar">
		{@render avatar()}
	</div>
	<div class="info">
		<Para
			level="h1"
			align="center">{@render displayName()}</Para
		>
		<Para
			level="sub0"
			align="center">{@render handle()}</Para
		>
		<Para
			level="paragraph"
			align="center"
		>
			{@render tagline()}</Para
		>
	</div>
</header>

<style lang="scss">
	@use '@campground/ui' as *;

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-column: 1 / 4;
		gap: 0.5rem;
		height: fit-content;
		@include tablet-down {
			grid-column: 2 / 3;
		}
		margin-inline: calc(var(--Page-padding) * -1 + 1rem);
	}
	.avatar {
		margin-top: -3.5rem;
		padding: 0.25rem;
		background-color: var(--background-subtle);
		@extend %Squircle;
	}
</style>
