<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import { onMount } from 'svelte';
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

	onMount(() => {
		if (tent) campsiteContext.setActiveBonfire(tent.bonfireId);
	});

	onMount(
		campsiteContext.openBonfire.subscribe((value) => {
			perms.permissions = value?.getTentPermission(tentId, tent.categoryId) ?? perms.permissions;
		}),
	);
</script>

{#if tent?.type === 'text'}
	<TextTent {tent} />
{/if}
