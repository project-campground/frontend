<script lang="ts">
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import type FormLabelProps from './props.ts';

	const fieldContext = getFormControl();

	const { children, hideAsterisk, subtle, ...props }: FormLabelProps = $props();
</script>

<label
	class={['FormLabel label', { required: fieldContext.required, hideAsterisk, subtle }]}
	{...props}
	id={`label-${fieldContext.key}`}
	for={`control-${fieldContext.key}`}
>
	{@render children()}
	<span class={['FormLabel asterisk']}>*</span>
</label>

<style lang="scss">
	.label {
		font-size: 0.9em;
		color: var(--foreground-subheading);
		font-weight: bold;
	}
	.asterisk {
		color: var(--danger-plainFore);
	}
	.hideAsterisk,
	:not(.required) {
		& > .asterisk {
			display: none;
		}
	}
</style>
