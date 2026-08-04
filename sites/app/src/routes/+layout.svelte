<script lang="ts">
	import { Main, theme } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import { setLocaleContext, type DefaultMessageSegment } from '@campground/locale';
	import { writable } from 'svelte/store';
	import type { IntlShape } from '@formatjs/svelte-intl';
	import { Session, setSession } from '$lib/api/session/Session.svelte';
	import { onMount } from 'svelte';
	import { localeManagerStore } from '$lib/locale/index.js';

	const { children }: LayoutProps = $props();

	const localeWritable = writable<IntlShape<DefaultMessageSegment>>();

	const session = new Session();

	localeManagerStore.subscribe((localeFetcher) => {
		localeWritable.set(localeFetcher.createDefaultLocale());

		localeFetcher
			.fetchLocale('en-US')
			.then(localeWritable.set)
			.catch((err) => {
				throw new Error(`Error fetching locale: ${err}`, { cause: err });
			});
	});

	onMount(() =>
		theme.subscribe((value) => session.preferences.updateLocal({ appearance: { theme: value } })),
	);

	setLocaleContext(localeWritable);
	setSession(session);

	onMount(async () => session.preferences.init());
</script>

<Main>
	{@render children()}
</Main>

<style lang="scss">
	:global(main#main) {
		width: 100%;
		min-height: 100%;
		height: 100%;
	}
</style>
