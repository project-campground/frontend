<script lang="ts">
	import { Group, Tabs, Section, Switch, TextBlock, Stack, theme } from '$lib/index.js';
	import { IconMoonFilled, IconSunFilled } from '@tabler/icons-svelte';
	import TestVisual from '$lib/test/TestVisual.svelte';
	import TestForm from '$lib/test/TestForm.svelte';
	import TestInfo from '$lib/test/TestInfo.svelte';
	import TestFloating from '$lib/test/TestFloating.svelte';
	import TestHierarchy from '$lib/test/TestHierarchy.svelte';

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
		class="tabs-padded"
		style:transition="background 0.5s"
		style:background-color="var(--background-subtle)"
		style:border-radius="var(--radius-lg)"
	>
		<Tabs.Root>
			{#snippet tabs()}
				<Tabs.Item>
					<TextBlock>Visual</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Info</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Hierarchy</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Floating: Menus, Modals, Tooltips</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Form and Input</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Test Async #1</TextBlock>
				</Tabs.Item>
				<Tabs.Item>
					<TextBlock>Test Async #2</TextBlock>
				</Tabs.Item>
			{/snippet}
			<!-- Visual -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestVisual />
				</Stack>
			</Tabs.Tab>
			<!-- Info -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestInfo />
				</Stack>
			</Tabs.Tab>
			<!-- Hierarchy -->
			<Tabs.Tab>
				<Stack gap={3}>
					<TestHierarchy />
				</Stack>
			</Tabs.Tab>
			<!-- Floating -->
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
			<!-- Async tab #1 -->
			<Tabs.AsyncTab>
				{#snippet skeleton()}
					Skeleton 1
				{/snippet}
				Abcdef
				{console.log('Render tab #1')}
			</Tabs.AsyncTab>
			<!-- Async tab #2 -->
			<Tabs.AsyncTab alwaysRenderOnceSeen>
				{#snippet skeleton()}
					Skeleton 2 (takes 2 secs)
				{/snippet}
				{await new Promise((resolve) => setTimeout(() => resolve('Abcdefghijkl'), 2000))}
				{console.log('Render tab #2')}
			</Tabs.AsyncTab>
		</Tabs.Root>
	</div>
</Section>

<style lang="scss">
	@use '../lib/index.scss' as *;

	.tabs-padded {
		padding: 1rem 2rem;
		@include tablet-only {
			padding: 0.5rem 1rem;
		}
		@include mobile-only {
			padding: 0.5rem 0;
		}
	}
</style>
