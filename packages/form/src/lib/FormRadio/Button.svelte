<script lang="ts">
	import { Button, Stack } from '@campground/ui';
	import type { FormRadioButtonProps } from './props.ts';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';

	let { children, value, class: className, disabled, ...props }: FormRadioButtonProps = $props();

	// Functionality
	const control = getFormControl();
	const checked = $derived(control.value === value);
</script>

<div
	class={['container', className, { checked }]}
	aria-disabled={disabled}
>
	<Button
		variant={checked ? 'selected' : 'soft'}
		color={checked ? 'primary' : 'neutral'}
		fullWidth
		onclick={() => (control.value = value)}
		tabindex={-1}
		{disabled}
	>
		<Stack
			gap={0.5}
			align="center"
		>
			{@render children?.()}
		</Stack>
	</Button>
	<input
		class="input"
		type="radio"
		name={control.key}
		bind:group={control.value}
		{value}
		{disabled}
		{...props}
	/>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		position: relative;
		width: 100%;
		height: fit-content;
	}
	.input {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		background: transparent;
		padding: 0;
		margin: 0;
		outline: none;
		appearance: none;

		z-index: 3;
		box-sizing: border-box;

		cursor: pointer;
		border: solid 2px transparent;
		border-radius: var(--radius-md);
		pointer-events: none;

		transition: border-color $transition-time-md;

		&:disabled {
			cursor: not-allowed;
		}

		&:focus-visible {
			border-color: var(--primary-glowFirst);
		}
	}
</style>
