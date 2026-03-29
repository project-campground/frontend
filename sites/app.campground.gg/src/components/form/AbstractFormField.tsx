import React from "react";
import type { FieldTypeToInstance, FormFieldProps, FormFieldType } from "./forms";

interface AbstractFormFieldState<T> {
    value: T;
}

export default abstract class AbstractFormField<TType extends FormFieldType, TValue, TProps extends FormFieldProps<TType, TValue>, TState extends AbstractFormFieldState<TValue> = AbstractFormFieldState<TValue>> extends React.Component<TProps, TState> {
    private valueFallback: TValue;

    constructor(props: TProps, valueFallback: TValue, state: Omit<TState, "value"> = {} as Omit<TState, "value">) {
        super(props);

        this.valueFallback = valueFallback;
        (this.state as any) = {
            value: props.defaultValue ?? valueFallback,
            ...state
        }
    }

    public abstract get isValid(): boolean;

    public abstract render(): React.ReactNode;

    public override componentDidUpdate(prevProps: Readonly<TProps>, _prevState: Readonly<TState>, _snapshot?: any): void {
        if (prevProps.defaultValue !== this.props.defaultValue)
            this.setState({ value: this.props.defaultValue ?? this.valueFallback });
    }

    protected onChange(value: TValue) {
        return this.props.onChange && this.props.onChange(this as unknown as FieldTypeToInstance[TType], value);
    }

}