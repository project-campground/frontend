<script lang="ts">
	import { Form, FormSubmit } from '@campground/form';
	import { FormattedMessageGlobal } from '@campground/locale';
	import { Dialog } from '@campground/ui';
</script>

<Dialog.Root>
	<Dialog.Header>
		<FormattedMessageGlobal id="app.tents.create" />
	</Dialog.Header>
	<Form>
		<Dialog.Content>Aasdasdasd</Dialog.Content>
		<Dialog.Footer>
			<FormSubmit>
				<FormattedMessageGlobal id="common.create" />
			</FormSubmit>
		</Dialog.Footer>
	</Form>
</Dialog.Root>
