<script
	lang="ts"
	module
>
	const submitMessage = defineMessage({
		id: 'form.submit',
		defaultMessage: 'Submit',
		description: 'The default submission button text in forms',
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Button } from '@campground/ui';
	import type FormSubmitProps from './props.ts';
	import { getForm } from '$lib/Form/context.svelte.js';
	import { defineMessage } from '@formatjs/svelte-intl';

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
		<LocaleMessage {...submitMessage} />
	{/if}
</Button>
