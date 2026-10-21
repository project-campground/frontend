<script lang="ts">
	import { Card, Para, Select, Tabs, Grid, Group, Button } from '@campground/ui';
	import {
		RadioField,
		FieldLabel,
		CheckField,
		TextField,
		FieldControl,
		FieldError,
		SwitchField,
		DictionaryField,
		ArrayField,
		ColorField,
		NumberField,
		TagField,
		FlagField,
	} from '$lib/index.js';
	import { ImageField } from '$lib/ImageField/index.ts';
	import {
		IconCheckbox,
		IconDeviceSpeakerFilled,
		IconFileFilled,
		IconHash,
	} from '@tabler/icons-svelte';
	import Tab from './Tab.svelte';
	import { TristateField } from '$lib/TristateField/index.ts';
</script>

<Tabs.Root>
	{#snippet tabs()}
		<Tabs.Item>Text fields</Tabs.Item>
		<Tabs.Item>Check &amp; Radio</Tabs.Item>
		<Tabs.Item>Flagged</Tabs.Item>
		<Tabs.Item>Visual</Tabs.Item>
		<Tabs.Item>Objects &amp; Arrays</Tabs.Item>
	{/snippet}
	<Tab>
		<FieldControl
			id="withLabel"
			required
		>
			<FieldLabel>Example label</FieldLabel>
		</FieldControl>
		<FieldControl id="withTextInput">
			<FieldLabel>Example label</FieldLabel>
			<TextField />
		</FieldControl>
		<FieldControl id="textArea0">
			<FieldLabel>Text area field</FieldLabel>
			<TextField
				multirow
				minlength={5}
				placeholder="Example placeholder"
			/>
		</FieldControl>
		<FieldControl id="textFieldMapped">
			<FieldLabel>Mapped text field</FieldLabel>
			<TextField
				placeholder="Example placeholder"
			/>
		</FieldControl>
		<FieldControl id="numField">
			<FieldLabel>Number field (-50...999)</FieldLabel>
			<NumberField
				min={-50}
				max={999}
			/>
			<FieldError />
		</FieldControl>
		<FieldControl id="textArea1">
			<FieldLabel>Text area field (known value)</FieldLabel>
			<TextField
				multirow
				maxlength={50}
			>
				{#snippet known()}
					<Select.Option value="example value">Example value</Select.Option>
					<Select.Option
						value="example value\nmultiline\n here and stuff"
						color="danger">Example value multiline</Select.Option
					>
				{/snippet}
			</TextField>
		</FieldControl>
		<FieldControl id="textArea2">
			<FieldLabel>Text area field</FieldLabel>
			<TextField
				multirow
				maxrows={4}
			/>
		</FieldControl>
		<FieldControl id="textArea3">
			<FieldLabel>Text area field</FieldLabel>
			<TextField
				multirow
				rows={8}
			/>
		</FieldControl>
		<FieldControl id="textField">
			<FieldLabel>Text field (known values)</FieldLabel>
			<TextField>
				{#snippet known()}
					<Select.Option value="example">Example known value</Select.Option>
					<Select.Option value="example value\n2">Example known value 2</Select.Option>
				{/snippet}
			</TextField>
		</FieldControl>
		<FieldControl id="formattedMultiLine">
			<FieldLabel>Text area formatted</FieldLabel>
			<TextField
				multirow
				format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
				placeholder="Aaa"
			/>
			<FieldError />
		</FieldControl>
	</Tab>
	<Tab>
		<Card.Root>
			<Card.Content>
				<FieldControl id="tristate">
					<FieldLabel>Tristate</FieldLabel>
					<TristateField>
						{#snippet header()}
							Example tristate
						{/snippet}
						Example description
					</TristateField>
					<FieldError />
				</FieldControl>
			</Card.Content>
		</Card.Root>
		<FieldControl id="switch">
			<FieldLabel>Switch</FieldLabel>
			<SwitchField>
				{#snippet header()}
					Example header
				{/snippet}
				Example description
			</SwitchField>
			<FieldError />
		</FieldControl>
		<FieldControl id="checklist">
			<FieldLabel>Checklist</FieldLabel>
			<CheckField.List>
				<CheckField.Item value="first">
					{#snippet header()}
						First value
					{/snippet}
				</CheckField.Item>
				<CheckField.Card value="second">
					{#snippet header()}
						Second value
					{/snippet}
				</CheckField.Card>
				<CheckField.Item value={0}>
					{#snippet header()}
						0 value
					{/snippet}
					Description here
				</CheckField.Item>
				<CheckField.Item value={0}>
					{#snippet header()}
						Duplicate 0 value
					{/snippet}
				</CheckField.Item>
			</CheckField.List>
			<FieldError />
		</FieldControl>
		<FieldControl id="radiolist">
			<FieldLabel>Radio List</FieldLabel>
			<RadioField.List>
				<RadioField.Item value="first">
					{#snippet header()}
						First value
					{/snippet}
				</RadioField.Item>
				<RadioField.Card value="second">
					{#snippet header()}
						Second value
					{/snippet}
				</RadioField.Card>
				<RadioField.Item value={0}>
					{#snippet header()}
						0 value
					{/snippet}
					Description here
				</RadioField.Item>
				<RadioField.Item value={0}>
					{#snippet header()}
						Duplicate 0 value
					{/snippet}
				</RadioField.Item>
			</RadioField.List>
			<FieldError />
		</FieldControl>
		<FieldControl id="radiogrid">
			<FieldLabel>Radio Grid</FieldLabel>
			<RadioField.List>
				<Grid.Root
					gap={1}
					columns={3}
				>
					<Grid.Cell>
						<RadioField.Button value="text">
							<IconHash />
							Text
						</RadioField.Button>
					</Grid.Cell>
					<Grid.Cell>
						<RadioField.Button value="voice">
							<IconDeviceSpeakerFilled />
							Voice
						</RadioField.Button>
					</Grid.Cell>
					<Grid.Cell>
						<RadioField.Button value="docs">
							<IconFileFilled />
							Docs
						</RadioField.Button>
					</Grid.Cell>
					<Grid.Cell>
						<RadioField.Button value="list">
							<IconCheckbox />
							List
						</RadioField.Button>
					</Grid.Cell>
					<Grid.Cell>
						<RadioField.Button value="list">
							<IconCheckbox />
							List
						</RadioField.Button>
					</Grid.Cell>
				</Grid.Root>
			</RadioField.List>
			<FieldError />
		</FieldControl>
	</Tab>
	<Tab>
		<FieldControl id="flags">
			<FieldLabel>Flags</FieldLabel>
			<FlagField.List>
				<FlagField.Single value={0}>
					{#snippet header()}
						0 value (unusual value)
					{/snippet}
				</FlagField.Single>
				<FlagField.Single value={1}>
					{#snippet header()}
						1 value
					{/snippet}
				</FlagField.Single>
				<FlagField.Single value={2}>
					{#snippet header()}
						2 value
					{/snippet}
					Description here
				</FlagField.Single>
				<FlagField.Single value={3}>
					{#snippet header()}
						3 value
					{/snippet}
				</FlagField.Single>
				<FlagField.Single value={4}>
					{#snippet header()}
						4 value
					{/snippet}
				</FlagField.Single>
				<FlagField.Single value={8}>
					{#snippet header()}
						8 value
					{/snippet}
				</FlagField.Single>
			</FlagField.List>
			<FieldError />
		</FieldControl>
		<FieldControl id="flagsOdd">
			<FieldLabel>Flags with other features</FieldLabel>
			<FlagField.List>
				<FlagField.Tristate position={0}>
					{#snippet header()}
						0 value
					{/snippet}
				</FlagField.Tristate>
				<FlagField.Tristate position={1}>
					{#snippet header()}
						1 value
					{/snippet}
				</FlagField.Tristate>
			</FlagField.List>
			<FieldError />
		</FieldControl>
	</Tab>
	<Tab>
		<FieldControl id="img">
			<FieldLabel>Image</FieldLabel>
			<ImageField
				aspectRatio={8}
				height={4}
			/>
			<FieldError />
		</FieldControl>
		<FieldControl id="imgAvatar">
			<FieldLabel>Image (Avatar)</FieldLabel>
			<ImageField
				radius="avatar"
				width={4}
				height={4}
			/>
			<FieldError />
		</FieldControl>
		<FieldControl id="color">
			<FieldLabel>Colour</FieldLabel>
			<ColorField.Button />
			<FieldError />
		</FieldControl>
		<FieldControl id="color2">
			<FieldLabel>Colour 2</FieldLabel>
			<ColorField.Full />
			<FieldError />
		</FieldControl>
		<FieldControl id="color3">
			<FieldLabel>Colour 3</FieldLabel>
			<ColorField.Full orientation="horizontal" />
			<FieldError />
		</FieldControl>
		<FieldControl id="color2">
			<FieldLabel>Colour 3</FieldLabel>
			<ColorField.Full size="sm" />
			<FieldError />
		</FieldControl>
	</Tab>
	<Tab>
		<DictionaryField id="exampleObject">
			<Card.Root>
				<Card.Content gap="sm">
					<Para level="h3">Sub-form (DictionaryField)</Para>
					<FieldControl id="textAreaAndStuff">
						<FieldLabel>Text area field</FieldLabel>
						<TextField multirow />
					</FieldControl>
					<FieldControl id="formattedSingleLine">
						<FieldLabel>Text field formatted</FieldLabel>
						<TextField
							format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
							placeholder="Aaa"
						/>
						<FieldError />
					</FieldControl>
				</Card.Content>
			</Card.Root>
		</DictionaryField>
		<DictionaryField id="mappedObject" map={(fields) => fields.map((x) => x.value)}>
			<Card.Root>
				<Card.Content gap="sm">
					<Para level="h3">Mapped object</Para>
					<FieldControl id="textAreaAndStuff">
						<FieldLabel>Text area field</FieldLabel>
						<TextField multirow />
					</FieldControl>
					<FieldControl id="formattedSingleLine">
						<FieldLabel>Text field formatted</FieldLabel>
						<TextField
							format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
							placeholder="Aaa"
						/>
						<FieldError />
					</FieldControl>
				</Card.Content>
			</Card.Root>
		</DictionaryField>
		<FieldControl
			id="tags1"
			defaultValue={['a', 'b', 'c']}
		>
			<FieldLabel>Tags</FieldLabel>
			<TagField />
		</FieldControl>
		<FieldControl
			id="tags2"
			defaultValue={['a', 'b', 'c']}
		>
			<FieldLabel>Tags</FieldLabel>
			<TagField minlength={3} maxlength={20} max={20} />
		</FieldControl>
		{let arrayField: ArrayField.Root<string> | undefined = $state()}
		<ArrayField.Root
			id="exampleArray"
			defaultItemValue="abc"
			defaultValue={['a', 'b', 'c']}
			bind:this={arrayField}
		>
			<Group>
				<Para>Array</Para>
				<Button onclick={() => arrayField?.getControl().reset()}>Reset</Button>
				<ArrayField.Button />
			</Group>
			<ArrayField.List>
				<TextField />
			</ArrayField.List>
		</ArrayField.Root>
	</Tab>
</Tabs.Root>
