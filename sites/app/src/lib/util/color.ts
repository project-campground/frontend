export function decimalToHexColor(color: number) {
	return `#${(Math.abs(color) & 0xffffff).toString(16).padStart(6, '0')}`;
}
export function colorToDecimal(colors: number[] | undefined | null) {
	return colors?.map(decimalToHexColor) ?? [];
}
