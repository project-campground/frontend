import { Stack, Typography } from "@mui/joy";
import { AnyFormField, AnyFormFieldProps, fieldTypeToComponent, FormSectionProps } from "./forms";
import FormFieldWrapper from "./FormFieldWrapper";
import Form from "./Form";

type Props = {
    section: FormSectionProps;
    fieldBinding: Form;
    onFieldChange: (props: AnyFormFieldProps, field: AnyFormField, value: any) => Promise<void> | void;
}

export default function FormSection({ onFieldChange, fieldBinding, section: { header, fields } }: Props) {
    return (
        <Stack gap={2} className="FormSection container">
            <Typography className="FormSection header" level="title-md">{header}</Typography>
            <Stack className="FormSection fields" gap={1}>
                {fields.map(field =>
                    <FormFieldWrapper
                        FieldComponent={fieldTypeToComponent[field.type]}
                        onChange={onFieldChange}
                        binding={fieldBinding}
                        props={field}
                    />
                )}
            </Stack>
        </Stack>
    )
}