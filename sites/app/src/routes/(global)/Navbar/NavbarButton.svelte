<script lang="ts">
	import { Card } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const { href, children }: { href: string; children: Snippet } = $props();
</script>

<div class="container">
	<Card.Root
		size="md"
		class={['navbarButton']}
	>
		<Card.Overflow>
			<div class="content">
				{@render children()}
			</div>
		</Card.Overflow>
		<Card.Click {href} />
	</Card.Root>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		@include button-transform();
	}

	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: calc(var(--GlobalLayout-navHeight) - 0.5rem - 2px);
		min-width: calc(var(--GlobalLayout-navHeight) - 0.5rem - 2px);
		color: var(--foreground-body);
		transition: color $transition-time-md;

		.container:hover & {
			color: var(--foreground-heading);
		}
	}
</style>
