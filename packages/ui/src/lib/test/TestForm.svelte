<script lang="ts">
	import {
		Button,
		Checkbox,
		Group,
		InputWrapper,
		Menu,
		Para,
		Radio,
		Section,
		Select,
		Stack,
		Switch,
		TextBlock,
		TextInput,
		type ComponentColor,
		type ComponentSize,
		type ComponentVariant,
		type SelectValue
	} from '$lib/index.js';
	import IconLogo from '$lib/svg/IconLogo.svelte';
	import { IconMoonFilled, IconStarFilled, IconSunFilled } from '@tabler/icons-svelte';

	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const variants: ComponentVariant[] = ['glow', 'solid', 'soft', 'outlined', 'plain'];
	const colors: ComponentColor[] = ['primary', 'success', 'info', 'warning', 'danger'];

	let switchValue = $state(false);

	let inputValue = $state('');
	let selectValue = $state<SelectValue | undefined | null>(null);

	let radioGroup = $state('default');
</script>

{#snippet icon()}
	<IconLogo size={2} />
{/snippet}
{#snippet selectMenu()}
	<Menu.Item value={'firstValue'}>Example #1 (str)</Menu.Item>
	<Menu.Item value={0} color="danger">Example #2 (num)</Menu.Item>
	<Menu.Item value={true} color="warning">Example #3 (bool)</Menu.Item>
	<Menu.Item value={null} color="success">Example #4 (null)</Menu.Item>
	<Menu.Item color="info">Example #4 (undef)</Menu.Item>
	<Menu.Item value={undefined} color="neutral">Example #5 (undef)</Menu.Item>
{/snippet}
{#snippet selectRenderer(value: SelectValue | null | undefined)}
	Value: {JSON.stringify({ value })}
{/snippet}

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
				<Group wrap>
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
						<Group wrap>
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
		Select
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
						<Group wrap>
							<Select
								bind:value={selectValue}
								children={selectMenu}
								display={selectRenderer}
								{size}
								{...attr}
							/>
							<Select
								bind:value={selectValue}
								children={selectMenu}
								display={selectRenderer}
								{size}
								disabled
								{...attr}
							/>
							<Select
								bind:value={selectValue}
								children={selectMenu}
								display={selectRenderer}
								{size}
								hasError
								{...attr}
							/>
							<Select
								bind:value={selectValue}
								children={selectMenu}
								display={selectRenderer}
								{size}
								hasError
								disabled
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
		Switch
	{/snippet}
	<Stack gap={1}>
		<Group wrap>
			<Switch bind:value={switchValue} />
		</Group>
		{#each [false, true] as disabled}
			{#each [[], [IconMoonFilled], [undefined, IconSunFilled], [IconMoonFilled, IconSunFilled]] as iconSet}
				<Group>
					<Switch
						bind:value={switchValue}
						checkedIcon={iconSet[1]}
						uncheckedIcon={iconSet[0]}
						{disabled}
					/>
					{#each sizes as size}
						<Switch
							{size}
							bind:value={switchValue}
							checkedIcon={iconSet[1]}
							uncheckedIcon={iconSet[0]}
							{disabled}
						/>
					{/each}
				</Group>
			{/each}
		{/each}
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Checkbox
	{/snippet}
	<Stack gap={1}>
		<Group wrap>
			<Checkbox bind:checked={switchValue} />
		</Group>
		{#each [false, true] as disabled}
			{#each [undefined, IconMoonFilled] as icon}
				<Group wrap>
					<Checkbox bind:checked={switchValue} {disabled} {icon} />
					{#each sizes as size}
						<Checkbox {size} bind:checked={switchValue} {disabled} {icon} />
					{/each}
				</Group>
			{/each}
		{/each}
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Radio
	{/snippet}
	<Stack gap={1}>
		<Para>Radio value: {radioGroup}</Para>
		<Group>
			<Radio name="example-2" value="" bind:group={radioGroup} />
		</Group>
		{#each [false, true] as disabled}
			<Group wrap>
				<Radio
					name="example-2"
					value={`default${disabled ? `-disabled` : ``}`}
					bind:group={radioGroup}
					{disabled}
				/>
				{#each sizes as size}
					<Radio
						name="example-2"
						{size}
						{disabled}
						value={`${size}${disabled ? `-disabled` : ``}`}
						bind:group={radioGroup}
					/>
				{/each}
			</Group>
		{/each}
	</Stack>
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
							<Button {variant} {color} {size} disabled>{variant} {color} {size} disabled</Button>
						{/each}
					</Group>
				{/each}
			</Stack>
		{/each}
	</div>
</Section>
