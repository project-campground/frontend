export const toLookup = <T, V extends string | number | symbol>(array: T[], by: (value: T, index: number, array: T[]) => V): Record<V, T[]> =>
    array
        .reduce((aggregate, value, index, array) => {
            const key = by(value, index, array);
            return (aggregate[key] ? aggregate[key].push(value) : aggregate[key] = [value], aggregate);
        }, {} as Record<V, T[]>);
export const mapLookup = <K extends string, T, V>(lookup: Record<K, T[]>, map: (key: K, value: T[], lookup: Record<K, T[]>) => V): Record<K, V> =>
    Object.fromEntries(
        Object
            .entries(lookup)
            .map(([key, value]) => [key, map(key as K, value as T[], lookup)])
    ) as Record<K, V>;