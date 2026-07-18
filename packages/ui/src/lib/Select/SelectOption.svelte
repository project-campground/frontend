<script lang="ts">
	import type { OptionProps } from './props.ts';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { getOnSelect } from './context.svelte.ts';

	const onSelect = getOnSelect();
	let { value, class: className, ...attributes }: OptionProps = $props();
</script>

<MenuItem
	class={[`ui-SelectOption`, className]}
	onclick={(ev) => onSelect(value, ev)}
	{...attributes}
/>
