import type { FormImageFieldValue } from './props.ts';

export function createImageDefaultValue<T>(value: string | T): FormImageFieldValue | T {
	return typeof value === 'string' ? ({ url: value } as FormImageFieldValue) : (value as T);
}
