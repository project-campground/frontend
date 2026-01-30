import { FormControl, FormLabel } from "@mui/joy";
import Form from "./Form";
import type { AnyFormFieldProps, FieldTypeToComponent, FieldTypeToInstance } from "./forms";

type Props<TValue, TProps extends AnyFormFieldProps> = {
    FieldComponent: FieldTypeToComponent[keyof FieldTypeToComponent];
    disabled?: boolean;
    onChange: (props: TProps, field: FieldTypeToInstance[keyof FieldTypeToInstance], value: TValue) => Promise<void> | void;
    binding: Form;
    props: TProps;
};

export default function FormFieldWrapper<TValue, TProps extends AnyFormFieldProps>({ FieldComponent, onChange, binding, props, disabled }: Props<TValue, TProps>) {
    return (
        <FormControl className="FormField-container" required={props.required} sx={{ flex: props.flex }}>
            {props.header && <FormLabel>{props.header}</FormLabel>}
            <FieldComponent
                {...props}
                disabled={props.disabled || disabled}
                onChange={onChange.bind(binding, props) as (field: any, value: any) => Promise<void> | void}
                />
            {props.footer}
        </FormControl>
    )
}