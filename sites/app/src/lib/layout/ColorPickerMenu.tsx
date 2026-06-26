import { Menu, Stack, styled } from '@mui/joy';
import { useMemo, useState } from 'react';
import { HexColorPicker, HexAlphaColorPicker } from 'react-colorful';

type Props = {
	allowAlpha?: boolean;
	defaultColor?: string;
	debounceChange?: number;
	onChange?: (color: number) => unknown;
};

const ColorMenu = styled(Menu)(({ theme }) => ({
	padding: `12px 16px`,
	'& .react-colorful': { gap: 8 },
	'& .react-colorful__pointer': { width: 16, height: 16 },
	'& .react-colorful__saturation': { borderRadius: theme.vars.radius.sm },
	'& .react-colorful__hue': { height: 8, borderRadius: theme.vars.radius.sm },
}));

export default function ColorPickerMenu({ allowAlpha, defaultColor, onChange }: Props) {
	const [color, onColorChange] = useState(defaultColor || '#FF0000');
	// Make sure it's more performant in forms
	const valueBouncerTimeout = useMemo(() => ({ id: null as number | null }), []);

	const onValueChange = (value: string) => {
		if (valueBouncerTimeout.id) clearTimeout(valueBouncerTimeout.id);

		onColorChange(value);
		valueBouncerTimeout.id = setTimeout(() => {
			onChange?.(parseInt(value.substring(1), 16));
			valueBouncerTimeout.id = null;
		}, 100);
	};
	return (
		<ColorMenu
			variant='soft'
			sx={{ '--zIndex-popup': 1700 }}
		>
			<Stack gap={1}>
				{allowAlpha ?
					<HexAlphaColorPicker
						color={color}
						onChange={onValueChange}
					/>
				:	<HexColorPicker
						color={color}
						onChange={onValueChange}
					/>
				}
				{/* <Input
                    startDecorator={<IconHash />}
                    value={color.substring(1)}
                    sx={{ width: 200 }}
                /> */}
			</Stack>
		</ColorMenu>
	);
}
