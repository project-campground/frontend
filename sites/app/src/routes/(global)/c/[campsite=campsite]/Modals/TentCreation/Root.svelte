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
		FieldControl,
		FieldError,
		FieldLabel,
		RadioField,
		SubmitButton,
		TextField,
	} from '@campground/form';
	import { LocaleMessage } from '@campground/locale';
	import { Dialog, Section, Grid, Stack, Modal, getModal } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconHash, IconListDetailsFilled, IconTent } from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import { localeStrings } from '$lib/locale/index.js';

	let what: 'tent' | 'category' = $state('tent');
	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
	const modal = getModal();
	const campsite = $derived(campsiteContext.campsite);
	const openBonfire = $derived(campsiteContext.openBonfire);

	async function onSubmit({ what, ...content }: Record<string, unknown>) {
		modal.closeModal();

		return what === 'category' ?
				createCategory(content as { name: string; description: string })
			:	createTent(content as { name: string; description: string; type: TentType });
	}
	async function createCategory(value: { name: string; description: string }) {
		return appview.categories.create(campsite!.id, openBonfire!.bonfireId, {
			...value,
			position: (openBonfire!.categories.slice(-1)[0]?.position ?? 0) + 1,
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
		const tentPositionNearby =
			openBonfire?.tents.filter((x) => !x.categoryId).map((x) => x.position) ?? [];
		const bottomTentPosition = tentPositionNearby.length ? Math.max(...tentPositionNearby) : -1;

		return appview.tents.create(campsite!.id, openBonfire!.bonfireId, {
			...value,
			type: typeToInteger[type],
			position: bottomTentPosition + 1,
		});
	}
</script>

<Dialog.Root>
	<Dialog.Header>
		<LocaleMessage {...localeStrings.tents.create} />
	</Dialog.Header>
	<Form {onSubmit}>
		<Dialog.Content>
			<Stack gap={2}>
				<Section>
					<FieldControl
						id="what"
						bind:value={what}
						defaultValue="tent"
					>
						<RadioField.List>
							<Grid.Root
								columns={2}
								gap={0.5}
							>
								<Grid.Cell>
									<RadioField.Card value="tent">
										{#snippet header()}
											<IconTent />
											Tent
										{/snippet}
									</RadioField.Card>
								</Grid.Cell>
								<Grid.Cell>
									<RadioField.Card value="category">
										{#snippet header()}
											<IconListDetailsFilled />
											Category
										{/snippet}
									</RadioField.Card>
								</Grid.Cell>
							</Grid.Root>
						</RadioField.List>
					</FieldControl>
				</Section>
				<Section>
					<FieldControl
						id="name"
						required
					>
						<FieldLabel>
							<LocaleMessage {...localeStrings.content.name} />
						</FieldLabel>
						<TextField
							minlength={3}
							maxlength={48}
						/>
						<FieldError />
					</FieldControl>
					<FieldControl id="description">
						<FieldLabel>
							<LocaleMessage {...localeStrings.content.topic} />
						</FieldLabel>
						<TextField
							multirow
							minlength={0}
							maxlength={200}
						/>
						<FieldError />
					</FieldControl>
				</Section>
				<Section>
					{#if what === 'tent'}
						<FieldControl
							id="type"
							defaultValue="text"
							required
						>
							<FieldLabel>
								<LocaleMessage {...messages.type} />
							</FieldLabel>
							<RadioField.List>
								<Grid.Root
									columns={3}
									gap={0.5}
								>
									<Grid.Cell>
										<RadioField.Button value="text">
											<IconHash />
											<LocaleMessage {...localeStrings.tents.text} />
										</RadioField.Button>
									</Grid.Cell>
								</Grid.Root>
							</RadioField.List>
						</FieldControl>
					{/if}
				</Section>
			</Stack>
		</Dialog.Content>
		<Dialog.Footer>
			<SubmitButton>
				<LocaleMessage {...localeStrings.content.create} />
			</SubmitButton>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
