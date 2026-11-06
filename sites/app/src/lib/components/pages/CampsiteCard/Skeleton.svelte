<script lang="ts">
	import { Avatar, loremIpsum, Para, Skeleton } from '@campground/ui';
	import Layout from './Layout.svelte';
	import type { BaseProps } from './props.ts';

	const { size, hideName, hideDescription }: BaseProps = $props();
</script>

<Layout>
	{#snippet banner()}
		<Skeleton
			aspectRatio={7}
			radius="lg"
			w="100%"
		/>
	{/snippet}
	{#snippet avatar()}
		<Skeleton radius="avatar">
			<Avatar {size}></Avatar>
		</Skeleton>
	{/snippet}
	{#if !hideName}
		<Para
			level="h2"
			mt="sm"
		>
			<Skeleton>
				{loremIpsum.sm}
			</Skeleton>
		</Para>
	{/if}
	{#if !hideDescription}
		<Para mt="sm">
			<Skeleton>
				{loremIpsum.sm}
			</Skeleton>
		</Para>
	{/if}
</Layout>
