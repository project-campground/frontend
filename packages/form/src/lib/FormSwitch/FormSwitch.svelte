<script lang="ts">
	import { Switch, Para } from '@campground/ui';
	import type FormSwitchProps from './props.ts';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';

	const { header, children, ...props }: FormSwitchProps = $props();

	// Functionality
	const fieldContext = getFormControl();
</script>

<FormSimpleField reverse class={{ checked: fieldContext.value }} {header} {children}>
	{#snippet component(id)}
		<Switch bind:value={fieldContext.value} {id} {...props} />
	{/snippet}
</FormSimpleField>
