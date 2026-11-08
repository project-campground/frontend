import type { ComponentSize } from '../../types/attributes.ts';
import type { HTMLInputAttributes } from 'svelte/elements';

export default interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
	value?: string | number;
	size?: ComponentSize;
}
