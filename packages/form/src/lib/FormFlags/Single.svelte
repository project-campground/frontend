<script lang="ts">
	import { Checkbox } from '@campground/ui';
	import type { SingleProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/Root.svelte';
	import { getFormControlKey } from '$lib/FormCheck/context.svelte.js';
	import { getFieldControl, type IFormControl } from '$lib/FormControl/context.svelte.js';

	const { value, header, children, reverse, ...props }: SingleProps = $props();

	const control: IFormControl<number> = getFieldControl();
	const checkId = getFormControlKey();

	function onInput() {
		if (!checked) return (control.value |= value);

		control.value = control.value & ~value;
	}

	let valueOverlap = $derived(control.value & value);
	let checked = $derived(Boolean(valueOverlap === value));
	let indeterminate = $derived(Boolean(valueOverlap) && (control.value & value) !== value);
</script>

<FormSimpleField
	class={{ checked, indeterminate }}
	reverse={reverse ?? true}
	{header}
	{children}
>
	{#snippet component(id)}
		<Checkbox
			bind:checked
			{indeterminate}
			{id}
			size="sm"
			{...props}
			name={checkId}
			onclick={onInput}
		/>
	{/snippet}
</FormSimpleField>
