import type { ComponentSize } from '@campground/ui';

export interface ButtonProps {
	size?: ComponentSize;
}
export type FullProps = Omit<ColorPickerProps, 'color' | 'defaultColor'>;
export interface ColorPickerProps {
	color: number;
	defaultColor?: number;
	size?: ComponentSize;
	orientation?: 'vertical' | 'horizontal';
}
export interface SquareInputProps {
	size?: ComponentSize;
	onChange: (brightness: number, saturation: number) => unknown;
}
