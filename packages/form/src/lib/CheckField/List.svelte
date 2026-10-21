<script lang="ts">
	import type { ListProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFieldControlKey } from '$lib/CheckField/context.svelte.js';
	import { getFieldControl } from '$lib/FieldControl/context.svelte.ts';
	import { onMount } from 'svelte';

	const { children, ...props }: ListProps = $props();

	const control = getFieldControl();
	const key = $props.id();

	onMount(() => {
		control.value = control.defaultValue ?? [];
	});

	setFieldControlKey(key);
</script>

<Stack
	class="form-Checklist"
	{...props}
>
	{@render children?.()}
</Stack>
