<script lang="ts">
	import type { FormChecklistProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFormControlKey } from '$lib/FormCheck/context.svelte.js';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import { onMount } from 'svelte';

	const { children, ...props }: FormChecklistProps = $props();

	const control = getFormControl();
	const key = $props.id();

	onMount(() => {
		control.value = control.defaultValue ?? [];
	})

	setFormControlKey(key);
</script>

<Stack class="FormChecklist" {...props}>
	{@render children?.()}
</Stack>
