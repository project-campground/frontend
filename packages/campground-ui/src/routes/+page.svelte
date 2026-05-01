<script lang="ts">
	import BrandLogo from '$lib/BrandLogo.svelte';
	import GradientText from '$lib/GradientText.svelte';
	import Group from '$lib/Group.svelte';
	import Image from '$lib/Image.svelte';
	import Main from '$lib/Main.svelte';
	import SvgUse from '$lib/svg/SvgUse.svelte';
	import Tabs, { Tab, TabItem } from '$lib/Tabs.svelte';
	import TextBlock from '$lib/TextBlock.svelte';
</script>

<Main>
	<div class="padded">
		<div
			style:background-color="var(--palette-background-level1)"
			style:padding="16px 32px"
			style:border-radius="var(--radius-lg)"
		>
			<Tabs tabIds={['a', 'b']}>
				{#snippet tabs(tabId)}
					<TabItem id="a" isActive={tabId === 'a'}>
						<TextBlock>Tab a</TextBlock>
					</TabItem>
					<TabItem id="b" isActive={tabId === 'b'}>
						<TextBlock>Tab b</TextBlock>
					</TabItem>
				{/snippet}
				<Tab>
					<TextBlock>Example a</TextBlock>
				</Tab>
				<Tab>
					<TextBlock>Example b</TextBlock>
				</Tab>
			</Tabs>
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
