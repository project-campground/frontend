<script lang="ts">
	import { capitalize } from '$lib/util/component.js';
	import type { Snippet } from 'svelte';
	import type TextInputProps from './props.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		error: hasError,
		left,
		right,
		top,
		bottom,
		class: className,
		multirow,
		...attributes
	}: TextInputProps = $props();

	let focused = $state(false);
	let input: HTMLInputElement | HTMLTextAreaElement | null = $state(null);
</script>

{#snippet decorator(snippet?: Snippet)}
	{#if snippet}
		<span class="TextInput decorator">
			{@render snippet()}
		</span>
	{/if}
{/snippet}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class={[
		'TextInput container',
		{ focused, hasError, disabled },
		`size${capitalize(size ?? 'md')}`,
		className
	]}
	aria-disabled={disabled}
	onclick={() => input?.focus()}
>
	{@render decorator(left)}
	<div class="TextInput wrapper">
		{@render decorator(top)}
		{#if multirow}
			<textarea
				bind:this={input}
				bind:value
				bind:focused
				{disabled}
				{...attributes}
				class="TextInput input"
			></textarea>
		{:else}
			<input
				bind:this={input}
				bind:value
				bind:focused
				{disabled}
				{...attributes}
				class="TextInput input"
			/>
		{/if}
		{@render decorator(bottom)}
	</div>
	{@render decorator(right)}
</div>

<style lang="scss">
	@use '../index.scss' as *;
	@use './InputField.scss' as *;

	.container {
		@extend %InputField;
		&:hover:not(.disabled) {
			@extend %InputField-hover;
		}
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.decorator {
		@extend %InputField-decorator;
	}
	.hasError:not(.disabled) {
		@extend %InputField-error;
		.input {
			color: var(--danger-plainFore);
			&::placeholder {
				color: var(--danger-plainForeBackground);
			}
			&::selection {
				background-color: var(--danger-selectionBack);
				color: var(--danger-selectionFore);
			}
		}
	}
	.focused {
		@extend %InputField-focused;
	}
	.disabled {
		@extend %InputField-disabled;
		.input {
			color: var(--foreground-background);
		}
	}
	.input {
		outline: none;
		padding: 0;
		border: none;
		background-color: transparent;
		color: var(--foreground-subheading);
		font-size: 1em;
		font-family: var(--font-body);
		resize: none;
		flex: 1;
		&::placeholder {
			color: var(--foreground-background);
		}
	}
</style>
