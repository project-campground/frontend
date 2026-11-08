<script lang="ts">
	import { Main, theme } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import { LocaleContext, setLocale } from '@campground/locale';
	import { AuthContext, setAuth } from '#lib/context/auth/context.svelte.ts';
	import { onMount } from 'svelte';

	const { children }: LayoutProps = $props();

	const session = new AuthContext();
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
	setAuth(session);

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
