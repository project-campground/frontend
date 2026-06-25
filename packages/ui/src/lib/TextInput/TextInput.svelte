<script lang="ts">
	import InputWrapper from '$lib/InputWrapper/InputWrapper.svelte';
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
	let input: HTMLInputElement | null = $state(null);
</script>

<InputWrapper
	class={['TextInput container', { focused }, className]}
	{size}
	{hasError}
	{disabled}
	cursor="text"
	// Since it's a wrapper and can be focused otherwise
	tabindex={-1}
	onclick={() => input?.focus()}
>
	{@render left?.()}
	<input
		bind:this={input}
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
		color: var(--foreground-subheading);
		font-size: 1em;
		flex: 1;
		&::placeholder {
			color: var(--foreground-background);
		}
	}
	:global(.hasError) > .input {
		color: var(--danger-350);
	}
</style>
