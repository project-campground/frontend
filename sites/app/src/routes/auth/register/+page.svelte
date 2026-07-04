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
		expectedHandle: {
			id: `info.handle.error`,
			defaultMessage: `Expected a user handle`,
			description: `Error when the submitted handle has bad formatting`,
		},
		expectedEmail: {
			id: `info.email.error`,
			defaultMessage: `Expected a valid email address`,
			description: `Error when the submitted email has bad formatting`,
		},
		passwordMismatch: {
			id: `info.passwprd.confirm.error`,
			defaultMessage: `Expected passwords to match`,
			description: `Error when the submitted confirmed password is not the exact same as regular password.`,
		},
		passwordPlaceholder: {
			id: `info.password.placeholder.register`,
			defaultMessage: `New password here`,
			description: `The placeholder for the password`,
		},
		passwordConfirmPlaceholder: {
			id: `info.password.confirm.placeholder.register`,
			defaultMessage: `Re-enter password here`,
			description: `The placeholder for the confirm password`,
		},
		pdsNote: {
			id: `info.pds.note`,
			defaultMessage: `You always have the ability to change PDS (personal data server) and you always have the ability to contact or interact with people from other PDS (unless the PDS is chosen to be blocked by the user).`,
			description: `A note for the user that PDS (personal server) can always be changed and they can interact with people from other PDS`,
		},
	});
</script>

<script lang="ts">
	import {
		Form,
		FormControl,
		FormErrorLabel,
		FormLabel,
		FormSubmit,
		FormTextField,
		type FormProps,
	} from '@campground/form';
	import { FormattedMessage, FormattedMessageGlobal, getLocaleContext } from '@campground/locale';
	import { Svg, Group, Section, Select, TextBlock, Accordion, Para, Alert } from '@campground/ui';
	import { defaultPds, knownPds } from '../../../lib/api/api.config';
	import { IconInfoCircleFilled, IconWorldFilled } from '@tabler/icons-svelte';

	const domain = defaultPds.split('/')[2];
	const domainNoPort = domain.split(':')[0];
	const handleDomain = domainNoPort === 'localhost' ? 'test' : domainNoPort;

	let passwordToConfirm = $state('');

	const intl = getLocaleContext();

	const onSubmit: FormProps['onSubmit'] = async (values) => console.log('Register', values);
</script>

<Form {onSubmit}>
	<Section>
		<FormControl
			id="handle"
			required
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.handle" />
			</FormLabel>
			<FormTextField
				placeholder={`example_handle`}
				format={{
					regex: /^[A-Za-z0-9_+-]+$/,
					errorMessage: $intl.formatMessage(messages.expectedHandle),
				}}
			>
				{#snippet right()}
					<TextBlock level="body">
						.{handleDomain}
					</TextBlock>
				{/snippet}
			</FormTextField>
			<FormErrorLabel></FormErrorLabel>
		</FormControl>
		<FormControl
			id="email"
			required
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.email" />
			</FormLabel>
			<FormTextField
				type="email"
				placeholder={`example@example.com`}
				format={{
					regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
					errorMessage: $intl.formatMessage(messages.expectedHandle),
				}}
			/>
			<FormErrorLabel></FormErrorLabel>
		</FormControl>
	</Section>
	<Section>
		<FormControl
			id="password"
			bind:value={passwordToConfirm}
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
		<FormControl
			id="confirmPassword"
			required
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.password.confirm" />
			</FormLabel>
			<FormTextField
				type="password"
				placeholder={$intl.formatMessage(messages.passwordConfirmPlaceholder)}
				format={{
					value: passwordToConfirm,
					errorMessage: $intl.formatMessage(messages.passwordMismatch),
				}}
			/>
			<FormErrorLabel></FormErrorLabel>
		</FormControl>
	</Section>
	<Accordion gap="xs">
		{#snippet header()}
			<FormattedMessageGlobal id="info.pds" />
		{/snippet}
		<FormControl
			id="pds"
			defaultValue={defaultPds}
			required
		>
			<FormTextField
				placeholder={defaultPds}
				format={{
					regex: /^(https?[:]\/\/)(localhost[:][0-9]{4,}|([A-Za-z0-9_+-]+[.])+([A-Za-z0-9_+-]{2,}))$/,
					errorMessage: $intl.formatMessage(messages.expectedHandle),
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
			<Alert color="info">
				{#snippet icon()}
					<IconInfoCircleFilled />
				{/snippet}
				<FormattedMessage {...messages.pdsNote} />
			</Alert>
		</FormControl>
	</Accordion>
	<Section>
		<Group reversed>
			<FormSubmit />
		</Group>
	</Section>
</Form>
