<script lang="ts">
	import type { ListProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFieldControlKey } from '../CheckField/context.svelte.ts';

	const { children, ...props }: ListProps = $props();

	// Functionality
	const key = $props.id();

	setFieldControlKey(key);
</script>

<Stack
	class="RadioField list"
	{...props}
>
	{@render children?.()}
</Stack>
