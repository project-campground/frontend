<script lang="ts">
	import { capitalize } from '@campground/ui';
	import type FormProps from './props.ts';
	import { setFormContext, type FormContext, type FormFields } from './context.ts';
	import { writable } from 'svelte/store';
	import type { FormFieldId } from './props.ts';

	let {
		children,
		class: className,
		hideOverflow,
		gap,
		inlineContent,
		// Callbacks
		onSubmit,
		// To allow form to export fields value
		// Export function that gives readable could work, but it's more of a hassle
		fields = $bindable(),
		...attributes
	}: FormProps = $props();

	// Frequently modified value in the context. The rest are not modified
	const formFields = writable<FormFields>({ values: {}, valid: {}, allValid: true });

	const resetHandlers: Record<FormFieldId, (ev?: MouseEvent) => unknown> = $state({});

	// Add the ability to reset values with bind:this
	export function resetValues(ev?: MouseEvent) {
		for (const resetter of Object.values(resetHandlers)) resetter(ev);
	}

	// For fields only: to update values and validity values
	const addValueResetHandler: FormContext['addValueResetHandler'] = (
		id: FormFieldId,
		resetHandler: Parameters<FormContext['addValueResetHandler']>[1]
	) => (resetHandlers[id] = resetHandler);

	const updateFieldState: FormContext['updateFieldState'] = (id, valid, value) =>
		formFields.update((current) => {
			const validFields = { ...current.valid, [id]: valid };
			const allValid = Object.values(validFields).every((x) => x);

			return {
				valid: validFields,
				values: { ...current.values, [id]: value },
				allValid
			};
		});

	formFields.subscribe((value) => (fields = value));

	// Basically main functionality of form: the context
	setFormContext({
		fields: formFields,
		submit: async (ev) => onSubmit?.($formFields.values, ev),
		addValueResetHandler,
		updateFieldState
	});
</script>

<form
	{...attributes}
	class={['Form', gap && `gap${capitalize(gap)}`, { hideOverflow, inlineContent }, className]}
>
	{@render children?.()}
</form>

<style lang="scss">
	@use '@campground/ui' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	.Form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100%;
		@each $size, $value in $gaps {
			&.gap#{capitalize($size)} {
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
