<script lang="ts">
	import { getLocaleContext } from '@campground/locale';
	import { TextInput } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';
	import { checkStringFormat, textFieldErrors } from './validation.ts';

	const { format, maxrows, minlength, ...props }: FormTextFieldProps = $props();

	// Functionality
	const control: FormControlInstance<string | undefined> = getFormControl();

	// Error messages and feedback
	const intl = getLocaleContext();

	// Formatting
	const minLengthDerived = $derived(minlength ?? 0);

	// Updating
	$effect(() => {
		control.error =
			control.required && (control.value?.length ?? 0) < 1 ? ''
			: (control.value?.length ?? 0) < minLengthDerived ?
				$intl.formatMessage(textFieldErrors.minLength, { length: minLengthDerived })
			: format ? checkStringFormat(control.value ?? '', format)
			: null;

		const rows = control.value?.split('\n') ?? [];
		if (maxrows && rows.length > maxrows) control.value = rows.slice(0, maxrows).join('\n');
	});
</script>

<TextInput
	bind:value={control.value}
	error={!!control.error}
	aria-errormessage={control.error}
	{...props}
/>
