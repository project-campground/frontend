<script lang="ts">
	import type { ListProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFormControlKey } from '$lib/FormCheck/context.svelte.js';
	import { getFieldControl } from '$lib/FormControl/context.svelte.js';

	const { children, ...props }: ListProps = $props();

	const control = getFieldControl<number>();
	const key = $props.id();

	$effect(() => {
		control.value = control.defaultValue ?? 0;
	});

	setFormControlKey(key);
</script>

<Stack
	class="form-Checklist"
	{...props}
>
	{@render children?.()}
</Stack>
