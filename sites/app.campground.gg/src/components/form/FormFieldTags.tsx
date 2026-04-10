import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldProps } from "./forms";
import { Chip, Input, Stack, type ColorPaletteProp, type VariantProp, } from "@mui/joy";
import { Group } from "components";
import { IconPlus, IconX } from "@tabler/icons-react";
import { IntlContext } from "react-intl";
import type { FormContext } from "./context";

export interface FormFieldTagsProps extends FormFieldProps<string[]> {
    color?: ColorPaletteProp;
    variant?: VariantProp;
}

type State = {
    value: string[];
};

export default class FormFieldTags extends AbstractFormField<string[], FormFieldTagsProps, State> {
    constructor(props: FormFieldTagsProps, context: FormContext) {
        super(props, context, [], {});
    }

    private onInputChange(value: string[]) {
        this.setState({ value }, () => value && this.onValueChange());
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || Boolean(this.state.value.length);
    }

    removeValue(value: string) {
        return this.onInputChange(this.state.value.filter((x) => x !== value));
    }

    addValue(value: string) {
        if (this.state.value.includes(value))
            return;

        return this.onInputChange([...this.state.value, value]);
    }

    public override render(): ReactNode {
        const { value } = this.state;
        const { variant, color } = this.props;
        const variantOrDefault = variant ?? "solid";
        const colorOrDefault = color ?? "neutral";
    
        return (
            <Stack>
                <Group gap={1}>
                    {value.map((x) =>
                        <Chip key={x} variant={variantOrDefault} color={colorOrDefault} onClick={this.removeValue.bind(this, x)}>{x} <IconX size={12} /></Chip>
                    )}
                    <IntlContext.Consumer>
                        {(intl) =>
                            <Input
                                startDecorator={<IconPlus />}
                                placeholder={
                                    intl.formatMessage({
                                        id: "form.tagPlaceholder",
                                        defaultMessage: "Add tag",
                                        description: "Placeholder used for adding tags in forms"
                                    })
                                }
                                variant={variantOrDefault}
                                color={colorOrDefault}
                                sx={{ width: 150, borderRadius: "1.5rem" }}
                                onKeyUp={(ev) => ev.key === "Enter" && (ev.target as HTMLInputElement).value && (this.addValue((ev.target as HTMLInputElement).value), (ev.target as HTMLInputElement).value = "")}
                            />
                        }
                    </IntlContext.Consumer>
                </Group>
            </Stack>
        );
    }
}