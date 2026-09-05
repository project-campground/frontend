<script lang="ts">
	import { TextInput, Stack } from '@campground/ui';
	import convert from 'color-convert';
	import SquareInput from './SquareInput.svelte';

	let hue: number = $state(0);
	let saturation: number = $state(1);
	let value: number = $state(1);
	let hsl: [number, number, number] = $derived(convert.hsv.hsl(hue, saturation * 100, value * 100));
	let rgbValueInput: string = $state('FF0000');

	function onHueChange(newHue: number) {
		hue = newHue;
		return resetRgbInput();
	}
	function onSquareInputChange(newValue: number, newSaturation: number) {
		value = newValue;
		saturation = newSaturation;
		return resetRgbInput();
	}
	function resetRgbInput() {
		rgbValueInput = convert.hsv.hex(hue, saturation * 100, value * 100);
		return sendChanges(hue, saturation, value);
	}
	function onRgbInputChange(str: string) {
		if (str.length !== 6) return;

		const decimalValue = parseInt(str, 16);

		const [h, s, v] = convert.rgb.hsv(
			decimalValue << 16,
			(decimalValue << 8) % 256,
			decimalValue % 256,
		);

		hue = h;
		saturation = s;
		value = v;
		return sendChanges(hue + 50, saturation, value);
	}
	function sendChanges(hue: number, saturation: number, value: number) {
		const decimal = convert.hsv
			.rgb(hue, saturation * 100, value * 100)
			.reverse()
			.reduce((prev, cur, i) => prev + (cur << (i * 8)), 0);
		return onChange(decimal);
	}

	const { onChange }: { onChange: (rgb: number) => unknown } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="container"
	style:--ColorPicker-color={`${hue}deg`}
	style:--ColorPicker-saturation={`${saturation * 100}%`}
	style:--ColorPicker-brightness={`${value * 100}%`}
	style:--ColorPicker-saturationHSL={`${hsl[1]}%`}
	style:--ColorPicker-lightness={`${hsl[2]}%`}
	onclick={(ev) => ev.stopPropagation()}
>
	<Stack
		align="stretch"
		gap={0.5}
	>
		<SquareInput onChange={onSquareInputChange} />
		<input
			class="range"
			type="range"
			list="colorPickerValues"
			min={0}
			max={360}
			step={1}
			bind:value={hue}
			oninput={(ev) => onHueChange(ev.currentTarget.valueAsNumber)}
		/>
		<TextInput
			value={rgbValueInput}
			onchange={(ev) => onRgbInputChange(ev.currentTarget.value)}
			error={!/^[A-Fa-f0-9]{6}$/.test(rgbValueInput)}
		>
			{#snippet left()}
				#
			{/snippet}
		</TextInput>
	</Stack>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
	}
	.range {
		background: transparent;
		appearance: none;
		&::-moz-range-progress {
			background: transparent;
		}
		&::-moz-range-track,
		&::-webkit-slider-runnable-track {
			height: 0.5rem;
			margin-inline: 0.5rem;
			background: linear-gradient(
				to right in hsl,
				hsl(0deg, 100%, 50%),
				hsl(120deg, 100%, 50%),
				hsl(240deg, 100%, 50%),
				hsl(360deg, 100%, 50%)
			);
			border-radius: var(--radius-sm);
		}
		&::-moz-range-thumb,
		&::-webkit-slider-thumb {
			box-sizing: border-box;
			border: solid 2px transparent;
			border-color: hsl(var(--ColorPicker-color), 100%, 50%);
			background-color: var(--background-body);
			@extend %Squircle;
			height: 1rem;
			width: 1rem;
		}
	}
</style>
