import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { ListItemDecorator, Option, Select, type SelectOption } from "@mui/joy";
import type { FormContext } from "./context";

export interface FormFieldSelectItem {
    value: string | boolean | number | null;
    text: ReactNode[] | ReactNode;
    startDecorator?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
}
export interface FormFieldSelectProps extends FormFieldProps<string | boolean | number | null>, FormFieldDecoratorProps {
    options: FormFieldSelectItem[];
    placeholder?: string;
}

type State = {
    value: string | number | boolean | null;
};

export default class FormFieldSelect extends AbstractFormField<number | boolean | string | null, FormFieldSelectProps, State> {
    constructor(props: FormFieldSelectProps, context: FormContext) {
        super(props, context, null);
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || !!this.state.value;
    }

    private onInputChange(value: string | number | boolean | null) {
        this.setState({ value }, () => value && this.onValueChange());
    }

    private renderValue(option: SelectOption<string | number | boolean> | null) {
        const optionRecord = this.props.options.find((x) => x.value === option?.value);
        console.log({ option, optionRecord });

        return this.renderOption(option?.value, optionRecord);
    }
    
    private renderOption(value: string | number | boolean | undefined | null, option: FormFieldSelectItem | undefined) {
        // console.log({ value, option });
        return (
            <>
                {option?.startDecorator &&
                    <ListItemDecorator>
                        {option?.startDecorator}
                    </ListItemDecorator>
                }
                {option?.text ?? value}
                {option?.endDecorator &&
                    <ListItemDecorator>
                        {option?.startDecorator}
                    </ListItemDecorator>
                }
            </>
        );
    }

    public override render(): ReactNode {
        const { startDecorator, endDecorator, defaultValue, placeholder, options } = this.props;
        const { state: { value } } = this;

        console.log({ defaultValue, options });
        return (
            <Select
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={value}
                renderValue={this.renderValue.bind(this)}
                onChange={(_e, value) => this.onInputChange(value)}
            >
                {
                    options.map((x, i) =>
                        <Option value={x.value} key={`option-${i}`}>
                            {this.renderOption(x.value, x)}
                        </Option>
                    )
                }
            </Select>
        );
    }
}