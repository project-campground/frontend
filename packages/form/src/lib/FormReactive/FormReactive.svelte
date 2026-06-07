<script lang="ts">
	import type FormSubmitProps from './props.ts';
	import { getFormContext, type FormFields } from '$lib/Form/context.js';

	const { render }: FormSubmitProps = $props();

	let formFields = $state<FormFields>({ valid: {}, values: {}, allValid: false });

	const formContext = getFormContext();

	formContext.fields.subscribe((value) => (formFields = value));
</script>

<reactive class={['FormReactive']} role="article">
	{@render render(formFields, formContext)}
</reactive>

<style lang="scss">
	.FormReactive {
		display: contents;
	}
</style>
