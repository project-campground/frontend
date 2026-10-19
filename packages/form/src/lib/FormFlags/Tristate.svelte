<script
	lang="ts"
	module
>
	const values: number[] = [0b10, 0b00, 0b11];
	const valueToIndex: Record<number, number> = { [0b10]: 0, [0b00]: 1, [0b11]: 2 };
</script>

<script lang="ts">
	import { Pick } from '@campground/ui';
	import type { PairedProps } from './props.ts';
	import FormSimpleField from '$lib/FormSimpleField/Root.svelte';
	import { getFieldControl, type IFieldControl } from '$lib/FormControl/context.svelte.js';
	import TristateSelect from '$lib/FormTristate/TristateSelect.svelte';
	import { FlagsPickContext } from './context.svelte.ts';
	import { getFlagMask } from '$lib/util/flags.js';

	const { position, header, children, reverse, ...props }: PairedProps = $props();

	const control: IFieldControl<number> = getFieldControl();

	function valueAtPos(index: number) {
		return values[index]! << (position * 2);
	}
	function onSetIndex(index: number) {
		control.value = (control.value & ~getFlagMask(2, position)) | valueAtPos(index);
	}

	const pickContext = new FlagsPickContext(onSetIndex);

	$effect(() => {
		const posValue = (control.value >> (position * 2)) & 0b11;
		pickContext.activeItemIndex = valueToIndex[posValue] ?? 1;
	});

	Pick.setPickContext(pickContext);
</script>

<FormSimpleField
	reverse={reverse ?? true}
	{header}
	{children}
	{...props}
>
	{#snippet component(id)}
		<TristateSelect {id} />
	{/snippet}
</FormSimpleField>
