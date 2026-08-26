<script lang="ts">
	import { Radio } from '@campground/ui';
	import type { FormRadioItemProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/Root.svelte';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';

	const { header, children, value, ...props }: FormRadioItemProps = $props();

	// Functionality
	const control = getFormControl();
</script>

<FormSimpleField
	{header}
	{children}
>
	{#snippet component(id)}
		<Radio
			{id}
			size="sm"
			bind:group={control.value}
			oninput={() => (control.value = value)}
			{value}
			{...props}
		/>
	{/snippet}
</FormSimpleField>
