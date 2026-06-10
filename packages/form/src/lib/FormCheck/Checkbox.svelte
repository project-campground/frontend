<script lang="ts">
	import { Checkbox } from '@campground/ui';
	import type { FormCheckboxProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';
	import { getFormChecksContext } from './context.ts';

	const { header, children, value, ...props }: FormCheckboxProps = $props();

	// Functionality
	const fieldContext = getFormChecksContext();
	let checked = $state(false);

	// Updating
	$effect(() => {
		if (checked) fieldContext.checked.add(value);
		else fieldContext.checked.delete(value);
	});
</script>

<FormSimpleField class={{ checked }} {header} {children}>
	{#snippet component()}
		<Checkbox bind:value={checked} {...props} />
	{/snippet}
</FormSimpleField>
