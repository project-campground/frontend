<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeHeaders = defineMessages({
		'': {
			id: `app.auth.header`,
			defaultMessage: `What do you want to do?`,
			description: `The heading of the auth index page`,
		},
		login: {
			id: `app.auth.login.header`,
			defaultMessage: `Welcome back!`,
			description: `The heading of the login page welcoming back the user`,
		},
		register: {
			id: `app.auth.register.header`,
			defaultMessage: `New to Campground?`,
			description: `The heading of the register page welcoming the user`,
		},
	});
	const localeDescriptions = defineMessages({
		'': {
			id: `app.auth.desc`,
			defaultMessage: `Choose what you want to do with your account(s).`,
			description: `The heading of the auth index page instructing the user`,
		},
		login: {
			id: `app.auth.login.desc`,
			defaultMessage: `Enter the login details of your existing account.`,
			description: `The heading of the login page instructing the user`,
		},
		register: {
			id: `app.auth.register.desc`,
			defaultMessage: `Enter credentials for your brand new account.`,
			description: `The description of the register page instructing the user`,
		},
	});
</script>

<script lang="ts">
	import type { LayoutProps } from './$types.d.ts';
	import { BrandLogo, Button, Card, Group, Link, Para, Stack, Portals } from '@campground/ui';
	import { LocaleMessage } from '@campground/locale';
	import { IconCaretLeftFilled } from '@tabler/icons-svelte';

	const { children, data }: LayoutProps = $props();
</script>

<Portals.Root flex>
	<div class="Auth container">
		<header class="Auth header">
			<div class="Auth brand">
				<BrandLogo />
			</div>
		</header>
		<div class="Auth body">
			<Card.Root
				class="Auth card"
				level="subtle"
				size="xxl"
				overflow="visible"
			>
				<Card.Content
					class="Auth content"
					gap="md"
				>
					<Stack gap={0.5}>
						<Para
							level="h2"
							mb="md"
						>
							<Group>
								{#if data.page}
									<Link href="/auth">
										<Button
											color="neutral"
											variant="soft"
											size="xs"
										>
											<IconCaretLeftFilled />
										</Button>
									</Link>
								{/if}
								<LocaleMessage {...localeHeaders[data.page as 'login' | 'register']} />
							</Group>
						</Para>
						<Para mb="xl">
							<LocaleMessage {...localeDescriptions[data.page as 'login' | 'register']} />
						</Para>
					</Stack>
					{@render children()}
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</Portals.Root>

<style lang="scss">
	@use '@campground/ui' as *;

	.header {
		@include tablet-down {
			display: none;
		}
	}
	.container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem;
		height: 100%;
		@include tablet-down {
			padding: 0;
		}
	}
	.body {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: calc(-1 * (3.5rem + 3.5rem / 16));
		flex: 1;
		@include tablet-down {
			margin-top: 0;
		}
		& > :global(.card) {
			width: 512px;
			box-sizing: border-box;
			@include tablet-down {
				width: 100%;
				height: 100%;
				border-radius: 0;
			}
		}
	}
</style>
