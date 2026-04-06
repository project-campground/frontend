import { Menu, Stack, styled } from "@mui/joy";
import { useState } from "react";
import { HexColorPicker, HexAlphaColorPicker } from "react-colorful";

type Props = {
    allowAlpha?: boolean;
    defaultColor?: string;
    onChange?: (color: number) => unknown;
};

const ColorMenu = styled(Menu)(({ theme }) => ({
    padding: `12px 16px`,
    "& .react-colorful": {
        gap: 8,
    },
    "& .react-colorful__pointer": {
        width: 16,
        height: 16,
    },
    "& .react-colorful__saturation": {
        borderRadius: theme.vars.radius.sm,
    },
    "& .react-colorful__hue": {
        height: 8,
        borderRadius: theme.vars.radius.sm,
    },
}));

export default function ColorPickerMenu({ allowAlpha, defaultColor, onChange }: Props) {
    const [color, onColorChange] = useState(defaultColor || "#FF0000");
    const onValueChange = (value: string) => {
        onColorChange(value);
        return onChange?.(parseInt(value.substring(1), 16));
    };
    return (
        <ColorMenu variant="soft" sx={{ "--zIndex-popup": 1700 }}>
            <Stack gap={1}>
                {allowAlpha
                ? <HexAlphaColorPicker color={color} onChange={onValueChange} />
                : <HexColorPicker color={color} onChange={onValueChange} />}
                {/* <Input
                    startDecorator={<IconHash />}
                    value={color.substring(1)}
                    sx={{ width: 200 }}
                /> */}
            </Stack>
        </ColorMenu>
    )
}