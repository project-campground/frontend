<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		header: {
			id: 'app.gettingStarted.final.header',
			defaultMessage: "You''re done!",
			description: 'Getting started final page header',
		},
		description: {
			id: 'app.gettingStarted.final.desc',
			defaultMessage: "You can now use Campground. Press ''{button}'' to start using Campground.",
			description: 'Getting started final page description',
		},
		button: {
			id: 'app.gettingStarted.final.button',
			defaultMessage: 'Start using Campground',
			description: 'Getting started final page button',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage, getLocale } from '@campground/locale';

	import {
		Button,
		FlexCenter,
		PagePlaceholder,
		PagePlaceholderIcon,
		Para,
		Stack,
		Alert,
		theme,
		getModal,
	} from '@campground/ui';
	import { IconArrowRight, IconExclamationCircleFilled } from '@tabler/icons-svelte';
	import type { GettingStarted } from './context.svelte.ts';
	import { getSession } from '$lib/api/session/Session.svelte.js';

	const intl = getLocale();

	interface Props {
		gettingStarted: GettingStarted;
	}
	const { gettingStarted }: Props = $props();
	const modal = getModal();
	const session = getSession();

	let error: Error | null = $state(null);

	async function finalize() {
		try {
			await session.atproto.profileRecords.create(gettingStarted.profile);
			await session.preferences.updateGlobal({ appearance: { theme: $theme } });

			modal.closeModal();
		} catch (err) {
			error = err as Error;
		}
	}
</script>

<FlexCenter>
	<PagePlaceholder icon={PagePlaceholderIcon.Ok}>
		{#snippet title()}
			<LocaleMessage {...localeMessages.header} />
		{/snippet}
		<Stack
			gap={3}
			align="center"
		>
			<Para>
				<LocaleMessage
					{...localeMessages.description}
					values={{ button: intl.formatMessage(localeMessages.button) }}
				/>
			</Para>
			<Button onclick={finalize}>
				<LocaleMessage {...localeMessages.button} />
				<IconArrowRight />
			</Button>
			{#if error}
				<Alert color="danger">
					{#snippet icon()}
						<IconExclamationCircleFilled />
					{/snippet}
					{error}
				</Alert>
			{/if}
		</Stack>
	</PagePlaceholder>
</FlexCenter>
