<script
	lang="ts"
	module
>
	const messages = defineMessages({
		header: {
			id: `app.campsites.leave.header`,
			defaultMessage: `Are you sure you want to leave?`,
			description: `The header for when you want to leave the campsite.`,
		},
		description: {
			id: `app.campsites.leave.description`,
			defaultMessage: `You will lose all your roles and will need to be invited again.`,
			description: `The description for when you want to leave the campsite.`,
		},
	});
</script>

<script lang="ts">
	import { getAppview } from '#lib/context/api.js';
	import { localeStrings } from '#lib/locale/index.js';
	import { LocaleMessage } from '@campground/locale';
	import { Button, Dialog, getModal, Para } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getCampsiteContext } from '../context.svelte.ts';
	import { goto } from '$app/navigation';

	const appview = getAppview();
	const modal = getModal();
	const campsiteContext = getCampsiteContext();

	async function leaveCampsite() {
		return appview.members
			.remove(campsiteContext.campsite!.id, campsiteContext.me!.user.did)
			.then(() => goto('/'));
	}
</script>

<Dialog.Root>
	<Dialog.Header>
		<LocaleMessage {...messages.header} />
	</Dialog.Header>
	<Dialog.Content>
		<Para>
			<LocaleMessage {...messages.description} />
		</Para>
	</Dialog.Content>
	<Dialog.Footer>
		<Button
			color="danger"
			onclick={leaveCampsite}
		>
			<LocaleMessage {...localeStrings.content.leave} />
		</Button>
		<Button
			color="neutral"
			variant="plain"
			onclick={() => modal.closeModal()}
		>
			<LocaleMessage {...localeStrings.common.cancel} />
		</Button>
	</Dialog.Footer>
</Dialog.Root>
