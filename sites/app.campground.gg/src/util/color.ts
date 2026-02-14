export function decimalToHexColor(color: number) {
    return `#${(Math.abs(color) & 0xFFFFFF).toString(16)}`;
}
export function getColorFromSet(color: number | null | undefined, colorSecondary: number | null | undefined) {
    return (
        color && colorSecondary
        ? [decimalToHexColor(color), decimalToHexColor(colorSecondary)]
        : color || colorSecondary
        ? [decimalToHexColor(color || colorSecondary!)]
        : undefined
    );
}