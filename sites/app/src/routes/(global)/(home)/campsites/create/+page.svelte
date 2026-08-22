<script
	lang="ts"
	module
>
	const messages = defineMessages({
		appview: {
			id: 'app.campsites.appview',
			defaultMessage: "Campsite's Platform Instance",
			description: 'The title of the appview field in campsite creation',
		},
		appviewDesc: {
			id: 'app.campsites.appview.desc',
			defaultMessage:
				'This sets where the campsite will be made. It is recommended to keep it as it is if you have no idea what it does. This does not mean that you have to host anything yourself, but you can choose to do so.',
			description: 'The description of appview when creating a campsite',
		},
	});
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import {
		Form,
		FormControl,
		FormErrorLabel,
		FormImageField,
		FormLabel,
		FormSubmit,
		FormTextField,
	} from '@campground/form';
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
	import { Accordion, Avatar, Card, Group, Para, Stack, TextBlock, Alert } from '@campground/ui';
	import KnownAppviewOptions from '../../../KnownAppviewOptions.svelte';
	import { defaultAppview } from '$lib/api/api.config.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconInfoCircleFilled } from '@tabler/icons-svelte';

	const session = getSession();

	interface FormFields {
		name: string;
		description: string;
		avatar?: string;
		vanityUrl?: string | null;
		tags: string[];
		appview: string;
	}

	let name: string = $state('');
	let avatar: string | undefined | null = $state(null);

	async function createCampsite({ appview, ...props }: FormFields) {
		const appviewDomain = appview.split('/')[2];

		const createdCampsite = await session.atproto.createCampsiteInBackend(appviewDomain, props);

		return await Promise.all([
			session.preferences.addCampsiteToListGlobally(appview, createdCampsite.campsite.id),
			appview
				&& session.preferences.updateGlobal({
					instances: {
						domains: [appviewDomain, ...(session.preferences.global.instances?.domains ?? [])],
					},
				}),
		])
			.catch((err) => console.error('Error dealing with created campsite', err))
			.finally(() => goto(`/c/${createdCampsite.campsite.id}/t/${createdCampsite.defaultTent.id}`));
	}
</script>

<div class="page">
	<Card.Root
		level="subtle"
		size="xl"
	>
		<div class="grid">
			<Form onSubmit={(values) => createCampsite(values as FormFields)}>
				<Para level="h2">
					<FormattedMessageGlobal id="app.campsites.create" />
				</Para>
				<Group>
					<FormControl
						id="avatar"
						bind:value={avatar}
						required
					>
						<FormImageField
							radius="avatar"
							width="4rem"
							height="4rem"
						/>
					</FormControl>
					<FormControl
						id="name"
						bind:value={name}
						required
						flex={1}
					>
						<FormLabel>
							<FormattedMessageGlobal id="app.campsites.name" />
						</FormLabel>
						<FormTextField
							minlength={3}
							maxlength={48}
						/>
						<FormErrorLabel />
					</FormControl>
				</Group>
				<FormControl id="description">
					<FormLabel>
						<FormattedMessageGlobal id="info.topic" />
					</FormLabel>
					<FormTextField
						multirow
						maxlength={200}
					/>
					<FormErrorLabel />
				</FormControl>
				<Accordion>
					{#snippet header()}
						<FormattedMessage {...messages.appview} />
					{/snippet}
					<div class="appview">
						<FormControl
							id="appview"
							defaultValue={defaultAppview.url}
						>
							<FormTextField>
								{#snippet known()}
									<KnownAppviewOptions />
								{/snippet}
							</FormTextField>
							<Alert color="info">
								{#snippet icon()}
									<IconInfoCircleFilled />
								{/snippet}
								<FormattedMessage {...messages.appviewDesc} />
							</Alert>
							<FormErrorLabel />
						</FormControl>
					</div>
				</Accordion>
				<Group
					direction="row"
					directionMobile="column"
				>
					<FormSubmit>
						<FormattedMessageGlobal id="common.create" />
					</FormSubmit>
				</Group>
			</Form>
			<Stack align="stretch">
				<Card.Root>
					<Card.Overflow>
						<div class="campsite">
							<Stack gap={0}>
								{#if name}
									<TextBlock
										level="subheading"
										weight={700}
									>
										{name || ' '}
									</TextBlock>
								{:else}
									<TextBlock
										level="background"
										weight={700}
									>
										???
									</TextBlock>
								{/if}
								<TextBlock
									level="subtext"
									weight={700}
									fontSize={0.9}
								>
									<FormattedMessageGlobal
										id="app.campsites.members"
										values={{ count: 1 }}
									/>
								</TextBlock>
							</Stack>
							<Avatar
								src={avatar ?? undefined}
								size="md"
							>
								{name[0]}
							</Avatar>
						</div>
					</Card.Overflow>
				</Card.Root>
			</Stack>
		</div>
	</Card.Root>
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 7fr 4fr;
		gap: 2rem;
	}
	.page {
		display: flex;
		flex-direction: column;
		grid-column: 2 / 4;
		& > :global(section) {
			flex: 1;
		}
	}
	.campsite {
		display: flex;
		flex-direction: row-reverse;
		justify-content: start;
		align-items: center;
		padding: 0.5rem 1rem;
		gap: 1ch;
	}
	.appview {
		padding: 0.5rem 1rem;
	}
</style>
