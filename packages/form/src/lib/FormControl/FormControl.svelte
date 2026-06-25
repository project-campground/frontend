<script lang="ts">
	import type FormControlProps from './props.ts';
	import { getForm } from '$lib/Form/context.svelte.js';
	import { FormControlInstance, setFormControl } from './context.svelte.ts';
	import { onMount } from 'svelte';

	let { id, required, disabled, defaultValue, value = $bindable(), children, ...props }: FormControlProps = $props();

	const formContext = getForm();
	const key = $props.id();
	const formControl = new FormControlInstance<any>(key, () => defaultValue ?? null, () => id, () => required ?? false, () => disabled ?? false);

	// Make sure form is aware of controls, since it's harder to handle events in this case, such as submission
	onMount(() => {
		formContext.controls.push(formControl);

		// We don't want to have control exist even after it has unmounted (if it exists conditionally)
		return () => {
			const index = formContext.controls.indexOf(formControl);
			// For some odd reason form control disappeared and we don't want it to randomly cut off last element (-1 cuts off last element)
			if (index < 0)
				return;

			return formContext.controls.splice(index, 1);
		};
	});

	// One-way binding for more reactive form
	$effect(() => value = formControl.value);

	setFormControl(formControl);
</script>

<div class={['FormField', { disabled, required }]} {...props}>
	{@render children()}
</div>

<style lang="scss">
	.FormField {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
