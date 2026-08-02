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
	});
</script>

<script lang="ts">
	import { Form } from '$lib/Form/index.js';
	import { FormControl } from '$lib/FormControl/index.js';
	import FormLabel from '$lib/FormLabel/FormLabel.svelte';
	import { FormSubmit } from '$lib/FormSubmit/index.js';
	import { FormTextField } from '$lib/FormTextField/index.js';

	import { FormattedMessage, FormattedMessageGlobal, getLocaleContext } from '@campground/locale';

	import { Button, Dialog, Modal } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import type { FormImageDialogProps } from './props.ts';
	import { FormErrorLabel } from '$lib/FormErrorLabel/index.js';

	const modal = Modal.getModal();
	const intl = getLocaleContext();

	const { onSubmit }: FormImageDialogProps = $props();
</script>

<Dialog.Root size="auto">
	<Dialog.Header>
		<FormattedMessageGlobal id="form.upload.image" />
	</Dialog.Header>
	<Form onSubmit={(values) => (onSubmit(values), modal.closeModal())}>
		<Dialog.Content>
			<FormControl
				id="url"
				required
			>
				<FormLabel>
					<FormattedMessage {...localeMessages.imageUrl} />
				</FormLabel>
				<FormTextField
					placeholder="https://example.com/abc.png"
					format={{
						regex: /^(https?:\/\/)?([a-zA-Z0-9-_]+[.])+([A-Za-z]{2,})[/]/,
						errorMessage: $intl.formatMessage(localeMessages.imageUrlError),
					}}
				/>
				<FormErrorLabel />
			</FormControl>
		</Dialog.Content>
		<Dialog.Footer>
			<FormSubmit>
				<FormattedMessageGlobal id="form.upload.image" />
			</FormSubmit>
			<Button
				color="neutral"
				variant="plain"
				onclick={() => modal.closeModal()}
			>
				<FormattedMessageGlobal id="common.cancel" />
			</Button>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
