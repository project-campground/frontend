import type { HTMLAttributes } from 'svelte/elements';

export interface WrapperProps<T extends keyof HTMLElementTagNameMap> extends HTMLAttributes<
	HTMLElementTagNameMap[T]
> {
	element: T;
}
