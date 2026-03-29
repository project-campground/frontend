import { FormControl, FormLabel } from "@mui/joy";
import type { AnyFormFieldProps, FieldTypeToComponent, FieldTypeToInstance, FormFieldType } from "./forms";

type Props<TValue, TProps extends AnyFormFieldProps> = {
    FieldComponent: FieldTypeToComponent[keyof FieldTypeToComponent];
    disabled?: boolean;
    onChange: (field: FieldTypeToInstance[FormFieldType], value: TValue) => Promise<void> | void;
    props: TProps;
};

export default function FormFieldWrapper<TValue, TProps extends AnyFormFieldProps>({ FieldComponent, onChange, props, disabled }: Props<TValue, TProps>) {
    return (
        <FormControl className="FormField-container" required={props.required} sx={{ flex: props.flex }}>
            {props.header && <FormLabel>{props.header}</FormLabel>}
            <FieldComponent
                {...props}
                disabled={props.disabled || disabled}
                onChange={onChange}
            />
            {props.footer}
        </FormControl>
    )
}