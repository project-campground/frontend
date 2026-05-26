<script lang="ts">
	import type { LayoutProps } from './$types';
	import Navbar from '$lib/layout/Navbar.svelte';
	import { setLocaleContext } from '@campground/locale';
	import { globalAppLocale } from '$lib/locale';
	import Footer from '$lib/layout/Footer.svelte';
	import { createIntl } from '@formatjs/svelte-intl';

	const { children, params, data }: LayoutProps = $props();

	$effect.pre(() => {
		globalAppLocale.set(
			createIntl({
				locale: params.locale,
				defaultLocale: params.locale,
				messages: data
			})
		);
	});

	setLocaleContext(globalAppLocale);
</script>

<div class="Layout wrapper" lang={params.locale}>
	<Navbar />
	<article class="Layout article">
		<div class="Layout nav-padding"></div>
		{@render children()}
	</article>
	<Footer />
</div>

<style lang="scss">

	.Layout {
		&.wrapper {
			--Layout-paddingX: 256px;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			height: 100%;
			scroll-behavior: smooth;
		}
		&.nav-padding {
			height: 72px;
		}
		&.article {
			flex: 1;
		}
	}
</style>
