<script lang="ts">
	import { Loading } from '@campground/ui';
	import Page from './Page.svelte';
	import type { QueryProps } from './props.ts';
	import ErrorPlaceholder from '#lib/components/ErrorPlaceholder.svelte';

	const { ...props }: QueryProps = $props();
</script>

<svelte:boundary>
	{#snippet pending()}
		<Loading />
	{/snippet}
	{#snippet failed(error)}
		<ErrorPlaceholder {error} />
	{/snippet}
	<Page {...props} />
</svelte:boundary>
