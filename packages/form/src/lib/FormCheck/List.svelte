<script lang="ts">
	import type { ListProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFormControlKey } from '$lib/FormCheck/context.svelte.js';
	import { getFieldControl } from '$lib/FormControl/context.svelte.js';
	import { onMount } from 'svelte';

	const { children, ...props }: ListProps = $props();

	const control = getFieldControl();
	const key = $props.id();

	onMount(() => {
		control.value = control.defaultValue ?? [];
	});

	setFormControlKey(key);
</script>

<Stack
	class="form-Checklist"
	{...props}
>
	{@render children?.()}
</Stack>
