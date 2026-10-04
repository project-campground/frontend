<script
	lang="ts"
	generics="T"
>
	import { FormControlInstance, setFormControl } from '$lib/FormControl/context.svelte.js';
	import { FormInstance, getForm, setForm } from '$lib/Form/context.svelte.js';
	import { onMount } from 'svelte';
	import { addControlToForm } from '$lib/FormControl/state.js';
	import { FormArrayContext, setFormArray } from './context.svelte.ts';
	import type { RootProps } from './props.ts';
	import { writable } from 'svelte/store';

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
		max,
		// Attributes
		class: className,
		...attributes
	}: RootProps<T> = $props();

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

	// For keys to not change around
	const maxReadable = writable<number | null | undefined>();

	$effect(() => {
		$maxReadable = max;
	});

	const formArray = new FormArrayContext(
		() => formControl.value,
		(newValue) => (formControl.value = newValue as T[]),
		maxReadable,
	);

	$effect(() => {
		formArray.itemIds = defaultValue?.map((_, i) => Date.now() + i) ?? [];
	});

	$effect(() => {
		const sortedControlValues = formArray.itemIds.map(
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
	setFormArray(formArray);
</script>

<form
	class={['container', className]}
	{...attributes}
	autocomplete="off"
	data-gap={gap}
>
	{@render children()}
</form>

<style lang="scss">
	@use '@campground/ui' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		height: 100%;
		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}
	}
</style>
