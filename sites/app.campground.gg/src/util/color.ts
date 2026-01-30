export function decimalToHexColor(color: number) {
    return `#${(Math.abs(color) & 0xFFFFFF).toString(16)}`;
}