<script lang="ts">
	import { Checkbox } from '@campground/ui';
	import type { ItemProps, CheckValue } from './props.ts';
	import FormSimpleField from '#lib/SimpleField/Root.svelte';
	import { getFieldControlKey } from '#lib/CheckField/context.svelte.js';
	import { getFieldControl } from '#lib/FieldControl/context.svelte.ts';

	const { value, header, children, ...props }: ItemProps = $props();

	const control = getFieldControl<CheckValue[]>();
	const checkId = getFieldControlKey();

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
