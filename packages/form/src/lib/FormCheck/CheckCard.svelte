<script lang="ts">
	import { Card, Checkbox } from '@campground/ui';
	import type { FormCheckboxProps, FormCheckValue } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';
	import { getFormControl, type FormControlInstance } from '$lib/FormControl/context.svelte.js';
	import { getFormControlkey } from '$lib/FormCheck/context.svelte.js';

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

<Card.Root>
	<Card.Content>
		<FormSimpleField
			reverse
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
					oninput={onInput}
				/>
			{/snippet}
		</FormSimpleField>
	</Card.Content>
	<Card.Link
		onclick={onInput}
		tabindex={-1}
	/>
</Card.Root>
