<script lang="ts">
	import { globalLocale } from './declarations.ts';
	import FormattedMessage from './FormattedMessage/FormattedMessage.svelte';

	const { id, values }: { id: keyof typeof globalLocale; values?: Record<string, any> } = $props();
</script>

<FormattedMessage
	{...globalLocale[id]}
	{values}
/>
