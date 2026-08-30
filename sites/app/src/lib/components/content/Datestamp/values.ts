import type { DatestampUnit } from './props.ts';

const unitMap: [number, DatestampUnit][] = [
	[365 * 24 * 60 * 60 * 1000, 'y'],
	[30 * 24 * 60 * 60 * 1000, 'mon'],
	[7 * 24 * 60 * 60 * 1000, 'w'],
	[24 * 60 * 60 * 1000, 'd'],
	[60 * 60 * 1000, 'h'],
	[60 * 1000, 'min'],
	[1000, 's'],
];

export function getUnitAndValue(delta: number): [number, DatestampUnit] {
	const [valueToDivide, firstBiggestUnit] = unitMap.find(([n]) => n <= delta) ?? [1, 'ms'];

	return [delta / valueToDivide, firstBiggestUnit];
}
