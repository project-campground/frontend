<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		inviteId: {
			id: 'app.invites.id',
			defaultMessage: 'Invite ID',
			description: 'The invite ID column in the settings',
		},
		nominative: {
			id: 'app.invites.nominative',
			defaultMessage: 'invites',
			description: 'The invite in the nominative case in the settings',
		},
		accusative: {
			id: 'app.invites.accusative',
			defaultMessage: 'the invites',
			description: 'The invite in the accusative case in the settings',
		},
	});
</script>

<script lang="ts">
	import { Card, Para } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getAppview } from '$lib/context/api.js';
	import { DataTable } from '@campground/data';
	import { defineMessages } from '@formatjs/svelte-intl';
	import type { CampsiteInviteViewBasic } from '$lib/types/campground/invites.js';
	import { User } from '$lib/components/users/index.js';
	import { Datestamp } from '$lib/components/content/index.js';

	const settings = getSettings();
	const locale = getLocale();

	$effect(() => {
		settings.setForm(null);
	});

	const appview = getAppview();
	const campsiteContext = getCampsiteContext();

	async function fetchInvites(count: number, offset: number) {
		return appview.invites
			.getMany(campsiteContext.campsite!.id, offset, count)
			.then((resp) => resp.invites);
	}
</script>

{#snippet createdBy(invite: CampsiteInviteViewBasic)}
	<User.Display user={invite.createdBy} />
{/snippet}
{#snippet createdAt(invite: CampsiteInviteViewBasic)}
	<Datestamp date={invite.createdAt} />
{/snippet}

<Card.Root
	size="lg"
	flex={1}
	level="subtle"
	gridColumn="2/4"
>
	<Card.Content>
		<Para
			level="h2"
			mb="lg"
		>
			<LocaleMessage {...localeStrings.invites.invites} />
		</Para>
		<DataTable
			columns={[
				{ prop: 'id', header: locale.formatMessage(localeMessages.inviteId) },
				{
					prop: 'createdBy',
					header: locale.formatMessage(localeStrings.content.createdBy),
					Component: createdBy,
				},
				{
					prop: 'createdAt',
					header: locale.formatMessage(localeStrings.content.createdAt),
					Component: createdAt,
				},
			]}
			maxItems={50}
			entryType={{
				nominative: locale.formatMessage(localeMessages.nominative),
				accusative: locale.formatMessage(localeMessages.accusative),
			}}
			fetch={fetchInvites}
		/>
	</Card.Content>
</Card.Root>
