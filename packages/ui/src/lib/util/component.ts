export const toSpacingPx = (value: number | undefined | null) => (value ? `${value * 8}px` : null);
export const capitalize = (value: string) =>
	value.substring(0, 1).toUpperCase() + value.substring(1);
export const capitalizePhrase = (value: string) => value.split('-').map(capitalize).join('');
