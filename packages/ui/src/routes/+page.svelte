<script lang="ts">
	import * as Card from '$lib/Card/index.js';
	import Avatar from '$lib/Avatar/Avatar.svelte';
	import BrandLogo from '$lib/BrandLogo/BrandLogo.svelte';
	import Button from '$lib/Button/Button.svelte';
	import GradientText from '$lib/GradientText/GradientText.svelte';
	import Group from '$lib/Group/Group.svelte';
	import Image from '$lib/Image/Image.svelte';
	import type { GradientMotion } from '$lib/GradientText/props.js';
	import Main from '$lib/Main/Main.svelte';
	import SvgUse from '$lib/svg/SvgUse.svelte';
	import * as Tabs from '$lib/Tabs/index.js';
	import TextBlock from '$lib/TextBlock/TextBlock.svelte';
	import type { ComponentColor, ComponentSize, ComponentVariant } from '../lib/types/attributes.ts';
	import Alert from '$lib/Alert/Alert.svelte';
	import IconLogo from '$lib/svg/IconLogo.svelte';
	import { theme } from '$lib/index.js';
	import Section from '$lib/Section/Section.svelte';
	import Stack from '$lib/Stack/Stack.svelte';
	import TextInput from '$lib/TextInput/TextInput.svelte';
	import Switch from '$lib/Switch/Switch.svelte';
	import {
		IconMoon,
		IconMoonFilled,
		IconStarFilled,
		IconSun,
		IconSunFilled
	} from '@tabler/icons-svelte';
	import InputWrapper from '$lib/InputWrapper/InputWrapper.svelte';

	const gradientTextMaxColors = [
		['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF'],
		['#FFF', '#000']
	];
	const gradientTextColors = gradientTextMaxColors.flatMap((x) =>
		Array(x.length)
			.fill(null)
			.map((_, i) => x.slice(0, i + 1))
	);
	const gradientMotions: GradientMotion[] = ['none', 'linear', 'wave', 'radial'];
	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const sizesWithNone: (ComponentSize | 'none')[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
	const variants: ComponentVariant[] = ['glow', 'solid', 'soft', 'outlined', 'plain'];
	const colors: ComponentColor[] = ['primary', 'success', 'info', 'warning', 'danger'];

	let lightTheme: boolean = $state(false);

	$effect(() => theme.set(lightTheme ? 'light' : 'dark'));

	let switchValue = $state(false);

	let inputValue = $state('');
</script>

<Main>
	<div class="scrollable">
		<div class="padded">
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
			<Section headerLevel={1}>
				{#snippet header()}
					Tabs
				{/snippet}
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
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Image
				{/snippet}
				<Stack>
					{#each sizesWithNone as radius}
						<Group wrap>
							<Image w={10} h={10} {radius} src="/example-banner.svg" />
							<Image mh={10} {radius} src="/example-banner.svg" />
							<Image mw={10} {radius} src="/example-banner.svg" />
						</Group>
					{/each}
				</Stack>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					SvgUse
				{/snippet}
				<Group>
					<SvgUse id="logo" />
					<SvgUse id="logo" size={8} />
					<SvgUse id="logo" w={3} h={8} />
				</Group>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					BrandLogo
				{/snippet}
				<Group>
					{#each sizes as size}
						<BrandLogo {size} />
					{/each}
				</Group>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Switch
				{/snippet}
				<Stack gap={1}>
					<Group>
						<Switch bind:value={switchValue} />
					</Group>
					{#each [[], [IconMoonFilled], [undefined, IconSunFilled], [IconMoonFilled, IconSunFilled]] as iconSet}
						<Group>
							<Switch
								bind:value={switchValue}
								checkedIcon={iconSet[1]}
								uncheckedIcon={iconSet[0]}
							/>
							{#each sizes as size}
								<Switch
									{size}
									bind:value={switchValue}
									checkedIcon={iconSet[1]}
									uncheckedIcon={iconSet[0]}
								/>
							{/each}
						</Group>
					{/each}
				</Stack>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					GradientText
				{/snippet}
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
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Avatar
				{/snippet}
				<Group>
					{#each sizes as size}
						<Avatar src="/DefaultAvatar0.png" {size} alt="example alt" />
						<Avatar alt="example alt" {size}>{size}</Avatar>
					{/each}
					<Avatar alt="example alt" />
				</Group>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Button
				{/snippet}
				<div>
					{#each sizes as size}
						<h2>{size}</h2>
						<Stack gap={2}>
							{#each variants as variant}
								<Group wrap gap={1}>
									{#each colors as color}
										<Button {variant} {color} {size}>{variant} {color} {size}</Button>
										<Button {variant} {color} {size} disabled
											>{variant} {color} {size} disabled</Button
										>
									{/each}
								</Group>
							{/each}
						</Stack>
					{/each}
				</div>
			</Section>
			{#snippet icon()}
				<IconLogo size={2} />
			{/snippet}
			<Section headerLevel={1}>
				{#snippet header()}
					Alert
				{/snippet}
				<div>
					{#each sizes as size}
						<h2>{size}</h2>
						<Group wrap>
							{#each colors as color}
								<Alert {icon} {color} {size}>
									{color}
									{size}
								</Alert>
							{/each}
						</Group>
					{/each}
				</div>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Card
				{/snippet}
				<div>
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
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Input Wrapper
				{/snippet}
				<Stack>
					{#each sizes as size}
						<Section headerLevel={2}>
							{#snippet header()}
								{size}
							{/snippet}
							<Group>
								<InputWrapper bind:value={inputValue} {size}>
									<IconStarFilled />
									<TextBlock>Default</TextBlock>
								</InputWrapper>
								<InputWrapper bind:value={inputValue} {size} disabled>
									<IconStarFilled />
									<TextBlock>Disabled</TextBlock>
								</InputWrapper>
								<InputWrapper bind:value={inputValue} {size} hasError>
									<IconStarFilled />
									<TextBlock>Has error</TextBlock>
								</InputWrapper>
								<InputWrapper bind:value={inputValue} {size} disabled hasError>
									<IconStarFilled />
									<TextBlock>Has error + Disabled</TextBlock>
								</InputWrapper>
							</Group>
						</Section>
					{/each}
				</Stack>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Text Input
				{/snippet}
				<Stack>
					{#each sizes as size}
						<Section headerLevel={2}>
							{#snippet header()}
								{size}
							{/snippet}
							{#each [{}, { startDecorator: icon }, { endDecorator: icon }, { startDecorator: icon, endDecorator: icon }] as attr}
								<Section headerLevel={3}>
									{#snippet header()}
										Attr: {JSON.stringify(Object.keys(attr))}
									{/snippet}
									<Group>
										<TextInput bind:value={inputValue} {size} placeholder={size} {...attr} />
										<TextInput
											bind:value={inputValue}
											{size}
											placeholder={size + ` disabled`}
											disabled
											{...attr}
										/>
										<TextInput
											bind:value={inputValue}
											{size}
											placeholder={size + ` has error`}
											hasError
											{...attr}
										/>
										<TextInput
											bind:value={inputValue}
											{size}
											placeholder={size + ` disabled, has error`}
											disabled
											hasError
											{...attr}
										/>
									</Group>
								</Section>
							{/each}
						</Section>
					{/each}
				</Stack>
			</Section>
			<Section headerLevel={1}>
				{#snippet header()}
					Section
				{/snippet}
				<Stack gap={8}>
					{#each sizes as gap}
						{#each [1, 2, 3, 4, 5, 6] as const as headerLevel}
							<Group>
								<Section {gap} {headerLevel}>
									{#snippet header()}
										{gap} gap and header level {headerLevel}
									{/snippet}
									{gap} gap and header level {headerLevel}
								</Section>
								<Section {gap} {headerLevel} subtle>
									{#snippet header()}
										{gap} gap and header level {headerLevel} subtle
									{/snippet}
									{gap} gap and header level {headerLevel} subtle
								</Section>
							</Group>
						{/each}
					{/each}
				</Stack>
			</Section>
		</div>
	</div>
</Main>

<style lang="scss">
	:global(#main) {
		height: 100%;
	}
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
