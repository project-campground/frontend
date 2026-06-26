<script lang="ts">
	import { page } from '$app/state';
	import ErrorPage from '$lib/layout/ErrorPage.svelte';

	console.debug('Root-level error');
</script>

<ErrorPage status={page.status}>
	{#snippet title()}
		Error loading this page
	{/snippet}
	{page.error?.message}
</ErrorPage>
