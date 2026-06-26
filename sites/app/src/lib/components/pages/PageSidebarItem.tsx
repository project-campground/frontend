import { Button, styled, type ColorPaletteProp } from '@mui/joy';
import type { PropsWithChildren, ReactNode } from 'react';
import { usePageSidebar } from './PageSidebar';

const PageSidebarItemButton = styled(Button, { name: 'PageSidebarItem', slot: 'root' })(
	({ theme }) => ({
		justifyContent: 'start',
		border: `solid 1px transparent`,
		'&.active': {
			border: `solid 1px ${theme.vars.palette.neutral.border}`,
			boxShadow: theme.vars.shadow.sm,
		},
		'&.active:active': {
			backgroundColor: theme.vars.palette.background.body,
			border: `solid 1px transparent`,
			boxShadow: '0 0 0px transparent',
		},
		'&.MuiButton-colorDanger.active': { border: `solid 1px ${theme.vars.palette.danger.border}` },
	}),
);

export interface PageSidebarItemProps extends PropsWithChildren {
	id: string;
	startDecorator?: ReactNode[] | ReactNode;
	endDecorator?: ReactNode[] | ReactNode;
	color?: ColorPaletteProp;
}

export default function PageSidebarItem({ id, color, ...props }: PageSidebarItemProps) {
	const { activeItem, setActiveItem } = usePageSidebar();

	return (
		<PageSidebarItemButton
			onClick={() => setActiveItem(id)}
			className={activeItem === id ? 'active' : ''}
			variant={activeItem === id ? 'soft' : 'plain'}
			color={color ?? 'neutral'}
			{...props}
		/>
	);
}
