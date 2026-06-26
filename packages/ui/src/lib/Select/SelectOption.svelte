<script lang="ts">
	import type { OptionProps } from './props.ts';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { getSelect } from './context.svelte.ts';

	const selectInstance = getSelect();
	let { value, class: className, ...attributes }: OptionProps = $props();
</script>

<MenuItem
	class={[`Select SelectOption`, className]}
	onclick={(ev) => (ev.stopPropagation(), selectInstance.setValue(value, ev))}
	{...attributes}
/>
