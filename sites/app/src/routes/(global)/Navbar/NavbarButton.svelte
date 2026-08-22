<script lang="ts">
	import { page } from '$app/state';
	import { Card } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const {
		activeExcept,
		href,
		children,
	}: { href?: string; children: Snippet; activeExcept?: string[] } = $props();

	const isActive = $derived(
		href
			&& !activeExcept?.some((x) => page.url.pathname.startsWith(x))
			&& page.url.pathname.startsWith(href),
	);
</script>

<div class={['container', { active: isActive }]}>
	<Card.Root
		size="md"
		class={['navbarButton']}
		level={isActive ? 'default' : 'subtle'}
	>
		<Card.Overflow>
			<div class="content">
				{@render children()}
			</div>
		</Card.Overflow>
		{#if href}
			<Card.Click {href} />
		{/if}
	</Card.Root>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		@include button-transform();
	}

	.content {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: center;
		height: calc(var(--GlobalLayout-navHeight) - 0.5rem - 2px);
		min-width: calc(var(--GlobalLayout-navHeight) - 0.5rem - 2px);
		color: var(--foreground-body);
		transition: color $transition-time-md;
		gap: 1ch;
		padding: 0 0.5rem;

		.container:hover & {
			color: var(--foreground-heading);
		}
	}
</style>
