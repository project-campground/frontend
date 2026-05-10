<script lang="ts">
	import * as Card from "$lib/Card/index.js";
	import Avatar from '$lib/Avatar/Avatar.svelte';
	import BrandLogo from '$lib/BrandLogo/BrandLogo.svelte';
	import Button from '$lib/Button/Button.svelte';
	import GradientText from '$lib/GradientText/GradientText.svelte';
	import Group from '$lib/Group/Group.svelte';
	import Image from '$lib/Image/Image.svelte';
	import type { GradientMotion } from "$lib/GradientText/props.js";
	import Main from '$lib/Main/Main.svelte';
	import SvgUse from '$lib/svg/SvgUse.svelte';
	import * as Tabs from '$lib/Tabs/index.js';
	import TextBlock from '$lib/TextBlock/TextBlock.svelte';
	import type { ComponentColor, ComponentSize, ComponentVariant } from '../lib/types/attributes.ts';
	import Alert from "$lib/Alert/Alert.svelte";
	import IconLogo from "$lib/svg/IconLogo.svelte";
	import { theme } from "$lib/index.js";

	const gradientTextMaxColors = [
		["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#FFFF00", "#00FFFF"],
		["#FFF", "#000"]
	];
	const gradientTextColors = gradientTextMaxColors.flatMap((x) =>
		Array(x.length).fill(null).map((_, i) => x.slice(0, i + 1))
	);
	const gradientMotions: GradientMotion[] = ["none", "linear", "wave", "radial"];
	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const sizesWithNone: (ComponentSize | "none")[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
	const variants: ComponentVariant[] = ['glow', 'solid', 'soft', 'outlined', 'plain'];
	const colors: ComponentColor[] = ['primary', 'success', 'info', 'warning', 'danger'];

	let lightTheme: boolean = $state(false);

	$effect(() => theme.set(lightTheme ? "light" : "dark"));
</script>

<Main>
	<div class="scrollable">
		<input type="checkbox" bind:checked={lightTheme} />
		<div class="padded">
			<div
				style:background-color="var(--palette-background-level1)"
				style:padding="16px 32px"
				style:border-radius="var(--radius-lg)"
			>
				<Tabs.Root tabIds={['a', 'b']}>
					{#snippet tabs(tabId)}
						<Tabs.Item id="a" isActive={tabId === 'a'}>
							<TextBlock>Tab a</TextBlock>
						</Tabs.Item>
						<Tabs.Item id="b" isActive={tabId === 'b'}>
							<TextBlock>Tab b</TextBlock>
						</Tabs.Item>
					{/snippet}
					<Tabs.Tab>
						<TextBlock>Example a</TextBlock>
					</Tabs.Tab>
					<Tabs.Tab>
						<TextBlock>Example b</TextBlock>
					</Tabs.Tab>
				</Tabs.Root>
			</div>
			<h1>Image</h1>
			<div>
				{#each sizesWithNone as radius}
					<Group wrap>
						<Image w={10} h={10} {radius} src="/example-banner.svg" />
						<Image mh={10} {radius} src="/example-banner.svg" />
						<Image mw={10} {radius} src="/example-banner.svg" />
					</Group>
				{/each}
			</div>
			<h1>SVG Use</h1>
			<Group>
				<SvgUse id="logo" />
				<SvgUse id="logo" size={8} />
				<SvgUse id="logo" w={3} h={8} />
			</Group>
			<h1>Brand logo</h1>
			<Group>
				{#each sizes as size}
					<BrandLogo {size} />
				{/each}
			</Group>
			<h1>Gradient Text</h1>
			<div style:font-weight="bolder" style:font-size="2.5rem">
				{#each gradientMotions as motion}
					<Group wrap>
						<GradientText {motion}>0 colors {motion}</GradientText>
						{#each gradientTextColors as colors}
							<GradientText {colors} {motion}>{colors.length} colors {motion}</GradientText>
						{/each}
					</Group>
				{/each}
			</div>
			<h1>Avatar</h1>
			<Group>
				{#each sizes as size}
					<Avatar src="/DefaultAvatar0.png" {size} alt="example alt" />
					<Avatar alt="example alt" {size}>{size}</Avatar>
				{/each}
				<Avatar alt="example alt" />
			</Group>
			<h1>Button</h1>
			{#each sizes as size}
				<h2>{size}</h2>
				{#each variants as variant}
					<Group wrap>
						{#each colors as color}
							<Button {variant} {color} {size}>{variant} {color} {size}</Button>
							<Button {variant} {color} {size} disabled>{variant} {color} {size} disabled</Button>
						{/each}
					</Group>
				{/each}
			{/each}
			<h1>Alert</h1>
			{#snippet icon()}
				<IconLogo size={2} />
			{/snippet}
			{#each sizes as size}
				<h2>{size}</h2>
				<Group wrap>
					{#each colors as color}
						<Alert {icon} {color} {size}>
							{color} {size}
						</Alert>
					{/each}
				</Group>
			{/each}
			<h1>Card</h1>
			{#each sizes as size}
				<h2>{size}</h2>
				<Group wrap alignVertically="start">
					<Card.Root {size}>
						<TextBlock>Example no content</TextBlock>
					</Card.Root>
					<Card.Root {size}>
						<Card.Content>
							<TextBlock>Example</TextBlock>
						</Card.Content>
					</Card.Root>
					<Card.Root {size}>
						<Card.Overflow>
							<TextBlock>Example overflow</TextBlock>
						</Card.Overflow>
						<Card.Content>
							<TextBlock>Example</TextBlock>
						</Card.Content>
					</Card.Root>
					<Card.Root {size}>
						<Card.Overflow>
							<TextBlock>Example overflow</TextBlock>
						</Card.Overflow>
					</Card.Root>
					<Card.Root {size}>
						<Card.Content>
							<TextBlock>Example content 1</TextBlock>
						</Card.Content>
						<Card.Content>
							<TextBlock>Example content 2</TextBlock>
						</Card.Content>
						<Card.Content>
							<TextBlock>Example content 3</TextBlock>
						</Card.Content>
						<Card.Content>
							<TextBlock>Example content 4</TextBlock>
						</Card.Content>
					</Card.Root>
				</Group>
			{/each}
		</div>
	</div>
</Main>

<style lang="scss">
	.scrollable {
		height: 100%;
		overflow-y: auto;
	}
	.padded {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 64px;
	}
</style>
