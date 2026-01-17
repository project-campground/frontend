import { ReactNode } from "react";
import type AbstractFormField from "./AbstractFormField";
import FormFieldText, { type FormFieldTextProps } from "./FormFieldText";
import FormFieldSelect, { type FormFieldSelectProps } from "./FormFieldSelect";
import FormFieldRadio, { type FormFieldRadioProps } from "./FormFieldRadio";

export type FormSectionProps = {
    header?: ReactNode | ReactNode[];
    fields: AnyFormFieldProps[];
    disableOn?: (fieldValues: Record<string, any>) => boolean;
};

export type FormFieldType = "text" | "select" | "radio";

export type FormFieldTypeToProps = {
    text: FormFieldTextProps;
    select: FormFieldSelect;
    radio: FormFieldRadio;
};

export type AnyFormFieldProps = FormFieldTextProps | FormFieldSelectProps | FormFieldRadioProps;

export type AnyFormFieldComponent = new(props: FormFieldProps<FormFieldType, any>) => AbstractAnyFormField;

export type AbstractAnyFormField = AbstractFormField<FormFieldType, any, FormFieldProps<FormFieldType, any>, any>;

export type AnyFormField = FormFieldText;

export const fieldTypeToComponent = {
    text: FormFieldText,
    select: FormFieldSelect,
    radio: FormFieldRadio,
};

export interface FormFieldProps<TType extends FormFieldType, TValue> {
    type: TType;
    id: string;

    header?: ReactNode[] | ReactNode;
    footer?: ReactNode[] | ReactNode;
    required?: boolean;
    disabled?: boolean;
    defaultValue?: TValue;

    onChange?: (field: AbstractFormField<TType, TValue, FormFieldProps<TType, TValue>, any>, value: TValue) => Promise<void> | void;
}

export interface FormFieldDecoratorProps {
    startDecorator?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
}