<script lang="ts">
	import { Menu } from '$lib/index.js';
	import type { MenuProps } from './props.ts';
	import { setOnSelect } from './context.svelte.ts';

	let { onSelect, ...attributes }: MenuProps = $props();

	// Since prop can be updated, it needs to be in lambda
	setOnSelect((newValue) => onSelect(newValue));
</script>

<Menu.Root {...attributes}></Menu.Root>
