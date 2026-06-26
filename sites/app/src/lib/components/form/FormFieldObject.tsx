import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import AbstractFormField from './AbstractFormField';
import { type FormFieldProps } from './forms';
import { Stack } from '@mui/joy';
import { FormContext, type ResetValueHandler } from './context';
import { FormBody } from './Form';
import clsx from 'clsx';

type MapValue = Record<string | number, any>;

export interface FormFieldObjectProps extends PropsWithChildren, FormFieldProps<MapValue> {
	gap?: number;
	inline?: boolean;
}

type State = { value: MapValue; valid: Record<string | number, boolean> };

export default class FormFieldObject extends AbstractFormField<
	MapValue,
	FormFieldObjectProps,
	State
> {
	private _resetValueHandlers: Record<string | number, ResetValueHandler> = {};

	constructor(props: FormFieldObjectProps, context: FormContext) {
		super(props, context, {}, { valid: {} });
	}

	public override get isValid(): boolean {
		return this.allFieldsValid;
	}

	public get allFieldsValid(): boolean {
		return Object.values(this.state.valid).every((x) => x);
	}

	private onSubFieldChange = (id: string | number, isValid: boolean, value: any) =>
		this.setState(
			{ value: { ...this.state.value, [id]: value }, valid: { ...this.state.valid, [id]: isValid } },
			() => this.onValueChange(),
		);

	private onSubmit = (ev: MouseEvent) => this.context.onSubmit(ev);

	public override resetValue() {
		for (const resetValueHandler of Object.values(this._resetValueHandlers)) resetValueHandler();
		super.resetValue();
	}

	public onAddResetHandler = (id: string | number, resetHandler: ResetValueHandler) => {
		return (this._resetValueHandlers[id] = resetHandler);
	};

	public override render(): ReactNode {
		const { children, inline, gap } = this.props;

		return (
			<Stack gap={2}>
				<FormContext.Provider
					value={{
						onResetValues: this.onAddResetHandler,
						allValid: this.isValid,
						values: this.state.value,
						validFields: this.state.valid,
						onSubmit: this.onSubmit,
						onFieldChange: this.onSubFieldChange,
					}}
				>
					<FormBody
						className={clsx('Form-body', inline && 'Form-body-inlineContent')}
						gap={gap}
					>
						{children}
					</FormBody>
				</FormContext.Provider>
			</Stack>
		);
	}
}
