import type { ImageFieldValue } from './props.ts';

export function createImageDefaultValue<T>(value: string | T): ImageFieldValue | T {
	return typeof value === 'string' ? ({ url: value } as ImageFieldValue) : (value as T);
}
