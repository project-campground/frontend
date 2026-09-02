<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		imageUrl: {
			id: 'form.image.url',
			defaultMessage: 'Image URL',
			description: 'The URL to the image in image upload modal',
		},
		imageUrlError: {
			id: 'form.image.url.error',
			defaultMessage: 'Invalid image URL',
			description: 'Error in URL formatting to the image in image upload modal',
		},
		imageUpload: {
			id: 'form.image.upload',
			defaultMessage: 'Upload image',
			description: 'The button for uploading image',
		},
		cancel: {
			id: 'form.image.cancel',
			defaultMessage: 'Cancel',
			description: 'The button for cancelling uploading an image',
		},
	});
</script>

<script lang="ts">
	import { Form } from '$lib/Form/index.js';
	import { FormControl } from '$lib/FormControl/index.js';
	import FormLabel from '$lib/FormLabel/Root.svelte';
	import { FormSubmit } from '$lib/FormSubmit/index.js';
	import { FormTextField } from '$lib/FormTextField/index.js';

	import { LocaleMessage, getLocale } from '@campground/locale';

	import { Button, Dialog, getModal } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import type { FormImageDialogProps } from './props.ts';
	import { FormErrorLabel } from '$lib/FormErrorLabel/index.js';

	const modal = getModal();
	const locale = getLocale();

	const { onSubmit }: FormImageDialogProps = $props();
</script>

<Dialog.Root size="auto">
	<Dialog.Header>
		<LocaleMessage {...localeMessages.imageUpload} />
	</Dialog.Header>
	<Form onSubmit={(values) => (onSubmit(values), modal.closeModal())}>
		<Dialog.Content>
			<FormControl
				id="url"
				required
			>
				<FormLabel>
					<LocaleMessage {...localeMessages.imageUrl} />
				</FormLabel>
				<FormTextField
					placeholder="https://example.com/abc.png"
					format={{
						regex: /^(https?:\/\/)?([a-zA-Z0-9-_]+[.])+([A-Za-z]{2,})[/]/,
						errorMessage: locale.formatMessage(localeMessages.imageUrlError),
					}}
				/>
				<FormErrorLabel />
			</FormControl>
		</Dialog.Content>
		<Dialog.Footer>
			<FormSubmit>
				<LocaleMessage {...localeMessages.imageUpload} />
			</FormSubmit>
			<Button
				color="neutral"
				variant="plain"
				onclick={() => modal.closeModal()}
			>
				<LocaleMessage {...localeMessages.cancel} />
			</Button>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
