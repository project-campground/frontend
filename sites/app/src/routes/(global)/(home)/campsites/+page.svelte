<script
	lang="ts"
	module
>
	const messages = defineMessages({
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
	import { Stack, Card, PagePlaceholder, FlexCenter } from '@campground/ui';
	import AppviewInstance from './AppviewInstance.svelte';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { LocaleMessage } from '@campground/locale';
	import { SvelteSet } from 'svelte/reactivity';

	const session = getSession();
	let instanceList = $state(new SvelteSet(session.preferences.full.instances?.domains ?? []));

	session.preferences.onInit(
		() => (instanceList = new SvelteSet(session.preferences.full.instances?.domains ?? [])),
	);
</script>

<Card.Root level="subtle">
	<Stack
		gap={1}
		flex={1}
	>
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

<Card.Root level="subtle">{instanceList.length}</Card.Root>
