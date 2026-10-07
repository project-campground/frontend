<script lang="ts">
	import type FormProps from './props.ts';
	import { setFormControl } from '$lib/FormControl/context.svelte.js';
	import { getForm, setForm } from '$lib/Form/context.svelte.js';
	import { onMount } from 'svelte';
	import { FormObjectContext } from './context.svelte.ts';

	let {
		children,
		class: className,
		hideOverflow,
		gap,
		inlineContent,
		autocomplete,
		id,
		// eslint-disable-next-line no-useless-assignment
		value = $bindable({}),
		...attributes
	}: FormProps = $props();

	const formContext = getForm();
	const key = $props.id();

	// Sub-form
	const formObject = new FormObjectContext(key, formContext.submit.bind(formContext), () => id);
	setForm(formObject);
	setFormControl(formObject);

	// Make sure form is aware of this object, since there is no control to do that
	onMount(() => formContext.addControlToForm(formObject));

	// One-way binding for more reactive form
	$effect(() => {
		value = formObject.value;
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
