<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import { PermissionsContext, setPermissions } from '../../permissions.svelte.ts';
	import type { PageProps } from './$types.js';
	import TextTent from './Text/TextTent.svelte';

	const { params }: PageProps = $props();
	const tentId = $derived(params.tent);
	const campsiteContext = getCampsiteContext();
	const appview = getAppview();

	let perms = new PermissionsContext();
	setPermissions(perms);

	const tent = $derived(await appview.tents.get(tentId));

	$effect(() => {
		if (campsiteContext.campsiteReference && !campsiteContext.openBonfire)
			campsiteContext.setActiveBonfire(tent.bonfireId);
	});

	$effect(() => {
		perms.permissions =
			campsiteContext.openBonfire?.getTentPermission(tentId, tent.categoryId) ?? perms.permissions;
	});
</script>

{#if tent?.type === 'text'}
	<TextTent {tent} />
{/if}
