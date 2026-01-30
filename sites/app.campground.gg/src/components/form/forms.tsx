import { ReactNode } from "react";
import type AbstractFormField from "./AbstractFormField";
import FormFieldText, { type FormFieldTextProps } from "./FormFieldText";
import FormFieldSelect, { type FormFieldSelectProps } from "./FormFieldSelect";
import FormFieldRadio, { type FormFieldRadioProps } from "./FormFieldRadio";
import FormFieldAvatar, { type FormFieldAvatarProps } from "./FormFieldAvatar";
import type { FormFieldTextAreaProps } from "./FormFieldTextArea";
import FormFieldTextArea from "./FormFieldTextArea";
import type { FormFieldTagsProps } from "./FormFieldTags";
import FormFieldTags from "./FormFieldTags";
import type { FormFieldCheckboxProps } from "./FormFieldCheckbox";
import FormFieldCheckbox from "./FormFieldCheckbox";
import type { FormFieldColorProps } from "./FormFieldColor";
import FormFieldColor from "./FormFieldColor";
import FormFieldTristate from "./FormFieldTristate";
import type { FormFieldTristateProps } from "./FormFieldTristate";
import type { FormFieldSwitchProps } from "./FormFieldSwitch";
import FormFieldSwitch from "./FormFieldSwitch";

export type FormSectionProps = {
    id: string;
    header?: ReactNode | ReactNode[];
    fields: AnyFormFieldProps[];
    layout?: "stack" | "inline" | "grid-3" | "divided";
    alignItems?: AlignSetting;
    gap?: number;
    disableOn?: (fieldValues: Record<string, any>) => boolean;
};

export type FormFieldType = "text" | "textarea" | "select" | "color" | "radio" | "checkbox" | "switch" | "tristate" | "avatar" | "tags";

export type AnyFormFieldProps = FormFieldTypeToProps[keyof FormFieldTypeToProps];

export type AbstractAnyFormField = AbstractFormField<FormFieldType, any, FormFieldProps<FormFieldType, any>, any>;

export type FormFieldTypeToProps = {
    text: FormFieldTextProps;
    tags: FormFieldTagsProps;
    textarea: FormFieldTextAreaProps;
    select: FormFieldSelectProps;
    radio: FormFieldRadioProps;
    checkbox: FormFieldCheckboxProps;
    switch: FormFieldSwitchProps;
    tristate: FormFieldTristateProps;
    avatar: FormFieldAvatarProps;
    color: FormFieldColorProps;
};
export type FieldTypeToComponent = typeof fieldTypeToComponent;
export type FieldTypeToInstance = {
    text: FormFieldText,
    tags: FormFieldTags,
    textarea: FormFieldTextArea,
    select: FormFieldSelect,
    radio: FormFieldRadio,
    checkbox: FormFieldCheckbox,
    switch: FormFieldSwitch;
    tristate: FormFieldTristate,
    avatar: FormFieldAvatar,
    color: FormFieldColor,
};
export const fieldTypeToComponent = {
    text: FormFieldText,
    tags: FormFieldTags,
    textarea: FormFieldTextArea,
    select: FormFieldSelect,
    checkbox: FormFieldCheckbox,
    tristate: FormFieldTristate,
    switch: FormFieldSwitch,
    radio: FormFieldRadio,
    avatar: FormFieldAvatar,
    color: FormFieldColor,
};

export interface FormFieldProps<TType extends FormFieldType, TValue> {
    type: TType;
    id: string;

    header?: ReactNode[] | ReactNode;
    footer?: ReactNode[] | ReactNode;
    required?: boolean;
    disabled?: boolean;
    defaultValue?: TValue;

    flex?: number;

    onChange?: (field: FieldTypeToInstance[TType], value: TValue) => Promise<void> | void;
}

export interface FormFieldDecoratorProps {
    startDecorator?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
}