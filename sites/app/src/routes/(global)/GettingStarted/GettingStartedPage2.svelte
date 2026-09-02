<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		header: {
			id: 'app.gettingStarted.profile.header',
			defaultMessage: 'Create your profile',
			description: 'Getting started create profile header',
		},
		desc: {
			id: 'app.gettingStarted.profile.desc',
			defaultMessage: 'Create how people see you on Campground.',
			description: 'Getting started create profile description',
		},
	});
</script>

<script lang="ts">
	import {
		Form,
		FormControl,
		FormLabel,
		FormTextField,
		FormImageField,
		FormErrorLabel,
		type FormImageFieldValue,
	} from '@campground/form';
	import { Section, Group, Para, Stack } from '@campground/ui';
	import { LocaleMessage, getLocale } from '@campground/locale';
	import UserCardMenu from '$lib/components/users/UserCardMenu.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';
	import type { GettingStarted } from './context.svelte.ts';
	import { localeStrings } from '$lib/locale/index.js';

	interface Props {
		gettingStarted: GettingStarted;
	}
	const { gettingStarted }: Props = $props();

	const intl = getLocale();
	const account = getAccount();
</script>

<div class="page">
	<Form>
		<Stack>
			<Para level="h1">
				<LocaleMessage {...localeMessages.header} />
			</Para>
			<Para level="paragraph">
				<LocaleMessage {...localeMessages.desc} />
			</Para>
		</Stack>
		<Section>
			<FormControl
				id="banner"
				flex={0}
				bind:value={
					() => null,
					(value) => (gettingStarted.profile.banner = (value as FormImageFieldValue | null)?.url)
				}
			>
				<FormLabel>
					<LocaleMessage {...localeStrings.users.banner} />
				</FormLabel>
				<FormImageField
					radius="lg"
					aspectRatio={4}
					height={6}
				/>
			</FormControl>
		</Section>
		<Section>
			<Group align="start">
				<FormControl
					id="avatar"
					flex={0}
					bind:value={
						() => null,
						(value) => (gettingStarted.profile.avatar = (value as FormImageFieldValue | null)?.url)
					}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.users.avatar} />
					</FormLabel>
					<div class="avatarField">
						<FormImageField
							radius="avatar"
							width={4}
							height={4}
						/>
					</div>
				</FormControl>
				<FormControl
					id="displayName"
					required
					flex={1}
					bind:value={() => null, (value) => (gettingStarted.profile.displayName = value)}
					defaultValue={account.sessionInfo?.handle}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.users.name} />
					</FormLabel>
					<FormTextField
						type="text"
						placeholder="Example username"
						maxlength={48}
						minlength={3}
					/>
					<FormErrorLabel />
				</FormControl>
			</Group>
		</Section>
		<Section>
			<FormControl
				id="description"
				bind:value={() => null, (value) => (gettingStarted.profile.description = value)}
				defaultValue=""
			>
				<FormLabel>
					<LocaleMessage {...localeStrings.users.aboutYou} />
				</FormLabel>
				<FormTextField
					multirow
					placeholder={intl.formatMessage(localeStrings.users.aboutYou)}
					maxlength={200}
				/>
			</FormControl>
		</Section>
	</Form>
	<aside>
		<UserCardMenu
			hideButtons
			user={{
				did: account.sessionInfo?.did ?? 'did:null',
				handle: account.sessionInfo?.handle ?? 'handle.invalid',
				displayName: gettingStarted.profile.displayName,
				description: gettingStarted.profile.description,
				avatar: gettingStarted.profile.avatar,
				banner: gettingStarted.profile.banner,
			}}
		/>
	</aside>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.page {
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 2rem;
		@include tablet-down {
			grid-template-columns: 5fr 0;
		}
	}
	aside {
		@include tablet-down {
			display: none;
		}
	}
	.avatarField {
		margin-top: calc(-0.125rem - 2px);
	}
</style>
