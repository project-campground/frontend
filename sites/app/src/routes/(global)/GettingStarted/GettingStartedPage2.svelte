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
		FieldControl,
		FieldLabel,
		TextField,
		ImageField,
		FieldError,
		type ImageFieldValue,
	} from '@campground/form';
	import { Section, Group, Para, Stack } from '@campground/ui';
	import { LocaleMessage, getLocale } from '@campground/locale';
	import { getAccount } from '$lib/context/account.svelte.js';
	import type { GettingStarted } from './context.svelte.ts';
	import { localeStrings } from '$lib/locale/index.js';
	import { User } from '$lib/components/index.ts';

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
			<FieldControl
				id="banner"
				flex={0}
				bind:value={
					() => null, (value) => (gettingStarted.profile.banner = (value as ImageFieldValue | null)?.url)
				}
			>
				<FieldLabel>
					<LocaleMessage {...localeStrings.users.banner} />
				</FieldLabel>
				<ImageField
					radius="lg"
					aspectRatio={4}
					height={6}
				/>
			</FieldControl>
		</Section>
		<Section>
			<Group align="start">
				<FieldControl
					id="avatar"
					flex={0}
					bind:value={
						() => null,
						(value) => (gettingStarted.profile.avatar = (value as ImageFieldValue | null)?.url)
					}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.users.avatar} />
					</FieldLabel>
					<div class="avatarField">
						<ImageField
							radius="avatar"
							width={4}
							height={4}
						/>
					</div>
				</FieldControl>
				<FieldControl
					id="displayName"
					required
					flex={1}
					bind:value={() => null, (value) => (gettingStarted.profile.displayName = value)}
					defaultValue={account.sessionInfo?.handle}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.users.name} />
					</FieldLabel>
					<TextField
						type="text"
						placeholder="Example username"
						maxlength={48}
						minlength={3}
					/>
					<FieldError />
				</FieldControl>
			</Group>
		</Section>
		<Section>
			<FieldControl
				id="description"
				bind:value={() => null, (value) => (gettingStarted.profile.description = value)}
				defaultValue=""
			>
				<FieldLabel>
					<LocaleMessage {...localeStrings.users.aboutYou} />
				</FieldLabel>
				<TextField
					multirow
					placeholder={intl.formatMessage(localeStrings.users.aboutYou)}
					maxlength={200}
				/>
			</FieldControl>
		</Section>
	</Form>
	<aside>
		<User.CardMenu
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
