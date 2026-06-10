<script lang="ts">
	import { getFormControlContext } from '$lib/FormControl/context.js';
	import { Para } from '@campground/ui';
	import type FormErrorLabelProps from './props.ts';

	const fieldContext = getFormControlContext();
	let error = $state<string | null>(null);

	fieldContext.error.subscribe((value) => (error = value));

	const { class: className, ...props }: FormErrorLabelProps = $props();
</script>

{#if error !== null}
	<Para class={['FormErrorLabel', className]} level="paragraph" color="danger" {...props}>
		{error}
	</Para>
{/if}
