<script lang="ts">
	import { getLocaleContext } from '@campground/locale';
	import { TextInput } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { getFormFieldContext } from '$lib/FormField/context.js';
	import { checkStringFormat, textFieldErrors } from './validation.ts';

	const { children, format, maxLength, minLength, ...props }: FormTextFieldProps = $props();

	// Functionality
	const fieldContext = getFormFieldContext();
	let value = $state('');

	// Error messages
	const intl = getLocaleContext();

	// Formatting
	const required = fieldContext.required;
	const minLengthDerived = $derived(minLength || ($required ? 1 : 0));

	// Updating
	$effect(() => {
		const error =
			value.length < minLengthDerived
				? $intl.formatMessage(textFieldErrors.minLength, { length: minLengthDerived })
				: format
					? checkStringFormat(value, format)
					: null;

		fieldContext.state.set({ error, value });
	});
</script>

<TextInput bind:value {...props} id={`control-${fieldContext.key}`} maxlength={maxLength} />
