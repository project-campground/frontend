<script lang="ts">
	import { getLocaleContext } from '@campground/locale';
	import { InputWrapper, TextInput } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { getFormFieldContext } from '$lib/FormField/context.js';
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

		const rows = value.split('\n');
		if (maxRows && rows.length > maxRows) value = rows.slice(0, maxRows).join('\n');

		fieldContext.state.set({ error, value });
	});
</script>

<InputWrapper class={['FormTextField container']}>
	{@render left?.()}
	<div class={['FormTextField wrapper']}>
		{@render top?.()}
		{#if multipleRows}
			<textarea
				class={['FormTextField input']}
				bind:value
				id={`control-${fieldContext.key}`}
				maxlength={maxLength}
				{...props}
			>
			</textarea>
		{:else}
			<input
				bind:value
				class={['FormTextField input']}
				id={`control-${fieldContext.key}`}
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
		color: var(--palette-foreground-level2);
		flex: 1;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
