<script lang="ts">
	import { Stack, Card } from '@campground/ui';
	import AppviewInstance from './AppviewInstance.svelte';
	import { getSession } from '$lib/api/session/Session.svelte.js';

	const session = getSession();
	let instanceList = $state(session.preferences.full.instances?.domains ?? []);

	session.preferences.onInit(
		() => (instanceList = session.preferences.full.instances?.domains ?? []),
	);
</script>

<Card.Root level="subtle">
	<Stack gap={1}>
		{#each instanceList as instance (instance)}
			<AppviewInstance domain={instance} />
		{/each}
	</Stack>
</Card.Root>

<Card.Root level="subtle">{instanceList.length}</Card.Root>
