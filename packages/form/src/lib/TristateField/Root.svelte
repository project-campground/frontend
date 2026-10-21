<script lang="ts">
	import { getFieldControl } from '#lib/FieldControl/context.svelte.ts';
	import { SimpleField } from '#lib/SimpleField/index.ts';
	import { Pick } from '@campground/ui';
	import Select from './TristateSelect.svelte';
	import type { RootProps } from './props.ts';

	const fieldControl = getFieldControl();
	const pickContext = new Pick.PickContext();

	$effect(() => {
		if (!pickContext.itemsForm) return;

		pickContext.items.item(1).checked = true;
		pickContext.activeItemIndex = 1;
	});
	$effect(() => {
		fieldControl.value = pickContext.activeItemIndex - 1;
	});

	Pick.setPickContext(pickContext);

	const { reverse, ...props }: RootProps = $props();
</script>

<SimpleField
	reverse={reverse ?? true}
	{...props}
>
	{#snippet component()}
		<Select />
	{/snippet}
</SimpleField>
