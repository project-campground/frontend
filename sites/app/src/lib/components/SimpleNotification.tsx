import { Badge } from '@mui/joy';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode[] | ReactNode;
	regular?: boolean;
	pingCount?: number;
	size?: 'sm' | 'md' | 'lg';
	badgeInset?: number;
};

const notificationWidth: Record<'sm' | 'md' | 'lg', number> = { sm: 12, md: 16, lg: 24 };

export default function SimpleNotification({
	children,
	pingCount,
	regular,
	size,
	badgeInset,
}: Props) {
	const inset = badgeInset ?? 4;

	return (
		<Badge
			size={size}
			badgeInset={inset}
			badgeContent={regular ? '' : 0}
			color='info'
			slotProps={{ badge: { sx: { width: notificationWidth[size ?? 'md'] } } }}
		>
			<Badge
				size={size}
				badgeInset={inset}
				badgeContent={pingCount ?? 0}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				color='danger'
			>
				{children}
			</Badge>
		</Badge>
	);
}
