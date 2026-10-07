<script
	lang="ts"
	generics="T"
>
	import { setFormControl } from '$lib/FormControl/context.svelte.js';
	import { getForm } from '$lib/Form/context.svelte.js';
	import { onMount } from 'svelte';
	import { FormArrayContext, setFormArray } from './context.svelte.ts';
	import type { RootProps } from './props.ts';
	import { writable } from 'svelte/store';

	let {
		children,
		gap,
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

	// For keys to not change around
	const maxReadable = writable<number | null | undefined>();

	const key = $props.id();
	const formArray = new FormArrayContext<T>(
		key,
		() => defaultValue ?? [],
		() => defaultItemValue,
		() => id,
		maxReadable,
	);

	// For error labels, not really field
	setFormControl(formArray);

	$effect.pre(() => {
		formArray.defaultValue = defaultValue ?? [];
		formArray.controls = FormArrayContext.createItemsFromDefaultValue(defaultValue ?? []);
	});
	$effect.pre(() => {
		formArray.required = required ?? false;
	});
	$effect.pre(() => {
		formArray.disabled = disabled ?? false;
	});
	$effect.pre(() => {
		$maxReadable = max;
	});

	// Make sure form is aware of this object, since there is no control to do that
	onMount(() => formContext.addControlToForm(formArray));

	export function getControl() {
		return formArray;
	}

	// One-way binding for more reactive form
	$effect.pre(() => {
		value = formArray.value;
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
