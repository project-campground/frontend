<script lang="ts">
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import { onMount } from 'svelte';
	import ColorPicker from './ColorPicker.svelte';
	import type { FullProps } from './props.ts';

	const formControl = getFormControl<number>();

	onMount(() => {
		formControl.value ??= 0;
	});

	const { ...attributes }: FullProps = $props();
</script>

<ColorPicker
	bind:color={() => formControl.value ?? 0, (value) => (formControl.value = value)}
	defaultColor={formControl.defaultValue ?? 0}
	{...attributes}
/>
