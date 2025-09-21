import { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import FormFieldText, { FormFieldTextProps } from "./FormFieldText";

export type FormSectionProps = {
    header?: ReactNode | ReactNode[];
    fields: AnyFormFieldProps[];
};

export type FormFieldType = "text";

export type FormFieldTypeToProps = {
    text: FormFieldTextProps;
};

export type AnyFormFieldProps = FormFieldTextProps;

export type AnyFormFieldComponent = new(props: FormFieldProps<FormFieldType, any>) => AbstractAnyFormField;

export type AbstractAnyFormField = AbstractFormField<FormFieldType, any, FormFieldProps<FormFieldType, any>, any>;

export type AnyFormField = FormFieldText;

export const fieldTypeToComponent = {
    text: FormFieldText,
};

export interface FormFieldProps<TType extends FormFieldType, TValue> {
    type: TType;
    id: string;

    header?: ReactNode[] | ReactNode;
    footer?: ReactNode[] | ReactNode;
    required?: boolean;
    defaultValue?: TValue;

    onChange?: (field: AbstractFormField<TType, TValue, FormFieldProps<TType, TValue>, any>, value: TValue) => Promise<void> | void;
}

export interface FormFieldDecoratorProps {
    startDecorator?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
}