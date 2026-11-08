<script
	lang="ts"
	module
>
	const messages = defineMessages({
		allowedAmount: {
			id: `app.invites.allowedAmount`,
			defaultMessage: `Allowed invite uses`,
			description: `The amount of times that invite can be used`,
		},
	});
</script>

<script lang="ts">
	import { getAppview } from '#lib/context/api.js';

	import { FieldControl, FieldLabel, Form, NumberField, SubmitButton } from '@campground/form';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import { Dialog, Divider, Section, TextInput, Button, Stack, getModal } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconEyeFilled } from '@tabler/icons-svelte';
	import type HTTPInviteManager from '#lib/api/http/invite.ts';

	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite!);
	const locale = getLocale();
	const modal = getModal();

	let id: string | null = $state(null);
	let show: boolean = $state(false);
	let url: string = $derived(`${window.location.origin}/i/${id}@${campsiteContext.domain}`);

	async function createInvite(props: Parameters<typeof HTTPInviteManager.prototype.create>[1]) {
		return appview.invites.create(campsite.id, props).then((resp) => {
			id = resp.id;
			return resp;
		});
	}
	async function onSubmit(value: Record<string, unknown>) {
		return createInvite(value as { allowedAmount?: number | null; expiresAt?: string | null }).then(
			() => copyInvite(),
		);
	}
	async function onReveal() {
		if (!id) return await createInvite({}).then(() => (show = !show));

		return (show = !show);
	}
	function copyInvite() {
		return navigator.clipboard.writeText(url);
	}
</script>

<Dialog.Root>
	<Dialog.Header>
		<LocaleMessage {...localeStrings.invites.create} />
	</Dialog.Header>
	<Form {onSubmit}>
		<Dialog.Content>
			<Stack align="stretch">
				<TextInput
					type={show ? 'text' : 'password'}
					value={url}
					readonly
				>
					{#snippet right()}
						<Button
							onclick={onReveal}
							color="neutral"
							variant="soft"
							padding="equal"
						>
							<IconEyeFilled size="1rem" />
						</Button>
					{/snippet}
				</TextInput>
				<Divider />
				<Section>
					<FieldControl key="allowedAmount">
						<FieldLabel>
							<LocaleMessage {...localeStrings.invites.allowedAmount} />
						</FieldLabel>
						<NumberField
							max={1000}
							min={1}
							placeholder={locale.formatMessage(localeStrings.common.infinite)}
						/>
					</FieldControl>
				</Section>
			</Stack>
		</Dialog.Content>
		<Dialog.Footer>
			{#if id}
				<Button onclick={copyInvite}>
					<LocaleMessage {...localeStrings.common.copy} />
				</Button>
			{:else}
				<SubmitButton>
					<LocaleMessage {...localeStrings.common.copy} />
				</SubmitButton>
			{/if}
			<Button
				color="neutral"
				variant="plain"
				onclick={() => modal.closeModal()}
			>
				<LocaleMessage {...localeStrings.common.cancel} />
			</Button>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
