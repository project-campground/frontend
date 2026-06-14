<script lang="ts">
	import { getMenuPortal, MenuPortalInstance } from '$lib/MenuPortalContainer/index.js';
	import type TextInputProps from './props.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		class: className,
		...attributes
	}: TextInputProps = $props();

	const menuPortal = getMenuPortal();
	let instance = $state<MenuPortalInstance | null>(null);
	let open = $state(false);

	function toggleMenu() {
		if (open) instance!.destroy();

		return ((open = true), (instance = menuPortal.add(testMenu)));
	}
</script>

{#snippet testMenu(instance: MenuPortalInstance)}
	<div class="testmenu">
		aaaa
		<button onclick={() => instance.destroy()}>Close</button>
	</div>
{/snippet}
<button onclick={() => toggleMenu()}>{size} {disabled}</button>

<style lang="scss">
	@use '../index.scss' as *;
</style>
