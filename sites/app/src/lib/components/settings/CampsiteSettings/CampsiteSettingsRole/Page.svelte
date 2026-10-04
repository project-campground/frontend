<script lang="ts">
	import { localeStrings } from '$lib/locale/index.js';
	import { LocaleMessage } from '@campground/locale';
	import { Card, Para, Stack, Group, Button, Tabs } from '@campground/ui';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import {
		IconBadgeFilled,
		IconChecklist,
		IconPlusFilled,
		IconSettingsFilled,
	} from '@tabler/icons-svelte';
	import Role from './Role.svelte';
	import { getAppview } from '$lib/context/api.js';
	import { RoleSettingsContext, setRoleSettings } from './context.svelte.ts';
	import { RoleFlag } from '$lib/util/constants.js';
	import { Form } from '@campground/form';
	import ProfilePage from './ProfilePage.svelte';

	const campsiteContext = getCampsiteContext();
	const appview = getAppview();

	const context = new RoleSettingsContext(
		campsiteContext.campsite!.roles.find((x) => (x.flags & RoleFlag.Default) === RoleFlag.Default)!
			.id,
		campsiteContext,
	);
	setRoleSettings(context);

	async function createRole() {
		return appview.roles.create(campsiteContext.campsite!.id, {
			name: 'New role',
			permissions: { general: 0, content: 0 },
			pingable: false,
			raised: false,
			colors: [],
			motion: 'none',
		});
	}
</script>

<Card.Root
	size="lg"
	flex={1}
	level="subtle"
>
	<Card.Content gap="sm">
		<Para level="h3">
			<Group>
				<Stack flex={1}>
					<LocaleMessage {...localeStrings.roles.roles} />
				</Stack>
				<Button
					variant="plain"
					color="neutral"
					padding="equal"
					onclick={createRole}
				>
					<IconPlusFilled size="1rem" />
				</Button>
			</Group>
		</Para>
		<Stack gap={0.5}>
			{#each campsiteContext.roles as role (role.id)}
				<Role {role} />
			{/each}
		</Stack>
	</Card.Content>
</Card.Root>
<Card.Root
	size="lg"
	level="subtle"
>
	<Card.Content
		flex={1}
		overflow="hidden"
	>
		<Form
			flex={1}
			hideOverflow
		>
			<Tabs.Root flex={1}>
				{#snippet tabs()}
					<Tabs.Item>
						<IconBadgeFilled />
						{context.selectedRole?.name}
					</Tabs.Item>
					<Tabs.Item>
						<IconChecklist />
						<LocaleMessage {...localeStrings.permissions.permissions} />
					</Tabs.Item>
					<Tabs.Item>
						<IconSettingsFilled />
						<LocaleMessage {...localeStrings.content.settings} />
					</Tabs.Item>
				{/snippet}
				<Tabs.Tab padding="md">
					<ProfilePage />
				</Tabs.Tab>
				<Tabs.Tab>Permissions</Tabs.Tab>
				<Tabs.Tab>Settings</Tabs.Tab>
			</Tabs.Root>
		</Form>
	</Card.Content>
</Card.Root>
