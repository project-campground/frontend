import { FormControl, FormLabel } from "@mui/joy";
import type { AbstractAnyFormField, AnyFormFieldProps, FieldTypeToInstance, FormFieldType } from "./forms";
import type { JSXElementConstructor } from "react";

type Props<TValue, TProps extends AnyFormFieldProps> = {
    FieldComponent: AbstractAnyFormField;
    disabled?: boolean;
    addFieldRef: (value: AbstractAnyFormField) => void;
    onChange: (field: FieldTypeToInstance[FormFieldType], value: TValue) => Promise<void> | void;
    props: TProps;
};

export default function FormFieldWrapper<TValue, TProps extends AnyFormFieldProps>({ addFieldRef, FieldComponent, onChange, props, disabled }: Props<TValue, TProps>) {
    const FieldComponentCasted = FieldComponent as unknown as JSXElementConstructor<AbstractAnyFormField>;

    return (
        <FormControl className="FormField-container" required={props.required} sx={{ flex: props.flex }}>
            {props.header && <FormLabel>{props.header}</FormLabel>}
            <FieldComponentCasted
                {...props}
                ref={(ref: AbstractAnyFormField) => ref && addFieldRef(ref)}
                disabled={props.disabled || disabled}
                onChange={onChange as unknown}
            />
            {props.footer}
        </FormControl>
    )
}