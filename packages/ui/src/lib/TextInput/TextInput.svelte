<script lang="ts">
	import InputWrapper from '$lib/InputWrapper/InputWrapper.svelte';
	import { capitalize } from '../util/component.ts';
	import type TextInputProps from './props.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		hasError,
		left,
		right,
		class: className,
		...attributes
	}: TextInputProps = $props();

	let focused = $state(false);
</script>

<InputWrapper class={['TextInput container', { focused }, className]} {size} {hasError} {disabled}>
	{@render left?.()}
	<input
		bind:value
		bind:focused
		{disabled}
		{...attributes}
		class={['TextInput input', className]}
	/>
	{@render right?.()}
</InputWrapper>

<style lang="scss">
	@use '../index.scss' as *;

	:global(.disabled) > .input {
		cursor: default;
		opacity: 0.65;
		filter: grayscale(65%);
	}
	.input {
		outline: none;
		padding: 0;
		border: none;
		background-color: transparent;
		color: var(--palette-foreground-level2);
		font-size: 1em;
		flex: 1;
		&::placeholder {
			color: var(--palette-foreground-level5);
		}
	}
	:global(.hasError) > .input {
		color: var(--palette-danger-350);
	}
</style>
