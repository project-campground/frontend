<script lang="ts">
	import type FormControlProps from './props.ts';
	import { getForm } from '$lib/Form/context.svelte.js';
	import { FormControlInstance, setFormControl } from './context.svelte.ts';
	import { onMount } from 'svelte';
	import { addControlToForm } from './state.ts';

	let {
		id,
		required,
		disabled,
		defaultValue,
		value = $bindable(),
		flex,
		children,
		...props
	}: FormControlProps = $props();

	const formContext = getForm();
	const key = $props.id();
	const formControl = new FormControlInstance<any>(
		key,
		() => defaultValue ?? null,
		() => id,
		() => required ?? false,
		() => disabled ?? false,
	);

	// Make sure form is aware of controls, since it's harder to handle events in this case, such as submission
	onMount(() => addControlToForm(formContext, formControl));

	// One-way binding for more reactive form
	$effect(() => (value = formControl.value));

	setFormControl(formControl);
</script>

<div
	class={[{ disabled, required }]}
	style:--FormControl-flex={1}
	{...props}
>
	{@render children()}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: var(--FormControl-flex);
	}
</style>
