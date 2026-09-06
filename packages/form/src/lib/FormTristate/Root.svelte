<script lang="ts">
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import { FormSimpleField } from '$lib/FormSimpleField/index.js';
	import { Pick } from '@campground/ui';
	import Select from './Select.svelte';
	import type { RootProps } from './props.ts';

	const formControl = getFormControl();
	const pickContext = new Pick.PickContext();

	$effect(() => {
		if (!pickContext.itemsForm) return;

		pickContext.items.item(1).checked = true;
		pickContext.activeItemIndex = 1;
	});
	$effect(() => {
		formControl.value = pickContext.activeItemIndex - 1;
	});

	Pick.setPickContext(pickContext);

	const { reverse, ...props }: RootProps = $props();
</script>

<FormSimpleField
	reverse={reverse ?? true}
	{...props}
>
	{#snippet component()}
		<Select />
	{/snippet}
</FormSimpleField>
