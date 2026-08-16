<script lang="ts">
	import type { FormRadioListProps } from './props.ts';
	import { Stack } from '@campground/ui';
	import { setFormControlKey } from '../FormCheck/context.svelte.ts';

	const { children, ...props }: FormRadioListProps = $props();

	// Functionality
	const key = $props.id();

	setFormControlKey(key);
</script>

<Stack
	class="FormRadioList container"
	{...props}
>
	{@render children?.()}
</Stack>
