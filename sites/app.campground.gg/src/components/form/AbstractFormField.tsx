import React from "react";
import type { AbstractAnyFormField, FormFieldProps, FormFieldType } from "./forms";

export default abstract class AbstractFormField<TType extends FormFieldType, TValue, TProps extends FormFieldProps<TType, TValue>, TState> extends React.Component<TProps, TState> {
    constructor(props: TProps) {
        super(props);
    }

    public abstract get isValid(): boolean;

    public abstract render(): React.ReactNode;

    protected onChange(value: TValue) {
        return this.props.onChange && this.props.onChange(this as unknown as AbstractAnyFormField, value);
    }

}