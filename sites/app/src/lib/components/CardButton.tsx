import { Button, Stack, type ButtonProps } from '@mui/joy';
import { IconCaretRightFilled } from '@tabler/icons-react';

type Props = ButtonProps;

export default function CardButton({
	size,
	variant,
	color,
	children,
	endDecorator,
	sx,
	...props
}: Props) {
	return (
		<Button
			{...props}
			sx={[
				{ '--click-transform': 'scale(0.975) translateY(1px)', '--hover-transform': 'scale(1.005)' },
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			size={size ?? 'lg'}
			color={color ?? 'neutral'}
			variant={variant ?? 'soft'}
			endDecorator={endDecorator || <IconCaretRightFilled />}
		>
			<Stack
				flex={1}
				alignItems='start'
			>
				{children}
			</Stack>
		</Button>
	);
}
