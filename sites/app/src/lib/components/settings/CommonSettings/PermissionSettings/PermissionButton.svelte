<script lang="ts">
	import { Button, TextBlock } from '@campground/ui';
	import type { CampsitePermissionViewDetailed } from '#lib/types/campground/permissions.js';
	import { getItemListSettings } from '../context.svelte.ts';

	const permissionSettings = getItemListSettings<CampsitePermissionViewDetailed>();
	const { permission }: { permission: CampsitePermissionViewDetailed } = $props();
	const isActive = $derived(
		permissionSettings.selected.role?.id === permission.role?.id
			|| permissionSettings.selected.member?.user.did === permission.member?.user.did,
	);
</script>

<Button
	justify="start"
	variant={isActive ? 'selected' : 'plain'}
	color="neutral"
	onclick={() => (permissionSettings.selected = permission)}
	textAlign="left"
>
	<TextBlock>
		{permission.role?.name
			?? permission.member?.nickname
			?? permission.member?.user.displayName
			?? permission.member?.user.did}
	</TextBlock>
</Button>
