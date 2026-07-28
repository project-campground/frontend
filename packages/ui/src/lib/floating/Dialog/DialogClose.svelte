<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { CloseProps } from './props.ts';
	import { getModal } from '../Modal/context.svelte.ts';
	import DialogHeaderButton from './DialogHeaderButton.svelte';

	const modal = getModal();

	const { ...attributes }: CloseProps = $props();
</script>

<DialogHeaderButton
	color="danger"
	onclick={() => modal.closeModal()}
	{...attributes}
>
	<IconX size="1.25rem" />
</DialogHeaderButton>
