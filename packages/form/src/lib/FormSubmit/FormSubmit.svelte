<script lang="ts">
	import { FormattedMessageGlobal } from '@campground/locale';
	import { Button } from '@campground/ui';
	import type FormSubmitProps from './props.ts';
	import { getForm } from '$lib/Form/context.svelte.js';

	const { children, disabled, ...props }: FormSubmitProps = $props();

	const formContext = getForm();

	const allValid = $derived(formContext.controls.every((x) => x.valid));
</script>

<Button
	{...props}
	disabled={disabled || !allValid}
	onclick={(ev) => formContext.submit(ev)}
>
	{#if children}
		{@render children()}
	{:else}
		<FormattedMessageGlobal id="form.submit" />
	{/if}
</Button>
