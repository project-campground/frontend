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
	import {
		IconClipboardFilled,
		IconLinkFilled,
		IconSettingsFilled,
		IconTrashFilled,
	} from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { TentSettings } from '#lib/components/settings/index.js';
	import type { TentViewInList } from '#lib/types/campground/tent.js';
	import { v4 } from 'uuid';
	import { getCampsiteContext } from '../context.svelte.ts';
	import { getPermissions, hasPermission } from '#lib/util/permissions.js';
	import { PermissionFlag } from '#lib/util/constants.js';
	import { tentUrl } from '#lib/util/url.js';

	const {
		tent,
		domain,
		onMoveTo,
	}: {
		tent: TentViewInList;
		domain: string;
		onMoveTo?: (movedTentId: string, movedToTentId: string) => unknown;
	} = $props();

	const menuPortal = getMenuPortal();
	const campsiteContext = getCampsiteContext();
	const openBonfire = $derived(campsiteContext.openBonfire!);
	const category = $derived(openBonfire.categories.find((x) => x.id === tent.categoryId));
	const tentPermissions = $derived(
		campsiteContext.ownerPermissions
			?? getPermissions(
				category ? getPermissions(openBonfire.permissions, category) : openBonfire.permissions,
				tent,
			),
	);
</script>

{#snippet settings(instance: MenuPortalInstance<'delete'>)}
	<TentSettings
		defaultPage={instance.payload}
		{instance}
		{tent}
	/>
{/snippet}

{#snippet contextMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {...rightClickMenuProps(instance)}>
		<Menu.List>
			<Menu.Group>
				<Menu.Button onclick={() => window.navigator.clipboard.writeText(tent.id)}>
					<IconClipboardFilled />
					<LocaleMessage {...localeStrings.content.copyId} />
				</Menu.Button>
				<Menu.Button
					onclick={() =>
						window.navigator.clipboard.writeText(
							`${window.location.origin}${tentUrl(domain, campsiteContext.campsite!.id, tent.id)}`,
						)}
				>
					<IconLinkFilled />
					<LocaleMessage {...localeStrings.content.copyLink} />
				</Menu.Button>
			</Menu.Group>
			{#if hasPermission(tentPermissions, PermissionFlag.ManageTents)}
				<Menu.Group>
					<Menu.Button onclick={(ev) => menuPortal.add(settings, ev.currentTarget)}>
						<IconSettingsFilled />
						<LocaleMessage {...localeStrings.tents.settings} />
					</Menu.Button>
					<Menu.Button
						color="danger"
						onclick={(ev) => menuPortal.add(settings, ev.currentTarget, v4(), 'delete')}
					>
						<IconTrashFilled />
						<LocaleMessage {...localeStrings.tents.delete} />
					</Menu.Button>
				</Menu.Group>
			{/if}
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
