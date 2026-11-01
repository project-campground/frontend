<script lang="ts">
	import { localeStrings } from '#lib/locale/index.js';
	import { LocaleMessage } from '@campground/locale';
	import { Card, Para, Stack, Group } from '@campground/ui';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.js';
	import { getAppview } from '#lib/context/api.js';
	import { Form } from '@campground/form';
	import { getSettings } from '../../Settings/context.svelte.js';
	import PermissionItem from './PermissionButton.svelte';
	import type {
		CampsitePermissionView,
		CampsitePermissionViewDetailed,
	} from '#lib/types/campground/permissions.js';
	import type { PageProps } from './props.ts';
	import { ItemListSettingsContext, setItemListSettings } from '../context.svelte.ts';
	import Permissions from './Permissions.svelte';

	const campsiteContext = getCampsiteContext();
	const appview = getAppview();
	const settings = getSettings();

	const { ...locationQueries }: PageProps = $props();

	const defaultRole = $derived(campsiteContext.defaultRole!);
	const defaultUndefinedPermission: CampsitePermissionViewDetailed = $derived({
		...locationQueries,
		role: defaultRole,
		permissions: 0n,
		createdAt: new Date().toISOString(),
		createdBy: appview.actorDid!,
		updatedBy: appview.actorDid!,
		updatedAt: new Date().toISOString(),
	});
	// svelte-ignore state_referenced_locally
	const context = new ItemListSettingsContext<CampsitePermissionViewDetailed>(
		defaultUndefinedPermission,
	);
	setItemListSettings(context);

	const permissionsOutput = $derived(await appview.permissions.get(locationQueries));
	const defaultPermission: CampsitePermissionViewDetailed = $derived(
		permissionsOutput.permissions.find((x) => x.role?.id === defaultRole.id)
			?? defaultUndefinedPermission,
	);
	const permissions: CampsitePermissionViewDetailed[] = $derived(
		defaultPermission !== defaultUndefinedPermission ?
			permissionsOutput.permissions
		:	[...permissionsOutput.permissions, defaultPermission],
	);

	$effect(() => {
		context.selected = defaultPermission;
	});

	let form: Form | null = $state(null);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	async function updatePermission(data: Pick<CampsitePermissionView, 'permissions'>) {
		return appview.permissions.update(
			{
				...locationQueries,
				roleId: context.selected.role?.id,
				actor: context.selected.member?.user.did,
			},
			data,
		);
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
				<!-- <Button
					variant="plain"
					color="neutral"
					padding="equal"
					onclick={createRole}
				>
					<IconPlusFilled size="1rem" />
				</Button> -->
			</Group>
		</Para>
		<Stack gap={0.5}>
			{#each permissions as permission (permission.role?.id ?? permission.member?.user.did)}
				<PermissionItem {permission} />
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
			bind:this={form}
			flex={1}
			hideOverflow
			onSubmit={(values) => updatePermission(values as { permissions: bigint })}
		>
			<Permissions queries={locationQueries} />
		</Form>
	</Card.Content>
</Card.Root>
