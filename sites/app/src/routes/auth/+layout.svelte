<script lang="ts" module>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeHeaders = defineMessages({
		login: {
			id: `app.auth.login.header`,
			defaultMessage: `Welcome back!`,
			description: `The heading of the login page welcoming back the user`
		},
		register: {
			id: `app.auth.register.header`,
			defaultMessage: `New to Campground?`,
			description: `The heading of the register page welcoming the user`
		}
	});
	const localeDescriptions = defineMessages({
		login: {
			id: `app.auth.login.desc`,
			defaultMessage: `Enter the login details of your existing account.`,
			description: `The heading of the login page instructing the user`
		},
		register: {
			id: `app.auth.register.desc`,
			defaultMessage: `Enter credentials for your brand new account.`,
			description: `The description of the register page instructing the user`
		}
	});
</script>

<script lang="ts">
	import type { LayoutProps } from './$types';
	import { BrandLogo, Card, Para } from '@campground/ui';

	const { children, data }: LayoutProps = $props();
</script>

<div class="Auth container">
	<header class="Auth header">
		<div class="Auth brand">
			<BrandLogo />
		</div>
	</header>
	<div class="Auth body">
		<Card.Root class="Auth card" level="subtle" size="xxl">
			<Card.Content class="Auth content">
				<Para level="h2" bMargin="md">
					<!-- <FormattedMessage {...locale[data.page as "login" | "register"]} /> -->
					{localeHeaders[data.page as 'login' | 'register'].defaultMessage}
				</Para>
				<Para>
					<!-- <FormattedMessage {...locale[data.page as "login" | "register"]} /> -->
					{localeDescriptions[data.page as 'login' | 'register'].defaultMessage}
				</Para>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem;
		height: 100%;
	}
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: calc(-1 * (3.5rem + 3.5rem / 16));
		flex: 1;
	}
</style>
