import type { HTMLAttributes } from 'svelte/elements';
import { stackedProps } from '../layout.ts';
import type { LayoutItemProps } from './props.ts';

export function cardLayoutItemProps({
	h,
	...props
}: Omit<LayoutItemProps, 'pt' | 'pb' | 'pl' | 'pr' | 'mb' | 'mt' | 'gap'>): Partial<
	HTMLAttributes<HTMLElementTagNameMap['div']>
> {
	return { 'data-height': h, ...stackedProps(props) };
}
