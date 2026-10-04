<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import type { MemberViewBasic } from '$lib/types/campground/membership.js';
	import { getCampsiteContext } from '../../../context.svelte.ts';
	import MemberList from './MemberList.svelte';

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite!);
	const appview = getAppview();

	// TODO: reuse tent infinite scroller for member list
	let members: MemberViewBasic[] = $derived(
		await appview.members.getMany(campsite.id, 0).then((resp) => resp.members),
	);
</script>

<MemberList
	{members}
	roles={campsite.roles}
/>
