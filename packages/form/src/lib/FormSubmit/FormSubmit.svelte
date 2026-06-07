<script lang="ts">
	import { FormattedMessageGlobal } from '@campground/locale';
	import { Button } from '@campground/ui';
	import type FormSubmitProps from './props.ts';
	import { getFormContext } from '$lib/Form/context.js';

	const { children, disabled, ...props }: FormSubmitProps = $props();

	let valid = $state(false);
	const formContext = getFormContext();

	formContext.fields.subscribe((values) => (valid = values.allValid));
</script>

<Button {...props} disabled={disabled || !valid} onclick={(ev) => formContext.submit(ev)}>
	{#if children}
		{@render children()}
	{:else}
		<FormattedMessageGlobal id="form.submit" />
	{/if}
</Button>
