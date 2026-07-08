<script lang="ts">
	import { Main } from '@campground/ui';
	import type { LayoutProps } from './$types';
	import { setLocaleContext, type DefaultMessageSegment } from '@campground/locale';
	import { localeManagerStore } from '$lib/locale';
	import { writable } from 'svelte/store';
	import type { IntlShape } from '@formatjs/svelte-intl';
	import { Session, setSession } from '$lib/api/session/Session.svelte';
	import { onMount } from 'svelte';

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
