<script lang="ts">
	import { getLocaleContext } from '@campground/locale';
	import { getOutsideClickBoundary, Menu, Select, TextInput } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';
	import { checkStringFormat, textFieldErrors } from './validation.ts';

	const { format, maxrows, minlength, known, ...props }: FormTextFieldProps = $props();

	// Functionality
	const control: FormControlInstance<string | undefined> = getFormControl();

	// Error messages and feedback
	const intl = getLocaleContext();
	const clickAway = getOutsideClickBoundary();

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

	function onValueSelected(
		value: Parameters<Select.SelectInstance['setValue']>[0],
		ev: Parameters<Select.SelectInstance['setValue']>[1],
	) {
		control.value = value?.toString();
		$clickAway = ev;
	}

	const textFieldSelect = new Select.SelectInstance(onValueSelected);

	function onFocus() {
		textFieldSelect.isOpen = true;
	}

	$effect(() => clickAway.subscribe(() => (textFieldSelect.isOpen = false)));

	// For known values; this is used in registration pages for PDS and possibly in the future for tags
	Select.setSelect(textFieldSelect);
</script>

<div class={['FormTextField container', { isOpen: textFieldSelect.isOpen }]}>
	<TextInput
		bind:value={control.value}
		error={!!control.error}
		aria-errormessage={control.error}
		onfocus={onFocus}
		// Don't want the menu to auto-close on click
		onclick={(ev) => ev.stopPropagation()}
		{...props}
	/>
	{#if known}
		<div class="FormTextField menuWrapper">
			<Menu.List>
				{@render known()}
			</Menu.List>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		position: relative;
	}
	.container:not(.isOpen) > .menuWrapper {
		display: none;
	}
	.menuWrapper {
		position: absolute;
		top: calc(100% + 0.5rem);
		z-index: 5;
		left: 0;
		right: 0;
	}
</style>
