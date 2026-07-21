<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const messages = defineMessages({
		rememberAccount: {
			id: `app.auth.remember`,
			defaultMessage: `Remember your account locally?`,
			description: `Checkbox to remember account of the user in their local account list.`,
		},
		expectedIdentifier: {
			id: `info.handleOrEmail.error`,
			defaultMessage: `Expected an email or a user handle`,
			description: `Error when the submitted identifier is neither an email or a user handle`,
		},
		passwordPlaceholder: {
			id: `info.password.placeholder.login`,
			defaultMessage: `Password here`,
			description: `The placeholder for the password`,
		},
	});
</script>

<script lang="ts">
	import {
		Form,
		FormCheck,
		FormControl,
		FormErrorLabel,
		FormLabel,
		FormSubmit,
		FormTextField,
		type FormProps,
	} from '@campground/form';
	import { FormattedMessage, FormattedMessageGlobal, getLocaleContext } from '@campground/locale';
	import { Svg, Group, Section, Select, TextBlock, Accordion, Alert } from '@campground/ui';
	import { defaultPds, knownPds } from '$lib/api/api.config.js';
	import { IconWorldFilled, IconXFilled } from '@tabler/icons-svelte';
	import { getSession } from '$lib/api/session/Session.svelte';

	const domain = defaultPds.split('/')[2];
	const domainNoPort = domain.split(':')[0];
	const handleDomain = domainNoPort === 'localhost' ? 'test' : domainNoPort;

	const intl = getLocaleContext();

	const session = getSession();

	let error: Error | null = $state(null);

	const onSubmit: FormProps['onSubmit'] = async (fields: Record<string, any>) => {
		const { pds, save, ...details } = fields as {
			identifier: string;
			password: string;
			pds: string;
			save: Array<'confirm'>;
		};
		const saveDetails = save.length > 0;

		return await session
			.login(details, saveDetails, pds)
			.then(() => navigation.navigate('/'))
			.catch((err) => (error = err as Error));
	};

	const queryValues = $derived(new URLSearchParams(window.location.search));
</script>

<Form {onSubmit}>
	<Section>
		<FormControl
			id="identifier"
			defaultValue={queryValues.get('identifier') ?? ''}
			required
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.handleOrEmail" />
			</FormLabel>
			<FormTextField
				type="email"
				placeholder={`example_handle.${handleDomain}`}
				format={{
					regex:
						/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|([A-Za-z0-9_+-]{3,}[.])+([A-Za-z0-9_+-]{2,}))$/,
					errorMessage: $intl.formatMessage(messages.expectedIdentifier),
				}}
			/>
			<FormErrorLabel></FormErrorLabel>
		</FormControl>
		<FormControl
			id="password"
			required
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.password" />
			</FormLabel>
			<FormTextField
				type="password"
				placeholder={$intl.formatMessage(messages.passwordPlaceholder)}
			/>
			<FormErrorLabel></FormErrorLabel>
		</FormControl>
		<FormControl id="save">
			<FormCheck.List>
				<FormCheck.Item value="confirm">
					{#snippet header()}
						<FormattedMessage {...messages.rememberAccount} />
					{/snippet}
				</FormCheck.Item>
			</FormCheck.List>
		</FormControl>
	</Section>
	<Accordion gap="xs">
		{#snippet header()}
			<FormattedMessageGlobal id="info.pds" />
		{/snippet}
		<FormControl
			id="pds"
			defaultValue={queryValues.get('server') ?? defaultPds}
			required
		>
			<FormTextField
				placeholder={defaultPds}
				format={{
					regex: /^(https?[:]\/\/)(localhost[:][0-9]{4,}|([A-Za-z0-9_+-]+[.])+([A-Za-z0-9_+-]{2,}))$/,
					errorMessage: $intl.formatMessage(messages.expectedIdentifier),
				}}
			>
				{#snippet left()}
					<IconWorldFilled />
				{/snippet}
				{#snippet known()}
					{#each knownPds as pds}
						<Select.Option
							value={pds.url}
							color={pds.color}
						>
							<Svg.Logo size={2} />
							<TextBlock>
								{pds.name ?? pds.url}
							</TextBlock>
						</Select.Option>
					{/each}
				{/snippet}
			</FormTextField>
			<FormErrorLabel></FormErrorLabel>
		</FormControl>
	</Accordion>
	<Section>
		<Group reversed>
			<FormSubmit />
		</Group>
		{#if error}
			<Alert color="danger">
				{#snippet icon()}
					<IconXFilled />
				{/snippet}
				{error}
			</Alert>
		{/if}
	</Section>
</Form>
