<script lang="ts">
	import Group from '$lib/Group/Group.svelte';
	import * as Tabs from '$lib/Tabs/index.js';
	import TextBlock from '$lib/TextBlock/TextBlock.svelte';
	import { theme } from '$lib/index.js';
	import Section from '$lib/Section/Section.svelte';
	import Switch from '$lib/Switch/Switch.svelte';
	import { IconMoonFilled, IconSunFilled } from '@tabler/icons-svelte';
	import TestVisual from '$lib/test/TestVisual.svelte';
	import TestForm from '$lib/test/TestForm.svelte';
	import TestInfo from '$lib/test/TestInfo.svelte';

	let lightTheme: boolean = $state(false);

	$effect(() => theme.set(lightTheme ? 'light' : 'dark'));
</script>

<!-- For theming and such -->
<Section headerLevel={1}>
	{#snippet header()}
		[DEVELOPMENT SETTINGS]
	{/snippet}
	<Group>
		<Switch bind:value={lightTheme} checkedIcon={IconSunFilled} uncheckedIcon={IconMoonFilled} />
		<TextBlock weight={700}>Light theme</TextBlock>
	</Group>
</Section>
<!-- Actual components -->
<Section headerLevel={1}>
	{#snippet header()}
		Tabs
	{/snippet}
	<div
		style:transition="background 0.5s"
		style:background-color="var(--palette-background-level1)"
		style:padding="16px 32px"
		style:border-radius="var(--radius-lg)"
	>
		<Tabs.Root tabIds={['visual', 'section', 'form']}>
			{#snippet tabs(tabId)}
				<Tabs.Item id="visual" isActive={tabId === 'visual'}>
					<TextBlock>Visual</TextBlock>
				</Tabs.Item>
				<Tabs.Item id="section" isActive={tabId === 'section'}>
					<TextBlock>Info and Hierarchy</TextBlock>
				</Tabs.Item>
				<Tabs.Item id="form" isActive={tabId === 'form'}>
					<TextBlock>Form and Input</TextBlock>
				</Tabs.Item>
			{/snippet}
			<!-- Visual -->
			<Tabs.Tab>
				<TestVisual />
			</Tabs.Tab>
			<!-- Info & Hierarchy -->
			<Tabs.Tab>
				<TestInfo />
			</Tabs.Tab>
			<!-- Form & Input -->
			<Tabs.Tab>
				<TestForm />
			</Tabs.Tab>
		</Tabs.Root>
	</div>
</Section>
