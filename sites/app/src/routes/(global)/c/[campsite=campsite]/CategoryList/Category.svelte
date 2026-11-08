<script lang="ts">
	import { TentCategorySettings } from '#lib/components/settings/index.js';
	import { getAppview } from '#lib/context/api.js';
	import { localeStrings } from '#lib/locale/index.js';
	import type { TentCategoryViewInList } from '#lib/types/campground/tent.js';
	import { LocaleMessage } from '@campground/locale';
	import {
		Accordion,
		Para,
		draggable,
		droppable,
		MenuPortalInstance,
		Menu,
		rightClickMenuProps,
		getMenuPortal,
		rightClickMenu,
	} from '@campground/ui';
	import { IconClipboardFilled, IconSettingsFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { v4 } from 'uuid';
	import { getCampsiteContext } from '../context.svelte.ts';
	import { getPermissions, hasPermission } from '#lib/util/permissions.js';
	import { PermissionFlag } from '#lib/util/constants.ts';

	const appview = getAppview();
	const menuPortal = getMenuPortal();
	const campsiteContext = getCampsiteContext();

	function onDrop(draggedId: string) {
		return appview.categories.move(draggedId, { position: category.position });
	}

	const { category, children }: { category: TentCategoryViewInList; children: Snippet } = $props();

	const bonfirePerms = $derived(
		campsiteContext.openBonfire?.permissions ?? campsiteContext.permissions,
	);
	const categoryPerms = $derived(getPermissions(bonfirePerms, category));
</script>

{#snippet settings(instance: MenuPortalInstance<'delete'>)}
	<TentCategorySettings
		defaultPage={instance.payload}
		{instance}
		tentCategory={category}
	/>
{/snippet}
{#snippet contextMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {...rightClickMenuProps(instance)}>
		<Menu.List>
			<Menu.Group>
				<Menu.Button onclick={() => window.navigator.clipboard.writeText(category.id)}>
					<IconClipboardFilled />
					<LocaleMessage {...localeStrings.content.copyId} />
				</Menu.Button>
			</Menu.Group>
			{#if hasPermission(categoryPerms, PermissionFlag.ManageTents)}
				<Menu.Group>
					<Menu.Button onclick={(ev) => menuPortal.add(settings, ev.currentTarget)}>
						<IconSettingsFilled />
						<LocaleMessage {...localeStrings.tentCategories.settings} />
					</Menu.Button>
					<Menu.Button
						color="danger"
						onclick={(ev) => menuPortal.add(settings, ev.currentTarget, v4(), 'delete')}
					>
						<IconTrashFilled />
						<LocaleMessage {...localeStrings.tentCategories.delete} />
					</Menu.Button>
				</Menu.Group>
			{/if}
		</Menu.List>
	</Menu.Root>
{/snippet}

<Accordion
	expanded
	noBackground
>
	{#snippet header()}
		<div
			class="header"
			data-droppable-over="none"
			{@attach draggable({ id: category.id, groups: ['category'] })}
			{@attach droppable({
				id: category.id,
				acceptGroups: ['category'],
				disallowIds: [category.id],
				onDrop,
			})}
			{@attach rightClickMenu(menuPortal, contextMenu)}
		>
			<Para level="h4">
				{category.name}
			</Para>
			{#if category.description}
				<Para level="sub0">
					{category.description}
				</Para>
			{/if}
		</div>
	{/snippet}
	{@render children()}
</Accordion>

<style lang="scss">
	@use '@campground/ui' as *;

	.header {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex: 1;

		&::before {
			position: absolute;
			content: '';

			height: 0.25rem;

			left: 0;
			right: 0;
			border-radius: var(--radius-md);
			background: transparent;

			top: -0.25rem;

			transition: background $transition-time-md;
		}

		&[data-droppable-over]:not([data-droppable-over='none'])::before {
			background: linear-gradient(to right, var(--primary-glowFirst), var(--primary-glowSecond));
		}
	}
</style>
