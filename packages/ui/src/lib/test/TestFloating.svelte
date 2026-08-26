<script lang="ts">
	import {
		Button,
		getMenuPortal,
		Menu,
		MenuPortalInstance,
		Section,
		Stack,
		Group,
		Modal,
		Dialog,
		Svg,
		Tooltip,
	} from '$lib/index.js';
	import {
		hoverAction,
		rightClickAction,
		rightClickMenu,
		rightClickMenuProps,
		tooltip,
	} from '$lib/floating/attachments.js';
	import type { Snippet } from 'svelte';
	import type { Placement } from '@floating-ui/dom';

	const menuPortal = getMenuPortal();

	let menuInstance: MenuPortalInstance | null = $state(null);

	// Auto-update
	$effect(() => {
		if (!menuPortal.items.includes(menuInstance!)) menuInstance = null;
	});

	function toggleMenu(
		ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
		menu: Snippet<[MenuPortalInstance]>,
	) {
		if (menuInstance) return menuInstance.destroy();

		menuInstance = menuPortal.add(menu, ev.currentTarget);
	}
</script>

{#snippet regularTooltip(instance: MenuPortalInstance)}
	{const randomPlacements: Placement[] = ['top', 'right', 'left', 'bottom']}
	{const placement = randomPlacements[Math.floor(Math.random() * randomPlacements.length)]}
	<Tooltip
		{instance}
		{placement}>Example tooltip {placement}</Tooltip
	>
{/snippet}
{#snippet regularMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {...rightClickMenuProps(instance)}>
		<Menu.List>
			<Menu.Item>Example item</Menu.Item>
			<Menu.Item>
				<Menu.Button>Example button</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button color="primary">
					<Svg.Logo size={2} />
					Example button
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button color="primary" variant="selected">
					<Svg.Logo size={2} />
					Example button
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button color="info">
					<Svg.Logo size={2} />
					Example button
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}
{#snippet regularModal(instance: MenuPortalInstance)}
	<Modal.Root {instance}>
		<Dialog.Root
			size={instance.invoker.attributes.getNamedItem('data-modal-size')?.value as
				| 'auto'
				| 'max'
				| 'full'
				| null}
		>
			<Dialog.Header>Example title</Dialog.Header>
			<Dialog.Content>Aaaaaa</Dialog.Content>
			<Dialog.Footer>
				<Button color="primary">Okay</Button>
				<Button
					color="neutral"
					variant="plain">Not okay</Button
				>
			</Dialog.Footer>
		</Dialog.Root>
	</Modal.Root>
{/snippet}

<Section headerLevel={1}>
	{#snippet header()}
		Menu
	{/snippet}
	<Stack>
		<Group>
			<Button onclick={(ev) => toggleMenu(ev, regularMenu)}>Open menu</Button>
		</Group>
		<Group>
			<Button {@attach rightClickAction((ev) => console.log('Right clicked', ev.currentTarget))}
				>Right click and check console</Button
			>
			<Button {@attach rightClickMenu(menuPortal, regularMenu)}>Right click to open menu</Button>
		</Group>
		<Group>
			<Button {@attach hoverAction((ev) => console.log('Hovered', ev.currentTarget))}
				>Hover and see console</Button
			>
			<Button {@attach tooltip(menuPortal, regularTooltip)}>Hover to open tooltip</Button>
		</Group>
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Modal
	{/snippet}
	<Stack>
		<Group>
			<Button onclick={(ev) => toggleMenu(ev, regularModal)}>Open modal</Button>
			<Button
				onclick={(ev) => toggleMenu(ev, regularModal)}
				data-modal-size="auto">Open modal (size: auto)</Button
			>
			<Button
				onclick={(ev) => toggleMenu(ev, regularModal)}
				data-modal-size="max">Open modal (size: max)</Button
			>
			<Button
				onclick={(ev) => toggleMenu(ev, regularModal)}
				data-modal-size="full">Open modal (size: full)</Button
			>
		</Group>
	</Stack>
</Section>
