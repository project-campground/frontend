<script
	lang="ts"
	generics="TPage extends string, TValue"
>
	import { Modal } from '@campground/ui';
	import Dialog from './Dialog.svelte';
	import type { RootProps } from './props.ts';
	import { setSettings, SettingsContext } from './context.svelte.ts';
	import ErrorPlaceholder from '#lib/components/ErrorPlaceholder.svelte';

	const { value, defaultPage, pages, instance, ...attributes }: RootProps<TPage, TValue> = $props();

	// svelte-ignore state_referenced_locally
	const context = new SettingsContext<TPage, TValue>(() => defaultPage, value);
	setSettings(context);

	$effect(() => {
		context.value = value;
	});

	const PageComponent = $derived(pages[context.page]);
</script>

<Modal {instance}>
	<Dialog {...attributes}>
		<svelte:boundary>
			{#snippet failed(error)}
				<ErrorPlaceholder {error} />
			{/snippet}
			<PageComponent />
		</svelte:boundary>
	</Dialog>
</Modal>
