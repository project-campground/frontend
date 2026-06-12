<script lang="ts">
	import { Radio } from '@campground/ui';
	import { getFormRadioContext } from './context.ts';
	import type { FormRadioItemProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';

	const { header, children, value, ...props }: FormRadioItemProps = $props();

	// Functionality
	const fieldContext = getFormRadioContext();
	let checked = $state(false);

	// Updating
	fieldContext.value.subscribe((newValue) => (checked = value === newValue));
</script>

<FormSimpleField class={{ checked }} {header} {children}>
	{#snippet component(id)}
		<Radio
			{id}
			size="sm"
			name={fieldContext.key}
			oninput={() => fieldContext.value.set(value)}
			{value}
			{...props}
		/>
	{/snippet}
</FormSimpleField>
