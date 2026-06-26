import React from 'react';
import type { FormFieldProps } from './forms';
import { FormContext } from './context';

export interface AbstractFormFieldState<T> {
	value: T;
}

export default abstract class AbstractFormField<
	TValue,
	TProps extends FormFieldProps<TValue>,
	TState extends AbstractFormFieldState<TValue> = AbstractFormFieldState<TValue>,
> extends React.Component<TProps, TState> {
	static contextType?: React.Context<any> | undefined = FormContext;
	declare context: FormContext;
	private _valueFallback: TValue;

	constructor(
		props: TProps,
		context: FormContext,
		valueFallback: TValue,
		state: Omit<TState, 'value'> = {} as Omit<TState, 'value'>,
	) {
		super(props, context);

		this._valueFallback = valueFallback;
		(this.state as any) = { value: props.defaultValue ?? valueFallback, ...state };
	}

	public abstract get isValid(): boolean;

	public abstract render(): React.ReactNode;

	public componentDidMount(): void {
		this.onValueChange();
		this.context.onResetValues(this.props.id, this._resetValueBind);
	}

	public override componentDidUpdate(
		prevProps: Readonly<TProps>,
		_prevState: Readonly<TState>,
		_snapshot?: any,
	): void {
		if (prevProps.defaultValue === this.props.defaultValue) return;

		this.setState({ value: this.props.defaultValue ?? this._valueFallback });
		this.onValueChange();
	}

	protected onValueChange() {
		this.context.onFieldChange(this.props.id, this.isValid, this.state.value);
		return this.props.onChange && this.props.onChange(this.state.value);
	}

	private _resetValueBind = this.resetValue.bind(this);
	public resetValue() {
		this.setState({ value: this.props.defaultValue ?? this._valueFallback });
	}
}
