<script
	lang="ts"
	module
>
	const knownColors: [name: string, value: number][] = [
		['primary', 0xff5a26],
		['secondary', 0xff2661],
		['red', 0xfe1c56],
		['yellow', 0xffab03],
		['green', 0x05ee34],
		['teal', 0x00e7cc],
		['blue', 0x6026ff],
		['purple', 0xca1cfe],
		['grey', 0x9d95a4],
	];
	const knownColorsShades: [prefix: string, by: number][] = [
		['', 1],
		['dark ', 0.5],
	];
	const knownColorsShaded = knownColorsShades.flatMap(([prefix, by]) =>
		knownColors.map(
			([name, value]) => [prefix + name, multiplyColor(value, by)] as [name: string, value: number],
		),
	) as unknown as [name: string, value: number][];

	function multiplyColor(value: number, by: number) {
		const red = value >> 16;
		const green = (value >> 8) & 0xff;
		const blue = value & 0xff;

		const hsl = convert.rgb.hsl(red, green, blue);
		const rgbMultiplied = convert.hsl.rgb(hsl[0], hsl[1], hsl[2] * by);

		return (rgbMultiplied[0] << 16) | (rgbMultiplied[1] << 8) | rgbMultiplied[2];
	}
</script>

<script lang="ts">
	import { TextInput, Stack, Grid } from '@campground/ui';
	import convert from 'color-convert';
	import SquareInput from './SquareInput.svelte';
	import QuickSelect from './QuickSelect.svelte';
	import type { ColorPickerProps } from './props.ts';

	let { defaultColor, color = $bindable(0), size, orientation }: ColorPickerProps = $props();

	let hsvDefault = $derived(
		convert.rgb.hsv(
			(defaultColor ?? 0) >> 16,
			((defaultColor ?? 0) >> 8) & 0xff,
			(defaultColor ?? 0) & 0xff,
		),
	);
	// Separating hue from color means that if you set value as completely black or white, the hue does not
	// change to red every time, despite being selected as blue, green or whatever
	let hue = $derived(hsvDefault[0]);
	// For square input or hue range changes
	let hsv = $derived(convert.rgb.hsv(color >> 16, (color >> 8) & 0xff, color & 0xff));
	let rgbValueInput: string = $derived(color.toString(16).padStart(6, '0'));

	function onHueChange(newHue: number) {
		return setColor(newHue, hsv[1], hsv[2]);
	}
	function onSquareInputChange(newValue: number, newSaturation: number) {
		return setColor(hue, newSaturation, newValue);
	}
	function setColor(hue: number, saturation: number, value: number) {
		const rgb = convert.hsv.rgb(hue, saturation, value);
		return (color = (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]);
	}
	function onRgbInputChange(str: string) {
		if (str.length !== 6) return;

		const decimalValue = parseInt(str, 16);

		return (color = decimalValue);
	}
	function onQuickSelect(value: number) {
		const hsv = convert.rgb.hsv(value >> 16, (value >> 8) & 0xff, value & 0xff);
		hue = hsv[0];
		return (color = value);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="container"
	data-size={size ?? 'md'}
	data-orientation={orientation ?? 'vertical'}
	style:--ColorPicker-red={(color >> 16) & 0xff}
	style:--ColorPicker-green={(color >> 8) & 0xff}
	style:--ColorPicker-blue={color & 0xff}
	style:--ColorPicker-hue={`${hsv[0]}deg`}
	style:--ColorPicker-rangeHue={`${hue}deg`}
	style:--ColorPicker-saturation={`${hsv[1]}%`}
	style:--ColorPicker-value={`${hsv[2]}%`}
	onclick={(ev) => ev.stopPropagation()}
>
	<Stack
		direction="row"
		gap={0.5}
		align="stretch"
		flex={1}
	>
		<SquareInput
			onChange={onSquareInputChange}
			{size}
		/>
		<input
			class="range"
			type="range"
			list="colorPickerValues"
			min={0}
			max={359}
			step={1}
			bind:value={hue}
			oninput={(ev) => onHueChange(ev.currentTarget.valueAsNumber)}
		/>
	</Stack>
	<Stack align="center">
		<TextInput
			maxlength={6}
			value={rgbValueInput}
			onchange={(ev) => onRgbInputChange(ev.currentTarget.value)}
			error={!/^[A-Fa-f0-9]{6}$/.test(rgbValueInput)}
		>
			{#snippet left()}
				#
			{/snippet}
		</TextInput>
		<Grid.Root
			gap={0.25}
			columns={knownColors.length}
			breakpointReduce={0}
		>
			{#each knownColorsShaded as [name, color] (color)}
				<Grid.Cell>
					<QuickSelect
						onClick={() => onQuickSelect(color)}
						{color}
						{name}
					></QuickSelect>
				</Grid.Cell>
			{/each}
		</Grid.Root>
	</Stack>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		padding: 0.5rem;
		max-width: 16rem;

		&[data-orientation='horizontal'] {
			flex-direction: row;
		}
	}
	.range {
		background: transparent;
		appearance: none;
		writing-mode: vertical-lr;
		direction: ltr;
		&::-moz-range-progress {
			background: transparent;
		}
		&::-moz-range-track,
		&::-webkit-slider-runnable-track {
			width: 0.5rem;
			margin-inline: 0.5rem;
			background: linear-gradient(
				to bottom in hsl,
				hsl(0deg, 100%, 50%),
				hsl(120deg, 100%, 50%),
				hsl(240deg, 100%, 50%),
				hsl(359deg, 100%, 50%)
			);
			border-radius: var(--radius-sm);
		}
		&::-moz-range-thumb,
		&::-webkit-slider-thumb {
			box-sizing: border-box;
			border: solid 2px transparent;
			border-color: hsl(var(--ColorPicker-rangeHue), 100%, 50%);
			background-color: var(--background-body);
			@extend %Squircle;
			height: 1rem;
			width: 1rem;
		}
	}
</style>
