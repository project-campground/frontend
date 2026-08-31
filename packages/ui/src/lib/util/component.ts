export const toSpacingPx = (value: number | undefined | null) => (value ? `${value * 8}px` : null);

export type SizeUnit = 'rem' | 'em' | 'cm' | 'ch' | 'rch' | 'px' | '%' | 'vw' | 'vh';
export type SizeNumber = `${number}${SizeUnit}`;

export type Size = number | SizeNumber | undefined | null;

export const suffixedWidth = (value: Size, suffix: string) =>
	typeof value === 'number' ? `${value}${suffix}` : (value ?? null);

export const rem = (value: Size) => suffixedWidth(value, 'rem');
export const em = (value: Size) => suffixedWidth(value, 'em');

export const capitalize = (value: string) =>
	value.substring(0, 1).toUpperCase() + value.substring(1);
export const capitalizePhrase = (value: string) => value.split('-').map(capitalize).join('');
