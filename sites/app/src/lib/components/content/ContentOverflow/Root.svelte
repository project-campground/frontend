<script lang="ts">
	import { Button, getMenuPortal, Menu, MenuPortalInstance } from '@campground/ui';
	import { IconDotsFilled } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';

	const menuPortal = getMenuPortal();

	interface Props {
		children: Snippet;
	}

	let instance: MenuPortalInstance | null = $state(null);

	function createMenu(target: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (instance?.exists) return instance.destroy();

		instance = menuPortal.add(menuInternal, target.currentTarget);
	}

	$effect(() => {
		if (instance && !instance.portal.items.includes(instance)) instance = null;
	});

	const { children }: Props = $props();
</script>

{#snippet menuInternal(instance: MenuPortalInstance)}
	<Menu.Root {instance}>
		<Menu.List>
			{@render children()}
		</Menu.List>
	</Menu.Root>
{/snippet}

<div class={['root', { active: !!instance }]}>
	<Button
		variant="plain"
		color="neutral"
		size="xs"
		onclick={createMenu}
	>
		<IconDotsFilled />
	</Button>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.root {
		position: absolute;

		top: 0.5rem;
		right: 0.5rem;

		opacity: 0;
		transition: opacity $transition-time-md;

		:global(.ContentOverflow-parent):hover &,
		&.active {
			opacity: 1;
		}
	}
</style>
