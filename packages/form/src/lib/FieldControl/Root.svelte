<script
	lang="ts"
	generics="T"
>
	import type FieldControlProps from './props.ts';
	import { getForm } from '#lib/Form/context.svelte.js';
	import { FieldControlInstance, setFieldControl } from './context.svelte.ts';
	import { onMount } from 'svelte';

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
	}: FieldControlProps<T> = $props();

	const formContext = getForm();
	const key = $props.id();
	const fieldControl = new FieldControlInstance<T | null>(
		key,
		() => defaultValue ?? null,
		() => id,
	);

	$effect.pre(() => {
		fieldControl.disabled = disabled ?? false;
	});
	$effect.pre(() => {
		fieldControl.required = required ?? false;
	});
	$effect.pre(() => {
		fieldControl.value = fieldControl.defaultValue = defaultValue ?? null;
	});
	$effect.pre(() => {
		fieldControl.id = id;
	});

	// Make sure form is aware of controls, since it's harder to handle events in this case, such as submission
	onMount(() => formContext.addFieldToForm(fieldControl));

	// One-way binding for more reactive form
	$effect.pre(() => {
		value = fieldControl.value;
	});

	setFieldControl(fieldControl);
</script>

<div
	class={[{ disabled, required }]}
	style:--FieldControl-flex={flex}
	{...props}
>
	{@render children()}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: var(--FieldControl-flex);
	}
</style>
