<script lang="ts">
	import { BrandLogo, Link } from '@campground/ui';
	import { FormattedMessageGlobal } from '@campground/locale';
	import {
		IconBrandBluesky,
		IconBrandDiscord,
		IconBrandGithub,
		IconCamper,
		IconCampfireFilled,
		IconChristmasTreeFilled,
		IconFile,
		IconSettings
	} from '@tabler/icons-svelte';
</script>

<footer class="Footer container">
	<aside class="Footer brand">
		<BrandLogo size="lg" />
	</aside>
	<div class="Footer content">
		<section class="Footer section">
			<h4>
				<FormattedMessageGlobal id="site.social" />
			</h4>
			<ul class="Footer list">
				<li>
					<Link href="/github" color="neutral">
						<IconBrandGithub />
						<FormattedMessageGlobal id="site.social.github" />
					</Link>
				</li>
				<li>
					<Link href="/bluesky" color="neutral">
						<IconBrandBluesky />
						<FormattedMessageGlobal id="site.social.bsky" />
					</Link>
				</li>
				<li>
					<Link href="/discord" color="neutral">
						<IconBrandDiscord />
						<FormattedMessageGlobal id="site.social.discord" />
					</Link>
				</li>
			</ul>
		</section>
		<section class="Footer section">
			<h4>
				<FormattedMessageGlobal id="site.discovery" />
			</h4>
			<ul class="Footer list">
				<li>
					<Link href="/instances" color="neutral">
						<IconChristmasTreeFilled />
						<FormattedMessageGlobal id="site.instances" />
					</Link>
				</li>
				<li>
					<Link href="/campsites" color="neutral">
						<IconCampfireFilled />
						<FormattedMessageGlobal id="site.campsites" />
					</Link>
				</li>
				<li>
					<Link href="/people" color="neutral">
						<IconCamper />
						<FormattedMessageGlobal id="site.people" />
					</Link>
				</li>
			</ul>
		</section>
		<section class="Footer section">
			<h4>
				<FormattedMessageGlobal id="site.docs" />
			</h4>
			<ul class="Footer list">
				<li>
					<Link href="/docs" color="neutral">
						<IconFile />
						<FormattedMessageGlobal id="site.docs" />
					</Link>
				</li>
				<li>
					<Link href="/docs/api" color="neutral">
						<IconSettings />
						<FormattedMessageGlobal id="site.api" />
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
