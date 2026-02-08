import { Stack, styled, Typography } from "@mui/joy";
import { type AnyFormFieldProps, fieldTypeToComponent, type FieldTypeToInstance, type FormSectionProps } from "./forms";
import FormFieldWrapper from "./FormFieldWrapper";
import Form from "./Form";

type Props = {
    section: FormSectionProps;
    fieldBinding: Form;
    disabled?: boolean;
    fieldValues: Record<string, any>;
    onFieldChange: (props: AnyFormFieldProps, field: FieldTypeToInstance[keyof FieldTypeToInstance], value: any) => Promise<void> | void;
}

const FormSectionStack = styled(Stack)(() => ({
    "&.disabled": {
        opacity: 0.65,
    },
    "&.hide": {
        display: "none",
    },
}));
const FormSectionFieldStack = styled(Stack)(({ theme }) => ({
    "&.inline": {
        flexDirection: "row",
    },
    "&.grid-3": {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
    },
    "&.divided > .FormField-container:not(:first-child)": {
        borderTop: `solid 1px ${theme.vars.palette.background.body}`,
        paddingTop: 12,
    }
}));

export default function FormSection({ onFieldChange, fieldBinding, fieldValues, disabled, section: { ReactiveHeader, hide, header, fields, layout, alignItems, gap } }: Props) {
    return (
        <FormSectionStack gap={2} className={`FormSection container${disabled ? " disabled" : ""}${layout ? ` ${layout}` : ""}${hide ? " hide" : ""}`}>
            {header && <Typography className="FormSection header" level="title-lg" fontWeight={700}>{header}</Typography>}
            {ReactiveHeader && <ReactiveHeader {...fieldValues}/>}
            {fields.length ? <FormSectionFieldStack className={`FormSection fields ${layout ?? ""}`} gap={gap ?? 2} sx={{ alignItems }}>
                {fields.map((field) =>
                    <FormFieldWrapper
                        key={field.id}
                        FieldComponent={fieldTypeToComponent[field.type]}
                        onChange={onFieldChange}
                        binding={fieldBinding}
                        props={field}
                        disabled={disabled}
                    />
                )}
            </FormSectionFieldStack> : null}
        </FormSectionStack>
    )
}