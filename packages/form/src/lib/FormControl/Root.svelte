<script
	lang="ts"
	generics="T"
>
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
		// eslint-disable-next-line no-useless-assignment
		value = $bindable(),
		flex,
		children,
		...props
	}: FormControlProps<T> = $props();

	const formContext = getForm();
	const key = $props.id();
	const formControl = new FormControlInstance<T | null>(
		key,
		() => defaultValue ?? null,
		() => id,
		() => required ?? false,
		() => disabled ?? false,
	);

	// Make sure form is aware of controls, since it's harder to handle events in this case, such as submission
	onMount(() => addControlToForm(formContext, formControl));

	// One-way binding for more reactive form
	$effect(() => {
		value = formControl.value;
	});

	setFormControl(formControl);
</script>

<div
	class={[{ disabled, required }]}
	style:--FormControl-flex={flex}
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
