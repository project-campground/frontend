import { Stack, styled } from '@mui/joy';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { GlobalNavbarItem } from '~/routes/_global/GlobalNavbarItem';

type Props = {
	isActive?: boolean;
	icon: ReactNode | ReactNode[];
	children: ReactNode | ReactNode[];
	href: string;
};

const NavbarButtonRoot = styled(GlobalNavbarItem)(({ theme }) => ({
	alignItems: 'center',
	gap: theme.spacing(1),
	padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
	justifyContent: 'start',
	[theme.breakpoints.up('lg')]: {
		padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
		width: 48,
		height: 48,
		justifyContent: 'center',
	},
}));
const NavbarButtonIcon = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	width: theme.spacing(4),
	// height: theme.spacing(4),
	// width: "100%",
	flexDirection: 'row',
}));
const NavbarButtonContent = styled(Stack)(({ theme }) => ({
	alignItems: 'start',
	flexDirection: 'row',
	[theme.breakpoints.up('lg')]: { display: 'none' },
}));

export default function NavbarButton(props: Props) {
	const navigate = useNavigate();
	const { children, isActive, icon, href } = props;

	return (
		<NavbarButtonRoot
			className={isActive ? 'active' : ''}
			onClick={() => navigate(href)}
		>
			<NavbarButtonIcon>{icon}</NavbarButtonIcon>
			<NavbarButtonContent>{children}</NavbarButtonContent>
		</NavbarButtonRoot>
	);
}
