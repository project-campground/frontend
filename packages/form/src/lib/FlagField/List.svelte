<script lang="ts">
	import type { ListProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFieldControlKey } from '#lib/CheckField/context.svelte.js';
	import { getFieldControl } from '#lib/FieldControl/context.svelte.js';

	const { children, ...props }: ListProps = $props();

	const control = getFieldControl<bigint>();
	const key = $props.id();

	$effect(() => {
		control.value = control.defaultValue ?? 0n;
	});

	setFieldControlKey(key);
</script>

<Stack
	class="form-Checklist"
	{...props}
>
	{@render children?.()}
</Stack>
