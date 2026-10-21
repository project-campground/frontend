<script lang="ts">
	import { getFieldControl } from '#lib/FieldControl/context.svelte.js';
	import { onMount } from 'svelte';
	import ColorPicker from './ColorPicker.svelte';
	import type { FullProps } from './props.ts';

	const fieldControl = getFieldControl<number>();

	onMount(() => {
		fieldControl.value ??= 0;
	});

	const { ...attributes }: FullProps = $props();
</script>

<ColorPicker
	bind:color={() => fieldControl.value ?? 0, (value) => (fieldControl.value = value)}
	defaultColor={fieldControl.defaultValue ?? 0}
	{...attributes}
/>
