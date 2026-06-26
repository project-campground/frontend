<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeFeatures = defineMessages({
		'landing.features': {
			id: 'landing.features',
			defaultMessage: 'Features',
			description: 'The features page in landing.',
		},
		'landing.docs': {
			id: 'landing.docs',
			defaultMessage: 'Docs',
			description: 'The docs page in landing.',
		},
	});
</script>

<script lang="ts">
	import { FormattedMessage, FormattedMessageGlobal, getLocaleContext } from '@campground/locale';
	import { BrandLogo, Button } from '@campground/ui';
	import { IconArrowRight } from '@tabler/icons-svelte';

	const localeContext = getLocaleContext();
</script>

<nav class="Navbar container">
	<ul class="Navbar list">
		<li class="Navbar item brand">
			<a
				href={`/${$localeContext.locale}`}
				class="Navbar button"
			>
				<BrandLogo size="md" />
			</a>
		</li>
		<li class="Navbar spacer"></li>
		<li class="Navbar item">
			<a
				href="/features"
				class="Navbar button"
			>
				<Button
					size="lg"
					variant="plain"
					color="neutral"
				>
					<FormattedMessage {...localeFeatures['landing.features']} />
				</Button>
			</a>
		</li>
		<li class="Navbar item">
			<a
				href="/docs"
				class="Navbar button"
			>
				<Button
					size="lg"
					variant="plain"
					color="neutral"
				>
					<FormattedMessage {...localeFeatures['landing.docs']} />
				</Button>
			</a>
		</li>
		<li class="Navbar item">
			<a
				href="/download"
				class="Navbar button"
			>
				<Button
					size="lg"
					variant="plain"
				>
					<FormattedMessageGlobal id="common.download" />
				</Button>
			</a>
		</li>
		<li class="Navbar item">
			<a
				href="/docs/api"
				class="Navbar button"
			>
				<Button size="lg">
					<FormattedMessageGlobal id="form.login" />
					<IconArrowRight size={16} />
				</Button>
			</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	@use '@campground/ui' as *;

	.Navbar {
		&.container {
			position: fixed;
			top: 0;
			width: 100%;
			height: 72px;
			z-index: 20;
		}
		&.list {
			position: relative;
			z-index: 2;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 8px;
			margin: 0;
			padding: 6px var(--Layout-paddingX);

			&::after {
				content: '';
				position: absolute;
				background: linear-gradient(to bottom, var(--background-body) 50%, transparent 100%);
				top: -50px;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: -1;
			}
		}
		&.spacer {
			flex: 1;
			display: inline-block;
		}
		&.item {
			display: inline-block;
			&.brand {
				@include button-transform();
			}
		}
		&.button {
			text-decoration: none;
			& > :global(.Button) {
				padding: 12px 24px;
			}
		}
	}
</style>
