<script lang="ts">
	import { Card, Radio } from '@campground/ui';
	import type { FormRadioItemProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/FormSimpleField.svelte';
	import { getFormRadioContext } from './context.ts';
	import type { FormCheckValue } from '$lib/FormCheck/context.js';

	const { header, children, value, ...props }: FormRadioItemProps = $props();

	// Functionality
	const fieldContext = getFormRadioContext();
	let group = $state<FormCheckValue | null>(null);

	$effect(() => {});
	// Updating
	fieldContext.value.subscribe((newValue) => (group = newValue));
</script>

<Card.Root>
	<Card.Content>
		<FormSimpleField class={{ checked: group === value }} reverse {header} {children}>
			{#snippet component(id)}
				<Radio {id} size="sm" name={fieldContext.key} {value} bind:group {...props} />
			{/snippet}
		</FormSimpleField>
	</Card.Content>
	<Card.Link onclick={() => fieldContext.value.set(value)} tabindex={-1} />
</Card.Root>
