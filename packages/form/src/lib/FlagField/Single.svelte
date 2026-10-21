<script lang="ts">
	import { Checkbox } from '@campground/ui';
	import type { SingleProps } from './props.ts';
	import FormSimpleField from '$lib/SimpleField/Root.svelte';
	import { getFieldControlKey } from '$lib/CheckField/context.svelte.js';
	import { getFieldControl, type IFieldControl } from '$lib/FieldControl/context.svelte.js';

	const { value, header, children, reverse, ...props }: SingleProps = $props();

	const control: IFieldControl<number> = getFieldControl();
	const checkId = getFieldControlKey();

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
			{checked}
			{indeterminate}
			{id}
			size="sm"
			{...props}
			name={checkId}
			onclick={onInput}
		/>
	{/snippet}
</FormSimpleField>
