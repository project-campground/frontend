<script lang="ts">
	import { getFormFieldContext } from '$lib/FormField/context.js';
	import type FormLabelProps from './props.ts';

	const fieldContext = getFormFieldContext();
	let required = $state<boolean>(false);

	fieldContext.required.subscribe((value) => (required = value));

	const { children, hideAsterisk, subtle, ...props }: FormLabelProps = $props();
</script>

<label
	class={['FormLabel label', { required, hideAsterisk, subtle }]}
	{...props}
	for={`control-${fieldContext.key}`}
>
	{@render children()}
	<span class={['FormLabel asterisk']}>*</span>
</label>

<style lang="scss">
	.label {
		font-size: 0.9em;
		color: var(--palette-foreground-level2);
		font-weight: bold;
	}
	.asterisk {
		color: var(--palette-danger-500);
	}
	.hideAsterisk,
	:not(.required) {
		& > .asterisk {
			display: none;
		}
	}
</style>
