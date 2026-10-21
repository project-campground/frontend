<script lang="ts">
	import { getAppview } from '$lib/context/api.js';

	import {
		Form,
		FieldControl,
		FieldError,
		ImageField,
		FieldLabel,
		SubmitButton,
		TextField,
	} from '@campground/form';
	import { LocaleMessage } from '@campground/locale';
	import { Dialog, Section, Stack, Group, getModal } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.js';
	import { localeStrings } from '$lib/locale/index.js';

	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite!);
	const modal = getModal();

	async function onSubmit(value: Record<string, unknown>) {
		modal.closeModal();
		const bonfireContent = value as { name: string; description: string };

		return appview.bonfires.create(campsite.id, {
			...bonfireContent,
			position: (campsite!.bonfires.slice(-1)[0]?.position ?? 0) + 1,
		});
	}
</script>

<Dialog.Root>
	<Dialog.Header>
		<LocaleMessage {...localeStrings.bonfires.create} />
	</Dialog.Header>
	<Form {onSubmit}>
		<Dialog.Content>
			<Stack gap={2}>
				<Section>
					<Group>
						<FieldControl
							id="avatarUri"
							required
						>
							<ImageField
								aspectRatio={1}
								width="4rem"
								radius="avatar"
							/>
							<FieldError />
						</FieldControl>
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
					</Group>
				</Section>
				<Section>
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
			</Stack>
		</Dialog.Content>
		<Dialog.Footer>
			<SubmitButton>
				<LocaleMessage {...localeStrings.content.create} />
			</SubmitButton>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
