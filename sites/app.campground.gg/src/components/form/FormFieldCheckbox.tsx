import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Checkbox, Sheet, Stack, Typography, } from "@mui/joy";
import type React from "react";

type CheckboxType = "default" | "button";
export interface FormFieldCheckboxProps extends FormFieldProps<"checkbox", boolean>, FormFieldDecoratorProps {
    label?: string;
    description?: string;
    design?: CheckboxType;
}

type State = {
    value: boolean;
};

export default class FormFieldCheckbox extends AbstractFormField<"checkbox", boolean, FormFieldCheckboxProps, State> {
    constructor(props: FormFieldCheckboxProps) {
        super(props, false);
        this.state = { value: props.defaultValue ?? false };
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null;
    }

    private onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const value = ev.target.checked;
        this.setState({ value }, () => this.onChange(value));
    }

    private FieldText() {
        const { label, description } = this.props;

        return (
            (label || description) &&
            <Stack flex={1}>
                <Typography level="title-md" fontWeight={700} textColor="text.secondary">{label}</Typography>
                <Typography level="body-md" textColor="text.tertiary">{description}</Typography>
            </Stack>
        )
    }

    public override render(): ReactNode {
        const { defaultValue, design } = this.props;
        const { state: { value } } = this;
        const onChange = this.onInputChange.bind(this);
        const FieldText = this.FieldText.bind(this);

        return (
            design === "button"
            ? <Sheet variant="soft" sx={{ px: 3, py: 1.5, borderRadius: "md", lineHeight: 0 }}>
                <Checkbox overlay
                    variant="soft"
                    color={value ? "success" : "neutral"}
                    label={<FieldText />}
                    defaultChecked={defaultValue}
                    checked={value}
                    onChange={onChange}
                />
            </Sheet>
            : <Checkbox
                variant="soft"
                color={value ? "success" : "neutral"}
                label={<FieldText />}
                defaultChecked={defaultValue}
                checked={value}
                onChange={onChange}
            />
        );
    }
}