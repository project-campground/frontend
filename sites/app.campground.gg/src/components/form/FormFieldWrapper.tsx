import { FormControl, FormLabel } from "@mui/joy";
import Form from "./Form";
import type { AnyFormField, AnyFormFieldComponent, AnyFormFieldProps } from "./forms";

type Props<TValue, TProps extends AnyFormFieldProps> = {
    FieldComponent: AnyFormFieldComponent;
    disabled?: boolean;
    onChange: (props: TProps, field: AnyFormField, value: TValue) => Promise<void> | void;
    binding: Form;
    props: TProps;
};

export default function FormFieldWrapper<TValue, TProps extends AnyFormFieldProps>({ FieldComponent, onChange, binding, props, disabled }: Props<TValue, TProps>) {
    return (
        <FormControl required={props.required}>
            {props.header && <FormLabel>{props.header}</FormLabel>}
            <FieldComponent
                {...props}
                disabled={props.disabled || disabled}
                onChange={onChange.bind(binding, props)}
                />
            {props.footer}
        </FormControl>
    )
}