import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Input } from "@mui/joy";
import type { FormContext } from "./context";

export interface FormFieldTextProps extends FormFieldProps<string>, FormFieldDecoratorProps {
    inputType?: HTMLInputTypeAttribute;
    placeholder?: string;
    format?: RegExp;
    allowedValue?: string | null;
    max?: number;
    min?: number;
}

type State = {
    value: string;
};

export default class FormFieldText extends AbstractFormField<string, FormFieldTextProps, State> {
    constructor(props: FormFieldTextProps, context: FormContext) {
        super(props, context, "", {});
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired && this.isFormatValid && this.hasAllowedValue;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value.length > 0;
    }

    private get isFormatValid(): boolean {
        return !(
            (this.props.min && this.state.value.length < this.props.min) ||
            (this.props.format && !this.props.format!.exec(this.state.value))
        );
    }

    private get hasAllowedValue(): boolean {
        return !this.props.allowedValue || this.props.allowedValue === this.state.value;
    }

    private onInputChange(ev: ChangeEvent<HTMLInputElement>) {
        const { value } = ev.target;

        if (this.props.max && value.length > this.props.max)
            return;

        this.setState({ value }, () => this.onValueChange());
    }

    public override render(): ReactNode {
        const { startDecorator, endDecorator, placeholder, inputType, disabled } = this.props;
        const { isFormatValid, state: { value } } = this;

        return (
            <Input
                type={inputType}
                placeholder={placeholder}
                value={value}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                onChange={this.onInputChange.bind(this)}
                error={value.length > 0 && !isFormatValid}
                disabled={disabled}
            />
        );
    }
}