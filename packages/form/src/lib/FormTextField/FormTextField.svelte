<script lang="ts">
	import { getLocaleContext } from '@campground/locale';
	import { InputWrapper } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';
	import { checkStringFormat, textFieldErrors } from './validation.ts';

	const {
		format,
		top,
		bottom,
		right,
		left,
		multipleRows,
		maxRows,
		maxLength,
		minLength,
		...props
	}: FormTextFieldProps = $props();

	// Functionality
	const control: FormControlInstance<string | null> = getFormControl();

	// Error messages and feedback
	const intl = getLocaleContext();

	// Formatting
	const minLengthDerived = $derived(minLength ?? 0);

	// Updating
	$effect(() => {
		control.error =
			control.required && (control.value?.length ?? 0) < 1
				? ''
				: (control.value?.length ?? 0) < minLengthDerived
					? $intl.formatMessage(textFieldErrors.minLength, { length: minLengthDerived })
					: format
						? checkStringFormat(control.value ?? '', format)
						: null;

		const rows = control.value?.split('\n') ?? [];
		if (maxRows && rows.length > maxRows) control.value = rows.slice(0, maxRows).join('\n');
	});
</script>

<InputWrapper class={['FormTextField container']} hasError={!!control.error}>
	{@render left?.()}
	<div class={['FormTextField wrapper']}>
		{@render top?.()}
		{#if multipleRows}
			<textarea
				class={['FormTextField input']}
				bind:value={control.value}
				id={`control-${control.key}`}
				maxlength={maxLength}
				{...props}
			></textarea>
		{:else}
			<input
				bind:value={control.value}
				class={['FormTextField input']}
				id={`control-${control.key}`}
				maxlength={maxLength}
				{...props}
			/>
		{/if}
		{@render bottom?.()}
	</div>
	{@render right?.()}
</InputWrapper>

<style lang="scss">
	.input {
		border: none;
		background-color: transparent;
		padding: 0;
		outline: none;
		resize: none;
		font-family: var(--font-body);
		font-size: 1em;
		color: var(--foreground-subheading);
		flex: 1;
		:global(.hasError) > .wrapper > & {
			color: var(--danger-500);
		}
		&::placeholder {
			color: var(--foreground-background);
		}
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
