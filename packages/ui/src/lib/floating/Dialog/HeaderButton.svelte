<script lang="ts">
	import Button from '$lib/form/Button/Root.svelte';
	import type { HeaderButtonProps } from './props.ts';

	const { ...attributes }: HeaderButtonProps = $props();
</script>

<Button
	size="sm"
	variant="soft"
	padding="equal"
	{...attributes}
/>
