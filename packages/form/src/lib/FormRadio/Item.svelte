<script lang="ts">
	import { Radio } from '@campground/ui';
	import { getFormControlkey } from '../FormCheck/context.svelte.ts';
	import type { FormRadioItemProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/Root.svelte';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';

	const { header, children, value, ...props }: FormRadioItemProps = $props();

	// Functionality
	const control = getFormControl();
	let checked = $state(false);
</script>

<FormSimpleField
	class={{ checked }}
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
