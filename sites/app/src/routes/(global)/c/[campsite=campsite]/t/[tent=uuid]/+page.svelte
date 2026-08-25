<script lang="ts">
	import { CampsiteTents, getCampsiteContext } from '../../context.svelte.ts';
	import type { PageProps } from './$types.js';

	const { params }: PageProps = $props();
	const tentId = $derived(params.tent);
	const campsiteContext = getCampsiteContext();

	let perms = $state(CampsiteTents.ownerPermissionsAggregated.bonfire);
	const tent = $derived(campsiteContext.tents?.tents.find((x) => x.id === tentId));

	$effect(() => {
		if (tent) perms = campsiteContext.tents?.getTentPermission(tentId, tent.categoryId);
	});
</script>

<p>Tent {tentId} with perms {JSON.stringify(perms)}</p>
