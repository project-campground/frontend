<script lang="ts">
	import { getLocaleContext } from '@campground/locale';
	import { getMenuPortal, Menu, MenuPortalInstance, Select, TextInput } from '@campground/ui';
	import type FormTextFieldProps from './props.ts';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';
	import { checkStringFormat, textFieldErrors } from './validation.ts';

	const { format, maxrows, minlength, known, ...props }: FormTextFieldProps = $props();

	// Functionality
	const control: FormControlInstance<string | undefined> = getFormControl() as FormControlInstance<
		string | undefined
	>;

	// Error messages and feedback
	const intl = getLocaleContext();
	const menuPortal = getMenuPortal();

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

	// When it's destroyed
	$effect(() => {
		if (instance && !menuPortal.includes(instance)) instance = null;
	});

	let instance: MenuPortalInstance | null = $state(null);

	function onFocus(event: FocusEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (instance || !known) return;

		instance = menuPortal.add(selectMenu, event.currentTarget);
	}
</script>

<!-- For known values; this is used in registration pages for PDS and possibly in the future for tags -->
{#snippet selectMenu(menu: MenuPortalInstance)}
	<Select.Menu
		onSelect={(newValue) => (control.value = newValue.toString())}
		instance={menu}
		offset={10}
		placement="bottom-start"
	>
		<Menu.List>
			{@render known?.()}
		</Menu.List>
	</Select.Menu>
{/snippet}

<div class={['container', { isOpen: !!instance }]}>
	<TextInput
		bind:value={control.value}
		error={!!control.error}
		aria-errormessage={control.error}
		onfocus={onFocus}
		// Don't want the menu to auto-close on click
		onclick={(ev) => ev.stopPropagation()}
		{...props}
	/>
</div>

<style lang="scss">
	.container {
		position: relative;
	}
</style>
