<script lang="ts">
	import { Switch, Para } from '@campground/ui';
	import type FormSwitchProps from './props.ts';
	import { getFormControlContext } from '$lib/FormControl/context.js';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';

	const { header, children, ...props }: FormSwitchProps = $props();

	// Functionality
	const fieldContext = getFormControlContext();
	let value = $state(false);

	// Updating
	$effect(() => {
		fieldContext.state.set({ error: null, value });
	});
</script>

<FormSimpleField reverse class={{ checked: value }} {header} {children}>
	{#snippet component()}
		<Switch bind:value {...props} />
	{/snippet}
</FormSimpleField>
