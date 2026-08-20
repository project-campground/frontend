<script lang="ts">
	import { Card, Radio } from '@campground/ui';
	import type { FormRadioItemProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/Root.svelte';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';

	const { header, children, value, ...props }: FormRadioItemProps = $props();

	const control = getFormControl();
</script>

<Card.Root>
	<Card.Content>
		<FormSimpleField
			class={{ checked: control.value === value }}
			reverse
			{header}
			{children}
		>
			{#snippet component(id)}
				<Radio
					{id}
					size="sm"
					{value}
					bind:group={control.value}
					oninput={() => (control.value = value)}
					{...props}
				/>
			{/snippet}
		</FormSimpleField>
	</Card.Content>
	<Card.Click
		onclick={() => (control.value = value)}
		tabindex={-1}
	/>
</Card.Root>
