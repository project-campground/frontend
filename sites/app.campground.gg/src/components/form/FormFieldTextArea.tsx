import type { ChangeEvent, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Textarea } from "@mui/joy";
import type { FormContext } from "./context";

export interface FormFieldTextAreaProps extends FormFieldProps<string>, FormFieldDecoratorProps {
    placeholder?: string;
    format?: RegExp;
    max?: number;
    min?: number;
}

type State = {
    value: string;
};

export default class FormFieldTextArea extends AbstractFormField<string, FormFieldTextAreaProps, State> {
    constructor(props: FormFieldTextAreaProps, context: FormContext) {
        super(props, context, "");
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired && this.isFormatValid;
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

    private onInputChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = ev.target;

        if (this.props.max && value.length > this.props.max)
            return;

        this.setState({ value }, () => this.onValueChange());
    }

    public override render(): ReactNode {
        const { startDecorator, endDecorator, placeholder } = this.props;
        const { isFormatValid, state: { value } } = this;

        return (
            <Textarea
                minRows={2}
                placeholder={placeholder}
                value={value}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                onChange={this.onInputChange.bind(this)}
                error={value.length > 0 && !isFormatValid}
                />
        );
    }
}