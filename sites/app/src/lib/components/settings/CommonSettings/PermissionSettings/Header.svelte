<script
	lang="ts"
	module
>
	const messages = defineMessages({
		allAdded: {
			id: 'app.permissions.settings.allAdded',
			defaultMessage: `All roles have been added`,
			description: `Tells the user that they cannot add more permissions, since all roles were added into permissions`,
		},
	});
</script>

<script lang="ts">
	import { localeStrings } from '#lib/locale/index.js';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import {
		Button,
		getMenuPortal,
		Group,
		MenuPortalInstance,
		Menu,
		TextBlock,
		tooltip,
	} from '@campground/ui';
	import { IconPlusFilled } from '@tabler/icons-svelte';
	import { getItemListSettings } from '../context.svelte.ts';
	import type { PermissionViewSettings, PermissionSettingsContext } from './context.svelte.ts';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import type { RoleView } from '#lib/types/campground/roles.js';
	import { defineMessages } from '@formatjs/svelte-intl';

	const menuPortal = getMenuPortal();
	const campsiteContext = getCampsiteContext();
	const context = getItemListSettings<PermissionViewSettings>() as PermissionSettingsContext;
	const usedRoleIds = $derived(context.permissions.filter((x) => x.role?.id).map((x) => x.role!.id));
	const unusedRoles = $derived(campsiteContext?.roles?.filter((x) => !usedRoleIds.includes(x.id)));

	const locale = getLocale();

	function addPermission(role: RoleView) {
		const newPermission = { role, permissions: 0n };
		context.permissions = [...context.permissions, newPermission];
		context.selected = newPermission;
	}
</script>

{#snippet permissionMenu(instance: MenuPortalInstance<Event>)}
	<Menu.Root {instance}>
		<Menu.List>
			<Menu.Group>
				{#each unusedRoles as role (role.id)}
					<Menu.Button onclick={() => addPermission(role)}>
						<IconPlusFilled size="1rem" />
						{role.name}
					</Menu.Button>
				{/each}
			</Menu.Group>
		</Menu.List>
	</Menu.Root>
{/snippet}
<Group
	wrap="nowrap"
	gap={0}
>
	<TextBlock
		flex={1}
		overflow="ellipsis"
	>
		<LocaleMessage {...localeStrings.permissions.permissions} />
	</TextBlock>
	<Button
		variant="plain"
		color="neutral"
		padding="equal"
		onclick={(ev) => menuPortal.add(permissionMenu, ev.currentTarget)}
		disabled={!unusedRoles?.length}
		{@attach tooltip(menuPortal, locale.formatMessage(messages.allAdded))}
	>
		<IconPlusFilled size="1rem" />
	</Button>
</Group>
