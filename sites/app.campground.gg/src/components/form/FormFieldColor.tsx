import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldProps } from "./forms";
import { Box, Dropdown, MenuButton, Stack, styled } from "@mui/joy";
import { Group } from "components";
import ColorPickerMenu from "../../layout/ColorPickerMenu";
import { mixColors } from "components/theme/color";

export interface FormFieldColorProps extends FormFieldProps<"color", number> {
    allowAlpha?: boolean;
}

type State = {
    value: number;
};

const ColorPick = styled(Box, {
    name: "ColorPick",
    slot: "root",
})(({ theme }) => ({
    width: 24,
    height: 24,
    backgroundColor: theme.vars.palette.primary[500],
    borderRadius: theme.vars.radius.md,
    cursor: "pointer",
    boxShadow: theme.vars.shadow.sm,
}));

const preselectedColors = [
    0xfe1c56,
    0xff5a26,
    0xfea01c,
    0x0cef43,
    0x26f2ff,
    0x6026ff,
    0xca1cfe,
];
const dark = 0x0e0b16;
const preselectedColorsDarker = preselectedColors.map((x) => mixColors(x, dark, 0.5));

export default class FormFieldColor extends AbstractFormField<"color", number, FormFieldColorProps, State> {
    constructor(props: FormFieldColorProps) {
        super(props, 0);
    }

    private onInputChange(value: number) {
        this.setState({ value }, () => value && this.onChange(value));
    }

    public override get isValid(): boolean {
        return true;
    }

    public override render(): ReactNode {
        const { allowAlpha } = this.props;
        const { value } = this.state;
        const hexColor = `#${value.toString(16).padStart(6, "0")}`;
    
        return (
            <Stack>
                <Group gap={1}>
                    <Dropdown>
                        <MenuButton sx={(theme) => ({ boxShadow: theme.vars.shadow.sm, fontFamily: theme.fontFamily.code })} color="neutral" variant="outlined" startDecorator={<ColorPick sx={{ backgroundColor: hexColor }} />}>
                            {hexColor}
                        </MenuButton>
                        <ColorPickerMenu allowAlpha={allowAlpha} defaultColor={hexColor} onChange={this.onInputChange.bind(this)} />
                    </Dropdown>
                    <Stack gap={1}>
                        <Group gap={1}>
                            {preselectedColors.map((color) =>
                                <ColorPick key={color} onClick={() => this.onInputChange(color)} sx={{ backgroundColor: `#${color.toString(16).padStart(6, "0")}` }} />
                            )}
                        </Group>
                        <Group gap={1}>
                            {preselectedColorsDarker.map((color) =>
                                <ColorPick key={color} onClick={() => this.onInputChange(color)} sx={{ backgroundColor: `#${color.toString(16).padStart(6, "0")}` }} />
                            )}
                        </Group>
                    </Stack>
                </Group>
            </Stack>
        );
    }
}