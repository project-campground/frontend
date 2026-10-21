<script lang="ts">
	import { Card, Checkbox } from '@campground/ui';
	import type { ItemProps, CheckValue } from './props.ts';
	import FormSimpleField from '#lib/SimpleField/Root.svelte';
	import { getFieldControl } from '#lib/FieldControl/context.svelte.ts';
	import { getFieldControlKey } from '#lib/CheckField/context.svelte.js';

	const { value, header, children, ...props }: ItemProps = $props();

	const control = getFieldControl<CheckValue[]>();
	const checkId = getFieldControlKey();

	function onInput() {
		if (checked) {
			const valueIndex = control.value.indexOf(value);

			return valueIndex >= 0 && control.value.splice(valueIndex, 1);
		}

		control.value.push(value);
	}

	let checked = $derived(
		(console.log('value', control.value), control.value?.includes(value) ?? false),
	);
</script>

<Card.Root>
	<Card.Content>
		<FormSimpleField
			reverse
			{header}
			{children}
		>
			{#snippet component(id)}
				<Checkbox
					bind:checked
					{id}
					size="sm"
					{...props}
					name={checkId}
					oninput={onInput}
				/>
			{/snippet}
		</FormSimpleField>
	</Card.Content>
	<Card.Click
		onclick={onInput}
		tabindex={-1}
	/>
</Card.Root>
