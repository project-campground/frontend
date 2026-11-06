<script lang="ts">
	import { FlexCenter, Loading, Card } from '@campground/ui';
	import type { PageProps } from './$types.ts';
	import ErrorPlaceholder from '#lib/components/ErrorPlaceholder.svelte';
	import InvitePage from './InvitePage.svelte';
	import HTTPBackendClient from '#lib/api/http/HTTPBackendClient.js';
	import { getSession } from '#lib/api/session/Session.svelte.js';
	import { setAppview } from '#lib/context/api.js';
	import InvitePageSkeleton from './InvitePageSkeleton.svelte';

	const { params }: PageProps = $props();
	const [id, domain] = $derived(params.invite.split('@'));

	const session = getSession();
	const appview = new HTTPBackendClient(session, () => domain);

	setAppview(appview);
</script>

<div class="page">
	<div class="card">
		<Card.Root size="lg" overflow="visible">
			<Card.Content gap="xl" flex={1} overflow="visible">
				
				<svelte:boundary>
					{#snippet pending()}
					<InvitePageSkeleton />
					{/snippet}
					{#snippet failed(errorObject)}
					{#if (errorObject as { error?: unknown }).error}
					{const { error } = $derived(errorObject as { error?: unknown })}
					<ErrorPlaceholder {error} />
					{:else}
					<ErrorPlaceholder error={errorObject} />
					{/if}
					{/snippet}
					<InvitePage {id} {domain} />
				</svelte:boundary>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;

		padding: 1rem 0.25rem;

		@include tablet-only {
			padding-inline: 2rem;
		}
		@include desktop-sm-up {
			padding-block: 8rem;
			padding-inline: 8rem;
			.card {
				min-width: 32rem;
			}
		}
	}
</style>