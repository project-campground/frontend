<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Main } from '@campground/ui';
	import Navbar from '$lib/navigation/Navbar.svelte';
	import { setLocaleContext } from '@campground/locale';
	import { globalAppLocale, localeFetcherStore } from '$lib/locale';
	import { get } from 'svelte/store';

	const { children }: { children?: Snippet } = $props();

	get(localeFetcherStore)
		.fetchLocale('en-US')
		.then((resp) => globalAppLocale.set(resp));

	setLocaleContext(globalAppLocale);
</script>

<Main>
	<Navbar />
	<article>
		{@render children?.()}
	</article>
</Main>
