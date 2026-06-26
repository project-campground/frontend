<script lang="ts">
	import { capitalize, Menu } from '$lib/index.js';
	import { IconCaretDownFilled } from '@tabler/icons-svelte';
	import type { ButtonProps } from './props.ts';
	import { getOutsideClickBoundary } from '$lib/contexts/outside.svelte.js';
	import { SelectInstance, setSelect } from './context.svelte.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		class: className,
		children,
		display,
		...attributes
	}: ButtonProps = $props();

	const selectInstance = new SelectInstance(
		(newValue, mouseEvent) => ((value = newValue), ($outsideClick = mouseEvent))
	);
	const outsideClick = getOutsideClickBoundary();

	function toggleMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		// Prevent click-away
		ev.stopPropagation();

		const wasOpen = selectInstance.isOpen;
		// Close other selects whenever it's toggled
		$outsideClick = ev;

		if (!wasOpen) return (selectInstance.isOpen = true);
	}
	outsideClick.subscribe(() => {
		selectInstance.isOpen = false;
	});
	setSelect(selectInstance);
</script>

<button
	class={[
		'Select SelectButton container',
		{ isOpen: selectInstance.isOpen },
		`size${capitalize(size ?? 'md')}`,
		className
	]}
	{disabled}
	onclick={(ev) => toggleMenu(ev)}
	{...attributes}
>
	<div class="Select SelectButton content">
		<span class="Select SelectButton placeholder">
			{@render display(value)}
		</span>
	</div>
	<span class="Select SelectButton caret" aria-hidden="true">
		<IconCaretDownFilled size={12} />
	</span>
	<div class="Select SelectButton menuWrapper">
		<Menu.List>
			{@render children()}
		</Menu.List>
	</div>
</button>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';
	@use '../TextInput/InputField.scss' as *;

	.menuWrapper {
		z-index: 20;
	}

	.container {
		position: relative;
		cursor: pointer;

		@extend %InputField;
		&:disabled {
			@extend %InputField-disabled;
		}
		&:hover:not(:disabled) {
			@extend %InputField-hover;
		}
		&:focus-visible,
		&.isOpen:not(:disabled) {
			@extend %InputField-focused;
		}
	}
	.container:not(.isOpen) > .menuWrapper {
		display: none;
	}
	.menuWrapper {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		right: 0;
	}
	.caret {
		color: var(--foreground-body);
	}
	.placeholder {
		color: var(--foreground-subtext);
	}
	.content {
		flex: 1;
	}
</style>
