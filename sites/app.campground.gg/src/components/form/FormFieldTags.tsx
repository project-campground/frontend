import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldProps } from "./forms";
import { Chip, Input, Stack, type ColorPaletteProp, type VariantProp, } from "@mui/joy";
import { Group } from "components";
import { IconPlus, IconX } from "@tabler/icons-react";

export interface FormFieldTagsProps extends FormFieldProps<"tags", string[]> {
    color?: ColorPaletteProp;
    variant?: VariantProp;
}

type State = {
    value: string[];
};

export default class FormFieldTags extends AbstractFormField<"tags", string[], FormFieldTagsProps, State> {
    constructor(props: FormFieldTagsProps) {
        super(props, []);
    }

    private onInputChange(value: string[]) {
        this.setState({ value }, () => value && this.onChange(value));
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
                    <Input
                        startDecorator={<IconPlus />}
                        placeholder="Tag name"
                        variant={variantOrDefault}
                        color={colorOrDefault}
                        sx={{ width: 150, borderRadius: "1.5rem" }}
                        onKeyUp={(ev) => ev.key === "Enter" && (ev.target as HTMLInputElement).value && (this.addValue((ev.target as HTMLInputElement).value), (ev.target as HTMLInputElement).value = "")}
                    />
                </Group>
            </Stack>
        );
    }
}