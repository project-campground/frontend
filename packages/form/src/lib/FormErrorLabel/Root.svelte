<script lang="ts">
	import { getFieldControl } from '$lib/FormControl/context.svelte.js';
	import { Para } from '@campground/ui';
	import type FormErrorLabelProps from './props.ts';

	const fieldContext = getFieldControl();

	const { class: className, ...props }: FormErrorLabelProps = $props();
</script>

{#if fieldContext.error}
	<Para
		class={['FormErrorLabel', className]}
		level="paragraph"
		color="danger"
		{...props}
	>
		{fieldContext.error}
	</Para>
{/if}
