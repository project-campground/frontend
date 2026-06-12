<script lang="ts">
	import { getFormControlContext } from '$lib/FormControl/context.js';
	import { writable } from 'svelte/store';
	import { getFormRadioContext, setFormRadioContext } from './context.ts';
	import type { FormRadioListProps } from './props.ts';
	import type { FormCheckValue } from '$lib/FormCheck/context.js';

	const { children, ...props }: FormRadioListProps = $props();

	// Functionality
	const fieldContext = getFormControlContext();
	const value = writable<FormCheckValue | null>(null);
	const key = $props.id();

	// Updating
	$effect(() => {
		fieldContext.state.set({ error: null, value: $value });
	});
	setFormRadioContext({ value, key });
</script>

<div class="FormRadioList container" {...props}>
	{@render children?.()}
</div>
