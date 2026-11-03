<script
	lang="ts"
	module
>
	const messages = defineMessages({
		header: {
			id: `app.settings.delete.header`,
			defaultMessage: `Are you sure you want to delete ''{name}''?`,
			description: `Settings deletion page title`,
		},
		description: {
			id: `app.settings.delete.desc`,
			defaultMessage: `You cannot recover {accusative} once deleted.`,
			description: `Settings deletion page description`,
		},
		confirmLabel: {
			id: `app.settings.delete.confirmLabel`,
			defaultMessage: `Type ''{name}'' to confirm deletion`,
			description: `Label for text field confirming deletion in setting deletion page`,
		},
		error: {
			id: `app.settings.delete.error`,
			defaultMessage: `The text does not match the name`,
			description: `The error when delete confirmation field's value does not match the name of the content`,
		},
	});
</script>

<script lang="ts">
	import { getSettings } from '../../Settings/context.svelte.ts';
	import { Card, Para, Stack } from '@campground/ui';
	import type { PageProps } from './props.ts';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import {
		FieldControl,
		FieldError,
		FieldLabel,
		Form,
		SubmitButton,
		TextField,
	} from '@campground/form';
	import { localeStrings } from '#lib/locale/index.js';

	const settings = getSettings();
	const locale = getLocale();

	$effect(() => {
		settings.setForm(null);
	});
	const { accusative, name, requiresConfirmation, onDelete }: PageProps = $props();
</script>

<Card.Root
	gridColumn="2/4"
	level="subtle"
>
	<Card.Content flex={1}>
		<Stack
			direction="column"
			align="center"
			justify="center"
			flex={1}
		>
			<Stack
				gap={0.5}
				align="center"
			>
				<Para
					textAlign="center"
					level="h2"
				>
					<LocaleMessage
						{...messages.header}
						values={{ name }}
					/>
				</Para>
				<Para textAlign="justify">
					<LocaleMessage
						{...messages.description}
						values={{ accusative }}
					/>
				</Para>
			</Stack>
			<Form onSubmit={onDelete}>
				{#if requiresConfirmation}
					<FieldControl
						key="name"
						required
					>
						<FieldLabel>
							<LocaleMessage {...messages.confirmLabel} />
						</FieldLabel>
						<TextField
							placeholder={name}
							format={{ value: name, errorMessage: locale.formatMessage(messages.error) }}
						/>
						<FieldError />
					</FieldControl>
				{/if}
				<SubmitButton color="danger">
					<LocaleMessage {...localeStrings.content.confirmDelete} />
				</SubmitButton>
			</Form>
		</Stack>
	</Card.Content>
</Card.Root>
