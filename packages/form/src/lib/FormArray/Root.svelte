<script
	lang="ts"
	generics="T"
>
	import type FormArrayProps from './props.ts';
	import { FormControlInstance, setFormControl } from '$lib/FormControl/context.svelte.js';
	import { FormInstance, getForm, setForm } from '$lib/Form/context.svelte.js';
	import { onMount } from 'svelte';
	import { addControlToForm } from '$lib/FormControl/state.js';
	import Item from './Item.svelte';
	import { Button } from '@campground/ui';
	import { IconPlus } from '@tabler/icons-svelte';

	let {
		children,
		gap,
		autocomplete,
		id,
		required,
		disabled,
		// eslint-disable-next-line no-useless-assignment
		value = $bindable([]),
		defaultValue,
		defaultItemValue,
		// Item
		size,
		level,
		// Attributes
		class: className,
		...attributes
	}: FormArrayProps<T> = $props();

	const formContext = getForm();
	const key = $props.id();

	// Sub-form
	const form = new FormInstance(() => undefined);
	setForm(form);

	const formControl = new FormControlInstance<T[]>(
		key,
		() => defaultValue ?? [],
		() => id,
		() => required ?? false,
		() => disabled ?? false,
	);

	// For error labels, not really field
	setFormControl(formControl);

	// Make sure form is aware of this object, since there is no control to do that
	onMount(() => addControlToForm(formContext, formControl));

	function addItem() {
		itemIds.push(Date.now());
	}

	// For keys to not change around
	let itemIds: number[] = $state([]);

	$effect(() => {
		itemIds = defaultValue?.map((_, i) => Date.now() + i) ?? [];
	});

	$effect(() => {
		const sortedControlValues = itemIds.map(
			(id) => form.controls.find((control) => control.id === id)?.value ?? defaultItemValue,
		);

		// Map again, just so we don't filter any potential controls with undefined or falsy values
		formControl.value = sortedControlValues;
		formControl.error = form.controls.find((x) => x.error !== null)?.error ?? null;
	});

	// One-way binding for more reactive form
	$effect(() => {
		value = formControl.value;
	});
</script>

<form
	class={['container', className]}
	{...attributes}
	data-gap={gap}
>
	<ul class="list">
		{#each itemIds as id, i (id)}
			<Item
				{id}
				value={formControl.value[i]}
				{level}
				{size}
			>
				{@render children()}
			</Item>
		{/each}
	</ul>
	<Button
		variant="soft"
		color="neutral"
		type="button"
		onclick={addItem}
	>
		<IconPlus />
	</Button>
</form>

<style lang="scss">
	@use '@campground/ui' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: stretch;

		list-style-type: none;
		margin: 0;
		padding: 0;
	}
</style>
