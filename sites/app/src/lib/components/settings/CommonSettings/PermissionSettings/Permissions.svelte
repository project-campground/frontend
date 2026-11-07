<script lang="ts">
	import { Section, Stack, TextBlock, Divider } from '@campground/ui';
	import { FieldControl, FlagField } from '@campground/form';
	import { PermissionPosition } from '#lib/util/constants.js';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { IconLayout2Filled, IconMessage2Filled } from '@tabler/icons-svelte';
	import { getItemListSettings } from '../context.svelte.ts';
	import type { PermissionViewBasic } from '#lib/types/campground/permissions.js';
	import type { QueryProps } from './props.ts';

	const { queries }: { queries: QueryProps } = $props();
	const settings = getItemListSettings<PermissionViewBasic>();
	const permission = $derived(settings.selected);
</script>

<FieldControl
	key="permissions"
	defaultValue={permission.permissions}
>
	<FlagField.List>
		<Stack gap={4}>
			<Section>
				{#snippet header()}
					<TextBlock level="subheading">
						<IconLayout2Filled />
					</TextBlock>
					<LocaleMessage {...localeStrings.permissions.management} />
				{/snippet}
				<Stack gap={1}>
					{#if (queries as { bonfire_id?: string }).bonfire_id}
						<FlagField.Tristate position={PermissionPosition.ManageBonfires}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.manageBonfires.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.manageBonfires.description} />
						</FlagField.Tristate>
						<Divider />
					{/if}
					<FlagField.Tristate position={PermissionPosition.ManageTents}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageTents.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageTents.description} />
					</FlagField.Tristate>
					<Divider />
					<FlagField.Tristate position={PermissionPosition.ManageRoles}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.managePermissions.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.managePermissions.description} />
					</FlagField.Tristate>
				</Stack>
			</Section>
			<Section>
				{#snippet header()}
					<TextBlock level="subheading">
						<IconMessage2Filled />
					</TextBlock>
					<LocaleMessage {...localeStrings.permissions.content} />
				{/snippet}
				<Stack gap={1}>
					<FlagField.Tristate position={PermissionPosition.ViewContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.viewContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.viewContent.description} />
					</FlagField.Tristate>
					<Divider />
					<FlagField.Tristate position={PermissionPosition.CreateContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.createContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.createContent.description} />
					</FlagField.Tristate>
					<Divider />
					<FlagField.Tristate position={PermissionPosition.ManageContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageContent.description} />
					</FlagField.Tristate>
					<Divider />
					<FlagField.Tristate position={PermissionPosition.CreatePrivateContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.createPrivateContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.createPrivateContent.description} />
					</FlagField.Tristate>
					<Divider />
					<FlagField.Tristate position={PermissionPosition.LabelContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.labelContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.labelContent.description} />
					</FlagField.Tristate>
					<Divider />
					<FlagField.Tristate position={PermissionPosition.MentionMany}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.mentionMany.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.mentionMany.description} />
					</FlagField.Tristate>
				</Stack>
			</Section>
		</Stack>
	</FlagField.List>
</FieldControl>
