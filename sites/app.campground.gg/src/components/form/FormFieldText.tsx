import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Input } from "@mui/joy";

export interface FormFieldTextProps extends FormFieldProps<"text", string>, FormFieldDecoratorProps {
    inputType?: HTMLInputTypeAttribute;
    placeholder?: string;
    format?: RegExp;
}

type State = {
    value: string;
};

export default class FormFieldText extends AbstractFormField<"text", string, FormFieldTextProps, State> {
    constructor(props: FormFieldTextProps) {
        super(props, "");
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired && this.isFormatValid;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value.length > 0;
    }

    private get isFormatValid(): boolean {
        // Special thanks to De Morgan for solving this mess
        // !this.props.format || !!this.props.format!.exec(this.state.value)
        return !(this.props.format && !this.props.format!.exec(this.state.value));
    }

    private onInputChange(ev: ChangeEvent<HTMLInputElement>) {
        const { value } = ev.target;

        this.setState({ value }, () => this.onChange(ev.target.value));
    }

    public override render(): ReactNode {
        const { startDecorator, endDecorator, defaultValue, placeholder, inputType, disabled } = this.props;
        const { isFormatValid, state: { value } } = this;

        return (
            <Input
                type={inputType}
                placeholder={placeholder}
                defaultValue={defaultValue}
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