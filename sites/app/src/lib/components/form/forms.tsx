import { ReactNode } from 'react';

export interface FormFieldProps<TValue> {
	id: string | number;

	required?: boolean;
	disabled?: boolean;
	defaultValue?: TValue;

	flex?: number;

	onChange?: (value: TValue) => Promise<void> | void;
}

export interface FormFieldDecoratorProps {
	startDecorator?: ReactNode[] | ReactNode;
	endDecorator?: ReactNode[] | ReactNode;
}
