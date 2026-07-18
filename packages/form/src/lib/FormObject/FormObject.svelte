<script lang="ts">
	import type FormProps from './props.ts';
	import { FormControlInstance, setFormControl } from '$lib/FormControl/context.svelte.js';
	import { FormInstance, getForm, setForm } from '$lib/Form/context.svelte.js';
	import { onMount } from 'svelte';
	import { addControlToForm } from '$lib/FormControl/state.js';

	let {
		children,
		class: className,
		hideOverflow,
		gap,
		inlineContent,
		onSubmit,
		autocomplete,
		id,
		required,
		disabled,
		value = $bindable({}),
		...attributes
	}: FormProps = $props();

	const formContext = getForm();
	const key = $props.id();

	// Sub-form
	const form = new FormInstance(() => undefined);
	setForm(form);

	const formControl = new FormControlInstance<any>(
		key,
		() => {},
		() => id,
		() => required ?? false,
		() => disabled ?? false,
	);

	// For error labels, not really field
	setFormControl(formControl);

	// Make sure form is aware of this object, since there is no control to do that
	onMount(() => addControlToForm(formContext, formControl));

	// One-way binding for more reactive form
	$effect(() => (value = formControl.value));
	$effect(() => {
		formControl.value = Object.fromEntries(form.controls.map((x) => [x.id, x.value]));
		formControl.error = form.controls.find((x) => x.error !== null)?.error ?? null;
	});
</script>

<form
	autocomplete={autocomplete ?? 'off'}
	{...attributes}
	class={[{ hideOverflow, inlineContent }, className]}
	data-gap={gap}
>
	{@render children?.()}
</form>

<style lang="scss">
	@use '@campground/ui' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100%;
		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}
	}
	.inlineContent {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.hideOverflow {
		overflow: hidden;
	}
</style>
