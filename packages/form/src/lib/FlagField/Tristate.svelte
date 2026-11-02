<script
	lang="ts"
	module
>
	const values: bigint[] = [0b10n, 0b00n, 0b11n];
	const valueToIndex: Record<string, number> = { [0b10]: 0, [0b00]: 1, [0b11]: 2 };
</script>

<script lang="ts">
	import { Pick } from '@campground/ui';
	import type { PairedProps } from './props.ts';
	import FormSimpleField from '#lib/SimpleField/Root.svelte';
	import { getFieldControl } from '#lib/FieldControl/context.svelte.js';
	import TristateSelect from '#lib/TristateField/TristateSelect.svelte';
	import { FlagsPickContext } from './context.svelte.ts';
	import { getFlagMask } from '#lib/util/flags.js';

	const { position, header, children, reverse, ...props }: PairedProps = $props();

	const control = getFieldControl<bigint>();

	function valueAtPos(index: number) {
		return values[index]! << (position * 2n);
	}
	function onSetIndex(index: number) {
		control.value = (control.value & ~getFlagMask(2n, position)) | valueAtPos(index);
	}

	const pickContext = new FlagsPickContext(onSetIndex);

	const positionBitwise = $derived(position * 2n);

	$effect(() => {
		if (typeof control.value === 'undefined') return;

		const posValue = (control.value >> positionBitwise) & 0b11n;
		pickContext.activeItemIndex = valueToIndex[posValue.toString()] ?? 1;
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
