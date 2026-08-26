<script lang="ts">
	import { Switch } from '@campground/ui';
	import type FormSwitchProps from './props.ts';
	import { getFormControl, type FormControlInstance } from '$lib/FormControl/context.svelte.js';
	import FormSimpleField from '$lib/FormSimpleField/Root.svelte';

	const { header, children, ...props }: FormSwitchProps = $props();

	// Functionality
	const fieldContext = getFormControl() as FormControlInstance<boolean | null>;
</script>

<FormSimpleField
	reverse
	class={{ checked: fieldContext.value }}
	{header}
	{children}
>
	{#snippet component(id)}
		<Switch
			bind:value={fieldContext.value}
			{id}
			{...props}
		/>
	{/snippet}
</FormSimpleField>
