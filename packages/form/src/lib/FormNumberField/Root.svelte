<script
	lang="ts"
	module
>
	const intRegex = /^[-+]?[0-9]+$/;
	const floatRegex = /^[-+]?[0-9]+([.][0-9]*)?$/;
</script>

<script lang="ts">
	import { getLocale } from '@campground/locale';
	import { Button, Stack, TextInput } from '@campground/ui';
	import type FormNumberFieldProps from './props.ts';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';
	import { numberFieldErrors } from './validation.ts';
	import { fieldAssert } from '$lib/util/validation.js';
	import { IconMinus, IconPlusFilled } from '@tabler/icons-svelte';

	const {
		min,
		max,
		floating,
		right: leftOfButtons,
		size,
		step,
		...props
	}: FormNumberFieldProps = $props();

	// Functionality
	const control: FormControlInstance<number | null | undefined> =
		getFormControl() as FormControlInstance<number | undefined>;

	// Error messages and feedback
	const intl = getLocale();

	let textValue = $derived(control.value?.toString());

	const numRegex = $derived(floating ? floatRegex : intRegex);

	function setNewTextValue(value: string) {
		textValue = value;

		if (fieldAssert(!!value && !numRegex.test(value), control, intl, numberFieldErrors.invalidFormat))
			return;

		return setNewValue(value ? parseFloat(value) : null);
	}

	function setNewValue(value: number | null) {
		control.error = null;

		if (value === null && control.required) {
			control.error = '';
			return;
		} else if (
			fieldAssert(!floating && Boolean((value ?? 0) % 1), control, intl, numberFieldErrors.noFloating)
			|| fieldAssert(
				typeof min !== 'undefined' && (value ?? 0) < min,
				control,
				intl,
				numberFieldErrors.lessThanMin,
				{ value: min },
			)
			|| fieldAssert(
				typeof max !== 'undefined' && (value ?? 0) > max,
				control,
				intl,
				numberFieldErrors.greaterThanMax,
				{ value: max },
			)
		) {
			return;
		}

		control.value = value;
	}

	const stepOrDefault = $derived(step ?? 1);

	function increment(incrementValueBy: number) {
		return setNewValue((control.value ?? min ?? 0) + incrementValueBy * stepOrDefault);
	}
</script>

<TextInput
	bind:value={() => textValue ?? '', setNewTextValue}
	error={!!control.error}
	aria-errormessage={control.error}
	// Don't want the menu to auto-close on click
	onclick={(ev) => ev.stopPropagation()}
	{size}
	{...props}
>
	{#snippet right()}
		<Stack direction="row">
			{@render leftOfButtons?.()}
			<div class="buttons">
				<Button
					color="neutral"
					variant="plain"
					{size}
					onclick={() => increment(1)}
				>
					<IconPlusFilled size="1rem" />
				</Button>
				<Button
					color="neutral"
					variant="plain"
					{size}
					onclick={() => increment(-1)}
				>
					<IconMinus size="1rem" />
				</Button>
			</div>
		</Stack>
	{/snippet}
</TextInput>

<style lang="scss">
	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-block: calc(var(--InputField-paddingY) * -1);
		margin-inline-end: calc(var(--InputField-paddingX) * -2);
	}
</style>
