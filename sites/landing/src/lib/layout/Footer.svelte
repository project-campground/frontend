<script
	lang="ts"
	module
>
	const messages = defineMessages({
		socials: {
			id: 'landing.socials',
			defaultMessage: 'Socials',
			description: 'Socials header in landing page footer',
		},
	});
</script>

<script lang="ts">
	import { BrandLogo, Link } from '@campground/ui';
	import { LocaleMessage, siteLocale } from '@campground/locale';
	import {
		IconBrandBluesky,
		IconBrandDiscord,
		IconBrandGithub,
		IconCamper,
		IconCampfireFilled,
		IconChristmasTreeFilled,
		IconFile,
		IconSettings,
	} from '@tabler/icons-svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
</script>

<footer class="Footer container">
	<aside class="Footer brand">
		<BrandLogo size="lg" />
	</aside>
	<div class="Footer content">
		<section class="Footer section">
			<h4>
				<LocaleMessage {...messages.socials} />
			</h4>
			<ul class="Footer list">
				<li>
					<Link
						href="/github"
						color="neutral"
					>
						<IconBrandGithub />
						GitHub
					</Link>
				</li>
				<li>
					<Link
						href="/bluesky"
						color="neutral"
					>
						<IconBrandBluesky />
						Bluesky
					</Link>
				</li>
				<li>
					<Link
						href="/discord"
						color="neutral"
					>
						<IconBrandDiscord />
						Discord
					</Link>
				</li>
			</ul>
		</section>
		<section class="Footer section">
			<h4>
				<LocaleMessage {...siteLocale.discovery} />
			</h4>
			<ul class="Footer list">
				<li>
					<Link
						href="/instances"
						color="neutral"
					>
						<IconChristmasTreeFilled />
						<LocaleMessage {...siteLocale.instances} />
					</Link>
				</li>
				<li>
					<Link
						href="/campsites"
						color="neutral"
					>
						<IconCampfireFilled />
						<LocaleMessage {...siteLocale.campsites} />
					</Link>
				</li>
				<li>
					<Link
						href="/people"
						color="neutral"
					>
						<IconCamper />
						<LocaleMessage {...siteLocale.people} />
					</Link>
				</li>
			</ul>
		</section>
		<section class="Footer section">
			<h4>
				<LocaleMessage {...siteLocale.docs} />
			</h4>
			<ul class="Footer list">
				<li>
					<Link
						href="/docs"
						color="neutral"
					>
						<IconFile />
						<LocaleMessage {...siteLocale.docs} />
					</Link>
				</li>
				<li>
					<Link
						href="/docs/api"
						color="neutral"
					>
						<IconSettings />
						<LocaleMessage {...siteLocale.API} />
					</Link>
				</li>
			</ul>
		</section>
	</div>
</footer>

<style lang="scss">
	@use '@campground/ui' as *;

	.Footer {
		&.container {
			display: grid;
			grid-template-columns: 1.5fr 1fr;
			padding: 16px var(--Layout-paddingX);
			gap: 64px;
			@include desktop-sm-down {
				gap: 8px;
				grid-template-columns: 1fr;
			}
		}
		&.brand {
			flex: 1;
		}
		&.content {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
		&.list {
			padding: 0;
			li {
				display: block;
			}
		}
	}
</style>
