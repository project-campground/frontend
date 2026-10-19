<script lang="ts">
	import {
		draggable,
		droppable,
		getMenuPortal,
		rightClickMenu,
		MenuPortalInstance,
		Menu,
		rightClickMenuProps,
	} from '@campground/ui';
	import TentListButton from './TentListButton.svelte';
	import { IconSettingsFilled } from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { TentSettings } from '$lib/components/settings/index.js';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';

	const {
		tent,
		domain,
		onMoveTo,
	}: {
		tent: TentViewBasic;
		domain: string;
		onMoveTo?: (movedTentId: string, movedToTentId: string) => unknown;
	} = $props();

	const menuPortal = getMenuPortal();
</script>

{#snippet settings(instance: MenuPortalInstance)}
	<TentSettings
		{instance}
		{tent}
	/>
{/snippet}

{#snippet contextMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {...rightClickMenuProps(instance)}>
		<Menu.List>
			<Menu.Item>
				<Menu.Button onclick={(ev) => menuPortal.add(settings, ev.currentTarget)}>
					<IconSettingsFilled />
					<LocaleMessage {...localeStrings.tents.settings} />
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}

<TentListButton
	{tent}
	{domain}
	{@attach onMoveTo ? draggable({ id: tent.id, groups: ['tent'] }) : null}
	{@attach onMoveTo ?
		droppable({ id: tent.id, acceptGroups: ['tent'], disallowIds: [tent.id], onDrop: onMoveTo })
	:	null}
	{@attach rightClickMenu(menuPortal, contextMenu)}
/>
