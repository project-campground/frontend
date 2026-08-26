<script lang="ts">
	import { Card, Para, Select, Tabs, Grid } from '@campground/ui';
	import {
		FormRadio,
		FormLabel,
		FormCheck,
		FormTextField,
		FormControl,
		Form,
		FormErrorLabel,
		FormSwitch,
		FormObject,
	} from '$lib/index.js';
	import { FormImageField } from '$lib/FormImageField/index.js';
	import {
		IconCheckbox,
		IconDeviceSpeakerFilled,
		IconFileFilled,
		IconHash,
	} from '@tabler/icons-svelte';

	let reactiveForm: Form | null = $state(null);
</script>

<Tabs.Root>
	{#snippet tabs()}
		<Tabs.Item>Empty form</Tabs.Item>
		<Tabs.Item>Control and label</Tabs.Item>
		<Tabs.Item>Text field</Tabs.Item>
		<Tabs.Item>Text areas</Tabs.Item>
		<Tabs.Item>Reactive</Tabs.Item>
	{/snippet}
	<Tabs.Tab>
		<Form>
			<p>aaaa</p>
		</Form>
	</Tabs.Tab>
	<Tabs.Tab>
		<Form>
			<FormControl
				id="withLabel"
				required
			>
				<FormLabel>Example label</FormLabel>
			</FormControl>
		</Form>
	</Tabs.Tab>
	<Tabs.Tab>
		<Form>
			<FormControl id="withTextInput">
				<FormLabel>Example label</FormLabel>
				<FormTextField />
			</FormControl>
		</Form>
	</Tabs.Tab>
	<Tabs.Tab>
		<Form>
			<FormControl id="textArea0">
				<FormLabel>Text area field</FormLabel>
				<FormTextField
					multirow
					minlength={5}
					placeholder="Example placeholder"
				/>
			</FormControl>
			<FormControl id="textArea1">
				<FormLabel>Text area field (known value)</FormLabel>
				<FormTextField
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
				</FormTextField>
			</FormControl>
			<FormControl id="textArea2">
				<FormLabel>Text area field</FormLabel>
				<FormTextField
					multirow
					maxrows={4}
				/>
			</FormControl>
			<FormControl id="textArea3">
				<FormLabel>Text area field</FormLabel>
				<FormTextField
					multirow
					rows={8}
				/>
			</FormControl>
		</Form>
	</Tabs.Tab>
	<Tabs.Tab>
		<Form bind:this={reactiveForm}>
			<FormControl id="textField">
				<FormLabel>Text field (known values)</FormLabel>
				<FormTextField>
					{#snippet known()}
						<Select.Option value="example">Example known value</Select.Option>
						<Select.Option value="example value\n2">Example known value 2</Select.Option>
					{/snippet}
				</FormTextField>
			</FormControl>
			<FormObject id="exampleObject">
				<Card.Root>
					<Card.Content gap="sm">
						<Para level="h3">Sub-form (FormObject)</Para>
						<FormControl id="textAreaAndStuff">
							<FormLabel>Text area field</FormLabel>
							<FormTextField multirow />
						</FormControl>
						<FormControl id="formattedSingleLine">
							<FormLabel>Text field formatted</FormLabel>
							<FormTextField
								format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
								placeholder="Aaa"
							/>
							<FormErrorLabel />
						</FormControl>
					</Card.Content>
				</Card.Root>
			</FormObject>
			<FormControl id="formattedMultiLine">
				<FormLabel>Text area formatted</FormLabel>
				<FormTextField
					multirow
					format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
					placeholder="Aaa"
				/>
				<FormErrorLabel />
			</FormControl>
			<FormControl id="switch">
				<FormLabel>Switch</FormLabel>
				<FormSwitch>
					{#snippet header()}
						Example header
					{/snippet}
					Example description
				</FormSwitch>
				<FormErrorLabel />
			</FormControl>
			<FormControl id="img">
				<FormLabel>Image</FormLabel>
				<FormImageField
					aspectRatio={8}
					height={4}
				/>
				<FormErrorLabel />
			</FormControl>
			<FormControl id="imgAvatar">
				<FormLabel>Image (Avatar)</FormLabel>
				<FormImageField
					radius="avatar"
					width={4}
					height={4}
				/>
				<FormErrorLabel />
			</FormControl>
			<FormControl id="checklist">
				<FormLabel>Checklist</FormLabel>
				<FormCheck.List>
					<FormCheck.Item value="first">
						{#snippet header()}
							First value
						{/snippet}
					</FormCheck.Item>
					<FormCheck.Card value="second">
						{#snippet header()}
							Second value
						{/snippet}
					</FormCheck.Card>
					<FormCheck.Item value={0}>
						{#snippet header()}
							0 value
						{/snippet}
						Description here
					</FormCheck.Item>
					<FormCheck.Item value={0}>
						{#snippet header()}
							Duplicate 0 value
						{/snippet}
					</FormCheck.Item>
				</FormCheck.List>
				<FormErrorLabel />
			</FormControl>
			<FormControl id="radiolist">
				<FormLabel>Radio List</FormLabel>
				<FormRadio.List>
					<FormRadio.Item value="first">
						{#snippet header()}
							First value
						{/snippet}
					</FormRadio.Item>
					<FormRadio.Card value="second">
						{#snippet header()}
							Second value
						{/snippet}
					</FormRadio.Card>
					<FormRadio.Item value={0}>
						{#snippet header()}
							0 value
						{/snippet}
						Description here
					</FormRadio.Item>
					<FormRadio.Item value={0}>
						{#snippet header()}
							Duplicate 0 value
						{/snippet}
					</FormRadio.Item>
				</FormRadio.List>
				<FormErrorLabel />
			</FormControl>
			<FormControl id="radiogrid">
				<FormLabel>Radio Grid</FormLabel>
				<FormRadio.List>
					<Grid.Root
						gap={1}
						columns={3}
					>
						<Grid.Cell>
							<FormRadio.Button value="text">
								<IconHash />
								Text
							</FormRadio.Button>
						</Grid.Cell>
						<Grid.Cell>
							<FormRadio.Button value="voice">
								<IconDeviceSpeakerFilled />
								Voice
							</FormRadio.Button>
						</Grid.Cell>
						<Grid.Cell>
							<FormRadio.Button value="docs">
								<IconFileFilled />
								Docs
							</FormRadio.Button>
						</Grid.Cell>
						<Grid.Cell>
							<FormRadio.Button value="list">
								<IconCheckbox />
								List
							</FormRadio.Button>
						</Grid.Cell>
						<Grid.Cell>
							<FormRadio.Button value="list">
								<IconCheckbox />
								List
							</FormRadio.Button>
						</Grid.Cell>
					</Grid.Root>
				</FormRadio.List>
				<FormErrorLabel />
			</FormControl>
			<div>
				<pre><code
						>{JSON.stringify(
							Object.fromEntries(reactiveForm?.getForm().controls.map((x) => [x.id, x.value]) ?? []),
							undefined,
							4,
						)}</code
					></pre>
			</div>
		</Form>
	</Tabs.Tab>
</Tabs.Root>
