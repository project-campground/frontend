<script lang="ts">
	import { Radio } from '@campground/ui';
	import type { ItemProps } from './props.ts';
	import SimpleField from '$lib/SimpleField/Root.svelte';
	import { getFieldControl } from '$lib/FieldControl/context.svelte.ts';

	const { header, children, value, ...props }: ItemProps = $props();

	// Functionality
	const control = getFieldControl();
</script>

<SimpleField
	{header}
	{children}
>
	{#snippet component(id)}
		<Radio
			{id}
			size="sm"
			bind:group={control.value}
			oninput={() => (control.value = value)}
			{value}
			{...props}
		/>
	{/snippet}
</SimpleField>
