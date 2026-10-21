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
	import { Form } from '#lib/Form/index.js';
	import { FieldControl } from '#lib/FieldControl/index.js';
	import FieldLabel from '#lib/FieldLabel/Root.svelte';
	import { SubmitButton } from '#lib/SubmitButton/index.js';
	import { TextField } from '#lib/TextField/index.js';

	import { LocaleMessage, getLocale } from '@campground/locale';

	import { Button, Dialog, getModal } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import type { ImageDialogProps } from './props.ts';
	import { FieldError } from '#lib/FieldError/index.js';

	const modal = getModal();
	const locale = getLocale();

	const { onSubmit }: ImageDialogProps = $props();
</script>

<Dialog.Root size="auto">
	<Dialog.Header>
		<LocaleMessage {...localeMessages.imageUpload} />
	</Dialog.Header>
	<Form onSubmit={(values) => (onSubmit(values), modal.closeModal())}>
		<Dialog.Content>
			<FieldControl
				id="url"
				required
			>
				<FieldLabel>
					<LocaleMessage {...localeMessages.imageUrl} />
				</FieldLabel>
				<TextField
					placeholder="https://example.com/abc.png"
					format={{
						regex: /^(https?:\/\/)?([a-zA-Z0-9-_]+[.])+([A-Za-z]{2,})[/]/,
						errorMessage: locale.formatMessage(localeMessages.imageUrlError),
					}}
				/>
				<FieldError />
			</FieldControl>
		</Dialog.Content>
		<Dialog.Footer>
			<SubmitButton>
				<LocaleMessage {...localeMessages.imageUpload} />
			</SubmitButton>
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
