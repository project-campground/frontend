<script lang="ts">
	import BrandLogo from '$lib/BrandLogo/BrandLogo.svelte';
	import GradientText from '$lib/GradientText/GradientText.svelte';
	import Group from '$lib/Group/Group.svelte';
	import Image from '$lib/Image/Image.svelte';
	import Main from '$lib/Main/Main.svelte';
	import SvgUse from '$lib/svg/SvgUse.svelte';
	import * as Tabs from '$lib/Tabs/index.js';
	import TextBlock from '$lib/TextBlock/TextBlock.svelte';
</script>

<Main>
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
		<Group>
			<Image mh={15} src="/example-banner.svg" />
			<Image mh={12} src="/example-banner.svg" />
			<Image mw={30} src="/example-banner.svg" />
			<Image w={20} h={20} src="/example-banner.svg" />
		</Group>
		<Group>
			<SvgUse id="logo" />
			<SvgUse id="logo" size={8} />
			<SvgUse id="logo" w={3} h={8} />
		</Group>
		<BrandLogo size="xs" />
		<BrandLogo size="sm" />
		<BrandLogo size="md" />
		<BrandLogo size="lg" />
		<BrandLogo size="xl" />
		<div style:font-weight="bolder" style:font-size="3rem">
			<Group wrap>
				<GradientText>0 colours</GradientText>
				<GradientText colors={['#FF0000']}>1 colour</GradientText>
				<GradientText colors={['#FF0000', '#00FF00']}>2 colours</GradientText>
				<GradientText colors={['#FF0000', '#0000FF']}>2 colours</GradientText>
				<GradientText colors={['#FF0000', '#00FF00', '#0000FF']}>3 colours</GradientText>
				<GradientText colors={['#FF0000', '#00FF00', '#0000FF', '#FF0000']}>4 colours</GradientText>
			</Group>
			<Group>
				<GradientText motion="none" colors={['#FF0000', '#00FF00', '#0000FF']}>
					Motion None
				</GradientText>
				<GradientText motion="linear" colors={['#FF0000', '#00FF00', '#0000FF']}>
					Motion Linear
				</GradientText>
				<GradientText motion="wave" colors={['#FF0000', '#00FF00', '#0000FF']}>
					Motion Wave
				</GradientText>
				<GradientText motion="radial" colors={['#FF0000', '#00FF00', '#0000FF']}>
					Motion Radial
				</GradientText>
			</Group>
		</div>
		<div style:font-size="3em">
			<TextBlock>aaaa</TextBlock>
		</div>
	</div>
</Main>

<style lang="scss">
	.padded {
		padding: 32px;
		height: 100%;
		overflow-y: auto;
	}
</style>
