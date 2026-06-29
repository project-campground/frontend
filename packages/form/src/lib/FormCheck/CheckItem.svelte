<script lang="ts">
	import { Checkbox } from '@campground/ui';
	import type { FormCheckboxProps, FormCheckValue } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';
	import { getFormControlkey } from '$lib/FormCheck/context.svelte.js';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';

	const { value, header, children, ...props }: FormCheckboxProps = $props();

	const control: FormControlInstance<FormCheckValue[]> = getFormControl();
	const checkId = getFormControlkey();

	function onInput() {
		if (checked) {
			const valueIndex = control.value.indexOf(value);

			return valueIndex >= 0 && control.value.splice(valueIndex, 1);
		}

		control.value.push(value);
	}

	let checked = $derived(control.value?.includes(value) ?? false);
</script>

<FormSimpleField
	class={{ checked }}
	{header}
	{children}
>
	{#snippet component(id)}
		<Checkbox
			bind:checked
			{id}
			size="sm"
			{...props}
			name={checkId}
			onclick={onInput}
		/>
	{/snippet}
</FormSimpleField>
