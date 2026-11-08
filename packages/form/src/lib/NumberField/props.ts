import type { TextInputProps } from '@campground/ui';

export default interface NumberFieldProps extends Omit<
	TextInputProps,
	'value' | 'maxlength' | 'multirow' | 'rows' | 'maxrows' | 'type'
> {
	floating?: boolean;
	step?: number;

	min?: number;
	max?: number;
}
