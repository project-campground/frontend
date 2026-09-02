<script lang="ts">
	import { getAppview } from '$lib/context/api.js';

	import {
		Form,
		FormControl,
		FormErrorLabel,
		FormImageField,
		FormLabel,
		FormSubmit,
		FormTextField,
	} from '@campground/form';
	import { LocaleMessage } from '@campground/locale';
	import { Dialog, Section, Stack, Modal, Group } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.js';
	import { localeStrings } from '$lib/locale/index.js';

	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
	const modal = Modal.getModal();

	async function onSubmit(value: Record<string, unknown>) {
		modal.closeModal();
		const bonfireContent = value as { name: string; description: string };

		return appview.bonfires.create(campsiteContext.campsite!.id, {
			...bonfireContent,
			position: (campsiteContext.campsite?.bonfires.slice(-1)[0]?.position ?? 0) + 1,
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
						<FormControl
							id="avatarUri"
							required
						>
							<FormImageField
								aspectRatio={1}
								width="4rem"
								radius="avatar"
							/>
							<FormErrorLabel />
						</FormControl>
						<FormControl
							id="name"
							required
						>
							<FormLabel>
								<LocaleMessage {...localeStrings.content.name} />
							</FormLabel>
							<FormTextField
								minlength={3}
								maxlength={48}
							/>
							<FormErrorLabel />
						</FormControl>
					</Group>
				</Section>
				<Section>
					<FormControl id="description">
						<FormLabel>
							<LocaleMessage {...localeStrings.content.topic} />
						</FormLabel>
						<FormTextField
							multirow
							minlength={0}
							maxlength={200}
						/>
						<FormErrorLabel />
					</FormControl>
				</Section>
			</Stack>
		</Dialog.Content>
		<Dialog.Footer>
			<FormSubmit>
				<LocaleMessage {...localeStrings.content.create} />
			</FormSubmit>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
