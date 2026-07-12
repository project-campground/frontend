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
	import Stack from '$lib/Stack/Stack.svelte';
	import TestFloating from '$lib/test/TestFloating.svelte';

	let lightTheme: boolean = $state(false);

	$effect(() => theme.set(lightTheme ? 'light' : 'dark'));
</script>

<!-- For theming and such -->
<Section headerLevel={1}>
	{#snippet header()}
		[DEVELOPMENT SETTINGS]
	{/snippet}
	<Group>
		<Switch
			bind:value={lightTheme}
			checkedIcon={IconSunFilled}
			uncheckedIcon={IconMoonFilled}
		/>
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
		style:background-color="var(--background-subtle)"
		style:padding="16px 32px"
		style:border-radius="var(--radius-lg)"
	>
		<Tabs.Root>
			{#snippet tabs()}
				<Tabs.Item>
					<TextBlock>Visual</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Info and Hierarchy</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Floating: Menus, Modals, Tooltips</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Form and Input</TextBlock>
				</Tabs.Item>
			{/snippet}
			<!-- Visual -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestVisual />
				</Stack>
			</Tabs.Tab>
			<!-- Floating -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestInfo />
				</Stack>
			</Tabs.Tab>
			<!-- Info & Hierarchy -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestFloating />
				</Stack>
			</Tabs.Tab>
			<!-- Form & Input -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestForm />
				</Stack>
			</Tabs.Tab>
		</Tabs.Root>
	</div>
</Section>
