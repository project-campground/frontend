import { Avatar } from '@mui/joy';
import { IconCheck } from '@tabler/icons-react';

type Props = { size?: 'xs' | 'sm' | 'md' | 'lg' };

const pxToSize: Record<'xs' | 'sm' | 'md' | 'lg', number> = { xs: 12, sm: 16, md: 20, lg: 24 };

export default function VerifiedIcon({ size }: Props) {
	const sizePx = pxToSize[size ?? 'md'];

	return (
		<Avatar
			color='primary'
			variant='solid'
			sx={{
				width: sizePx * 1.25,
				height: sizePx * 1.25,
				px: `${sizePx * 0.125}px`,
				py: `${sizePx * 0.125}px`,
			}}
		>
			<IconCheck size={sizePx} />
		</Avatar>
	);
}
