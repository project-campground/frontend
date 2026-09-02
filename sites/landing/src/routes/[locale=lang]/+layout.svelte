<script lang="ts">
	import type { LayoutProps } from './$types.js';
	import Navbar from '$lib/layout/Navbar.svelte';
	import { setLocale, LocaleContext, type DefaultMessageSegment } from '@campground/locale';
	import Footer from '$lib/layout/Footer.svelte';
	import { createIntl } from '@formatjs/svelte-intl';

	const { children, params, data }: LayoutProps = $props();

	const localeContext = new LocaleContext();
	setLocale(localeContext);

	$effect.pre(() => {
		localeContext.shape = createIntl<DefaultMessageSegment>({
			locale: params.locale,
			defaultLocale: params.locale,
			messages: data,
		});
	});
</script>

<div
	class="Layout wrapper"
	lang={params.locale}
>
	<Navbar />
	<article class="Layout article">
		<div class="Layout nav-padding"></div>
		{@render children()}
	</article>
	<Footer />
</div>

<style lang="scss">
	@use '@campground/ui' as *;
	@import '@fontsource-variable/ubuntu-sans/wght-italic.css';

	@import '@fontsource/ubuntu-mono/400.css';
	@import '@fontsource/ubuntu-mono/400-italic.css';
	@import '@fontsource/ubuntu-mono/700.css';
	@import '@fontsource/ubuntu-mono/700-italic.css';

	@import '@fontsource/ubuntu/400.css';
	@import '@fontsource/ubuntu/400-italic.css';
	@import '@fontsource/ubuntu/700.css';
	@import '@fontsource/ubuntu/700-italic.css';

	.wrapper {
		--Layout-paddingX: 256px;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		height: 100%;
		scroll-behavior: smooth;

		@include mobile-only {
			--Layout-paddingX: 10px;
		}
		@include tablet-only {
			--Layout-paddingX: 32px;
		}
		@include desktop-sm-only {
			--Layout-paddingX: 128px;
		}
	}
	.nav-padding {
		height: 72px;
	}
	.article {
		flex: 1;
	}
</style>
