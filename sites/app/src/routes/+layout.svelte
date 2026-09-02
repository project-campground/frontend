<script lang="ts">
	import { Main, theme } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import { LocaleContext, setLocale } from '@campground/locale';
	import { Session, setSession } from '$lib/api/session/Session.svelte';
	import { onMount } from 'svelte';

	const { children }: LayoutProps = $props();

	const session = new Session();
	const locale = new LocaleContext();

	onMount(() =>
		theme.subscribe((value) => session.preferences.updateLocal({ appearance: { theme: value } })),
	);

	$effect(() => {
		locale.setLocale(session.preferences.full.locale?.language ?? 'en-US').catch((err) => {
			throw new Error(`Error fetching locale: ${err}`, { cause: err });
		});
	});

	setLocale(locale);
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
