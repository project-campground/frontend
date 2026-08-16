<script lang="ts">
	import type { OptionProps } from './props.ts';
	import * as Menu from '$lib/floating/Menu/index.js';
	import { getOnSelect } from './context.svelte.ts';

	const onSelect = getOnSelect();
	let { value, class: className, ...attributes }: OptionProps = $props();
</script>

<Menu.Item>
	<Menu.Button
		class={[`ui-SelectOption`, className]}
		onclick={(ev) => onSelect(value, ev)}
		{...attributes}
	/>
</Menu.Item>
