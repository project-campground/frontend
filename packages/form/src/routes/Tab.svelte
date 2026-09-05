<script lang="ts">
	import { Form } from '$lib/index.js';
	import { Tabs } from '@campground/ui';
	import type { Snippet } from 'svelte';

	let form: Form | null = $state(null);

	const { children }: { children: Snippet } = $props();
</script>

<Tabs.Tab>
	<Form bind:this={form}>
		{@render children()}
	</Form>
	<div>
		<pre><code
				>{JSON.stringify(
					Object.fromEntries(form?.getForm().controls.map((x) => [x.id, x.value]) ?? []),
					undefined,
					4,
				)}</code
			></pre>
	</div>
</Tabs.Tab>
