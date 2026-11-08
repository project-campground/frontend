<script lang="ts">
	import { Section, Stack, TextBlock, Divider } from '@campground/ui';
	import { getItemListSettings } from '../../CommonSettings/context.svelte.ts';
	import { FieldControl, FlagField } from '@campground/form';
	import { PermissionFlag } from '#lib/util/constants.js';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import {
		IconLayout2Filled,
		IconMessage2Filled,
		IconPaletteFilled,
		IconUserFilled,
	} from '@tabler/icons-svelte';
	import type { RoleView } from '#lib/types/campground/roles.js';

	const roleContext = getItemListSettings<RoleView>();
</script>

<FieldControl
	key="permissions"
	defaultValue={roleContext.selected?.permissions ?? 0n}
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
					<FlagField.Single value={PermissionFlag.ManageCampsite}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageCampsite.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageCampsite.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.ManageBonfires}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageBonfires.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageBonfires.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.ManageTents}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageTents.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageTents.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.ManageRoles}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageRoles.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageRoles.description} />
					</FlagField.Single>
				</Stack>
			</Section>
			<Section>
				{#snippet header()}
					<TextBlock level="subheading">
						<IconUserFilled />
					</TextBlock>
					<LocaleMessage {...localeStrings.permissions.membership} />
				{/snippet}
				<Stack gap={1}>
					<FlagField.Single value={PermissionFlag.GiveRoles}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.giveRoles.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.giveRoles.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.MuteMembers}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.muteMembers.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.muteMembers.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.KickMembers}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.kickMembers.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.kickMembers.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.BanMembers}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.banMembers.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.banMembers.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.CreateInvites}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.createInvites.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.createInvites.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.ManageInvites}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageInvites.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageInvites.description} />
					</FlagField.Single>
				</Stack>
			</Section>
			<Section>
				{#snippet header()}
					<TextBlock level="subheading">
						<IconPaletteFilled />
					</TextBlock>
					<LocaleMessage {...localeStrings.permissions.customization} />
				{/snippet}
				<Stack gap={1}>
					<FlagField.Single value={PermissionFlag.ManageOthersIdentity}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageOthersIdentity.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageOthersIdentity.description} />
					</FlagField.Single>
					<FlagField.Single value={PermissionFlag.ManageSelfIdentity}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageSelfIdentity.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageSelfIdentity.description} />
					</FlagField.Single>
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
					<FlagField.Single value={PermissionFlag.ViewContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.viewContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.viewContent.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.CreateContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.createContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.createContent.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.ManageContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.manageContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.manageContent.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.CreatePrivateContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.createPrivateContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.createPrivateContent.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.LabelContent}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.labelContent.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.labelContent.description} />
					</FlagField.Single>
					<Divider />
					<FlagField.Single value={PermissionFlag.MentionMany}>
						{#snippet header()}
							<LocaleMessage {...localeStrings.permissions.mentionMany.title} />
						{/snippet}
						<LocaleMessage {...localeStrings.permissions.mentionMany.description} />
					</FlagField.Single>
				</Stack>
			</Section>
		</Stack>
	</FlagField.List>
</FieldControl>
