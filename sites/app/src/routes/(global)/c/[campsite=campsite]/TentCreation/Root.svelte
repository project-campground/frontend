<script
	lang="ts"
	module
>
	const messages = defineMessages({
		type: {
			id: 'app.tents.type',
			defaultMessage: 'Tent type',
			description: "The type of the tent's content",
		},
	});
	const typeToInteger: Record<TentType, number> = { text: 0 };
</script>

<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import type { TentType } from '$lib/types/campground/tent.js';

	import {
		Form,
		FormControl,
		FormErrorLabel,
		FormLabel,
		FormRadio,
		FormSubmit,
		FormTextField,
	} from '@campground/form';
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
	import { Dialog, Section, Grid, Stack, Modal } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconHash, IconListDetailsFilled, IconTent } from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../context.svelte.ts';

	let what: 'tent' | 'category' = $state('tent');
	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
	const modal = Modal.getModal();

	async function onSubmit({ what, ...content }: Record<string, unknown>) {
		modal.closeModal();

		return what === 'category' ?
				createCategory(content as { name: string; description: string })
			:	createTent(content as { name: string; description: string; type: TentType });
	}
	async function createCategory(value: { name: string; description: string }) {
		return appview.categories.create(campsiteContext.campsite!.id, campsiteContext.tents!.bonfireId, {
			...value,
			position: (campsiteContext.tents!.categories.slice(-1)[0]?.position ?? 0) + 1,
		});
	}
	async function createTent({
		type,
		...value
	}: {
		name: string;
		description: string;
		type: TentType;
	}) {
		return appview.tents.create(campsiteContext.campsite!.id, campsiteContext.tents!.bonfireId, {
			...value,
			type: typeToInteger[type],
			position: (campsiteContext.tents!.categories.slice(-1)[0]?.position ?? 0) + 1,
		});
	}
</script>

<Dialog.Root>
	<Dialog.Header>
		<FormattedMessageGlobal id="app.tents.create" />
	</Dialog.Header>
	<Form {onSubmit}>
		<Dialog.Content>
			<Stack gap={2}>
				<Section>
					<FormControl
						id="what"
						bind:value={what}
						defaultValue="tent"
					>
						<FormRadio.List>
							<Grid.Root
								columns={2}
								gap={0.5}
							>
								<Grid.Cell>
									<FormRadio.Card value="tent">
										{#snippet header()}
											<IconTent />
											Tent
										{/snippet}
									</FormRadio.Card>
								</Grid.Cell>
								<Grid.Cell>
									<FormRadio.Card value="category">
										{#snippet header()}
											<IconListDetailsFilled />
											Category
										{/snippet}
									</FormRadio.Card>
								</Grid.Cell>
							</Grid.Root>
						</FormRadio.List>
					</FormControl>
				</Section>
				<Section>
					<FormControl
						id="name"
						required
					>
						<FormLabel>
							<FormattedMessageGlobal id="info.name" />
						</FormLabel>
						<FormTextField
							minlength={3}
							maxlength={48}
						/>
						<FormErrorLabel />
					</FormControl>
					<FormControl id="description">
						<FormLabel>
							<FormattedMessageGlobal id="info.topic" />
						</FormLabel>
						<FormTextField
							multirow
							minlength={0}
							maxlength={200}
						/>
						<FormErrorLabel />
					</FormControl>
				</Section>
				<Section>
					{#if what === 'tent'}
						<FormControl
							id="type"
							defaultValue="text"
							required
						>
							<FormLabel>
								<FormattedMessage {...messages.type} />
							</FormLabel>
							<FormRadio.List>
								<Grid.Root
									columns={3}
									gap={0.5}
								>
									<Grid.Cell>
										<FormRadio.Button value="text">
											<IconHash />
											<FormattedMessageGlobal id="app.tents.text" />
										</FormRadio.Button>
									</Grid.Cell>
								</Grid.Root>
							</FormRadio.List>
						</FormControl>
					{/if}
				</Section>
			</Stack>
		</Dialog.Content>
		<Dialog.Footer>
			<FormSubmit>
				<FormattedMessageGlobal id="common.create" />
			</FormSubmit>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
