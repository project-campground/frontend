<script lang="ts">
	import { getFieldControl } from '#lib/FieldControl/context.svelte.js';
	import { Para } from '@campground/ui';
	import type FieldErrorProps from './props.ts';

	const fieldControl = getFieldControl();

	const { class: className, ...props }: FieldErrorProps = $props();
</script>

{#if fieldControl.error}
	<Para
		class={['FieldError', className]}
		level="paragraph"
		color="danger"
		{...props}
	>
		{fieldControl.error}
	</Para>
{/if}
