<script lang="ts">
	import { Section, Stack, TextBlock, Divider } from '@campground/ui';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getRoleSettings } from './context.svelte.ts';
	import { FieldControl, FlagField, DictionaryField } from '@campground/form';
	import { ContentPermission, GeneralPermission } from '$lib/util/constants.js';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import type { PermissionsDictionary } from '$lib/types/campground/permissions.js';
	import {
		IconLayout2Filled,
		IconMessage2Filled,
		IconPaletteFilled,
		IconUserFilled,
	} from '@tabler/icons-svelte';

	const roleContext = getRoleSettings();
</script>

<DictionaryField id="permissions">
	<Stack gap={4}>
		<FieldControl
			id={'general' satisfies keyof PermissionsDictionary}
			defaultValue={roleContext.selectedRole?.permissions.general}
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
							<FlagField.Single value={GeneralPermission.ManageCampsite}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.manageCampsite.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.manageCampsite.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.ManageBonfires}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.manageBonfires.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.manageBonfires.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.ManageTents}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.manageTents.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.manageTents.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.ManageRoles}>
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
							<FlagField.Single value={GeneralPermission.GiveRoles}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.giveRoles.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.giveRoles.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.MuteMembers}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.muteMembers.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.muteMembers.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.KickMembers}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.kickMembers.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.kickMembers.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.BanMembers}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.banMembers.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.banMembers.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.CreateInvites}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.createInvites.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.createInvites.description} />
							</FlagField.Single>
							<Divider />
							<FlagField.Single value={GeneralPermission.ManageInvites}>
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
							<FlagField.Single value={GeneralPermission.ManageOthersIdentity}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.manageOthersIdentity.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.manageOthersIdentity.description} />
							</FlagField.Single>
							<FlagField.Single value={GeneralPermission.ManageSelfIdentity}>
								{#snippet header()}
									<LocaleMessage {...localeStrings.permissions.manageSelfIdentity.title} />
								{/snippet}
								<LocaleMessage {...localeStrings.permissions.manageSelfIdentity.description} />
							</FlagField.Single>
						</Stack>
					</Section>
				</Stack>
			</FlagField.List>
		</FieldControl>
		<FieldControl
			id={'content' satisfies keyof PermissionsDictionary}
			defaultValue={roleContext.selectedRole?.permissions.content}
		>
			<FlagField.List>
				<Section>
					{#snippet header()}
						<TextBlock level="subheading">
							<IconMessage2Filled />
						</TextBlock>
						<LocaleMessage {...localeStrings.permissions.content} />
					{/snippet}
					<Stack gap={1}>
						<FlagField.Single value={ContentPermission.ViewContent}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.viewContent.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.viewContent.description} />
						</FlagField.Single>
						<Divider />
						<FlagField.Single value={ContentPermission.CreateContent}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.createContent.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.createContent.description} />
						</FlagField.Single>
						<Divider />
						<FlagField.Single value={ContentPermission.ManageContent}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.manageContent.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.manageContent.description} />
						</FlagField.Single>
						<Divider />
						<FlagField.Single value={ContentPermission.CreatePrivateContent}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.createPrivateContent.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.createPrivateContent.description} />
						</FlagField.Single>
						<Divider />
						<FlagField.Single value={ContentPermission.LabelContent}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.labelContent.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.labelContent.description} />
						</FlagField.Single>
						<Divider />
						<FlagField.Single value={ContentPermission.MentionMany}>
							{#snippet header()}
								<LocaleMessage {...localeStrings.permissions.mentionMany.title} />
							{/snippet}
							<LocaleMessage {...localeStrings.permissions.mentionMany.description} />
						</FlagField.Single>
					</Stack>
				</Section>
			</FlagField.List>
		</FieldControl>
	</Stack>
</DictionaryField>
