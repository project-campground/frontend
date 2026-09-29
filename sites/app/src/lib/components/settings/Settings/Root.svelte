<script
	lang="ts"
	generics="TPage extends string"
>
	import { Modal } from '@campground/ui';
	import Dialog from './Dialog.svelte';
	import type { RootProps } from './props.ts';
	import { setSettings, SettingsContext } from './context.svelte.ts';

	const { defaultPage, pages, instance, ...attributes }: RootProps<TPage> = $props();

	const context = new SettingsContext<TPage>(() => defaultPage);
	setSettings(context);

	const PageComponent = $derived(pages[context.page]);
</script>

<Modal {instance}>
	<Dialog {...attributes}>
		<PageComponent />
	</Dialog>
</Modal>
