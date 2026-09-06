<script lang="ts">
	import {
		Button,
		getMenuPortal,
		Menu,
		MenuPortalInstance,
		Section,
		Stack,
		Group,
		Dialog,
		Svg,
		Tooltip,
		Modal,
		rightClickAction,
		Para,
		Chip,
		Card,
	} from '$lib/index.js';
	import {
		hoverAction,
		rightClickMenu,
		rightClickMenuProps,
		tooltip,
	} from '$lib/floating/attachments.js';
	import type { Snippet } from 'svelte';
	import type { Placement } from '@floating-ui/dom';
	import { draggable, droppable } from '$lib/attachments/draggable.js';

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

	let drop: { draggedId: string, droppedOnId: string, groups: string[] } | null = $state(null);

	const onDrop = (draggedId: string, droppedOnId: string, groups: string[]) => drop = { draggedId, droppedOnId, groups };

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
	<Modal {instance}>
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
	</Modal>
{/snippet}

<Section headerLevel={1}>
	{#snippet header()}
		Dragging
	{/snippet}
	<Stack gap={2}>
		<Para>Drop info: {JSON.stringify(drop, undefined, 4)}</Para>
		<Stack>
			<Group>
				<Card.Root {@attach droppable({ id: 'drop1', onDrop, disallowIds: ['drag1'] })}>
					<Card.Content>
						Drop here (drag 1 is disallowed)
						<span class="over">
							<Chip color="primary">Draggable over</Chip>
						</span>
					</Card.Content>
				</Card.Root>
				<Card.Root {@attach droppable({ id: 'drop2', onDrop, acceptGroups: ['group1', 'group2'] })}>
					<Card.Content>
						Or drop here (only group1 and group2 are allowed)
						<span class="over">
							<Chip color="primary">Draggable over</Chip>
						</span>
					</Card.Content>
				</Card.Root>
			</Group>
			<Group>
				<Card.Root {@attach draggable({ id: 'drag1', groups: ['group1'] })}>
					<Card.Content>
						Drag 1 (and group 1)
					</Card.Content>
				</Card.Root>
				<Card.Root {@attach draggable({ id: 'drag2', groups: ['group1'] })}>
					<Card.Content>
						Drag 2 (and group 1)
					</Card.Content>
				</Card.Root>
				<Card.Root {@attach draggable({ id: 'drag3', groups: ['group2'] })}>
					<Card.Content>
						Drag 3 (and group 2)
					</Card.Content>
				</Card.Root>
				<Card.Root {@attach draggable({ id: 'drag4', groups: ['group3'] })}>
					<Card.Content>
						Drag 4 (and group 3), which is also clickable
					</Card.Content>
					<Card.Click onclick={() => console.log('Clicked drag 4')}>

					</Card.Click>
				</Card.Root>
			</Group>
		</Stack>
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Menu
	{/snippet}
	<Stack>
		<Group>
			<Button onclick={(ev) => toggleMenu(ev, regularMenu as Snippet<[MenuPortalInstance]>)}>Open menu</Button>
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

<style lang="scss">
	@use '../common.scss' as *;

	.over {
		opacity: 0;
		transition: opacity $transition-time-md;
	}
	:global([data-droppable-over]) .over {
		opacity: 100%;
	}
</style>