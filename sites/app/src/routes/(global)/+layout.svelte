<script lang="ts">
	import { AccountInfo, setAccount } from '$lib/context/account.svelte';
	import type { LayoutProps } from './$types';
	import GlobalLayout from './GlobalLayout.svelte';
	import { getSession } from '$lib/api/session/Session.svelte';

	const { children }: LayoutProps = $props();

	const accountContext = new AccountInfo(getSession());

	$effect(() => {
		accountContext.init();
	});

	setAccount(accountContext);
</script>

<GlobalLayout>
	{@render children()}
</GlobalLayout>
