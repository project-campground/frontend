<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		user: {
			id: 'app.memberBans.user',
			defaultMessage: 'Banned user',
			description: 'The banned user column in the settings',
		},
		nominative: {
			id: 'app.memberBans.nominative',
			defaultMessage: 'bans',
			description: 'The bans in the nominative case in the settings',
		},
		accusative: {
			id: 'app.memberBans.accusative',
			defaultMessage: 'the bans',
			description: 'The bans in the accusative case in the settings',
		},
		noReason: {
			id: 'app.memberBans.noReason',
			defaultMessage: 'Reason unspecified',
			description: 'No reason specified for the ban in the settings',
		},
	});
</script>

<script lang="ts">
	import { Card, Para, TextBlock } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getAppview } from '$lib/context/api.js';
	import { DataTable } from '@campground/data';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { User } from '$lib/components/users/index.js';
	import { Datestamp } from '$lib/components/content/index.js';
	import type { MemberBanView } from '$lib/types/campground/membership.js';

	const settings = getSettings();
	const locale = getLocale();

	$effect(() => {
		settings.setForm(null);
	});

	const appview = getAppview();
	const campsiteContext = getCampsiteContext();

	async function fetchMemberBans(count: number, offset: number) {
		return appview.memberBans
			.getMany(campsiteContext.campsite!.id, offset, count)
			.then((resp) => resp.memberBans.map((x) => ({ id: x.userId, ...x })));
	}
</script>

{#snippet user(ban: MemberBanView)}
	<User.Display user={ban.user} />
{/snippet}
{#snippet reason(ban: MemberBanView)}
	{#if ban.reason}
		<TextBlock>{ban.reason}</TextBlock>
	{:else}
		<TextBlock level="subtext"></TextBlock>
	{/if}
{/snippet}
{#snippet createdAt(ban: MemberBanView)}
	<Datestamp date={ban.createdAt} />
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
			<LocaleMessage {...localeStrings.memberBans.memberBans} />
		</Para>
		<DataTable
			columns={[
				{ prop: 'user', header: locale.formatMessage(localeMessages.user), Component: user },
				{
					prop: 'reason',
					header: locale.formatMessage(localeStrings.memberBans.reason),
					Component: reason,
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
			fetch={fetchMemberBans}
		/>
	</Card.Content>
</Card.Root>
