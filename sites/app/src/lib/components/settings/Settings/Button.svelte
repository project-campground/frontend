<script
	lang="ts"
	generics="TPage extends string"
>
	import { Button } from '@campground/ui';
	import type { ButtonProps } from './props.ts';
	import { getSettings } from './context.svelte.ts';

	const settings = getSettings<TPage>();

	const { page, color, ...attributes }: ButtonProps<TPage> = $props();
	const selected = $derived(settings.page === page);
</script>

<Button
	class={['settings', { selected }]}
	variant={selected ? 'selected' : 'plain'}
	color={color ?? 'neutral'}
	onclick={() => settings.openPage(page)}
	justify="start"
	{...attributes}
></Button>
