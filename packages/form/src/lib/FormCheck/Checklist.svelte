<script lang="ts">
	import type { FormChecklistProps } from './props.ts';
	import { getFormControlContext } from '$lib/FormControl/context.js';
	import { SvelteSet } from 'svelte/reactivity';
	import { setFormChecksContext } from './context.ts';

	const { children, ...props }: FormChecklistProps = $props();

	// Functionality
	const fieldContext = getFormControlContext();
	const checked = new SvelteSet([]);

	// Updating
	$effect(() => {
		fieldContext.state.set({ error: null, value: [...checked] });
	});
	setFormChecksContext({ checked });
</script>

<div class="FormChecklist container" {...props}>
	{@render children?.()}
</div>
