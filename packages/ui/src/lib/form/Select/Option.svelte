<script lang="ts">
	import type { OptionProps } from './props.ts';
	import { Menu } from '#lib/floating/index.js';
	import { getOnSelect } from './context.svelte.ts';

	const onSelect = getOnSelect();
	let { value, class: className, ...attributes }: OptionProps = $props();
</script>

<Menu.Button
	class={[`ui-SelectOption`, className]}
	onclick={(ev: MouseEvent & { currentTarget: HTMLButtonElement }) => onSelect(value, ev)}
	{...attributes}
/>
