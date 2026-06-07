<script lang="ts">
	import { getFormFieldContext } from '$lib/FormField/context.js';
	import type FormErrorLabelProps from './props.ts';

	const fieldContext = getFormFieldContext();
	let error = $state<string | null>(null);

	fieldContext.error.subscribe((value) => (error = value));

	const { class: className, ...props }: FormErrorLabelProps = $props();
</script>

{#if error !== null}
	<p class={['FormErrorLabel', className]} {...props}>
		{error}
	</p>
{/if}

<style lang="scss">
	.FormErrorLabel {
		color: var(--palette-danger-500);
		font-weight: bold;
	}
</style>
