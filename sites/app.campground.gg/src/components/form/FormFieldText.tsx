import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { Input, Menu, MenuItem, ListItemDecorator, ListItemContent, Typography, Box } from "@mui/joy";
import type { FormContext } from "./context";

export interface FormFieldTextKnownValue {
    startDecorator?: ReactNode[] | ReactNode;
    content?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
    value: string;
}
export interface FormFieldTextProps extends FormFieldProps<string>, FormFieldDecoratorProps {
    inputType?: HTMLInputTypeAttribute;
    placeholder?: string;
    format?: RegExp;
    allowedValue?: string | null;
    getError?: (value: string) => Promise<string | null | undefined>;
    knownValues?: FormFieldTextKnownValue[];
    max?: number;
    min?: number;
}

type State = {
    value: string;
    errorMessage?: string | null | undefined;
    menuOpen: boolean;
};

export default class FormFieldText extends AbstractFormField<string, FormFieldTextProps, State> {
    private _inputDebounce?: number;

    constructor(props: FormFieldTextProps, context: FormContext) {
        super(props, context, "", { menuOpen: false });
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired && this.hasValidValue;
    }
    
    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value.length > 0;
    }
    
    private get hasValidValue(): boolean {
        return this.isFormatValid && this.hasAllowedValue && !this.state.errorMessage;
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

        console.log(this.props.getError, value);
        
        this.onNewValue(value, () => this.debounceErrorOrOnChange());
    }
    
    debounceErrorOrOnChange() {
        const { value } = this.state;

        if (this.props.getError && value) {
            clearTimeout(this._inputDebounce);
    
            return this._inputDebounce = setTimeout(async () => {
                const error = await this.props.getError!(value);
    
                this.setState({ errorMessage: error });
    
                return this.onValueChange();
            }, 250);
        }

        return this.onValueChange();
    }

    componentWillUnmount(): void {
        clearTimeout(this._inputDebounce);
    }

    private onNewValue(value: string, onNewValue?: () => void) {
        console.log("New value", [value]);
        this.setState({ value, errorMessage: undefined, }, () => (onNewValue ? onNewValue() :this.onValueChange()));
    }

    public override render(): ReactNode {
        const { startDecorator, endDecorator, placeholder, inputType, disabled, knownValues } = this.props;
        const { hasValidValue, state: { value, errorMessage, menuOpen } } = this;

        return (
            <Box sx={{ position: "relative" }}>
                <Input
                    onFocus={() => this.setState({ menuOpen: true })}
                    onBlur={() => setTimeout(() => this.setState({ menuOpen: false }), 200)}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    startDecorator={startDecorator}
                    endDecorator={endDecorator}
                    onChange={this.onInputChange.bind(this)}
                    error={value.length > 0 && !hasValidValue}
                    disabled={disabled}
                />
                {errorMessage && <Typography textColor="danger.300">{errorMessage}</Typography>}
                <Box sx={{ position: "relative" }}>
                    {knownValues && <Menu open={menuOpen} disablePortal sx={{ position: "absolute !important" }}>
                        {knownValues.map((x) =>
                            <MenuItem key={x.value} onClick={() => (console.log({ x }), this.onNewValue(x.value))}>
                                {x.startDecorator && <ListItemDecorator>
                                    {x.startDecorator}
                                </ListItemDecorator>}
                                <ListItemContent>
                                    {x.content}
                                </ListItemContent>
                                {x.endDecorator && <ListItemDecorator>
                                    {x.endDecorator}
                                </ListItemDecorator>}
                            </MenuItem>
                        )}
                    </Menu>}
                </Box>
            </Box>
        );
    }
}