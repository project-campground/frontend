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
		expectedInvite: {
			id: `info.inviteCode.error`,
			defaultMessage: `Expected a PDS invite code`,
			description: `Error when the submitted PDS invite code has bad formatting`,
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
	import {
		Svg,
		Group,
		Section,
		Select,
		TextBlock,
		Accordion,
		Alert,
		DebouncedValue,
		Para,
	} from '@campground/ui';
	import { defaultPds, knownPds } from '../../../lib/api/api.config.js';
	import { IconInfoCircleFilled, IconWorldFilled, IconXFilled } from '@tabler/icons-svelte';
	import { getSession } from '$lib/api/session/Session.svelte';
	import HTTPAtprotoClient from '$lib/api/http/HTTPAtprotoClient.js';
	import type { DescribedServer } from '$lib/types/atproto/server.js';
	import XrpcError from '$lib/api/XrpcError.js';
	import KnownPdsOptions from '../KnownPdsOptions.svelte';

	let passwordToConfirm = $state('');

	const intl = getLocaleContext();
	let error: Error | null = $state(null);

	const session = getSession();

	let pdsValue: string = $state(defaultPds);

	let describedServer = new DebouncedValue<DescribedServer | Error, string>(
		new Error('Not done fetching the PDS'),
		1000,
		(pdsValue) => HTTPAtprotoClient.describeServer({ url: pdsValue }).catch((err) => err as Error),
	);

	$effect(() => describedServer.derived(pdsValue));

	const onSubmit: FormProps['onSubmit'] = async (fields: Record<string, string>) => {
		const { pds, handle, ...details } = fields as {
			handle: string;
			email: string;
			password: string;
			confirmPassword: string;
			pds: string;
		};
		const description = describedServer.value as DescribedServer;
		const result = await HTTPAtprotoClient.register(
			{ handle: handle + description.availableUserDomains[0], ...details },
			{ url: pds },
		);

		session.saveAccount({ handle: result.handle, email: details.email, server: pds });

		return navigation.navigate('/auth');
	};
</script>

<Form {onSubmit}>
	{#if !(describedServer instanceof Error) && (describedServer.value as DescribedServer).inviteCodeRequired}
		<Section>
			<FormControl
				id="inviteCode"
				required
			>
				<FormLabel>
					<FormattedMessageGlobal id="info.inviteCode" />
				</FormLabel>
				<FormTextField
					format={{
						regex: /^[A-Za-z0-9]+([-][A-Za-z0-9]+(?:[:][0-9]+)?)+$/,
						errorMessage: $intl.formatMessage(messages.expectedInvite),
					}}
				/>
				<FormErrorLabel></FormErrorLabel>
			</FormControl>
		</Section>
	{/if}
	<Section>
		<FormControl
			id="handle"
			required
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.handle" />
			</FormLabel>
			<FormTextField
				placeholder="example_handle"
				format={{
					regex: /^[A-Za-z0-9_+-]{3,}$/,
					errorMessage: $intl.formatMessage(messages.expectedHandle),
				}}
			>
				{#snippet right()}
					{#if describedServer.value && !(describedServer.value instanceof Error)}
						<TextBlock level="body">
							{(describedServer.value as DescribedServer)?.availableUserDomains[0]}
						</TextBlock>
					{/if}
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
				placeholder="example@example.com"
				format={{
					regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
					errorMessage: $intl.formatMessage(messages.expectedEmail),
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
			bind:value={pdsValue}
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
					<KnownPdsOptions />
				{/snippet}
			</FormTextField>
			<FormErrorLabel></FormErrorLabel>
			<!-- Allow users to know if there was error fetching the PDS describe server or whatever -->
			{#if describedServer.value instanceof XrpcError}
				<Para color="danger">
					{describedServer.value.code} [{describedServer.value.status}]: {describedServer.value
						.description}
				</Para>
			{:else if describedServer.value instanceof Error}
				<Para color="danger">
					{describedServer.value}
				</Para>
			{/if}
			<Alert color="info">
				{#snippet icon()}
					<IconInfoCircleFilled />
				{/snippet}
				<FormattedMessage {...messages.pdsNote} />
			</Alert>
		</FormControl>
	</Accordion>
	<Section>
		<Group
			direction="row-reverse"
			directionMobile="column"
		>
			<FormSubmit
				disabled={describedServer.value instanceof Error || !(describedServer.value as DescribedServer)}
			/>
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
