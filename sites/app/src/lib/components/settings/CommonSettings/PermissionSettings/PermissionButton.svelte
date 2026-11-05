<script lang="ts">
	import { Button, TextBlock } from '@campground/ui';
	import { getItemListSettings } from '../context.svelte.ts';
	import type { PermissionViewSettings } from './context.svelte.ts';

	const permissionSettings = getItemListSettings<PermissionViewSettings>();
	const { permission }: { permission: PermissionViewSettings } = $props();
	const isActive = $derived(
		(permissionSettings.selected.role && permissionSettings.selected.role?.id === permission.role?.id)
			|| (permissionSettings.selected.member
				&& permissionSettings.selected.member?.user.did === permission.member?.user.did),
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
