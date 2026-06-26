export const toLookup = <T, V extends string | number | symbol>(
	array: T[],
	by: (value: T, index: number, array: T[]) => V,
): Record<V, T[]> =>
	array.reduce(
		(aggregate, value, index, array) => {
			const key = by(value, index, array);
			return (aggregate[key] ? aggregate[key].push(value) : (aggregate[key] = [value]), aggregate);
		},
		{} as Record<V, T[]>,
	);
export const mapLookup = <K extends string, T, V>(
	lookup: Record<K, T[]>,
	map: (key: K, value: T[], lookup: Record<K, T[]>) => V,
): Record<K, V> =>
	Object.fromEntries(
		Object.entries(lookup).map(([key, value]) => [key, map(key as K, value as T[], lookup)]),
	) as Record<K, V>;
export const moveIndexes = <T>(array: T[], i0: number, i1: number) => {
	const smallerI = Math.min(i0, i1);
	const biggerI = Math.max(i0, i1);
	return [
		...array.slice(0, smallerI),
		array[biggerI],
		...array.slice(smallerI + 1, biggerI),
		array[smallerI],
		...array.slice(biggerI + 1),
	];
};
