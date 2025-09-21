import { FormControl, FormLabel } from "@mui/joy";
import Form from "./Form";
import { AnyFormField, AnyFormFieldComponent, AnyFormFieldProps } from "./forms";

type Props<TValue, TProps extends AnyFormFieldProps> = {
    FieldComponent: AnyFormFieldComponent;
    onChange: (props: TProps, field: AnyFormField, value: TValue) => Promise<void> | void;
    binding: Form;
    props: TProps;
};

export default function FormFieldWrapper<TValue, TProps extends AnyFormFieldProps>({ FieldComponent, onChange, binding, props }: Props<TValue, TProps>) {
    return (
        <FormControl required={props.required}>
            {props.header && <FormLabel>{props.header}</FormLabel>}
            <FieldComponent
                {...props}
                onChange={onChange.bind(binding, props)}
                />
            {props.footer}
        </FormControl>
    )
}