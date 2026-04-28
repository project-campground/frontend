import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Switch, FormControl, Sheet, Stack, Typography, } from "@mui/joy";
import type React from "react";
import { Group } from "campground-ui";
import type { FormContext } from "./context";

type SwitchType = "default" | "button";
export interface FormFieldSwitchProps extends FormFieldProps<boolean | number>, FormFieldDecoratorProps {
    label?: ReactNode[] | ReactNode;
    description?: ReactNode[] | ReactNode;
    design?: SwitchType;
    checkedValue?: number;
}

type State = {
    value: boolean | number;
};

export default class FormFieldSwitch extends AbstractFormField<boolean | number, FormFieldSwitchProps, State> {
    constructor(props: FormFieldSwitchProps, context: FormContext) {
        super(props, context, props.checkedValue ? 0 : false);
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null && this.state.value !== 0;
    }

    private onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const value = ev.target.checked;
        const checkedValue = this.props.checkedValue ? (Number(value) as 1 | 0) * this.props.checkedValue : value;
        this.setState({ value: checkedValue }, () => this.onValueChange());
    }

    private FieldText() {
        const { label, description, startDecorator, endDecorator } = this.props;

        return (
            (label || description) &&
            <Group gap={1} flex={1} mr={2}>
                {startDecorator}
                <Stack flex={1}>
                    <Typography level="title-md" fontWeight={700} textColor="text.secondary">{label}</Typography>
                    <Typography level="body-md" textColor="text.tertiary">{description}</Typography>
                </Stack>
                {endDecorator}
            </Group>
        )
    }

    public override render(): ReactNode {
        const { design } = this.props;
        const { state: { value } } = this;
        const onChange = this.onInputChange.bind(this);
        const FieldText = this.FieldText.bind(this);

        return (
            <FormControl orientation="horizontal">
                <FieldText />
                {design === "button"
                ? <Sheet variant="soft" sx={{ px: 3, py: 1.5, borderRadius: "md", lineHeight: 0 }}>
                    <Switch
                        variant="soft"
                        size="lg"
                        color={value ? "primary" : "neutral"}
                        checked={Boolean(value)}
                        onChange={onChange}
                    />
                </Sheet>
                : <Switch
                    variant="soft"
                    size="lg"
                    color={value ? "primary" : "neutral"}
                    checked={Boolean(value)}
                    onChange={onChange}
                />}
            </FormControl>
        );
    }
}