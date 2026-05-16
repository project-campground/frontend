<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Main } from '@campground/ui';
	import Navbar from '$lib/layout/Navbar.svelte';
	import { setLocaleContext } from '@campground/locale';
	import { globalAppLocale, localeFetcherStore } from '$lib/locale';
	import { get } from 'svelte/store';
	import Footer from "$lib/layout/Footer.svelte";

	const { children }: { children?: Snippet } = $props();

	get(localeFetcherStore)
		.fetchLocale('en-US')
		.then((resp) => globalAppLocale.set(resp));

	setLocaleContext(globalAppLocale);
</script>

<Main --Layout-paddingX="256px">
	<div class="Layout wrapper">
		<Navbar />
		<article class="Layout article">
			<div class="Layout nav-padding"></div>
			{@render children?.()}
		</article>
		<Footer />
	</div>
</Main>

<style lang="scss">
	:global(main#main) {
		width: 100%;
		min-height: 100%;
		height: 100%;
	}

	.Layout {
		&.wrapper {
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