<script
	lang="ts"
	module
>
	const messages = defineMessages({
		title: {
			id: `app.instances.title`,
			defaultMessage: 'My instances',
			description: 'The title of the instance list',
		},
		description: {
			id: `app.instances.desc`,
			defaultMessage: 'See all the instances that you have saved.',
			description: 'The description of the instance list',
		},
		emptyTitle: {
			id: `app.instances.empty`,
			defaultMessage: 'You are not on any instance',
			description: 'The title of the empty instance list',
		},
		emptyDescription: {
			id: `app.instances.empty.desc`,
			defaultMessage:
				'There are no instances that you have joined or the instance list has been cleared.',
			description: 'The description of the empty instance list',
		},
	});
</script>

<script lang="ts">
	import { Stack, Card, PagePlaceholder, FlexCenter, Para } from '@campground/ui';
	import AppviewInstance from './AppviewInstance.svelte';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.ts';

	const session = getSession();
	let instanceList = $state.raw(new Set(session.preferences.full.instances?.domains ?? []));

	session.preferences.onInit(
		() => (instanceList = new Set(session.preferences.full.instances?.domains ?? [])),
	);
</script>

<Card.Root
	level="subtle"
	size="xl"
	gridColumn="2/4"
	gap={2}
	overflow="auto"
>
	<Stack gap={0.5}>
		<Para level="h2">
			<LocaleMessage {...messages.title} />
		</Para>
		<Para level="paragraph">
			<LocaleMessage {...messages.description} />
		</Para>
	</Stack>
	<Stack gap={1}>
		{#each instanceList as instance (instance)}
			<AppviewInstance domain={instance} />
		{/each}
		{#if !instanceList.size}
			<FlexCenter>
				<PagePlaceholder.Root icon={PagePlaceholder.Icon.Empty}>
					{#snippet title()}
						<LocaleMessage {...messages.emptyTitle} />
					{/snippet}
					<LocaleMessage {...messages.emptyDescription} />
				</PagePlaceholder.Root>
			</FlexCenter>
		{/if}
	</Stack>
</Card.Root>
