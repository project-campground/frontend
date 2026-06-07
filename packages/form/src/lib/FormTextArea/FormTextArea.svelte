<script lang="ts">
	import type FormTextAreaProps from './props.ts';
	import { getFormFieldContext } from '$lib/FormField/context.js';
	import { InputWrapper } from '@campground/ui';

	const { children, top, bottom, maxLength, maxRows, minLength, ...props }: FormTextAreaProps =
		$props();

	const fieldContext = getFormFieldContext();
	let value = $state('');

	$effect(() => {
		// Since textarea element has no such attribute
		const rows = value.split('\n');
		if (maxRows && rows.length > maxRows) value = rows.slice(0, maxRows).join('\n');

		fieldContext.state.set({ error: null, value });
	});
</script>

<InputWrapper vertical class={['FormTextArea container']}>
	{@render top?.()}
	<textarea
		id={`control-${fieldContext.key}`}
		class={['FormTextArea input']}
		bind:value
		{...props}
		maxlength={maxLength}
	>
	</textarea>
	{@render bottom?.()}
</InputWrapper>

<style lang="scss">
	.FormTextArea {
		flex: 1;
		width: 100%;

		background-color: transparent;
		border: none;
		resize: none;
		outline: none;

		font-family: var(--font-body);
		color: var(--palette-foreground-level2);
		font-size: 1em;
	}
</style>
