<script lang="ts">
	import { Card, Divider } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const {
		children,
		icon,
		title,
		buttons,
	}: { children: Snippet; icon?: Snippet; title: Snippet; buttons?: Snippet } = $props();
</script>

<Card.Root
	level="subtle"
	size="xl"
>
	<Card.Overflow>
		<header class="header">
			<span class="title">
				<span class="icon">
					{@render icon?.()}
				</span>
				{@render title()}
			</span>
			<span class="buttons">
				{@render buttons?.()}
			</span>
		</header>
		<div class="divider">
			<Divider color="background" />
		</div>
		<div class="content">
			{@render children()}
		</div>
	</Card.Overflow>
</Card.Root>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 1rem 1.5rem;
	}
	.divider {
		position: absolute;
		left: -1px;
		right: -1px;
	}
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;

		flex: 1;
		font-weight: 700;
		color: var(--foreground-subheading);
	}
	.icon {
		line-height: 0;
		color: var(--foreground-subtext);
	}
</style>
