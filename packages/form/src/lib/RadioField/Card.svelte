<script lang="ts">
	import { Card, Radio } from '@campground/ui';
	import type { ItemProps } from './props.ts';
	import SimpleField from '$lib/SimpleField/Root.svelte';
	import { getFieldControl } from '$lib/FieldControl/context.svelte.ts';

	const { header, children, value, ...props }: ItemProps = $props();

	const control = getFieldControl();
</script>

<Card.Root>
	<Card.Content>
		<SimpleField
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
		</SimpleField>
	</Card.Content>
	<Card.Click
		onclick={() => (control.value = value)}
		tabindex={-1}
	/>
</Card.Root>
