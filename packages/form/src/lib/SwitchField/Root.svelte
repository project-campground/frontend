<script lang="ts">
	import { Switch } from '@campground/ui';
	import type SwitchFieldProps from './props.ts';
	import { getFieldControl } from '#lib/FieldControl/context.svelte.ts';
	import SimpleField from '#lib/SimpleField/Root.svelte';

	const { header, children, ...props }: SwitchFieldProps = $props();

	// Functionality
	const fieldContext = getFieldControl<boolean | undefined>();
</script>

<SimpleField
	reverse
	class={{ checked: fieldContext.value }}
	{header}
	{children}
>
	{#snippet component(id)}
		<Switch
			bind:value={fieldContext.value}
			{id}
			{...props}
		/>
	{/snippet}
</SimpleField>
