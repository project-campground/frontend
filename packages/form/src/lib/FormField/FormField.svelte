<script lang="ts">
	import type FormFieldProps from './props.ts';
	import { getFormContext } from '$lib/Form/context.js';
	import { get, toStore, writable } from 'svelte/store';
	import { setFormFieldContext } from './context.ts';

	const { id, required, disabled, children, ...props }: FormFieldProps = $props();
	const error = writable<string | null>(null);

	const formContext = getFormContext();
	const state = toStore(
		() => {
			const currentFormFields = get(formContext.fields);
			return {
				value: currentFormFields.values[id],
				error: currentFormFields.valid[id] ? null : ''
			};
		},
		({ value, error }) => formContext.updateFieldState(id, error !== null, value)
	);
	const idStore = toStore(() => id);
	const key = $props.id();

	setFormFieldContext({
		id: idStore,
		key,
		state,
		error,
		required: toStore(() => required ?? false),
		disabled: toStore(() => disabled ?? false)
	});
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
