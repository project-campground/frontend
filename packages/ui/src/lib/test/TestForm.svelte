<script lang="ts">
	import type { ButtonVariant } from '$lib/form/Button/props.js';
	import {
		Button,
		Checkbox,
		Group,
		Para,
		Radio,
		Section,
		Select,
		Stack,
		Switch,
		TextInput,
		Svg,
		type ComponentColorAll,
	} from '$lib/index.js';
	import { IconMoonFilled, IconSunFilled } from '@tabler/icons-svelte';
	import { colors, sizes } from './values.js';

	const variants: ButtonVariant[] = ['glow', 'soft', 'plain'];

	let switchValue = $state(false);

	let inputValue = $state('');
	let selectValue = $state<Select.Value | undefined | null>(null);

	let radioGroup = $state('default');
</script>

{#snippet icon()}
	<Svg.Logo size={2} />
{/snippet}
{#snippet selectMenu()}
	<Select.Option value={'firstValue'}>Example #1 (str)</Select.Option>
	<Select.Option
		value={0}
		color="danger">Example #2 (num)</Select.Option
	>
	<Select.Option
		value={true}
		color="warning">Example #3 (bool)</Select.Option
	>
{/snippet}
{#snippet selectRenderer(value: Select.Value | null | undefined)}
	Value: {JSON.stringify({ value })}
{/snippet}

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
				{#each [{}, { left: icon }, { right: icon }, { left: icon, right: icon }, { top: icon }, { bottom: icon }, { rows: 4 }] as attr}
					<Section headerLevel={3}>
						{#snippet header()}
							Attr: {JSON.stringify(Object.keys(attr))}
						{/snippet}
						<Stack>
							<TextInput
								multirow
								bind:value={inputValue}
								{size}
								placeholder={size}
								{...attr}
							/>
							<Group>
								<TextInput
									bind:value={inputValue}
									{size}
									placeholder={size}
									{...attr}
								/>
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
									error
									{...attr}
								/>
								<TextInput
									bind:value={inputValue}
									{size}
									placeholder={size + ` disabled, has error`}
									disabled
									error
									{...attr}
								/>
							</Group>
						</Stack>
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
						<Group>
							<Select.Button
								bind:value={selectValue}
								children={selectMenu}
								display={selectRenderer}
								{size}
								{...attr}
							/>
							<Select.Button
								bind:value={selectValue}
								children={selectMenu}
								display={selectRenderer}
								{size}
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
		<Group>
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
		<Group>
			<Checkbox bind:checked={switchValue} />
		</Group>
		{#each [false, true] as disabled}
			{#each [undefined, IconMoonFilled] as icon}
				<Group>
					<Checkbox
						bind:checked={switchValue}
						{disabled}
						{icon}
					/>
					{#each sizes as size}
						<Checkbox
							{size}
							bind:checked={switchValue}
							{disabled}
							{icon}
						/>
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
			<Radio
				name="example-2"
				value=""
				bind:group={radioGroup}
			/>
		</Group>
		{#each [false, true] as disabled}
			<Group>
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
					<Group gap={1}>
						{#each [...colors, 'neutral'] as ComponentColorAll[] as color}
							<Button
								{variant}
								{color}
								{size}>{variant} {color} {size}</Button
							>
							<Button
								{variant}
								{color}
								{size}
								disabled>{variant} {color} {size} disabled</Button
							>
						{/each}
					</Group>
				{/each}
			</Stack>
		{/each}
	</div>
</Section>
