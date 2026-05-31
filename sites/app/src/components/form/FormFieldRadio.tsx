import type { PropsWithChildren, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { RadioGroup } from "@mui/joy";
import type { FormContext } from "./context";

export interface FormFieldRadioProps extends PropsWithChildren, FormFieldProps<string | boolean | number | null>, FormFieldDecoratorProps {
}

export default class FormFieldRadio extends AbstractFormField<number | boolean | string | null, FormFieldRadioProps> {
    constructor(props: FormFieldRadioProps, context: FormContext) {
        super(props, context, null);
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null;
    }

    private onInputChange(value: string | number | boolean | null) {
        this.setState({ value }, () => value && this.onValueChange());
    }

    // private RadioOption(option: FormFieldRadioItem) {
    //     return (
    //         <Radio
    //             variant="soft"
    //             disabled={this.props.disabled}
    //             value={option.value}
    //             label={option.text}
    //         />
    //     );
    // }

    // private RadioOptionButtoned(option: FormFieldRadioItem) {
    //     return (
    //         <ListItem variant="soft" sx={{ boxShadow: "sm" }}>
    //             <Radio
    //                 overlay
    //                 variant="soft"
    //                 disabled={this.props.disabled}
    //                 value={option.value}
    //                 label={
    //                     <RadioLabel>
    //                         {option.startDecorator}
    //                         <Typography>
    //                             {option.text}
    //                         </Typography>
    //                         {option.endDecorator}
    //                     </RadioLabel>
    //                 }
    //                 sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
    //             />
    //         </ListItem>
    //     );
    // }

    // private RadioOptionGridButtoned(option: FormFieldRadioItem) {
    //     return (
    //         <ListItem variant="soft" sx={{ boxShadow: "sm", flexDirection: "column", alignItems: "center" }}>
    //             <Radio
    //                 overlay
    //                 variant="soft"
    //                 disabled={this.props.disabled}
    //                 value={option.value}
    //                 label={
    //                     <RadioLabel>
    //                         {option.startDecorator}
    //                         <Typography>
    //                             {option.text}
    //                         </Typography>
    //                         {option.endDecorator}
    //                     </RadioLabel>
    //                 }
    //                 sx={{ flexGrow: 1, flexDirection: "row" }}
    //                 disableIcon
    //             />
    //         </ListItem>
    //     );
    // }

    public override render(): ReactNode {
        const { children, defaultValue } = this.props;
        const { state: { value } } = this;

        return (
            <RadioGroup value={value} defaultValue={defaultValue} onChange={(e) => this.onInputChange(e.target.value)}>
                {children}
            </RadioGroup>
        );
    }
}