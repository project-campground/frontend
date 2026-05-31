import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Sheet, Stack, Typography, } from "@mui/joy";
import Tristate, { type TristateValue } from "../Tristate";
import type { FormContext } from "./context";

type TristateType = "default" | "button";
export interface FormFieldTristateProps extends FormFieldProps<TristateValue>, FormFieldDecoratorProps {
    label?: ReactNode[] | ReactNode;
    description?: ReactNode[] | ReactNode;
    design?: TristateType;
}

type State = {
    value: TristateValue;
};

export default class FormFieldTristate extends AbstractFormField<TristateValue, FormFieldTristateProps, State> {
    constructor(props: FormFieldTristateProps, context: FormContext) {
        super(props, context, "pass");
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null;
    }

    private onInputChange(value: TristateValue) {
        this.setState({ value }, () => value && this.onValueChange());
    }

    private FieldText() {
        const { label, description } = this.props;

        return (
            (label || description) &&
            <Stack>
                <Typography level="title-md" fontWeight={700}>{label}</Typography>
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
                <Tristate
                    left
                    variant="soft"
                    label={<FieldText />}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                />
            </Sheet>
            : <Tristate
                left
                variant="soft"
                label={<FieldText />}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
            />
        );
    }
}