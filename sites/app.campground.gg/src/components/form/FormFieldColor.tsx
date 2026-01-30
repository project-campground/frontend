import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldProps } from "./forms";
import { Box, Dropdown, MenuButton, Stack, styled } from "@mui/joy";
import { Group } from "components";
import ColorPickerMenu from "../ColorPickerMenu";

export interface FormFieldColorProps extends FormFieldProps<"color", number> {
    allowAlpha?: boolean;
}

type State = {
    value: number;
};

const ColorPick = styled(Box)(({ theme }) => ({
    width: 24,
    height: 24,
    backgroundColor: theme.vars.palette.primary[500],
    borderRadius: theme.vars.radius.md,
}));

export default class FormFieldColor extends AbstractFormField<"color", number, FormFieldColorProps, State> {
    constructor(props: FormFieldColorProps) {
        super(props, 0);
    }

    private onInputChange(value: number) {
        this.setState({ value }, () => value && this.onChange(value));
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || Boolean(this.state.value);
    }

    public override render(): ReactNode {
        const { allowAlpha } = this.props;
        const { value } = this.state;
        const hexColor = `#${value.toString(16).padEnd(6, "0")}`;
    
        return (
            <Stack>
                <Group gap={1}>
                    <Dropdown>
                        <MenuButton sx={(theme) => ({ fontFamily: theme.fontFamily.code })} color="neutral" variant="outlined" startDecorator={<ColorPick sx={(theme) => ({ bgcolor: value ? hexColor : `transparent`, border: value ? null : `solid 2px ${theme.vars.palette.neutral[500]}` })} />}>
                            {hexColor}
                        </MenuButton>
                        <ColorPickerMenu allowAlpha={allowAlpha} defaultColor={hexColor} onChange={this.onInputChange.bind(this)} />
                    </Dropdown>
                    <Stack gap={1}>
                        <Group gap={1}>
                            <ColorPick sx={{ bgcolor: "danger.500" }} />
                            <ColorPick sx={{ bgcolor: "primary.500" }} />
                            <ColorPick sx={{ bgcolor: "warning.500" }} />
                            <ColorPick sx={{ bgcolor: "success.500" }} />
                            <ColorPick sx={{ bgcolor: "debug.500" }} />
                            <ColorPick sx={{ bgcolor: "info.500" }} />
                            <ColorPick sx={{ bgcolor: "note.500" }} />
                        </Group>
                        <Group gap={1}>
                            <ColorPick sx={{ bgcolor: "danger.800" }} />
                            <ColorPick sx={{ bgcolor: "primary.800" }} />
                            <ColorPick sx={{ bgcolor: "warning.800" }} />
                            <ColorPick sx={{ bgcolor: "success.800" }} />
                            <ColorPick sx={{ bgcolor: "debug.800" }} />
                            <ColorPick sx={{ bgcolor: "info.800" }} />
                            <ColorPick sx={{ bgcolor: "note.800" }} />
                        </Group>
                    </Stack>
                </Group>
            </Stack>
        );
    }
}