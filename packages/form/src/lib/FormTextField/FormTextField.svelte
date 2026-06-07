<script lang="ts" module>
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getLocaleContext } from '@campground/locale';

	const errors = defineMessages({
		minLength: {
			id: 'form.fields.text.maxLength',
			defaultMessage: 'The text is too short. Expected text to be {length} characters or more.',
			description: 'The error when the text field has value that is too long'
		}
	});
</script>

<script lang="ts">
	import { TextInput } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { getFormFieldContext } from '$lib/FormField/context.js';
	import { checkStringFormat } from './validation.ts';

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
		const error = format
			? checkStringFormat(value, format)
			: value.length < minLengthDerived
				? $intl.formatMessage(errors.minLength, { length: minLengthDerived })
				: null;

		fieldContext.state.set({ error, value });
	});
</script>

<TextInput bind:value {...props} id={`control-${fieldContext.key}`} maxlength={maxLength} />
