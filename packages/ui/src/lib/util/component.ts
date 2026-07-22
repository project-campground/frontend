export const toSpacingPx = (value: number | undefined | null) => (value ? `${value * 8}px` : null);

export type DistanceUnit = 'rem' | 'em' | 'cm' | 'ch' | 'rch' | 'px' | '%' | 'vw' | 'vh';
export type DistanceNumber = `${number}${DistanceUnit}`;

export type DistanceArgument = number | DistanceNumber | undefined | null;

export const suffixedWidth = (value: DistanceArgument, suffix: string) =>
	typeof value === 'number' ? `${value}${suffix}` : (value ?? null);

export const rem = (value: DistanceArgument) => suffixedWidth(value, 'rem');
export const em = (value: DistanceArgument) => suffixedWidth(value, 'em');

export const capitalize = (value: string) =>
	value.substring(0, 1).toUpperCase() + value.substring(1);
export const capitalizePhrase = (value: string) => value.split('-').map(capitalize).join('');
