<script
	lang="ts"
	module
>
	const statusToIcon: Record<number, PagePlaceholder.Icon> = {
		403: PagePlaceholder.Icon.NotOk,
		404: PagePlaceholder.Icon.NotFound,
	};
</script>

<script
	lang="ts"
	generics="T"
>
	import XrpcError from '$lib/api/XrpcError.js';

	import { Chip, Code, PagePlaceholder, Para, Stack } from '@campground/ui';

	const { error }: { error: T } = $props();
</script>

{#snippet errorStack(message: string, error: Error)}
    <Para mb="lg">{message}</Para>
    {#if error.stack}
        <Code.Block verticalOverflow>
            {#snippet meta()}
                <Chip size="sm">Error</Chip>
            {/snippet}
            {#if error.cause instanceof Response}
                <Code.Line index="by">{error.cause.url}</Code.Line>
                <Code.Line index="">...</Code.Line>
                {:else if error.cause}
                <Code.Line index="by">{error.cause}</Code.Line>
                <Code.Line index="">...</Code.Line>
            {/if}
            {#each error.stack.split('\n') as line, i (i)}
                <Code.Line index={i + 1}>
                    {line}
                </Code.Line>
            {/each}
        </Code.Block>
    {/if}
{/snippet}

{#if error instanceof XrpcError}
    {const icon = $derived(
        error instanceof XrpcError ?
            (statusToIcon[error.status] ?? PagePlaceholder.Icon.Error)
        :	PagePlaceholder.Icon.Error,
    )}
    <PagePlaceholder.Root
        {icon}
        status={error.status}
    >
        {#snippet title()}
            {error.code}
        {/snippet}
        {@render errorStack(error.description ?? error.code ?? error.name, error)}
    </PagePlaceholder.Root>
{:else if error instanceof Error}
    <PagePlaceholder.Root
        icon={PagePlaceholder.Icon.Error}
    >
        {#snippet title()}
            {error.name}
        {/snippet}
        {@render errorStack(error.message, error)}
    </PagePlaceholder.Root>
{:else}
    <PagePlaceholder.Root
        icon={PagePlaceholder.Icon.Error}
    >
        {#snippet title()}
            {error}
        {/snippet}
        <Para>
            {error}
        </Para>
    </PagePlaceholder.Root>
{/if}
