<script lang="ts">
	import { Card, Loading } from '@campground/ui';
	import Page from './Page.svelte';
	import type { QueryProps } from './props.ts';
	import ErrorPlaceholder from '#lib/components/ErrorPlaceholder.svelte';

	const { ...props }: QueryProps = $props();
</script>

<svelte:boundary>
	{#snippet pending()}
		<Card.Root level="subtle">
			<Card.Content
				flex={1}
				align="center"
				justify="center"
			>
				<Loading />
			</Card.Content>
		</Card.Root>
		<Card.Root level="subtle">
			<Card.Content
				flex={1}
				align="center"
				justify="center"
			>
				<Loading />
			</Card.Content>
		</Card.Root>
	{/snippet}
	{#snippet failed(error)}
		<ErrorPlaceholder {error} />
	{/snippet}
	<Page {...props} />
</svelte:boundary>
