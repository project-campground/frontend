<script lang="ts">
	import { Card, Checkbox } from '@campground/ui';
	import type { FormCheckboxProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';
	import { getFormChecksContext } from './context.ts';

	const { value, header, children, ...props }: FormCheckboxProps = $props();

	// Functionality
	const fieldContext = getFormChecksContext();
	let checked = $state(false);

	// Updating
	$effect(() => {
		if (checked) fieldContext.checked.add(value);
		else fieldContext.checked.delete(value);
	});
</script>

<Card.Root>
	<Card.Content>
		<FormSimpleField reverse {header} {children}>
			{#snippet component(id)}
				<Checkbox bind:checked {id} size="sm" {...props} />
			{/snippet}
		</FormSimpleField>
	</Card.Content>
	<Card.Link onclick={() => (checked = !checked)} tabindex={-1} />
</Card.Root>
