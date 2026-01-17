import { Stack, styled, Typography } from "@mui/joy";
import { type AnyFormField, type AnyFormFieldProps, fieldTypeToComponent, type FormSectionProps } from "./forms";
import FormFieldWrapper from "./FormFieldWrapper";
import Form from "./Form";

type Props = {
    section: FormSectionProps;
    fieldBinding: Form;
    disabled?: boolean;
    onFieldChange: (props: AnyFormFieldProps, field: AnyFormField, value: any) => Promise<void> | void;
}

const FormSectionStack = styled(Stack)(({ theme }) => ({
    "&.disabled": {
        opacity: 0.65,
    }
}));

export default function FormSection({ onFieldChange, fieldBinding, disabled, section: { header, fields } }: Props) {
    return (
        <FormSectionStack gap={2} className={`FormSection container${disabled ? " disabled" : ""}`}>
            <Typography className="FormSection header" level="title-md">{header}</Typography>
            <Stack className="FormSection fields" gap={1}>
                {fields.map((field, i) =>
                    <FormFieldWrapper
                        key={i}
                        FieldComponent={fieldTypeToComponent[field.type]}
                        onChange={onFieldChange}
                        binding={fieldBinding}
                        props={field}
                        disabled={disabled}
                    />
                )}
            </Stack>
        </FormSectionStack>
    )
}