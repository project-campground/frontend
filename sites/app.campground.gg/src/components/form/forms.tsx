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
import type { FormFieldImageProps } from "./FormFieldImage";
import FormFieldImage from "./FormFieldImage";
import FormFieldNumber, { type FormFieldNumberProps } from "./FormFieldNumber";
import FormFieldArray, { type FormFieldArrayProps } from "./FormFieldArray";

export type FormSectionProps = {
    id: string;
    startDecorator?: ReactNode | ReactNode[];
    endDecorator?: ReactNode | ReactNode[];
    header?: ReactNode | ReactNode[];
    fields: AnyFormFieldProps[];
    layout?: "stack" | "inline" | "grid-3" | "divided";
    alignItems?: AlignSetting;
    gap?: number;
    hide?: boolean;
    disableOn?: (fieldValues: Record<string, any>) => boolean;
    ReactiveHeader?: (values: Record<string, any>) => (ReactNode[] | ReactNode);
};

export type FormFieldType = "text" | "number" | "textarea" | "select" | "array" | "color" | "radio" | "checkbox" | "switch" | "tristate" | "avatar" | "image" | "tags";

export type AnyFormFieldProps = FormFieldTypeToProps[keyof FormFieldTypeToProps];

export type AbstractAnyFormField = AbstractFormField<FormFieldType, any, FormFieldProps<FormFieldType, any>, any>;

export type FormFieldTypeToProps = {
    text: FormFieldTextProps;
    number: FormFieldNumberProps;
    array: FormFieldArrayProps,
    tags: FormFieldTagsProps;
    textarea: FormFieldTextAreaProps;
    select: FormFieldSelectProps;
    radio: FormFieldRadioProps;
    checkbox: FormFieldCheckboxProps;
    switch: FormFieldSwitchProps;
    tristate: FormFieldTristateProps;
    image: FormFieldImageProps;
    avatar: FormFieldAvatarProps;
    color: FormFieldColorProps;
};
export type FieldTypeToComponent = typeof fieldTypeToComponent;
export type FieldTypeToInstance = {
    text: FormFieldText,
    number: FormFieldNumber,
    array: FormFieldArray,
    tags: FormFieldTags,
    textarea: FormFieldTextArea,
    select: FormFieldSelect,
    radio: FormFieldRadio,
    checkbox: FormFieldCheckbox,
    switch: FormFieldSwitch;
    tristate: FormFieldTristate,
    avatar: FormFieldAvatar,
    image: FormFieldImage,
    color: FormFieldColor,
};
export const fieldTypeToComponent = {
    text: FormFieldText,
    number: FormFieldNumber,
    array: FormFieldArray,
    tags: FormFieldTags,
    textarea: FormFieldTextArea,
    select: FormFieldSelect,
    checkbox: FormFieldCheckbox,
    tristate: FormFieldTristate,
    switch: FormFieldSwitch,
    radio: FormFieldRadio,
    avatar: FormFieldAvatar,
    image: FormFieldImage,
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