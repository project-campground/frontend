import type { ChangeEvent, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Button, ButtonGroup, Input } from "@mui/joy";
import { Group } from "components";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";

export interface FormFieldNumberProps extends FormFieldProps<"number", number | null>, FormFieldDecoratorProps {
    placeholder?: string;
    min?: number;
    max?: number;
    incrementBy?: number;
    allowFloating?: boolean;
}

type State = {
    textValue: string;
    value: number | null;
};

export default class FormFieldNumber extends AbstractFormField<"number", number | null, FormFieldNumberProps, State> {
    constructor(props: FormFieldNumberProps) {
        super(props, null);
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired && this.hasAllowedValue;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null;
    }

    private get hasAllowedValue(): boolean {
        return !(
            this.state.value !== null &&
            ((typeof this.props.max !== "undefined" && (this.state.value ?? 0) > this.props.max) ||
            (typeof this.props.min !== "undefined" && (this.state.value ?? 0) < this.props.min) ||
            (this.props.allowFloating && Math.floor(this.state.value ?? 0) !== (this.state.value ?? 0)))
        );
    }

    private onInputChange(ev: ChangeEvent<HTMLInputElement>) {
        const { value } = ev.target;
        const numValue = value.length < 1 ? null : parseFloat(value);

        this.setState({ textValue: value, value: numValue }, () => this.onChange(numValue));
    }


    private _increment = this.increaseValue.bind(this, 1);
    private _decrement = this.increaseValue.bind(this, -1);
    private increaseValue(increasedBy: number) {
        const increasedByFinal = increasedBy * (this.props.incrementBy ?? 1);

        if (this.state.value === null)
            return this.setState({ textValue: increasedByFinal.toString(), value: increasedByFinal });

        const increased = this.state.value + increasedByFinal;
        this.setState({ textValue: increased.toString(), value: increased });
    }

    public override render(): ReactNode {
        const { startDecorator, endDecorator, placeholder, disabled } = this.props;
        const { state: { textValue, value } } = this;

        return (
            <Input
                sx={{ pr: 0 }}
                placeholder={placeholder}
                startDecorator={startDecorator}
                value={textValue}
                endDecorator={<Group>
                    {endDecorator}
                    <ButtonGroup orientation="vertical" size="sm" variant="soft">
                        <Button sx={{ width: "max-content", }} onClick={this._increment}>
                            <IconCaretUpFilled size={12} />
                        </Button>
                        <Button sx={{ width: "max-content", }} onClick={this._decrement}>
                            <IconCaretDownFilled size={12} />
                        </Button>
                    </ButtonGroup>
                </Group>
                }
                onChange={this.onInputChange.bind(this)}
                error={Number.isNaN(value) || !this.isValid}
                disabled={disabled}
            />
        );
    }
}